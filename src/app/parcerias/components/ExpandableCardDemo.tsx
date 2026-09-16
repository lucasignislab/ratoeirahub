"use client";

import React, { useEffect, useId, useRef, useState, useMemo } from "react";
import { AnimatePresence, motion, LazyMotion, domMax } from "motion/react";
import { useOutsideClick } from "@/hooks/use-outside-click";
import { useLanguage } from "@/contexts/LanguageContext";

const imgReceita =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bg1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0a0f0a"/>
          <stop offset="100%" stop-color="#050805"/>
        </linearGradient>
        <radialGradient id="glow1" cx="70%" cy="30%" r="50%">
          <stop offset="0%" stop-color="#22c55e" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#22c55e" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="bar1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#4ade80"/>
          <stop offset="100%" stop-color="#16a34a"/>
        </linearGradient>
        <linearGradient id="coinGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fbbf24"/>
          <stop offset="100%" stop-color="#d97706"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg1)"/>
      <rect width="800" height="600" fill="url(#glow1)"/>
      
      <!-- Grid lines -->
      <g opacity="0.06" stroke="#22c55e" stroke-width="1">
        <line x1="0" y1="100" x2="800" y2="100"/>
        <line x1="0" y1="200" x2="800" y2="200"/>
        <line x1="0" y1="300" x2="800" y2="300"/>
        <line x1="0" y1="400" x2="800" y2="400"/>
        <line x1="0" y1="500" x2="800" y2="500"/>
        <line x1="100" y1="0" x2="100" y2="600"/>
        <line x1="200" y1="0" x2="200" y2="600"/>
        <line x1="300" y1="0" x2="300" y2="600"/>
        <line x1="400" y1="0" x2="400" y2="600"/>
        <line x1="500" y1="0" x2="500" y2="600"/>
        <line x1="600" y1="0" x2="600" y2="600"/>
        <line x1="700" y1="0" x2="700" y2="600"/>
      </g>
      
      <!-- Chart bars -->
      <rect x="120" y="320" width="60" height="180" rx="8" fill="url(#bar1)" opacity="0.3"/>
      <rect x="200" y="260" width="60" height="240" rx="8" fill="url(#bar1)" opacity="0.5"/>
      <rect x="280" y="200" width="60" height="300" rx="8" fill="url(#bar1)" opacity="0.7"/>
      <rect x="360" y="140" width="60" height="360" rx="8" fill="url(#bar1)" opacity="0.9"/>
      <rect x="440" y="100" width="60" height="400" rx="8" fill="url(#bar1)"/>
      
      <!-- Growth line -->
      <polyline points="150,400 230,320 310,260 390,200 470,140" fill="none" stroke="#4ade80" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="150" cy="400" r="8" fill="#4ade80"/>
      <circle cx="230" cy="320" r="8" fill="#4ade80"/>
      <circle cx="310" cy="260" r="8" fill="#4ade80"/>
      <circle cx="390" cy="200" r="8" fill="#4ade80"/>
      <circle cx="470" cy="140" r="10" fill="#4ade80" stroke="#0a0f0a" stroke-width="3"/>
      
      <!-- Arrow up -->
      <polygon points="520,120 560,60 600,120" fill="none" stroke="#4ade80" stroke-width="4" stroke-linejoin="round"/>
      <line x1="560" y1="120" x2="560" y2="200" stroke="#4ade80" stroke-width="4" stroke-linecap="round"/>
      
      <!-- Large coin stack -->
      <ellipse cx="620" cy="480" rx="70" ry="20" fill="#b45309"/>
      <ellipse cx="620" cy="460" rx="70" ry="20" fill="#d97706"/>
      <ellipse cx="620" cy="440" rx="70" ry="20" fill="#f59e0b"/>
      <ellipse cx="620" cy="420" rx="70" ry="20" fill="#fbbf24"/>
      <ellipse cx="620" cy="400" rx="70" ry="20" fill="#fcd34d"/>
      <ellipse cx="620" cy="380" rx="70" ry="20" fill="url(#coinGrad)"/>
      <text x="620" y="395" text-anchor="middle" fill="#78350f" font-size="28" font-weight="bold" font-family="system-ui">$</text>
      
      <!-- Percentage badge -->
      <rect x="520" y="260" width="160" height="70" rx="16" fill="#166534" stroke="#22c55e" stroke-width="2"/>
      <text x="600" y="300" text-anchor="middle" fill="#4ade80" font-size="32" font-weight="black" font-family="system-ui">10% → 30%</text>
      
      <!-- Recurring arrows -->
      <path d="M 680 400 A 50 50 0 1 1 680 500" fill="none" stroke="#22c55e" stroke-width="4" stroke-linecap="round" stroke-dasharray="8 6"/>
      <polygon points="680,500 670,485 690,485" fill="#22c55e"/>
      
      <!-- Small decorative coins -->
      <circle cx="100" cy="120" r="25" fill="url(#coinGrad)"/>
      <text x="100" y="128" text-anchor="middle" fill="#78350f" font-size="20" font-weight="bold">$</text>
      <circle cx="720" cy="180" r="18" fill="url(#coinGrad)"/>
      <text x="720" y="186" text-anchor="middle" fill="#78350f" font-size="14" font-weight="bold">$</text>
      
      <!-- Sparkles -->
      <polygon points="80,250 85,265 100,270 85,275 80,290 75,275 60,270 75,265" fill="#fbbf24" opacity="0.6"/>
      <polygon points="740,320 743,328 751,331 743,334 740,342 737,334 729,331 737,328" fill="#fbbf24" opacity="0.4"/>
    </svg>`
  );

const imgProduto =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0a0a12"/>
          <stop offset="100%" stop-color="#050508"/>
        </linearGradient>
        <radialGradient id="glow2" cx="30%" cy="70%" r="50%">
          <stop offset="0%" stop-color="#3b82f6" stop-opacity="0.25"/>
          <stop offset="100%" stop-color="#3b82f6" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1e3a5f"/>
          <stop offset="100%" stop-color="#0f172a"/>
        </linearGradient>
        <linearGradient id="shine" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stop-color="#60a5fa" stop-opacity="0"/>
          <stop offset="50%" stop-color="#60a5fa" stop-opacity="0.3"/>
          <stop offset="100%" stop-color="#60a5fa" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg2)"/>
      <rect width="800" height="600" fill="url(#glow2)"/>
      
      <!-- Grid -->
      <g opacity="0.05" stroke="#3b82f6" stroke-width="1">
        ${Array.from({length: 9}, (_, i) => `<line x1="${(i + 1) * 80}" y1="0" x2="${(i + 1) * 80}" y2="600"/>`).join('')}
        ${Array.from({length: 7}, (_, i) => `<line x1="0" y1="${(i + 1) * 75}" x2="800" y2="${(i + 1) * 75}"/>`).join('')}
      </g>
      
      <!-- Central product box -->
      <rect x="250" y="150" width="300" height="300" rx="24" fill="url(#boxGrad)" stroke="#3b82f6" stroke-width="2"/>
      <rect x="250" y="150" width="300" height="300" rx="24" fill="url(#shine)"/>
      
      <!-- Box inner details -->
      <rect x="280" y="190" width="240" height="160" rx="12" fill="#0f172a" stroke="#1e40af" stroke-width="1"/>
      
      <!-- Chart inside box -->
      <polyline points="300,310 340,280 380,290 420,240 460,250 500,200" fill="none" stroke="#60a5fa" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
      <circle cx="300" cy="310" r="5" fill="#60a5fa"/>
      <circle cx="340" cy="280" r="5" fill="#60a5fa"/>
      <circle cx="380" cy="290" r="5" fill="#60a5fa"/>
      <circle cx="420" cy="240" r="5" fill="#60a5fa"/>
      <circle cx="460" cy="250" r="5" fill="#60a5fa"/>
      <circle cx="500" cy="200" r="7" fill="#60a5fa" stroke="#0f172a" stroke-width="2"/>
      
      <!-- Badge on box -->
      <rect x="320" y="370" width="160" height="44" rx="22" fill="#1d4ed8"/>
      <text x="400" y="398" text-anchor="middle" fill="#bfdbfe" font-size="16" font-weight="bold" font-family="system-ui">AUTO-VENDA</text>
      
      <!-- Orbiting elements -->
      <circle cx="200" cy="200" r="35" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
      <text x="200" y="208" text-anchor="middle" fill="#93c5fd" font-size="18" font-weight="bold">ROI</text>
      
      <circle cx="600" cy="200" r="35" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
      <text x="600" y="208" text-anchor="middle" fill="#93c5fd" font-size="14" font-weight="bold">ADS</text>
      
      <circle cx="200" cy="400" r="35" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
      <text x="200" y="408" text-anchor="middle" fill="#93c5fd" font-size="14" font-weight="bold">TRACK</text>
      
      <circle cx="600" cy="400" r="35" fill="#1e3a5f" stroke="#3b82f6" stroke-width="2"/>
      <text x="600" y="408" text-anchor="middle" fill="#93c5fd" font-size="12" font-weight="bold">META</text>
      
      <!-- Connection lines -->
      <line x1="235" y1="200" x2="250" y2="200" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4 4"/>
      <line x1="550" y1="200" x2="565" y2="200" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4 4"/>
      <line x1="235" y1="400" x2="250" y2="400" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4 4"/>
      <line x1="550" y1="400" x2="565" y2="400" stroke="#3b82f6" stroke-width="2" stroke-dasharray="4 4"/>
      
      <!-- Rocket/product launch -->
      <polygon points="400,80 420,130 400,120 380,130" fill="#60a5fa"/>
      <rect x="392" y="120" width="16" height="40" rx="4" fill="#93c5fd"/>
      <ellipse cx="380" cy="150" rx="8" ry="18" fill="#3b82f6"/>
      <ellipse cx="420" cy="150" rx="8" ry="18" fill="#3b82f6"/>
      <polygon points="385,165 400,200 415,165" fill="#f97316" opacity="0.8"/>
      <polygon points="390,165 400,190 410,165" fill="#fbbf24" opacity="0.9"/>
      
      <!-- Stars/sparkles -->
      <polygon points="120,120 124,132 136,136 124,140 120,152 116,140 104,136 116,132" fill="#60a5fa" opacity="0.5"/>
      <polygon points="680,320 683,328 691,331 683,334 680,342 677,334 669,331 677,328" fill="#60a5fa" opacity="0.4"/>
      
      <!-- Top badge -->
      <rect x="340" y="40" width="120" height="36" rx="18" fill="#0f172a" stroke="#3b82f6" stroke-width="1.5"/>
      <text x="400" y="63" text-anchor="middle" fill="#60a5fa" font-size="13" font-weight="bold" font-family="system-ui">ALTA RETENÇÃO</text>
    </svg>`
  );

