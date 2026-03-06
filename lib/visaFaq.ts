import { RequirementType } from "@/lib/visaRequirement";

type VisaFaqItem = {
  question: string;
  answer: string;
};

type VisaFaqType = RequirementType;

const normalizeFaqType = (requirementType: string): VisaFaqType => {
  const normalized = requirementType.trim().toLowerCase();

  if (normalized.includes("evisa") || normalized.includes("e-visa")) {
    return "E_VISA";
  }

  if (normalized.includes("esta")) {
    return "ESTA";
  }

  if (normalized === "eta" || normalized.includes("eta")) {
    return "ETA";
  }

  if (normalized.includes("visa_free") || normalized.includes("visa-free") || normalized.includes("visa free")) {
    return "NO_VISA";
  }

  if (normalized.includes("visa_required") || normalized.includes("visa required") || normalized === "required") {
    return "REQUIRES_VISA";
  }

  if (normalized.includes("voa") || normalized.includes("visa on arrival") || normalized.includes("on arrival")) {
    return "VOA";
  }

  return normalized.toUpperCase() as VisaFaqType;
};

const baseQuestions = (destination: string): VisaFaqItem[] => [
  {
    question: "What is a visa?",
    answer:
      "It is an authorization issued by the destination country to allow entry for a specific period and purpose, such as tourism.",
  },
  {
    question: "Does a visa guarantee entry?",
    answer:
      "No. Final admission is decided by border/immigration authorities on arrival, who may request additional documents.",
  },
  {
    question: "How early should I start the process?",
    answer:
      "It depends on the permit type, but it is best to start several weeks in advance to avoid delays.",
  },
  {
    question: `What documents are usually required to travel to ${destination}?`,
    answer:
      "A valid passport is usually required, and sometimes proof of funds, accommodation, or onward travel.",
  },
];

const faqByType: Record<VisaFaqType, (destination: string) => VisaFaqItem[]> = {
  NO_VISA: (destination) => [
    {
      question: "What does visa-free entry mean?",
      answer: "It means that for short tourism trips, you do not need a visa in advance.",
    },
    {
      question: "Can I stay indefinitely?",
      answer: "No. Even when a visa is not required, there is usually a maximum number of days allowed for tourism.",
    },
    {
      question: "Can authorities ask for documents on arrival?",
      answer: "Yes. They may request onward tickets, bookings, or proof of funds.",
    },
    ...baseQuestions(destination),
  ],
  NO_VISA_DAYS: (destination) => [
    {
      question: "What does visa-free for limited days mean?",
      answer: "You can travel for tourism without a visa, but only up to a maximum number of days.",
    },
    {
      question: "What if I need to stay longer?",
      answer: "You should apply for a different visa/permit before travel, according to local rules.",
    },
    {
      question: "Can authorities ask for documents on arrival?",
      answer: "Yes. Even without a visa, onward tickets, reservations, or funds may be required.",
    },
    ...baseQuestions(destination),
  ],
  E_VISA: (destination) => [
    {
      question: "What is an eVisa?",
      answer:
        "It is an electronic authorization requested online before travel and linked to your passport.",
    },
    {
      question: "How do I apply for an eVisa?",
      answer:
        "Typically you complete an online form, upload documents, and pay a fee.",
    },
    {
      question: "How long does approval take?",
      answer: "It can take from hours to several days depending on the country and season.",
    },
    {
      question: `Do I need to print the eVisa when traveling to ${destination}?`,
      answer:
        "In many cases the electronic record is enough, but carrying a digital or printed copy is useful.",
    },
    ...baseQuestions(destination),
  ],
  ESTA: (destination) => [
    {
      question: "What is ESTA?",
      answer:
        "It is an electronic pre-travel authorization for short tourism or transit trips without a traditional visa.",
    },
    {
      question: "Is ESTA a visa?",
      answer: "No. It is a travel authorization completed online before flying.",
    },
    {
      question: "How far in advance should I apply?",
      answer: "It is recommended to apply days or weeks in advance to avoid delays.",
    },
    {
      question: `Does ESTA cover any travel purpose to ${destination}?`,
      answer: "No. It usually applies to tourism or transit; work or study require a different process.",
    },
    ...baseQuestions(destination),
  ],
  ETA: (destination) => [
    {
      question: "What is an ETA?",
      answer:
        "It is a pre-travel electronic authorization requested online before tourism or transit travel.",
    },
    {
      question: "Does ETA replace a traditional visa?",
      answer: "For short trips yes, but it does not cover work or study.",
    },
    {
      question: "When should I apply for ETA?",
      answer: "It is best to apply in advance since approval can take time.",
    },
    {
      question: `Should I carry proof of ETA when traveling to ${destination}?`,
      answer: "It is useful to keep proof handy, although it is often linked to your passport.",
    },
    ...baseQuestions(destination),
  ],
  VOA: (destination) => [
    {
      question: "What is visa on arrival?",
      answer: "It is a permit processed when you land or cross the border.",
    },
    {
      question: "What is needed to obtain it?",
      answer: "It usually requires a valid passport, a form, and fee payment.",
    },
    {
      question: "Can I travel without preparation?",
      answer: "Even with visa on arrival, it is advisable to carry supporting documents and proof of funds.",
    },
    ...baseQuestions(destination),
  ],
  REQUIRES_VISA: (destination) => [
    {
      question: "What is a traditional consular visa?",
      answer:
        "It is a permit requested before travel at a consulate or embassy with defined requirements and timelines.",
    },
    {
      question: "Who issues the visa?",
      answer: "It is issued by the destination country’s immigration authority through its consulate or official system.",
    },
    {
      question: "How far in advance should I apply?",
      answer: "It is recommended to start the process several weeks in advance.",
    },
    {
      question: `Can I transit in ${destination} without a visa?`,
      answer:
        "It depends on whether international transit is available without immigration clearance; some layovers require a visa.",
    },
    ...baseQuestions(destination),
  ],
  UNKNOWN: (destination) => [
    {
      question: "What does visa requirement pending confirmation mean?",
      answer: "Available information is inconclusive and may require additional verification.",
    },
    {
      question: "What is a visa?",
      answer:
        "It is an authorization issued by the destination country to allow entry for a specific period and purpose.",
    },
    {
      question: "Does a visa guarantee entry?",
      answer: "No. Immigration authorities decide admission on arrival.",
    },
    ...baseQuestions(destination),
  ],
};

export const getVisaFaq = (requirementType: string, destination: string): VisaFaqItem[] => {
  const normalizedType = normalizeFaqType(requirementType);
  const generator = faqByType[normalizedType] ?? faqByType.UNKNOWN;
  const items = generator(destination).slice(0, 6);
  return items.length < 4 ? items.concat(baseQuestions(destination)).slice(0, 4) : items;
};

export type { VisaFaqItem };
