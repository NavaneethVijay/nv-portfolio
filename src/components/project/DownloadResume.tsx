import { IconFileDownload } from "@tabler/icons-react";
import React from "react";

export default function DownloadResume({ location = "unknown" }: { location?: string }) {
  const handleClick = () => {
    if (typeof window.gtag === "function") {
      window.gtag("event", "resume_download", {
        event_category: "engagement",
        event_label: location,
      });
    }
  };

  return (
    <a
      aria-label="Download Resume"
      title="Download Resume"
      href="/Navaneeth_Vijay_Resume.pdf"
      download
      onClick={handleClick}
      className="inline-flex items-center gap-2 border border-ink px-4 py-2 mono-label text-[11px] font-bold uppercase text-ink hover:bg-ink hover:text-paper transition-colors"
    >
      <IconFileDownload className="h-4 w-4" />
      Download Resume
    </a>
  );
}
