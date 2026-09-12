import ContactHeader from "../../components/user/ContactHeader";
import ContactInfo from "../../components/user/ContactInfo";
import ContactForm from "../../components/user/ContactForm";
import ContactMap from "../../components/user/ContactMap";

function Contact() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      {/* HEADER */}
      <ContactHeader />

      {/* CONTACT */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid items-stretch gap-8 lg:grid-cols-[0.9fr_1.1fr]">
            <ContactInfo />

            <ContactForm />
          </div>
        </div>
      </section>

      {/* MAP */}
      <ContactMap />
    </div>
  );
}

export default Contact;
