import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid min-h-dvh lg:grid-cols-2">
      <div className="flex flex-col px-6 py-8 sm:px-12">
        <Link href="/" className="inline-flex w-fit rounded-lg">
          <Logo size={32} />
        </Link>
        <main className="flex flex-1 items-center justify-center py-12">
          <div className="w-full max-w-sm">{children}</div>
        </main>
      </div>

      {/* Quiet panel — the product's argument, not a stock photo. */}
      <aside className="hidden flex-col justify-center border-l border-line bg-surface px-12 lg:flex">
        <p className="font-display text-3xl leading-snug text-text">
          Don&rsquo;t learn everything.
          <br />
          Find your path, go deep,
          <br />
          and build something real.
        </p>
        <p className="mt-6 text-sm text-muted">
          Nyaama — Find Your Way
        </p>
      </aside>
    </div>
  );
}
