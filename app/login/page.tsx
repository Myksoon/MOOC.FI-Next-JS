"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Field from "../components/Field";
import { useNotification } from "../components/NotificationContext";

export default function Login() {
  const router = useRouter();
  const { notify } = useNotification();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  // onSubmit instead of a form action, so a failed login doesn't clear the inputs
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setPending(true);
    const login = () =>
      signIn("credentials", {
        username: form.get("username"),
        password: form.get("password"),
        redirect: false,
      });
    let result = await login();
    // on a fresh browser, the page's first auth requests can race and replace the CSRF cookie
    // the token was read from; by now the cookie has settled, so one retry succeeds
    if (result?.error === "MissingCSRF") result = await login();
    setPending(false);
    if (result?.error) {
      setError("wrong username or password");
      return;
    }
    notify("logged in");
    router.push("/");
    router.refresh(); // re-render server components that read the session
  };

  return (
    <div className="max-w-md">
      <h2 className="mb-4 text-2xl font-bold">Log in</h2>
      {error && (
        <p data-testid="error-message" role="alert" className="mb-4 rounded border-l-4 border-red-600 bg-red-50 px-4 py-2 text-red-800">
          {error}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <Field label="Username" name="username" autoComplete="username" required />
        <Field label="Password" name="password" type="password" autoComplete="current-password" required />
        <button type="submit" data-testid="login-button" disabled={pending} className="btn">
          Login
        </button>
      </form>
    </div>
  );
}
