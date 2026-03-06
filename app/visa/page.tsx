import { listAll } from "@/lib/countryIndex";
import { VisaSelector } from "./VisaSelector";

export const runtime = "nodejs";

const countries = listAll();
export const metadata = {
  title: "Visas by country | NecesitoVisa.com",
  description: "Explore origin and destination combinations to know whether you need a visa.",
};

export default function VisaIndexPage() {
  return (
    <div className="container-box py-10 space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Visas by country</h1>
        <p className="text-slate-600 max-w-3xl">
          Select your citizenship country and the destination you want to travel to. Each combination shows a quick
          answer, requirement summary, official sources, and last review date.
        </p>
      </section>

      <VisaSelector countries={countries} />

      <section className="card p-6 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">How does NecesitoVisa.com work?</h2>
        <p className="text-sm text-slate-600">
          Choose your origin country and destination. In seconds, you will see whether you need a visa, electronic
          authorization (eVisa / ESTA), visa on arrival, or no visa for short stays. You can always cross-check with
          official sources before traveling.
        </p>
      </section>
    </div>
  );
}
