import { IconFileDownload } from "@tabler/icons-react";
import React from "react";

export default function DownloadResume() {
  return (
    <a
      aria-label="Download Resume"
      title="Download Resume"
      href="/Navaneeth_Vijay_Resume.pdf"
      download
      className="nv-btn-gradient inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-display font-semibold text-[#fff8ef]"
    >
      <IconFileDownload className="h-4 w-4" />
      Download Resume
    </a>
  );
}
