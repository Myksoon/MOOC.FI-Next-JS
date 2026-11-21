"use client";

import { useActionState } from "react";
import { useRouter } from "next/navigation";
import { registerUser, type RegisterFormState } from "../actions/users";
import Field from "../components/Field";
import { useNotification } from "../components/NotificationContext";

export default function Register() {
  const router = useRouter();
  const { notify } = useNotification();
  const [state, formAction, pending] = useActionState(async (prev: RegisterFormState, formData: FormData) => {
    const result = await registerUser(prev, formData);
    if (result.success) {
      notify("account created, you can now log in");
      router.push("/login");
    }
    return result;
  }, {});

  return (
    <div className="max-w-md">
      <h2 className="mb-4 text-2xl font-bold">Register</h2>
      <form action={formAction} noValidate>
        <Field label="Username" name="username" autoComplete="username" defaultValue={state.values?.username} error={state.errors?.username} />
        <Field label="Name" name="name" autoComplete="name" defaultValue={state.values?.name} error={state.errors?.name} />
        <Field label="Password" name="password" type="password" autoComplete="new-password" error={state.errors?.password} />
        <Field label="Confirm Password" name="passwordConfirm" type="password" autoComplete="new-password" error={state.errors?.passwordConfirm} />
        <button type="submit" data-testid="register-button" disabled={pending} className="btn">
          Register
        </button>
      </form>
    </div>
  );
}
