import { listAll } from "@/lib/countryIndex";
import { VisaSelector } from "./VisaSelector";

export const runtime = "nodejs";

const countries = listAll();
export const metadata = {
  title: "Visa requirements by country | Visa Checker Tool",
  description: "Explore visa requirements by passport and destination, including travel visa policy details.",
};

export default function VisaIndexPage() {
  return (
    <div className="container-box py-10 space-y-10">
      <section className="space-y-4">
        <h1 className="text-3xl font-bold text-slate-900">Visa requirements by country</h1>
        <p className="text-slate-600 max-w-3xl">
          Choose your passport country and destination to see visa requirements, travel visa options, official sources, and the latest review date.
        </p>
      </section>

      <VisaSelector countries={countries} />

      <section className="card p-6 space-y-3">
        <h2 className="text-xl font-semibold text-slate-900">How does Visa Checker Tool work?</h2>
        <p className="text-sm text-slate-600">
          Select your passport country and destination. In seconds, you will see whether you need a travel visa, an electronic authorization (eVisa / ESTA), visa on arrival, or visa-free entry for short trips. Always confirm current visa policy with official sources before you travel.
        </p>
      </section>
    </div>
  );
}
