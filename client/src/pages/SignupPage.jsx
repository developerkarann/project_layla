import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import { registerUser } from "../api";
import { setUserProfile, setUserToken } from "../utils/userAuth";

function BlossomSticker() {
  return (
    <div className="relative mx-auto h-52 w-52 sm:h-64 sm:w-64">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-reiki-section-alt to-reiki-accent shadow-lg" />
      <svg viewBox="0 0 220 220" className="absolute inset-0 h-full w-full p-6 text-reiki-dark" fill="none">
        <path
          d="M110 38C119 62 139 74 163 76C144 90 136 108 136 130C122 112 107 106 84 105C101 89 109 73 110 38Z"
          fill="currentColor"
          opacity="0.2"
        />
        <path
          d="M110 182C101 158 81 146 57 144C76 130 84 112 84 90C98 108 113 114 136 115C119 131 111 147 110 182Z"
          fill="currentColor"
          opacity="0.2"
        />
        <circle cx="110" cy="110" r="26" stroke="currentColor" strokeWidth="4" opacity="0.7" />
        <path d="M98 110L108 120L126 100" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <div className="absolute -left-3 -bottom-3 rounded-full border border-reiki-card-border bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-reiki-muted shadow">
        New account
      </div>
    </div>
  );
}

export default function SignupPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const getErrorMessage = (rawError) => {
    const text = rawError?.message || "Signup failed";
    try {
      const parsed = JSON.parse(text);
      return parsed?.message || "Signup failed";
    } catch {
      return text;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);
    try {
      const response = await registerUser({
        name,
        email,
        phone: phoneNo,
        password,
      });
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
            Begin Journey
          </span>
          <h1 className="font-script text-4xl text-reiki-dark sm:text-5xl">Create Account</h1>
          <p className="max-w-md text-base text-reiki-body">
            Join the space with your personal details and access your sacred dashboard.
          </p>
          <BlossomSticker />
        </div>

        <div className="flex flex-col justify-center">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="signup-name" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-reiki-muted">
                Name
              </label>
              <input
                id="signup-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
                required
                placeholder="Your full name"
                className="w-full rounded-xl border border-reiki-card-border bg-page-bg/50 px-4 py-3 text-reiki-dark placeholder:text-reiki-dark/45 focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
              />
            </div>
            <div>
              <label htmlFor="signup-email" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-reiki-muted">
                Email
              </label>
              <input
                id="signup-email"
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
              <label htmlFor="signup-phone" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-reiki-muted">
                Phone No
              </label>
              <input
                id="signup-phone"
                type="tel"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
                autoComplete="tel"
                required
                placeholder="+1 234 567 8900"
                className="w-full rounded-xl border border-reiki-card-border bg-page-bg/50 px-4 py-3 text-reiki-dark placeholder:text-reiki-dark/45 focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/25"
              />
            </div>
            <div>
              <label htmlFor="signup-password" className="mb-2 block text-sm font-semibold uppercase tracking-wide text-reiki-muted">
                Password
              </label>
              <div className="relative">
                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="new-password"
                  required
                  placeholder="Create a secure password"
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
              {isSubmitting ? "Creating..." : "Create Account"}
            </button>
            {error ? <p className="text-sm text-red-600">{error}</p> : null}
          </form>
          <p className="mt-5 text-center text-sm text-reiki-muted">
            Already have an account?{" "}
            <Link to="/login" className="font-semibold text-reiki-dark underline underline-offset-2">
              Login
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
