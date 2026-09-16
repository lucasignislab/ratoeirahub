"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  planName: string;
  checkoutUrl: string;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  coupon: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  coupon?: string;
}

const PHONE_MASK_LENGTH = 13;

function formatPhone(value: string): string {
  let digits = value.replace(/[^\d+]/g, "");

  const hasPlus = digits.startsWith("+");
  if (hasPlus) digits = digits.slice(1);

  digits = digits.slice(0, PHONE_MASK_LENGTH);
  // Autopreenchimento brasileiro pode fornecer apenas DDD + número (11 dígitos).
  // Nesse caso, adiciona o DDI do Brasil antes de aplicar a máscara.
  if (digits.length === 11) digits = `55${digits}`;

  let formatted = "";
  if (digits.length > 0) {
    formatted = `+${digits.slice(0, 2)}`;
    if (digits.length > 2) formatted += ` (${digits.slice(2, 4)}`;
    if (digits.length > 4) formatted += `) ${digits.slice(4, 9)}`;
    if (digits.length > 9) formatted += `-${digits.slice(9, 13)}`;
  }

  return formatted;
}

function stripPhone(value: string): string {
  return value.replace(/\D/g, "");
}

function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export default function SubscriptionModal({
  isOpen,
  onClose,
  planName,
  checkoutUrl,
}: SubscriptionModalProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
    coupon: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = useCallback(() => {
    setFormData({ fullName: "", email: "", phone: "", coupon: "" });
    setErrors({});
    setIsSubmitting(false);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  function validateForm(): boolean {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Nome completo é obrigatório";
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = "Digite seu nome completo";
    }

    if (!formData.email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = "Digite um e-mail válido";
    }

    const phoneDigits = stripPhone(formData.phone);
    if (!formData.phone.trim()) {
      newErrors.phone = "Telefone é obrigatório";
    } else if (phoneDigits.length < PHONE_MASK_LENGTH) {
      newErrors.phone = "Digite o telefone completo com DDI e DDD";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handlePhoneChange(event: React.ChangeEvent<HTMLInputElement>) {
    const formatted = formatPhone(event.target.value);
    setFormData((prev) => ({ ...prev, phone: formatted }));
    if (errors.phone) {
      setErrors((prev) => ({ ...prev, phone: undefined }));
    }
  }

  function handleChange(field: keyof FormData) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      setFormData((prev) => ({ ...prev, [field]: event.target.value }));
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: undefined }));
      }
    };
  }

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // TODO: enviar dados de lead para backend/CRM quando houver integração
    // eslint-disable-next-line no-console
    console.log("Lead de assinatura:", {
      plano: planName,
      ...formData,
      telefoneNumeros: stripPhone(formData.phone),
      checkoutUrl,
    });

    // Monta URL do checkout com os dados para pré-preenchimento
    const phoneDigits = stripPhone(formData.phone);
    const checkout = new URL(checkoutUrl, window.location.href);

    // Dados pessoais
    checkout.searchParams.set("name", formData.fullName.trim());
    checkout.searchParams.set("full_name", formData.fullName.trim());
    checkout.searchParams.set("email", formData.email.trim());

    // Telefone: DDI (2 primeiros dígitos), DDD + número (restante) e número completo
    checkout.searchParams.set("phone_local_code", phoneDigits.slice(0, 2));
    checkout.searchParams.set("phone", phoneDigits.slice(2));
    checkout.searchParams.set("phone_full", phoneDigits);

    // Cupom de desconto (se preenchido)
    if (formData.coupon.trim()) {
      checkout.searchParams.set("coupon", formData.coupon.trim());
    }

    // Pequeno delay para feedback visual antes do redirecionamento
    await new Promise((resolve) => setTimeout(resolve, 400));

    if (checkoutUrl) {
      window.open(checkout.toString(), "_blank", "noopener,noreferrer");
    }

    setIsSubmitting(false);
    onClose();
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  const inputBaseClass =
    "w-full bg-[#1a1a1a] border rounded-input px-4 py-3 text-base text-white placeholder:text-[#666666] transition-all duration-200 " +
    "focus:outline-none focus:ring-2 focus:ring-[#FF7E4A]/20 focus:border-[#FF7E4A] " +
    "disabled:opacity-50 disabled:cursor-not-allowed";

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-sm"
          onClick={handleBackdropClick}
          role="presentation"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 16 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            role="dialog"
            aria-modal="true"
            aria-labelledby="subscription-modal-title"
            className={cn(
              "relative w-full max-w-md rounded-card border border-white/[0.08] bg-[#111111] p-6 sm:p-8 shadow-card-hover",
              "outline-none"
            )}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 inline-flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-full text-[#888888] transition-colors hover:bg-white/[0.08] hover:text-white"
              aria-label="Fechar modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 pr-8">
              <h2
                id="subscription-modal-title"
                className="text-heading-subtitle text-white mb-1"
              >
                Finalizar assinatura
              </h2>
              <p className="text-body-base text-[#888888]">
                Preencha seus dados para continuar para o checkout do plano{" "}
                <span className="text-brand-primary font-semibold">
                  {planName}
                </span>
                .
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <label
                  htmlFor="fullName"
                  className="block text-body-label text-white"
                >
                  Nome Completo
                </label>
                <input
                  id="fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={handleChange("fullName")}
                  placeholder="Seu nome completo"
                  disabled={isSubmitting}
                  className={cn(inputBaseClass, errors.fullName && "border-feedback-error focus:border-feedback-error focus:ring-feedback-error/20")}
                  aria-invalid={errors.fullName ? "true" : "false"}
                  aria-describedby={errors.fullName ? "fullName-error" : undefined}
                />
                {errors.fullName && (
                  <p id="fullName-error" className="text-xs text-feedback-error">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="email"
                  className="block text-body-label text-white"
                >
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder="nome@empresa.com"
                  disabled={isSubmitting}
                  className={cn(inputBaseClass, errors.email && "border-feedback-error focus:border-feedback-error focus:ring-feedback-error/20")}
                  aria-invalid={errors.email ? "true" : "false"}
                  aria-describedby={errors.email ? "email-error" : undefined}
                />
                {errors.email && (
                  <p id="email-error" className="text-xs text-feedback-error">
                    {errors.email}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="phone"
                  className="block text-body-label text-white"
                >
                  Telefone
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder="+00 (00) 00000-0000"
                  disabled={isSubmitting}
                  className={cn(inputBaseClass, errors.phone && "border-feedback-error focus:border-feedback-error focus:ring-feedback-error/20")}
                  aria-invalid={errors.phone ? "true" : "false"}
                  aria-describedby={errors.phone ? "phone-error" : undefined}
                />
                {errors.phone && (
                  <p id="phone-error" className="text-xs text-feedback-error">
                    {errors.phone}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label
                  htmlFor="coupon"
                  className="block text-body-label text-white"
                >
                  Cupom de desconto
                </label>
                <input
                  id="coupon"
                  type="text"
                  value={formData.coupon}
                  onChange={handleChange("coupon")}
                  placeholder="Digite seu cupom (opcional)"
                  disabled={isSubmitting}
                  className={cn(inputBaseClass, errors.coupon && "border-feedback-error focus:border-feedback-error focus:ring-feedback-error/20")}
                  aria-invalid={errors.coupon ? "true" : "false"}
                  aria-describedby={errors.coupon ? "coupon-error" : undefined}
                />
                {errors.coupon && (
                  <p id="coupon-error" className="text-xs text-feedback-error">
                    {errors.coupon}
                  </p>
                )}
              </div>

              <div className="pt-2">
                <Button
                  id="btn-continuar-checkout"
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-[56px] font-bold text-base"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Processando...
                    </span>
                  ) : (
                    "Continuar para o checkout"
                  )}
                </Button>
              </div>

              <p className="text-center text-xs text-[#666666]">
                Ao continuar, você concorda com o processamento dos seus dados
                para a assinatura.
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
