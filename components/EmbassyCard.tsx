import { Requirement } from "@/data/requirements";

export function EmbassyCard({ embassy }: { embassy: Requirement["embassy"] }) {
  return (
    <div className="card p-5 space-y-2 text-sm text-slate-600">
      <p className="font-semibold text-slate-900">{embassy.name}</p>
      <a href={embassy.url} target="_blank" rel="noreferrer" className="block">
        View official website
      </a>
      {embassy.email && <p>Email: {embassy.email}</p>}
      {embassy.phone && <p>Phone: {embassy.phone}</p>}
      {embassy.address && <p>Address: {embassy.address}</p>}
      {!embassy.email && !embassy.phone && !embassy.address && (
        <p className="text-slate-500">Complete these fields with official data when available.</p>
      )}
    </div>
  );
}
