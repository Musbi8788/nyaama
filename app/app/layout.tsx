import Link from "next/link";
import { LogOut } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { SidebarNav, MobileNav } from "@/components/layout/Nav";
import { StreakCard } from "@/components/layout/StreakCard";
import { getStreak } from "@/lib/queries/user";
import { logout } from "@/app/(auth)/actions";

export default async function AppLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { days, streak } = await getStreak();

  return (
    <div className="flex min-h-dvh">
      <aside className="fixed inset-y-0 left-0 hidden w-[264px] flex-col border-r border-line bg-navy p-5 lg:flex">
        <Link href="/app" className="mb-8 inline-flex w-fit rounded-lg px-2">
          <Logo size={30} withTagline />
        </Link>

        <SidebarNav />

        <div className="mt-auto space-y-3">
          <StreakCard days={days} streak={streak} />
          <form action={logout}>
            <button
              type="submit"
              className="flex h-10 w-full items-center gap-3 rounded-pill px-4 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-text"
            >
              <LogOut size={16} strokeWidth={1.75} aria-hidden />
              Log out
            </button>
          </form>
        </div>
      </aside>

      {/* pb-24 clears the fixed mobile nav bar */}
      <div className="flex-1 pb-24 lg:pb-0 lg:pl-[264px]">
        {/* Log out lives in the sidebar, which is hidden below lg — without
            this bar there is no way to sign out on a phone at all. */}
        <div className="flex items-center justify-between border-b border-line px-5 py-3 lg:hidden">
          <Link href="/app" className="inline-flex rounded-lg">
            <Logo size={26} />
          </Link>
          <form action={logout}>
            <button
              type="submit"
              className="flex h-11 items-center gap-2 rounded-pill px-3 text-sm text-muted transition-colors hover:bg-white/[0.04] hover:text-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow focus-visible:ring-offset-2 focus-visible:ring-offset-navy"
            >
              <LogOut size={16} strokeWidth={1.75} aria-hidden />
              Log out
            </button>
          </form>
        </div>

        <main className="mx-auto max-w-5xl px-5 py-8 sm:px-8 sm:py-12">
          {children}
        </main>
      </div>

      <MobileNav />
    </div>
  );
}