const imgSaques =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bg3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#0f0a14"/>
          <stop offset="100%" stop-color="#08050a"/>
        </linearGradient>
        <radialGradient id="glow3" cx="50%" cy="50%" r="60%">
          <stop offset="0%" stop-color="#a855f7" stop-opacity="0.22"/>
          <stop offset="100%" stop-color="#a855f7" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="walletGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#7c3aed"/>
          <stop offset="100%" stop-color="#4c1d95"/>
        </linearGradient>
        <linearGradient id="lightning" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fbbf24"/>
          <stop offset="100%" stop-color="#f59e0b"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg3)"/>
      <rect width="800" height="600" fill="url(#glow3)"/>
      
      <!-- Grid -->
      <g opacity="0.06" stroke="#a855f7" stroke-width="1">
        ${Array.from({length: 9}, (_, i) => `<line x1="${(i + 1) * 80}" y1="0" x2="${(i + 1) * 80}" y2="600"/>`).join('')}
        ${Array.from({length: 7}, (_, i) => `<line x1="0" y1="${(i + 1) * 75}" x2="800" y2="${(i + 1) * 75}"/>`).join('')}
      </g>
      
      <!-- Central wallet -->
      <rect x="260" y="200" width="280" height="200" rx="28" fill="url(#walletGrad)" stroke="#a855f7" stroke-width="3"/>
      <rect x="275" y="215" width="250" height="170" rx="20" fill="#2e1065" stroke="#5b21b6" stroke-width="1"/>
      
      <!-- Wallet fold -->
      <path d="M 260 280 Q 400 320 540 280" fill="none" stroke="#7c3aed" stroke-width="2" opacity="0.5"/>
      
      <!-- Wallet button -->
      <circle cx="500" cy="300" r="18" fill="#a855f7"/>
      <circle cx="500" cy="300" r="10" fill="#2e1065"/>
      
      <!-- Lightning bolt on wallet -->
      <polygon points="380,260 400,300 385,300 410,340 370,295 385,295 365,260" fill="url(#lightning)"/>
      
      <!-- ASAAS logo text -->
      <rect x="330" y="380" width="140" height="32" rx="8" fill="#2e1065" stroke="#5b21b6" stroke-width="1"/>
      <text x="400" y="401" text-anchor="middle" fill="#d8b4fe" font-size="14" font-weight="bold" font-family="system-ui">ASAAS</text>
      
      <!-- Money flying out -->
      <rect x="120" y="160" width="80" height="50" rx="8" fill="#065f46" stroke="#10b981" stroke-width="2" transform="rotate(-15 160 185)"/>
      <text x="160" y="192" text-anchor="middle" fill="#6ee7b7" font-size="18" font-weight="bold" transform="rotate(-15 160 192)">R$</text>
      
      <rect x="600" y="140" width="80" height="50" rx="8" fill="#065f46" stroke="#10b981" stroke-width="2" transform="rotate(12 640 165)"/>
      <text x="640" y="172" text-anchor="middle" fill="#6ee7b7" font-size="18" font-weight="bold" transform="rotate(12 640 172)">R$</text>
      
      <rect x="140" y="380" width="80" height="50" rx="8" fill="#065f46" stroke="#10b981" stroke-width="2" transform="rotate(-8 180 405)"/>
      <text x="180" y="412" text-anchor="middle" fill="#6ee7b7" font-size="18" font-weight="bold" transform="rotate(-8 180 412)">R$</text>
      
      <rect x="580" y="400" width="80" height="50" rx="8" fill="#065f46" stroke="#10b981" stroke-width="2" transform="rotate(18 620 425)"/>
      <text x="620" y="432" text-anchor="middle" fill="#6ee7b7" font-size="18" font-weight="bold" transform="rotate(18 620 432)">R$</text>
      
      <!-- Speed lines -->
      <line x1="220" y1="185" x2="250" y2="185" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <line x1="210" y1="195" x2="240" y2="195" stroke="#a855f7" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      
      <line x1="550" y1="165" x2="580" y2="165" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <line x1="540" y1="175" x2="570" y2="175" stroke="#a855f7" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      
      <line x1="230" y1="405" x2="250" y2="405" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <line x1="220" y1="415" x2="240" y2="415" stroke="#a855f7" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      
      <line x1="550" y1="425" x2="570" y2="425" stroke="#a855f7" stroke-width="3" stroke-linecap="round"/>
      <line x1="540" y1="435" x2="560" y2="435" stroke="#a855f7" stroke-width="2" stroke-linecap="round" opacity="0.6"/>
      
      <!-- Clock / timer icon -->
      <circle cx="400" cy="120" r="45" fill="#2e1065" stroke="#a855f7" stroke-width="3"/>
      <circle cx="400" cy="120" r="38" fill="none" stroke="#7c3aed" stroke-width="1"/>
      <line x1="400" y1="120" x2="400" y2="95" stroke="#fbbf24" stroke-width="4" stroke-linecap="round"/>
      <line x1="400" y1="120" x2="418" y2="132" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
      <circle cx="400" cy="120" r="5" fill="#fbbf24"/>
      
      <!-- Dashboard mini cards -->
      <rect x="80" y="480" width="140" height="70" rx="12" fill="#1e1b4b" stroke="#4c1d95" stroke-width="1"/>
      <text x="150" y="510" text-anchor="middle" fill="#c4b5fd" font-size="12" font-family="system-ui">SALDO</text>
      <text x="150" y="535" text-anchor="middle" fill="#a78bfa" font-size="22" font-weight="black" font-family="system-ui">R$ 0,00</text>
      
      <rect x="580" y="480" width="140" height="70" rx="12" fill="#1e1b4b" stroke="#4c1d95" stroke-width="1"/>
      <text x="650" y="510" text-anchor="middle" fill="#c4b5fd" font-size="12" font-family="system-ui">STATUS</text>
      <text x="650" y="535" text-anchor="middle" fill="#4ade80" font-size="18" font-weight="bold" font-family="system-ui">DISPONÍVEL</text>
      
      <!-- Sparkles -->
      <polygon points="100,300 104,312 116,316 104,320 100,332 96,320 84,316 96,312" fill="#a855f7" opacity="0.5"/>
      <polygon points="700,280 704,290 714,293 704,296 700,306 696,296 686,293 696,290" fill="#a855f7" opacity="0.4"/>
    </svg>`
  );

const imgPremios =
  "data:image/svg+xml," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 600" width="800" height="600">
      <defs>
        <linearGradient id="bg4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#140f0a"/>
          <stop offset="100%" stop-color="#0a0705"/>
        </linearGradient>
        <radialGradient id="glow4" cx="50%" cy="30%" r="55%">
          <stop offset="0%" stop-color="#eab308" stop-opacity="0.28"/>
          <stop offset="100%" stop-color="#eab308" stop-opacity="0"/>
        </radialGradient>
        <linearGradient id="gold1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="#fde047"/>
          <stop offset="50%" stop-color="#eab308"/>
          <stop offset="100%" stop-color="#a16207"/>
        </linearGradient>
        <linearGradient id="gold2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#fef08a"/>
          <stop offset="100%" stop-color="#ca8a04"/>
        </linearGradient>
      </defs>
      <rect width="800" height="600" fill="url(#bg4)"/>
      <rect width="800" height="600" fill="url(#glow4)"/>
      
      <!-- Grid -->
      <g opacity="0.06" stroke="#eab308" stroke-width="1">
        ${Array.from({length: 9}, (_, i) => `<line x1="${(i + 1) * 80}" y1="0" x2="${(i + 1) * 80}" y2="600"/>`).join('')}
        ${Array.from({length: 7}, (_, i) => `<line x1="0" y1="${(i + 1) * 75}" x2="800" y2="${(i + 1) * 75}"/>`).join('')}
      </g>
      
      <!-- Central trophy -->
      <!-- Trophy base -->
      <rect x="360" y="460" width="80" height="24" rx="4" fill="#713f12"/>
      <rect x="345" y="484" width="110" height="16" rx="4" fill="#854d0e"/>
      
      <!-- Trophy cup body -->
      <path d="M 340 240 Q 340 380 400 420 Q 460 380 460 240" fill="url(#gold1)" stroke="#a16207" stroke-width="2"/>
      <path d="M 340 240 Q 340 380 400 420 Q 460 380 460 240" fill="url(#gold2)" opacity="0.4"/>
      
      <!-- Trophy handles -->
      <path d="M 340 280 Q 300 280 300 320 Q 300 360 340 360" fill="none" stroke="url(#gold1)" stroke-width="12" stroke-linecap="round"/>
      <path d="M 460 280 Q 500 280 500 320 Q 500 360 460 360" fill="none" stroke="url(#gold1)" stroke-width="12" stroke-linecap="round"/>
      
      <!-- Trophy shine -->
      <ellipse cx="380" cy="300" rx="15" ry="40" fill="#fef08a" opacity="0.3" transform="rotate(-15 380 300)"/>
      
      <!-- Star on trophy -->
      <polygon points="400,200 410,225 436,225 416,242 424,268 400,254 376,268 384,242 364,225 390,225" fill="#fef08a" stroke="#ca8a04" stroke-width="2"/>
      
      <!-- Medal left -->
      <circle cx="180" cy="280" r="50" fill="#713f12" stroke="#a16207" stroke-width="3"/>
      <circle cx="180" cy="280" r="40" fill="url(#gold1)"/>
      <circle cx="180" cy="280" r="30" fill="none" stroke="#fef08a" stroke-width="2"/>
      <text x="180" y="288" text-anchor="middle" fill="#713f12" font-size="20" font-weight="black" font-family="system-ui">1º</text>
      <!-- Medal ribbon -->
      <polygon points="155,230 180,210 205,230 205,250 180,230 155,250" fill="#dc2626"/>
      
      <!-- Medal right -->
      <circle cx="620" cy="280" r="45" fill="#52525b" stroke="#71717a" stroke-width="3"/>
      <circle cx="620" cy="280" r="36" fill="#d4d4d8"/>
      <circle cx="620" cy="280" r="27" fill="none" stroke="#fbbf24" stroke-width="2"/>
      <text x="620" y="287" text-anchor="middle" fill="#52525b" font-size="18" font-weight="black" font-family="system-ui">TOP</text>
      <!-- Medal ribbon -->
      <polygon points="597,233 620,215 643,233 643,251 620,233 597,251" fill="#2563eb"/>
      
      <!-- Confetti -->
      <rect x="100" y="150" width="12" height="6" rx="2" fill="#f472b6" transform="rotate(25 100 150)"/>
      <rect x="700" y="180" width="10" height="5" rx="2" fill="#60a5fa" transform="rotate(-15 700 180)"/>
      <rect x="150" y="420" width="14" height="7" rx="2" fill="#4ade80" transform="rotate(40 150 420)"/>
      <rect x="680" y="400" width="11" height="5" rx="2" fill="#fbbf24" transform="rotate(-30 680 400)"/>
      <rect x="250" y="100" width="10" height="5" rx="2" fill="#a78bfa" transform="rotate(15 250 100)"/>
      <rect x="550" y="120" width="12" height="6" rx="2" fill="#f87171" transform="rotate(-45 550 120)"/>
      <circle cx="130" cy="200" r="6" fill="#fbbf24"/>
      <circle cx="670" cy="220" r="5" fill="#60a5fa"/>
      <circle cx="200" cy="480" r="7" fill="#f472b6"/>
      <circle cx="600" cy="460" r="6" fill="#4ade80"/>
      
      <!-- Progress bar -->
      <rect x="200" y="520" width="400" height="32" rx="16" fill="#292524" stroke="#44403c" stroke-width="2"/>
      <rect x="200" y="520" width="280" height="32" rx="16" fill="url(#gold1)"/>
      <text x="400" y="542" text-anchor="middle" fill="#fef08a" font-size="14" font-weight="bold" font-family="system-ui">META: 70% ATINGIDA</text>
      
      <!-- Crown top -->
      <polygon points="360,60 380,40 400,55 420,40 440,60 420,80 400,70 380,80" fill="url(#gold1)" stroke="#a16207" stroke-width="2"/>
      <circle cx="400" cy="55" r="8" fill="#ef4444"/>
      <circle cx="380" cy="48" r="5" fill="#3b82f6"/>
      <circle cx="420" cy="48" r="5" fill="#22c55e"/>
      
      <!-- Fireworks lines -->
      <line x1="80" y1="350" x2="110" y2="320" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
      <line x1="80" y1="350" x2="115" y2="355" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
      <line x1="80" y1="350" x2="100" y2="380" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
      
      <line x1="720" y1="330" x2="690" y2="300" stroke="#fbbf24" stroke-width="3" stroke-linecap="round"/>
      <line x1="720" y1="330" x2="685" y2="335" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
      <line x1="720" y1="330" x2="700" y2="360" stroke="#fbbf24" stroke-width="2" stroke-linecap="round"/>
    </svg>`
  );

