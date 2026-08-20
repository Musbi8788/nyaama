import Link from "next/link";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-transparent bg-navy/80 backdrop-blur supports-[backdrop-filter]:bg-navy/70">
      <div className="mx-auto flex h-18 max-w-[1120px] items-center justify-between px-6 py-4">
        <Link href="/" className="rounded-lg" aria-label="Nyaama home">
          <Logo size={34} />
        </Link>

        <nav className="flex items-center gap-2 sm:gap-4">
          <Link
            href="#how-it-works"
            className="hidden rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-text sm:block"
          >
            How it works
          </Link>
          <Link
            href="/login"
            className="rounded-lg px-3 py-2 text-sm text-muted transition-colors hover:text-text"
          >
            Log in
          </Link>
          <ButtonLink href="/signup">Find Your Way</ButtonLink>
        </nav>
      </div>
    </header>
  );
}
