import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center md:px-6">
      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#87614a]">404</p>
      <h1 className="mt-3 text-4xl font-black tracking-[-0.06em] text-on-dark">This page isn’t here.</h1>
      <p className="mt-3 text-base text-muted-on-light">The coffee you were looking for may have moved to a different shelf.</p>
      <Link href="/shop" className="mt-6 inline-flex rounded-full bg-[#2d1b12] px-6 py-3 text-sm font-semibold text-on-dark">
        Browse coffees
      </Link>
    </div>
  );
}
