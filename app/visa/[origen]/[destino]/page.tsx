import { notFound, permanentRedirect } from "next/navigation";
import { Metadata } from "next";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { resolveOrigin } from "@/lib/countryIndex";
import { normalizeRequirement } from "@/lib/visaRequirement";
import { readVisaDataByKey, resolveDestinationBySlug } from "@/lib/visaData";
import { VisaRequirementBadge } from "@/components/VisaRequirementBadge";
import { OfficialSources } from "@/components/OfficialSources";
import { getRequirementExplanation } from "@/lib/requirementExplain";
import { getVisaFaq } from "@/lib/visaFaq";

export const runtime = "nodejs";

type EmojiLabel = { emoji: string; label: string };

const extractEmojiAndLabel = (display: string): EmojiLabel => {
  const [maybeEmoji, ...rest] = display.trim().split(" ");
  if (maybeEmoji && /\p{Extended_Pictographic}/u.test(maybeEmoji)) {
    return { emoji: maybeEmoji, label: rest.join(" ") };
  }
  return { emoji: "", label: display.trim() };
};

const buildRequirementLabel = (requirement: ReturnType<typeof normalizeRequirement>) => {
  switch (requirement.type) {
    case "NO_VISA_DAYS":
      return requirement.days ? `do not need a visa (${requirement.days} days)` : "do not need a visa";
    case "NO_VISA":
      return "do not need a visa";
    case "REQUIRES_VISA":
      return "do require a visa";
    case "VOA":
      return "can get a visa on arrival";
    case "E_VISA":
      return "require an eVisa";
    case "ESTA":
      return "require ESTA";
    case "ETA":
      return "require ETA";
    case "UNKNOWN":
    default:
      return "have visa requirements pending confirmation";
  }
};

const buildSeoSentence = ({
  origenEs,
  destinoEs,
  requirementLabel,
  requirementEmoji,
}: {
  origenEs: string;
  destinoEs: string;
  requirementLabel: string;
  requirementEmoji: string;
}) =>
  `Citizens of ${origenEs}${requirementEmoji ? ` ${requirementEmoji}` : ""} ${requirementLabel} to travel to ${destinoEs}.`;

export async function generateMetadata({
  params,
}: {
  params: { origen: string; destino: string };
}): Promise<Metadata> {
  const origin = resolveOrigin(params.origen);
  if (!origin) return { title: "Route not found" };

  const data = readVisaDataByKey(origin.entry.key);
  if (!data) return { title: "Route not found" };

  const destination = resolveDestinationBySlug(data, params.destino);
  if (!destination) return { title: "Route not found" };

  const canonicalSlug = destination.canonicalSlug;
  const originSlug = origin.canonicalSlug;
  const originNameEs = data.origin_name_es || origin.entry.name_es;
  const canonical = `https://necesitovisa.com/visa/${originSlug}/${canonicalSlug}`;

  return {
    title: `Do I need a visa for ${destination.destination.name_es} if I am from ${originNameEs}?`,
    description: `Check the visa requirement for travel from ${originNameEs} to ${destination.destination.name_es}.`,
    alternates: {
      canonical,
    },
  };
}

export default function VisaDetailPage({ params }: { params: { origen: string; destino: string } }) {
  const origin = resolveOrigin(params.origen);
  if (!origin) return notFound();

  if (origin.redirected) {
    permanentRedirect(`/visa/${origin.canonicalSlug}/${params.destino}`);
  }

  const data = readVisaDataByKey(origin.entry.key);
  if (!data) return notFound();

  const destinationResolution = resolveDestinationBySlug(data, params.destino);
  if (!destinationResolution) return notFound();

  if (params.destino !== destinationResolution.canonicalSlug) {
    permanentRedirect(`/visa/${data.origin_slug_es}/${destinationResolution.canonicalSlug}`);
  }

  const { destination } = destinationResolution;
  const originSlug = origin.canonicalSlug;
  const destinationSlug = destinationResolution.canonicalSlug;
  const isDomesticTrip = originSlug === destinationSlug;
  const originNameEs = data.origin_name_es || origin.entry.name_es;
  const normalizedRequirement = normalizeRequirement(destination.requirement);
  const { emoji, label } = normalizedRequirement
    ? extractEmojiAndLabel(normalizedRequirement.display)
    : { emoji: "", label: "" };
  void label;
  const requirementLabel = buildRequirementLabel(normalizedRequirement);
  const seoSentence = isDomesticTrip
    ? `Citizens of ${originNameEs} do not need a visa to enter ${destination.name_es} (domestic trip).`
    : buildSeoSentence({
        origenEs: originNameEs,
        destinoEs: destination.name_es,
        requirementLabel,
        requirementEmoji: emoji,
      });
  const explanation =
    getRequirementExplanation({
      type: normalizedRequirement.type,
      days: normalizedRequirement.days,
      originName: originNameEs,
      destinationName: destination.name_es,
    }) ||
    "Requirements can change and depend on your trip purpose (tourism, work, study). Always verify exact procedures and documents on official sources.";
  const visaFaq = getVisaFaq(normalizedRequirement.type, destination.name_es);
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: visaFaq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  const breadcrumbCrumbs = [
    { label: "Home", href: "/" },
    { label: "Visas", href: "/visa" },
    {
      label: `${originNameEs} → ${destination.name_es}`,
      href: `/visa/${data.origin_slug_es}/${destination.slug_es}`,
    },
  ];

  return (
    <div className="container-box py-10 space-y-8">
      <Breadcrumbs crumbs={breadcrumbCrumbs} />

      <div className="space-y-3">
        <h1 className="text-3xl font-bold text-slate-900">
          Do I need a visa to travel to {destination.name_es} if I am from {originNameEs}?
        </h1>
        <div className="flex flex-col gap-2">
          <p className="text-lg font-semibold text-slate-900">Quick answer:</p>
          <div className="flex items-center gap-3">
            {isDomesticTrip ? (
              <span className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-700">
                ☑️ Domestic trip
              </span>
            ) : (
              <VisaRequirementBadge requirement={normalizedRequirement} />
            )}
          </div>
        </div>
        <div className="text-sm text-slate-600 max-w-3xl space-y-1">
          <p>{seoSentence}</p>
          {!isDomesticTrip && <p className="text-slate-500">{explanation}</p>}
        </div>
      </div>

      <OfficialSources
        originName={originNameEs}
        destinationName={destination.name_es}
        isDomesticTrip={isDomesticTrip}
      />

      {!isDomesticTrip && (
        <div className="card p-6 space-y-4">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-slate-900">❓ Quick FAQ about this travel requirement</h2>
            <p className="text-sm text-slate-600">
              Short answers about the most common authorization for short visits.
            </p>
          </div>
          <div className="space-y-2">
            {visaFaq.map((item) => (
              <details
                key={item.question}
                className="group rounded-lg border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700"
              >
                <summary className="cursor-pointer font-semibold text-slate-900">{item.question}</summary>
                <div className="pt-2 text-slate-600">{item.answer}</div>
              </details>
            ))}
          </div>
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(faqJsonLd),
            }}
          />
        </div>
      )}
    </div>
  );
}
