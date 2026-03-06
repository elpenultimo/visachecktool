import { RequirementType } from "@/lib/visaRequirement";

type RequirementExplanationParams = {
  type?: RequirementType;
  days?: number;
  originName?: string;
  destinationName?: string;
};

const buildVisaFreeWithDays = (days: number) =>
  `You do not need a visa for tourism stays up to ${days} days (based on available information). ` +
  "Keep in mind there may be conditions such as onward ticket, insurance, or proof of funds. " +
  "For longer stays, work, or study, a different permit or visa is usually required.";

const buildExplanationByType = (type: RequirementType, days?: number) => {
  switch (type) {
    case "E_VISA":
      return (
        "An eVisa is an electronic authorization requested online before travel. " +
        "It is typically approved and linked to your passport; at the airport authorities may request supporting documents " +
        "(onward ticket, accommodation, proof of funds). Check the official website for exact steps and timelines. " +
        "Avoid intermediaries and use official channels."
      );
    case "VOA":
      return (
        "Visa on arrival is processed when you land (or at a land border crossing). " +
        "It usually requires a valid passport, form completion, and fee payment; some countries also request onward tickets and bookings. " +
        "Confirm exact requirements before travel."
      );
    case "REQUIRES_VISA":
      return (
        "This means you must apply for a visa at an embassy/consulate (or official government platform) before traveling. " +
        "Requirements vary by purpose (tourism, work, study) and may include interviews and supporting documents. " +
        "Always follow official guidance."
      );
    case "NO_VISA_DAYS":
      return days ? buildVisaFreeWithDays(days) : undefined;
    case "NO_VISA":
      return (
        "You do not need a visa for short tourism visits based on available information. " +
        "For longer stays, work, or study, requirements are usually different. " +
        "Confirm conditions on official sources."
      );
    case "ETA":
    case "ESTA":
      return (
        "An electronic travel authorization (ETA/eTA/ESTA) is not a traditional visa: it is pre-travel approval to board and enter for tourism or transit. " +
        "It is requested online, may involve fees, and can take minutes to days to process. It must be obtained before travel. " +
        "Avoid intermediaries and use official channels."
      );
    case "UNKNOWN":
    default:
      return undefined;
  }
};

export function getRequirementExplanation({ type, days }: RequirementExplanationParams) {
  if (!type) {
    return (
      "Requirements can change and depend on your travel purpose (tourism, work, study). " +
      "Always verify exact procedures and required documents on official sources."
    );
  }

  const explanation = buildExplanationByType(type, days);

  if (!explanation) {
    return (
      "Requirements can change and depend on your travel purpose (tourism, work, study). " +
      "Always verify exact procedures and required documents on official sources."
    );
  }

  return explanation;
}

export type { RequirementExplanationParams };
