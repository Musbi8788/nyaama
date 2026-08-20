"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { signup, type AuthState } from "../actions";
import { Button } from "@/components/ui/Button";
import { Field } from "@/components/ui/Field";

function Submit() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" size="lg" className="w-full" disabled={pending}>
      {pending ? "Creating your account…" : "Create account"}
    </Button>
  );
}

export default function SignupPage() {
  const [state, formAction] = useActionState<AuthState, FormData>(
    signup,
    undefined,
  );

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="font-display text-4xl text-text">Find your way.</h1>
        <p className="text-muted">
          Create an account and meet your career coach.
        </p>
      </div>

      <form action={formAction} className="space-y-5" noValidate>
        <Field
          id="name"
          name="name"
          label="Your name"
          autoComplete="name"
          required
        />
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
          autoComplete="new-password"
          hint="At least 8 characters."
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
        Already have an account?{" "}
        <Link href="/login" className="text-yellow underline-offset-4 hover:underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
