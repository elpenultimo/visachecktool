import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="container-box py-16 space-y-6 text-center">
      <h1 className="text-4xl font-bold text-slate-900">Page not found</h1>
      <p className="text-slate-600">We do not have data for that combination. Go back home and choose another option.</p>
      <Link
        href="/"
        className="inline-flex items-center rounded-lg bg-brand-primary px-5 py-3 text-white font-semibold hover:bg-brand-dark"
      >
        Back to home
      </Link>
    </div>
  );
}
