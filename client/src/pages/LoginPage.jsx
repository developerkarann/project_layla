import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { loginUser } from "../api";
import { setUserProfile, setUserToken } from "../utils/userAuth";

function AuthSticker() {
  return (
    <div className="relative mx-auto h-52 w-52 sm:h-64 sm:w-64">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-reiki-accent to-reiki-section-alt shadow-lg" />
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full p-8 text-reiki-dark" fill="none">
        <path
          d="M100 22C100 57.35 71.35 86 36 86C71.35 86 100 114.65 100 150C100 114.65 128.65 86 164 86C128.65 86 100 57.35 100 22Z"
          fill="currentColor"
          opacity="0.18"
        />
        <circle cx="100" cy="92" r="24" stroke="currentColor" strokeWidth="4" opacity="0.65" />
        <path d="M64 154C67 132 82 120 100 120C118 120 133 132 136 154" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <div className="absolute -right-3 -top-3 rounded-full border border-reiki-card-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-reiki-muted shadow">
        Welcome back
      </div>
    </div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const getErrorMessage = (rawError) => {
    const text = rawError?.message || "Login failed";
    try {
      const parsed = JSON.parse(text);
      return parsed?.message || "Login failed";
    } catch {
      return text;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await loginUser({ email, password });
      setUserToken(response.token);
      setUserProfile(response.user);
      navigate("/user/admin");
    } catch (err) {
      setError(getErrorMessage(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="bg-gradient-to-b from-page-bg via-reiki-section-alt/20 to-page-bg px-4 py-14 sm:py-20">
      <section className="mx-auto grid w-full max-w-6xl gap-10 rounded-3xl border border-reiki-card-border bg-white/95 p-6 shadow-xl sm:p-10 lg:grid-cols-2">
        <div className="flex flex-col items-center justify-center gap-6 rounded-2xl bg-reiki-bg-stripe p-8 text-center">
          <span className="inline-flex rounded-full border border-reiki-dark/20 bg-white px-4 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-reiki-muted">
            Sacred Access
          </span>
          <h1 className="font-script text-4xl text-reiki-dark sm:text-5xl">Login</h1>
          <p className="max-w-md text-base text-reiki-body">
            Enter your details to access your account and continue your healing journey.
          </p>
          <AuthSticker />
        </div>

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="login-email" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-reiki-muted">
                Email
              </label>
              <input
                id="login-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
                placeholder="you@example.com"
                className="w-full rounded-xl border border-reiki-card-border bg-page-bg/50 px-4 py-3 text-reiki-dark placeholder:text-reiki-dark/45 focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
              />
            </div>
            <div>
              <label htmlFor="login-password" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-reiki-muted">
                Password
              </label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                  placeholder="Enter your password"
                  className="w-full rounded-xl border border-reiki-card-border bg-page-bg/50 px-4 py-3 pr-11 text-reiki-dark placeholder:text-reiki-dark/45 focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-reiki-dark/60 hover:text-reiki-dark"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <HiEyeSlash className="h-5 w-5" /> : <HiEye className="h-5 w-5" />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-xl bg-reiki-dark px-4 py-3 font-semibold text-white transition hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-reiki-dark/50 focus:ring-offset-2"
            >
              {isSubmitting ? "Logging in..." : "Login"}
            </button>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </form>
          <p className="mt-5 text-center text-sm text-reiki-muted">
            New here?{" "}
            <Link to="/signup" className="font-semibold text-reiki-dark underline underline-offset-2">
              Create account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
