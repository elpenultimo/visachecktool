import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Frequently asked questions about visas and travel authorizations | NecesitoVisa.com",
  description:
    "Clear answers about visas, eVisas, and electronic travel authorizations such as ESTA or eTA.",
};

const faqItems = [
  {
    question: "What is a visa?",
    answer:
      "A visa is an official permit issued by a country that allows a foreign person to enter, stay, or transit its territory for a limited time and specific purpose (tourism, work, study, transit, etc.). Requirements depend on nationality and destination.",
  },
  {
    question: "What does ‘no visa required’ mean?",
    answer:
      "It means you can enter the country without applying for a visa in advance, usually for tourism and for a limited time. Other requirements may still apply, such as a valid passport, onward ticket, insurance, or proof of funds.",
  },
  {
    question: "What is an eVisa?",
    answer:
      "An eVisa is a visa requested fully online without visiting an embassy. Once approved, it is usually linked electronically to your passport and checked on arrival.",
  },
  {
    question: "What is ESTA, eTA, or ETA?",
    answer:
      "Electronic authorizations such as ESTA, eTA, or ETA are not traditional visas. They allow travel for tourism or transit without a visa but must be requested online before travel and may have fees and limited validity.",
  },
  {
    question: "Who issues visas and travel authorizations?",
    answer:
      "Visas and authorizations are only issued by official authorities of the destination country, such as embassies, consulates, or immigration services. Airlines and private websites do not issue visas.",
  },
  {
    question: "Can visa requirements change?",
    answer:
      "Yes. Immigration requirements can change at any time. Always verify details directly on official sources before traveling.",
  },
];

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

export default function FaqPage() {
  return (
    <div className="container-box py-12 space-y-10">
      <section className="space-y-4">
        <p className="inline-flex rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-medium text-brand-primary">
          FAQ
        </p>
        <h1 className="text-3xl font-bold text-slate-900">Visa and travel authorization basics</h1>
        <p className="text-lg text-slate-600">
          Clear, neutral answers to understand common terms before planning your trip.
        </p>
      </section>

      <section className="card p-6 space-y-6">
        {faqItems.map((item) => (
          <div key={item.question} className="space-y-2">
            <h3 className="text-lg font-semibold text-slate-900">{item.question}</h3>
            <p className="text-sm text-slate-600">{item.answer}</p>
          </div>
        ))}
      </section>

      <section className="text-sm text-slate-500">
        This information is general and does not constitute legal or immigration advice. Always verify with official
        sources before traveling.
      </section>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </div>
  );
}
