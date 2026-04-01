import type { Metadata } from "next";
import { ContactClient } from "@/components/pages/ContactClient";

export const metadata: Metadata = {
  title: "Contact Us – Conalytic",
  description:
    "Have questions, feedback, or just want to say hi? Let's connect! Reach out to Conalytic via email, phone, or our contact form.",
};

export default function ContactPage() {
  return <ContactClient />;
}
