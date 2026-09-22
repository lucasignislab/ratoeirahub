"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { WHATSAPP_SUPPORT_URL } from "@/components/WhatsAppButton";

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
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
}

const MIN_PHONE_DIGITS = 7;
const MAX_PHONE_DIGITS = 15;

function formatPhone(value: string): string {
  const digits = stripPhone(value);
  const hasInternationalPrefix = value.trim().startsWith("+");

  return `${hasInternationalPrefix ? "+" : ""}${digits.slice(0, MAX_PHONE_DIGITS)}`;
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
  const { t } = useLanguage();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const resetForm = useCallback(() => {
    setFormData({ fullName: "", email: "", phone: "" });
    setErrors({});
    setIsSubmitting(false);
  }, []);

  const closeModal = useCallback(() => {
    resetForm();
    onClose();
  }, [onClose, resetForm]);

  useEffect(() => {
    if (!isOpen) return;

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        closeModal();
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [closeModal, isOpen]);

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
      newErrors.fullName = t("planos.modal.fullNameRequired");
    } else if (formData.fullName.trim().length < 3) {
      newErrors.fullName = t("planos.modal.fullNameInvalid");
    }

    if (!formData.email.trim()) {
      newErrors.email = t("planos.modal.emailRequired");
    } else if (!validateEmail(formData.email.trim())) {
      newErrors.email = t("planos.modal.emailInvalid");
    }

    const phoneDigits = stripPhone(formData.phone);
    if (!formData.phone.trim()) {
      newErrors.phone = t("planos.modal.phoneRequired");
    } else if (
      phoneDigits.length < MIN_PHONE_DIGITS ||
      phoneDigits.length > MAX_PHONE_DIGITS
    ) {
      newErrors.phone = t("planos.modal.phoneInvalid");
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

    const phoneDigits = stripPhone(formData.phone);
    const destination = new URL(checkoutUrl || WHATSAPP_SUPPORT_URL, window.location.href);
    if (checkoutUrl) {
      destination.searchParams.set("name", formData.fullName.trim());
      destination.searchParams.set("email", formData.email.trim());
      destination.searchParams.set("phone", phoneDigits);
      destination.searchParams.set("phone_full", phoneDigits);
    }

    await new Promise((resolve) => setTimeout(resolve, 400));
    window.location.assign(destination.toString());
  }

  function handleBackdropClick(event: React.MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) {
      closeModal();
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
              "relative max-h-[calc(100dvh-2rem)] w-full max-w-md overflow-y-auto rounded-card border border-white/[0.08] bg-[#111111] p-6 shadow-card-hover sm:p-8",
              "outline-none"
            )}
          >
            <button
              type="button"
              onClick={closeModal}
              className="absolute right-4 top-4 inline-flex h-11 w-11 md:h-8 md:w-8 items-center justify-center rounded-full text-[#888888] transition-colors hover:bg-white/[0.08] hover:text-white"
              aria-label={t("planos.modal.close")}
            >
              <X className="h-5 w-5" />
            </button>

            <div className="mb-6 pr-8">
              <h2
                id="subscription-modal-title"
                className="text-heading-subtitle text-white mb-1"
              >
                {t("planos.modal.title")}
              </h2>
              <p className="text-body-base text-[#888888]">
                {t("planos.modal.subtitle")}{" "}
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
                  {t("planos.modal.fullName")}
                </label>
                <input
                  id="fullName"
                  type="text"
                  autoComplete="name"
                  autoFocus
                  maxLength={120}
                  value={formData.fullName}
                  onChange={handleChange("fullName")}
                  placeholder={t("planos.modal.fullNamePlaceholder")}
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
                  {t("planos.modal.email")}
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  maxLength={254}
                  value={formData.email}
                  onChange={handleChange("email")}
                  placeholder={t("planos.modal.emailPlaceholder")}
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
                  {t("planos.modal.phone")}
                </label>
                <input
                  id="phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  maxLength={MAX_PHONE_DIGITS + 1}
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  placeholder={t("planos.modal.phonePlaceholder")}
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

              <div className="pt-2">
                <Button
                  type="submit"
                  variant="default"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-[56px] font-bold text-base"
                >
                  {isSubmitting ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {t("planos.modal.submitting")}
                    </span>
                  ) : (
                    t("planos.modal.submit")
                  )}
                </Button>
              </div>

              <p className="text-center text-xs text-[#666666]">
                {t("form.messagePlaceholder")}
              </p>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
