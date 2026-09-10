import type { Metadata } from "next";
import { ContactSection } from "@/components/home/ContactSection";

export const metadata: Metadata = {
  title: "Contact — Asish Oliver M",
  description: "Get in touch.",
};

export default function ContactPage() {
  return <ContactSection />;
}
