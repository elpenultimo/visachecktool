import { listAll } from "@/lib/countryIndex";
import Link from "next/link";
import { HomeForm } from "./partials/HomeForm";

export const runtime = "nodejs";

const countries = listAll();

const originCountries = countries;
const destinationCountries = countries;

export default function HomePage() {
  const popularDestinations = ["united-states", "canada", "united-kingdom", "schengen", "australia"];

  return (
    <div className="container-box py-12 space-y-16">
      <section className="grid gap-10 lg:grid-cols-2 lg:items-center">
        <div className="space-y-6">
          <p className="inline-flex rounded-full bg-brand-primary/10 px-3 py-1 text-sm font-medium text-brand-primary">
            NecesitoVisa.com
          </p>
          <h1 className="text-4xl font-bold text-slate-900 leading-tight">Do I need a visa to travel?</h1>
          <p className="text-lg text-slate-600">
            Clear visa requirement information based on official sources, designed for real travelers.
          </p>
          <HomeForm
            origins={originCountries.map((c) => ({ name: c.name_es, slug: c.slug_es }))}
            destinations={destinationCountries.map((c) => ({ name: c.name_es, slug: c.slug_es }))}
          />
        </div>
        <div className="card p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900">Popular destinations (Chile)</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {popularDestinations.map((slug) => {
              const dest = destinationCountries.find((d) => d.slug_es === slug || d.slug_en === slug);
              if (!dest) return null;
              return (
                <Link
                  key={dest.slug_es}
                  href={`/visa/chile/${dest.slug_es}`}
                  className="card p-4 transition hover:shadow-soft"
                >
                  <p className="font-semibold text-slate-900">{dest.name_es}</p>
                  <p className="text-sm text-slate-600">Check visa requirements for Chilean passport holders</p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <section className="grid gap-8 md:grid-cols-3">
        <div className="card p-6 space-y-2">
          <h3 className="font-semibold text-slate-900">🛂 What is a visa?</h3>
          <p className="text-sm text-slate-600">
            A visa is an authorization granted by a country that allows foreign citizens to enter, stay, or transit
            for a specific time under specific conditions.
          </p>
        </div>
        <div className="card p-6 space-y-2">
          <h3 className="font-semibold text-slate-900">🏛️ Who issues visas?</h3>
          <p className="text-sm text-slate-600">
            Visas are issued by the destination country, usually through embassies, consulates, or official
            immigration systems.
          </p>
        </div>
        <div className="card p-6 space-y-2">
          <h3 className="font-semibold text-slate-900">🌍 Global coverage</h3>
          <p className="text-sm text-slate-600">
            Check visa requirements for hundreds of nationality and destination combinations in one place.
          </p>
        </div>
      </section>

      <section className="card p-6 space-y-4">
        <h2 className="text-xl font-semibold text-slate-900">Official sources</h2>
        <p className="text-sm text-slate-600">Always verify on official websites before you travel. We recommend:</p>
        <ul className="list-disc list-inside text-sm text-slate-600 space-y-1">
          <li>IATA/Timatic for entry conditions.</li>
          <li>Government and foreign affairs ministry websites.</li>
          <li>Embassies and consulates of the destination country.</li>
        </ul>
        <p className="text-xs text-slate-500">This website is for reference and does not constitute legal advice.</p>
      </section>
    </div>
  );
}
