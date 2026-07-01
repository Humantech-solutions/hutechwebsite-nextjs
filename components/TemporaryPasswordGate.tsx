"use client";

import { FormEvent, ReactNode, useEffect, useState } from "react";
import { LockKeyhole } from "lucide-react";

const STORAGE_KEY = "hutech_temp_access";
const PROTECTED_HOSTS = ["hutechsolutions.ai", "www.hutechsolutions.ai"];
const TEMP_PASSWORD = process.env.NEXT_PUBLIC_TEMP_SITE_PASSWORD || "hutech@2026";

function shouldProtectCurrentHost() {
  if (process.env.NEXT_PUBLIC_TEMP_SITE_LOCK === "true") {
    return true;
  }

  if (typeof window === "undefined") {
    return false;
  }

  return PROTECTED_HOSTS.includes(window.location.hostname.toLowerCase());
}

export default function TemporaryPasswordGate({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [locked, setLocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const shouldProtect = shouldProtectCurrentHost();
    const hasAccess = window.sessionStorage.getItem(STORAGE_KEY) === "1";

    setLocked(shouldProtect && !hasAccess);
    setReady(true);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (password === TEMP_PASSWORD) {
      window.sessionStorage.setItem(STORAGE_KEY, "1");
      setLocked(false);
      setError("");
      return;
    }

    setError("Incorrect password.");
  };

  if (!ready) {
    return null;
  }

  if (!locked) {
    return <>{children}</>;
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-6 text-white">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex justify-center">
          <img
            src="/assets/c57ecabe59306129194824425137d2ccde6918ce.png"
            alt="Hutech Solutions"
            className="h-20 w-auto rounded-sm bg-white px-4 py-2"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-5 p-8 text-[#001A3D] h-[55vh] justify-center border border-[#ddd]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#0171c1]/10 text-[#0171c1]">
              <LockKeyhole size={20} />
            </div>
            <div>
              <h1 className="text-xl font-bold">Password Required</h1>
              <p className="text-sm font-medium text-gray-500">Enter the temporary access password.</p>
            </div>
          </div>

          <div className="h-[17vh] py-5">
            <label className="mb-2 block text-sm font-bold" htmlFor="temp-site-password">
              Password
            </label>
            <input
              id="temp-site-password"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-sm border border-gray-200 px-4 py-3 text-sm outline-none transition-colors focus:border-[#0171c1]"
              autoComplete="current-password"
              autoFocus
            />
            {error && <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>}
          </div>

          <button
            type="submit"
            className="w-full rounded-sm bg-[#0171c1] px-5 py-3 text-sm font-bold tracking-wide text-white transition-colors hover:bg-[#001A3D]"
          >
            Enter Site
          </button>
        </form>
      </div>
    </main>
  );
}
