"use client";

import Image from "next/image";

const platforms = [
  { name: "Google Ads", logo: "/icons/pricing/google-ads.webp" },
  { name: "Meta Ads", logo: "/icons/pricing/meta-ads.png" },
  { name: "Taboola", logo: "/taboolalogo.png" },
  { name: "NewsBreak", logo: "/newbreaklogo.webp" },
  { name: "TikTok Ads", logo: "/logos/tiktoklogo - Editado.png" },
  { name: "MGID", logo: "/logos/mgid.svg" },
  { name: "RevContent", logo: "/logos/revcontent-mark.avif" },
];

export default function LogoMarquee() {
  return (
    <section className="relative py-8 md:py-10 overflow-hidden">
      <div className="logo-marquee-track flex">
        {[0, 1, 2, 3].map((group) => (
          <div key={group} className="flex shrink-0">
            {platforms.map((platform) => (
              <div
                key={`${platform.name}-${group}`}
                className="flex flex-col items-center justify-center gap-2 w-[120px] md:w-[160px] mr-12 md:mr-20"
              >
                <Image
                  src={platform.logo}
                  alt={platform.name}
                  width={120}
                  height={32}
                  className="h-6 md:h-8 w-auto object-contain"
                />
                <span className="text-xs md:text-sm font-semibold text-gray-400 tracking-wide">
                  {platform.name}
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes logo-marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-25%);
          }
        }
        .logo-marquee-track {
          animation: logo-marquee 25s linear infinite;
          width: max-content;
        }
      `}</style>
    </section>
  );
}
