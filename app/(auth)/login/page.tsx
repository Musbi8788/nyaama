"use client";

import Link from "next/link";
import { use } from "react";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login, type AuthState } from "../actions";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Logging in…" : "Log in"}
    </Button>
  );
}

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = use(searchParams);
  const [state, formAction] = useActionState<AuthState, FormData>(
    login,
    undefined,
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-display text-4xl text-text">Welcome back.</h1>
        <p className="text-muted">Pick up where you left off.</p>
      </div>

      <form action={formAction} className="space-y-5" noValidate>
        <input type="hidden" name="next" value={next ?? "/app"} />
        <Field
          id="email"
          name="email"
          type="email"
          label="Email"
          autoComplete="email"
          required
        />
        <Field
          id="password"
          name="password"
          type="password"
          label="Password"
          autoComplete="current-password"
          required
        />

        {state?.error && (
          <p
            role="alert"
            className="rounded-xl border border-line bg-surface px-4 py-3 text-sm text-text"
          >
            {state.error}
          </p>
        )}

        <Submit />
      </form>

      <p className="text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="text-yellow underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>
    </div>
  );
}
