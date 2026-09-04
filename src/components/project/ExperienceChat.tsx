import React, { ReactNode } from "react";
import { IconLock, IconSend2 } from "@tabler/icons-react";

export interface ChatExperience {
  year: string;
  prompt: string;
  title: string;
  company: string;
  description: ReactNode;
  stack: string[];
  current?: boolean;
}

const Chip = ({ label }: { label: string }) => (
  <span className="leading-5 border border-chip-border text-chip-text bg-chip rounded-md text-xs sm:text-sm mr-2 mb-2 px-2 py-0.5 inline-block">
    {label}
  </span>
);

const Avatar = () => (
  <div className="h-8 w-8 rounded-full nv-btn-gradient flex items-center justify-center text-[11px] font-display font-bold text-[#fff8ef] shrink-0 mt-0.5">
    NV
  </div>
);

// The real answer is always rendered — crawlers and no-JS visitors see it
// immediately. The "thinking" bubble is a purely decorative CSS overlay that
// fades out on top of it for JS/motion-enabled visitors.
function ChatTurn({ item, index }: { item: ChatExperience; index: number }) {
  const delayMs = 250 + index * 550;

  return (
    <div className="flex flex-col gap-3 font-body">
      <div className="flex justify-end">
        <div className="max-w-[85%] sm:max-w-[70%] rounded-2xl rounded-br-sm bg-card border border-border px-4 py-2.5 text-sm text-ink-soft">
          {item.prompt}
        </div>
      </div>

      <div className="relative">
        <div
          className="nv-chat-answer flex gap-3 items-start"
          style={{ animationDelay: `${delayMs}ms` }}
        >
          <Avatar />
          <div className="flex-1 max-w-[88%] sm:max-w-[78%] rounded-2xl rounded-bl-sm border border-border bg-paper px-5 py-4">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <h3 className="font-display font-bold text-ink text-lg">{item.title}</h3>
              <span className="flex items-center gap-1.5 text-xs text-ink-mute font-medium">
                {item.current && (
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-brand opacity-75 animate-ping" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-brand" />
                  </span>
                )}
                {item.year}
              </span>
            </div>
            <p className="text-xs text-brand-text font-semibold mb-2">{item.company}</p>
            <div className="text-sm leading-relaxed text-ink-soft">{item.description}</div>
            <div className="mt-4">
              {item.stack.map((s) => (
                <Chip key={s} label={s} />
              ))}
            </div>
          </div>
        </div>

        <div
          aria-hidden="true"
          className="nv-chat-thinking absolute inset-0 flex gap-3 items-start pointer-events-none"
          style={{ animationDelay: `${delayMs}ms` }}
        >
          <Avatar />
          <div className="rounded-2xl rounded-bl-sm border border-border bg-paper px-4 py-3.5 flex items-center gap-1.5">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="h-1.5 w-1.5 rounded-full bg-ink-mute animate-bounce"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ExperienceChat({ items }: { items: ChatExperience[] }) {
  return (
    <div className="rounded-2xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-border bg-paper-alt">
        <span className="h-2.5 w-2.5 rounded-full bg-ink-mute/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-mute/30" />
        <span className="h-2.5 w-2.5 rounded-full bg-ink-mute/30" />
        <span className="ml-2 font-display text-xs font-semibold text-ink-mute tracking-wide">
          career.chat
        </span>
        <span className="ml-auto flex items-center gap-1 text-[11px] text-ink-mute">
          <IconLock className="h-3 w-3" />
          read-only transcript
        </span>
      </div>

      <div className="nv-chat-bg p-5 sm:p-8 flex flex-col gap-7">
        {items.map((item, index) => (
          <ChatTurn key={index} item={item} index={index} />
        ))}
      </div>

      <div className="flex items-center gap-3 px-4 py-3 border-t border-border bg-paper-alt">
        <input
          type="text"
          readOnly
          disabled
          value=""
          placeholder="This is a read-only transcript"
          aria-label="Read-only transcript input"
          className="flex-1 bg-card border border-border rounded-full px-4 py-2 text-sm text-ink-mute placeholder:text-ink-mute/70 cursor-not-allowed outline-none"
        />
        <button
          type="button"
          disabled
          aria-label="Sending is disabled because this is a static transcript"
          className="h-9 w-9 rounded-full bg-chip border border-chip-border flex items-center justify-center text-ink-mute cursor-not-allowed shrink-0"
        >
          <IconSend2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