const getCards = (t: (key: string) => string) => [
  {
    description: t("parcerias.benefits.desc1").substring(0, 40) + "...",
    title: t("parcerias.benefits.title"),
    src: imgReceita,
    content: () => {
      return (
        <p>
          {t("parcerias.benefits.desc1")}
          <br />
          <br />
          Não é comissão de uma vez só — é receita previsível que cresce enquanto seus indicados permanecem ativos. Quanto mais você indica, mais sua renda mensal aumenta.
        </p>
      );
    },
  },
  {
    description: t("parcerias.benefits.desc2").substring(0, 40) + "...",
    title: t("parcerias.benefits.title2"),
    src: imgProduto,
    content: () => {
      return (
        <p>
          {t("parcerias.benefits.desc2")}
          <br />
          <br />
          Anunciantes que usam a Ratoeira não voltam atrás. O produto entrega resultado real — trackeamento ~100%, bloqueio automático de fraude e dashboard consolidado. Sua indicação se converte em assinatura com facilidade.
        </p>
      );
    },
  },
  {
    description: t("parcerias.benefits.desc3").substring(0, 40) + "...",
    title: t("parcerias.benefits.title3"),
    src: imgSaques,
    content: () => {
      return (
        <p>
          {t("parcerias.benefits.desc3")}
          <br />
          <br />
          Você acompanha cada centavo em tempo real: comissões acumuladas, saques realizados e próximos pagamentos. Tudo transparente, sem surpresas.
        </p>
      );
    },
  },
  {
    description: t("parcerias.benefits.desc4").substring(0, 40) + "...",
    title: t("parcerias.benefits.title4"),
    src: imgPremios,
    content: () => {
      return (
        <p>
          {t("parcerias.benefits.desc4")}
          <br />
          <br />
          Além da comissão recorrente, você concorre a prêmios exclusivos conforme escala seu número de indicados. Quanto mais clientes ativos, maiores as recompensas.
        </p>
      );
    },
  },
];

