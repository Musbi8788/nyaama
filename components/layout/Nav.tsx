"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, Compass, Home, Map, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils/cn";

export const NAV = [
  { href: "/app", label: "Home", icon: Home },
  { href: "/app/discover", label: "Discover", icon: Compass },
  { href: "/app/roadmap", label: "My Roadmap", icon: Map },
  { href: "/app/progress", label: "Progress", icon: TrendingUp },
] as const;

function useIsActive() {
  const pathname = usePathname();
  return (href: string) =>
    href === "/app" ? pathname === "/app" : pathname.startsWith(href);
}

/** Desktop sidebar navigation. Active item is the yellow pill. */
export function SidebarNav() {
  const isActive = useIsActive();

  return (
    <nav aria-label="Main">
      <p className="px-4 pb-3 text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-muted">
        Your Space
      </p>
      <ul className="space-y-1">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-11 items-center gap-3 rounded-pill px-4 text-sm transition-colors",
                  active
                    ? "bg-yellow font-medium text-navy"
                    : "text-muted hover:bg-white/[0.04] hover:text-text",
                )}
              >
                <Icon size={18} strokeWidth={1.75} aria-hidden />
                <span className="flex-1">{label}</span>
                {active && <ChevronRight size={16} aria-hidden />}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Mobile bottom bar. Thumb-reachable, 4 targets, always visible. */
export function MobileNav() {
  const isActive = useIsActive();

  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-navy/95 backdrop-blur lg:hidden"
    >
      <ul className="mx-auto flex max-w-lg">
        {NAV.map(({ href, label, icon: Icon }) => {
          const active = isActive(href);
          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-16 flex-col items-center justify-center gap-1 text-[0.6875rem] transition-colors",
                  active ? "text-yellow" : "text-muted",
                )}
              >
                <Icon size={20} strokeWidth={1.75} aria-hidden />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
