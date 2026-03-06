import countries from "i18n-iso-countries";

countries.registerLocale({ locale: "es" });

type OfficialSourcesProps = {
  originName: string;
  destinationName: string;
  isDomesticTrip?: boolean;
};

function getFlagEmoji(countryName: string): string | null {
  const alpha2 = countries.getAlpha2Code(countryName, "es") ?? countries.getAlpha2Code(countryName, "en");
  if (!alpha2 || alpha2.length !== 2) return null;
  return alpha2
    .toUpperCase()
    .split("")
    .map((char: string) => String.fromCodePoint(127397 + char.charCodeAt(0)))
    .join("");
}

function buildGoogleSearchUrl(query: string): string {
  return `https://www.google.com/search?q=${encodeURIComponent(query)}`;
}

export function OfficialSources({ originName, destinationName, isDomesticTrip = false }: OfficialSourcesProps) {
  if (isDomesticTrip) {
    return (
      <div className="card p-6 space-y-4">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-slate-900">📌 Documents for domestic travel</h2>
          <p className="text-sm text-slate-600">
            For domestic travel within your own country, you do not need a visa. Make sure you carry valid official
            identification (for example, national ID card or passport, depending on local rules). In some cases
            (domestic flights or special zones), identification may be requested at boarding or checkpoints.
          </p>
        </div>
        <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
          <p>Internal rules can change. Check ID requirements based on transport type and local regulations.</p>
        </div>
      </div>
    );
  }

  const destinationFlag = getFlagEmoji(destinationName);
  const originFlag = getFlagEmoji(originName);
  const embassyQuery = `embassy of ${destinationName} in ${originName}`;
  const foreignAffairsQuery = `foreign affairs ministry ${originName}`;
  const immigrationQuery = `official immigration website ${destinationName}`;
  const migrationBorderQuery = `official border control website ${destinationName}`;

  return (
    <div className="card p-6 space-y-4">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-slate-900">
          📌 Verification and official sources{destinationFlag ? ` ${destinationFlag}` : ""}
        </h2>
        <p className="text-sm text-slate-600">
          The information on this page is for reference only and may change at any time. To confirm current
          requirements, always verify directly with official sources.
        </p>
      </div>

      {!isDomesticTrip && (
        <a
          className="inline-flex items-center justify-center rounded-lg bg-brand-primary px-4 py-2 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-dark"
          href={buildGoogleSearchUrl(embassyQuery)}
          target="_blank"
          rel="noopener noreferrer"
        >
          Find the embassy of {destinationName} in {originName}
        </a>
      )}

      <ul className="list-disc list-inside space-y-2 text-sm text-slate-700">
        <li>
          <a
            className="text-brand-primary underline underline-offset-2 hover:text-brand-dark"
            href={buildGoogleSearchUrl(isDomesticTrip ? migrationBorderQuery : embassyQuery)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>
              {isDomesticTrip ? (
                <>Official migration / border website for {destinationName} (if applicable)</>
              ) : (
                <>
                  Embassy or consulate of {destinationFlag ? `${destinationFlag} ` : ""}
                  {destinationName} in {originFlag ? `${originFlag} ` : ""}
                  {originName}
                </>
              )}
            </strong>
          </a>
        </li>
        <li>
          <a
            className="text-brand-primary underline underline-offset-2 hover:text-brand-dark"
            href={buildGoogleSearchUrl(foreignAffairsQuery)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>Foreign affairs ministry of {originName}</strong>
          </a>
        </li>
        <li>
          <a
            className="text-brand-primary underline underline-offset-2 hover:text-brand-dark"
            href={buildGoogleSearchUrl(immigrationQuery)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <strong>
              {isDomesticTrip
                ? `Migration / border control authority for ${destinationName} (if applicable)`
                : `Official immigration website for ${destinationName} (if applicable)`}
            </strong>
          </a>
        </li>
      </ul>

      <div className="rounded-lg bg-amber-50 p-3 text-sm text-amber-900">
        <p>
          Immigration policies can change without notice. NecesitoVisa.com is not responsible for updates made after
          your consultation date.
        </p>
      </div>
    </div>
  );
}
