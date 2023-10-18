import { ContactForm } from "./contact-form";

export function Contact() {
  return (
    <>
      <h2 id="contact" className="text-3xl font-bold text-center sm:text-start mt-8 mb-6">
        Contato
      </h2>

      <ContactForm />
    </>
  )
}