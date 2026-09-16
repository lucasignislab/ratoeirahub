"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import { Transition } from "@headlessui/react";
import { motion, useInView } from "motion/react";
import { MessageSquare, BarChart3 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

export default function Testimonials() {
  const { t } = useLanguage();

  const testimonials = useMemo(() => [
    {
      img: "/depoimentos/francisco-avatar.png",
      quote:
        t("testimonials.card1.quote"),
      name: t("testimonials.card1.name"),
      role: t("testimonials.card1.role"),
    },
    {
      img: "/depoimentos/lucassilva-avatar.png",
      quote:
        t("testimonials.card2.quote"),
      name: t("testimonials.card2.name"),
      role: t("testimonials.card2.role"),
    },
    {
      img: "/depoimentos/rafinha-avatar.png",
      quote:
        t("testimonials.card3.quote"),
      name: t("testimonials.card3.name"),
      role: t("testimonials.card3.role"),
    },
    {
      img: "/depoimentos/manuela-avatar.png",
      quote:
        t("testimonials.card4.quote"),
      name: t("testimonials.card4.name"),
      role: t("testimonials.card4.role"),
    },
    {
      img: "/depoimentos/renata-avatar.png",
      quote:
        t("testimonials.card5.quote"),
      name: t("testimonials.card5.name"),
      role: t("testimonials.card5.role"),
    },
  ], [t]);
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(0);
  const [autorotate, setAutorotate] = useState<boolean>(true);
  const autorotateTiming = 7000;

  useEffect(() => {
    if (!autorotate) return;
    const interval = setInterval(() => {
      setActive((current) => (current + 1 === testimonials.length ? 0 : current + 1));
    }, autorotateTiming);
    return () => clearInterval(interval);
  }, [autorotate]);

  const heightFix = () => {
    if (testimonialsRef.current?.parentElement) {
      testimonialsRef.current.parentElement.style.height = `${testimonialsRef.current.clientHeight}px`;
    }
  };

  useEffect(() => {
    heightFix();
    const timeout = setTimeout(heightFix, 100);
    return () => clearTimeout(timeout);
  }, [t, testimonials]);

  useEffect(() => {
    const onResize = () => heightFix();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return (
    <section ref={sectionRef} className="py-16 md:py-28 bg-[#050505]" id="cases">
      <div className="max-w-7xl 2xl:max-w-[90rem] 4xl:max-w-[110rem] 5xl:max-w-[120rem] 6xl:max-w-[132rem] mx-auto px-4 sm:px-6 lg:px-12 2xl:px-16 4xl:px-24 5xl:px-32 6xl:px-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16 space-y-4"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-badge bg-orange-50 border border-orange-200 text-orange-600 text-sm font-semibold">
            <MessageSquare className="w-4 h-4" /> {t("testimonials.badge")}
          </div>
          <h2 className="text-h1 font-black text-white leading-tight max-w-4xl mx-auto hyphens-none">
            <span className="block" dangerouslySetInnerHTML={{ __html: t("testimonials.title") }} />
          </h2>
          <p className="text-gray-400/70 text-base sm:text-xl 3xl:text-[1.75rem] max-w-xl 2xl:max-w-[34rem] 3xl:max-w-[48rem] 4xl:max-w-[56rem] 5xl:max-w-[64rem] 6xl:max-w-[72rem] mx-auto ">
            <span dangerouslySetInnerHTML={{ __html: t("testimonials.subtitle") }} />
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="mx-auto w-full max-w-3xl 3xl:max-w-[60rem] 4xl:max-w-[72rem] 5xl:max-w-[84rem] 6xl:max-w-[96rem] text-center relative z-10"
        >
          <div className="relative h-32">
            <div className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[480px] 5xl:h-[540px] 5xl:w-[540px] 6xl:h-[680px] 6xl:w-[680px] -translate-x-1/2 before:absolute before:inset-0 before:-z-10 before:rounded-full before:bg-gradient-to-b before:from-orange-600/25 before:via-orange-600/5 before:via-25% before:to-orange-600/0 before:to-75%">
              <div className="h-32 [mask-image:_linear-gradient(0deg,transparent,theme(colors.white)_20%,theme(colors.white))]">
                {testimonials.map((testimonial, index) => (
                  <Transition
                    as="div"
                    key={index}
                    show={active === index}
                    className="absolute inset-0 -z-10 h-full"
                    enter="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700 order-first"
                    enterFrom="opacity-0 -rotate-[60deg]"
                    enterTo="opacity-100 rotate-0"
                    leave="transition ease-[cubic-bezier(0.68,-0.3,0.32,1)] duration-700"
                    leaveFrom="opacity-100 rotate-0"
                    leaveTo="opacity-0 rotate-[60deg]"
                    beforeEnter={heightFix}
                  >
                    <Image
                      className="relative left-1/2 top-11 -translate-x-1/2 rounded-full border-2 border-orange-200"
                      src={testimonial.img}
                      width={56}
                      height={56}
                      alt={testimonial.name}
                    />
                  </Transition>
                ))}
              </div>
            </div>
          </div>

          <div className="mb-9 transition-all delay-300 duration-150 ease-in-out">
            <div className="relative flex flex-col min-h-[200px]" ref={testimonialsRef}>
              {testimonials.map((testimonial, index) => (
                <Transition
                  key={index}
                  show={active === index}
                  enter="transition ease-in-out duration-500 delay-200 order-first"
                  enterFrom="opacity-0 -translate-x-4"
                  enterTo="opacity-100 translate-x-0"
                  leave="transition ease-out duration-300 delay-300 absolute inset-0"
                  leaveFrom="opacity-100 translate-x-0"
                  leaveTo="opacity-0 translate-x-4"
                  beforeEnter={heightFix}
                >
                  <div className="text-xl sm:text-2xl 3xl:text-[2rem] 5xl:text-[2.5rem] 6xl:text-[2.75rem] font-bold text-orange-600 whitespace-pre-line before:content-['\201C'] after:content-['\201D']">
                    {testimonial.quote}
                  </div>
                </Transition>
              ))}
            </div>
          </div>

          <div className="-m-1.5 flex flex-wrap justify-center">
            {testimonials.map((testimonial, index) => (
              <button
                key={index}
                className={`m-1.5 inline-flex justify-center items-center min-h-11 whitespace-normal sm:whitespace-nowrap rounded-badge px-3 py-1.5 text-xs 3xl:text-sm shadow-sm transition-colors duration-150 focus-visible:outline-none focus-visible:ring focus-visible:ring-orange-300 ${
                  active === index
                    ? "bg-orange-600 text-white shadow-orange-950/10"
                    : "bg-white text-orange-600 hover:bg-orange-100"
                }`}
                onClick={() => {
                  setActive(index);
                  setAutorotate(false);
                }}
              >
                <span>{testimonial.name}</span>{" "}
                <span className={active === index ? "text-orange-200" : "text-orange-300"}>-</span>{" "}
                <span>{testimonial.role}</span>
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
