import type { NextApiRequest, NextApiResponse } from "next";
import { Resend } from "resend";

const OWNER_EMAIL = "sainavaneeth@gmail.com";
// Requires this sender domain to be verified in the Resend dashboard —
// otherwise Resend can only deliver to the account's own verified address,
// not to the visitor's arbitrary email below.
const FROM_ADDRESS = "Navaneeth Vijay <hello@navaneethvijay.in>";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { email } = (req.body ?? {}) as { email?: unknown };

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return res.status(400).json({ error: "A valid email is required" });
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is not set");
    return res.status(500).json({ error: "Email is not configured" });
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { error } = await resend.emails.send({
      from: FROM_ADDRESS,
      to: email,
      bcc: OWNER_EMAIL,
      subject: "Thanks for reaching out!",
      text: `Hey!\n\nThanks for dropping your email on my portfolio. I'll get back to you soon.\n\nNavaneeth`,
      html: `<p>Hey!</p><p>Thanks for dropping your email on my portfolio. I'll get back to you soon.</p><p>Navaneeth</p>`,
    });

    if (error) {
      console.error("Resend error", error);
      return res.status(502).json({ error: "Could not send email" });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("Failed to send contact email", err);
    return res.status(500).json({ error: "Something went wrong. Please try again." });
  }
}
