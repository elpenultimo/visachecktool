export type RequirementType =
  | "NO_VISA"
  | "NO_VISA_DAYS"
  | "E_VISA"
  | "ESTA"
  | "ETA"
  | "VOA"
  | "REQUIRES_VISA"
  | "UNKNOWN";

type NormalizedRequirement = {
  raw: string;
  type: RequirementType;
  days?: number;
  label: string;
  display: string;
};

export const NORMALIZATION_RULES = [
  { match: "NUMBER_ONLY", type: "NO_VISA_DAYS", icon: "☑️", label: (d: number) => `No visa required (${d} days)` },
  { includes: ["visa free", "visa-free"], type: "NO_VISA", icon: "☑️", label: "No visa required" },
  { includes: ["e-visa", "evisa"], type: "E_VISA", icon: "🟨", label: "eVisa (online process)" },
  { includes: ["esta"], type: "ESTA", icon: "🟦", label: "ESTA (electronic authorization)" },
  { includes: ["eta"], type: "ETA", icon: "🟦", label: "eTA / ETA (electronic authorization)" },
  { includes: ["visa on arrival", "on arrival"], type: "VOA", icon: "🟧", label: "Visa on arrival" },
  { includes: ["visa required", "required"], type: "REQUIRES_VISA", icon: "❌", label: "Visa required" },
  { fallback: true, type: "UNKNOWN", icon: "⚠️", label: "Requirement not specified" },
] as const;

export function normalizeRequirement(raw: string | null | undefined): NormalizedRequirement {
  const sanitized = (raw ?? "").trim().toLowerCase().replace(/\s+/g, " ");

  if (/^\d+$/.test(sanitized)) {
    const days = parseInt(sanitized, 10);
    return {
      raw: raw ?? "",
      type: "NO_VISA_DAYS",
      days,
      label: `No visa required (${days} days)`,
      display: `☑️ No visa required (${days} days)`,
    };
  }

  if (sanitized.includes("visa free") || sanitized.includes("visa-free")) {
    return {
      raw: raw ?? "",
      type: "NO_VISA",
      label: "No visa required",
      display: "☑️ No visa required",
    };
  }

  if (sanitized.includes("e-visa") || sanitized.includes("evisa")) {
    return {
      raw: raw ?? "",
      type: "E_VISA",
      label: "eVisa (online process)",
      display: "🟨 eVisa (online process)",
    };
  }

  if (sanitized.includes("esta")) {
    return {
      raw: raw ?? "",
      type: "ESTA",
      label: "ESTA (electronic authorization)",
      display: "🟦 ESTA (electronic authorization)",
    };
  }

  if (sanitized === "eta" || sanitized.includes("eta")) {
    return {
      raw: raw ?? "",
      type: "ETA",
      label: "eTA / ETA (electronic authorization)",
      display: "🟦 eTA / ETA (electronic authorization)",
    };
  }

  if (sanitized.includes("visa on arrival") || sanitized.includes("on arrival")) {
    return {
      raw: raw ?? "",
      type: "VOA",
      label: "Visa on arrival",
      display: "🟧 Visa on arrival",
    };
  }

  if (sanitized.includes("visa required") || sanitized.includes("required")) {
    return {
      raw: raw ?? "",
      type: "REQUIRES_VISA",
      label: "Visa required",
      display: "❌ Visa required",
    };
  }

  return {
    raw: raw ?? "",
    type: "UNKNOWN",
    label: "Requirement not specified",
    display: "⚠️ Requirement not specified",
  };
}

export type { NormalizedRequirement };