export function ExpandableCardDemo() {
  const { t } = useLanguage();
  const cards = useMemo(() => getCards(t), [t]);
  
  const [active, setActive] = useState<(typeof cards)[number] | boolean | null>(
    null
  );
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    // Este bloco usa layoutId/layout animations — precisa do pacote domMax.
    <LazyMotion features={domMax}>
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 h-full w-full z-10 backdrop-blur-sm"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0 grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.05 } }}
              className="flex absolute top-4 right-4 items-center justify-center bg-white/10 hover:bg-white/20 rounded-full h-8 w-8 transition-colors"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[520px] h-full md:h-fit md:max-h-[90%] flex flex-col bg-[#111111] border border-white/10 sm:rounded-3xl overflow-hidden shadow-2xl"
            >
              <motion.div layoutId={`image-${active.title}-${id}`}>
                <img loading="lazy" decoding="async"
                  width={520}
                  height={340}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-56 sm:h-72 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div>

              <div>
                <div className="flex justify-between items-start p-6">
                  <div className="flex-1 pr-4">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold text-white text-lg"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-gray-400 text-sm mt-1"
                    >
                      {active.description}
                    </motion.p>
                  </div>
                </div>
                <div className="pt-2 relative px-6 pb-6">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-gray-400 text-sm leading-relaxed h-40 md:h-fit pb-4 flex flex-col items-start gap-4 overflow-auto [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-5xl mx-auto w-full grid grid-cols-1 md:grid-cols-2 items-start gap-6">
        {cards.map((card) => {
          return (
            <motion.div
              layoutId={`card-${card.title}-${id}`}
              key={card.title}
              onClick={() => setActive(card)}
              className="p-0 flex flex-col bg-[#111111] border border-white/5 hover:border-white/15 hover:bg-[#161616] rounded-2xl cursor-pointer transition-colors overflow-hidden"
            >
              <div className="flex gap-0 flex-col w-full">
                <motion.div layoutId={`image-${card.title}-${id}`}>
                  <div className="relative h-56 sm:h-64 w-full overflow-hidden">
                    <img loading="lazy" decoding="async"
                      width={520}
                      height={340}
                      src={card.src}
                      alt={card.title}
                      className="h-full w-full object-cover object-top"
                    />
                  </div>
                </motion.div>
                <div className="flex justify-center items-center flex-col p-5">
                  <motion.h3
                    layoutId={`title-${card.title}-${id}`}
                    className="font-bold text-white text-center md:text-left text-base"
                  >
                    {card.title}
                  </motion.h3>
                  <motion.p
                    layoutId={`description-${card.description}-${id}`}
                    className="text-gray-400 text-center md:text-left text-sm mt-1"
                  >
                    {card.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </ul>
    </>
    </LazyMotion>
  );
}

const CloseIcon = () => {
  return (
    <motion.svg
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.05 } }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-white"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};
