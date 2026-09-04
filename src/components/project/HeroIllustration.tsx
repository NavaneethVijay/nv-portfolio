import React from "react";

// A generic, abstract sketch — not a likeness — standing in until a real
// illustration/photo of Navaneeth is available.
export default function HeroIllustration() {
  return (
    <div className="hidden md:flex relative w-[280px] h-[320px] flex-shrink-0 items-center justify-center rounded-3xl nv-glass p-6">
      <svg viewBox="0 0 260 300" className="w-[85%] h-[85%]" fill="none">
        {/* floating doodle accents */}
        <path
          d="M225 42 L229 52 L239 55 L229 58 L225 68 L221 58 L211 55 L221 52 Z"
          fill="var(--brand)"
          opacity="0.8"
        />
        <g stroke="var(--ink-mute)" strokeWidth="2.2" strokeLinecap="round" opacity="0.7">
          <path d="M33 72 L33 40" />
          <path d="M33 40 C40 38 45 42 43 47" />
          <ellipse cx="26" cy="74" rx="7" ry="5" transform="rotate(-15 26 74)" />
        </g>

        {/* head + hair */}
        <path
          d="M96 70 C96 49 111 33 130 33 C149 33 164 49 164 70 C164 91 149 107 130 107 C111 107 96 91 96 70 Z"
          stroke="var(--brand)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M98 58 C104 32 121 21 146 25 C160 27 165 36 161 46"
          stroke="var(--brand)"
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
        />

        {/* glasses */}
        <g stroke="var(--ink-mute)" strokeWidth="2.4" strokeLinecap="round">
          <circle cx="117" cy="74" r="10" />
          <circle cx="144" cy="74" r="10" />
          <path d="M127 74 L134 74" />
        </g>

        {/* torso */}
        <path
          d="M92 214 C92 162 106 122 130 122 C154 122 168 162 168 214 Z"
          stroke="var(--brand)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* desk */}
        <path
          d="M36 214 L224 214 M36 214 L36 224 M224 214 L224 224 M36 224 L224 224"
          stroke="var(--ink-mute)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* laptop */}
        <path
          d="M96 214 L164 214 L171 204 L89 204 Z"
          stroke="var(--ink-mute)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M93 204 L167 204 L161 159 L99 159 Z"
          stroke="var(--ink-mute)"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M109 172 L148 172" stroke="var(--ink-mute)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
        <path d="M109 180 L138 180" stroke="var(--brand)" strokeWidth="2" strokeLinecap="round" />
        <path d="M109 188 L144 188" stroke="var(--ink-mute)" strokeWidth="2" strokeLinecap="round" opacity="0.6" />

        {/* coffee cup */}
        <g stroke="var(--ink-mute)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M188 196 L188 209 C188 214 192 217 197 217 C202 217 206 214 206 209 L206 196 Z" />
          <path d="M206 199 C212 199 212 207 206 207" />
          <path d="M192 190 C194 187 190 185 192 182" opacity="0.7" />
          <path d="M200 190 C202 187 198 185 200 182" opacity="0.7" />
        </g>
      </svg>

      <span className="absolute bottom-3 right-4 font-hand text-sm text-ink-mute -rotate-2">
        just a sketch, for now
      </span>
    </div>
  );
}
