import { Requirement } from "@/data/requirements";

interface ResultCardProps {
  requirement: Requirement;
}

export function ResultCard({ requirement }: ResultCardProps) {
  return (
    <div className="card p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500">Quick answer</p>
          <p className="text-2xl font-bold text-slate-900">
            {requirement.visaRequired
              ? "Yes, you need a visa or prior authorization"
              : "No visa needed for a short visit"}
          </p>
        </div>
        <span
          className={`rounded-full px-3 py-1 text-sm font-semibold ${
            requirement.visaRequired ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"
          }`}
        >
          {requirement.visaRequired ? "VISA" : "NO VISA"}
        </span>
      </div>
      <p className="text-sm text-slate-600">
        Last review: <strong>{requirement.lastReviewed}</strong>
      </p>
    </div>
  );
}
