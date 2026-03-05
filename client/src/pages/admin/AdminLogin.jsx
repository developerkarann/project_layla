import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import toast from "react-hot-toast";
import { apiPost } from "../../api/client";
import { setAdminToken } from "../../utils/adminAuth";

export default function AdminLogin({ onLoginSuccess }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const { token } = await apiPost("admin/login", { password });
      setAdminToken(token);
      toast.success("Login successful");
      onLoginSuccess?.(); // tell AdminGate to re-check so dashboard shows
    } catch (err) {
      const msg = err.message || "";
      const displayMsg = msg.includes("Invalid") || msg.includes("401") ? "Invalid password" : msg || "Invalid password";
      setError(displayMsg);
      toast.error(displayMsg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-page-bg via-reiki-section-alt/20 to-page-bg p-4">
      <div className="w-full max-w-sm rounded-2xl border border-reiki-card-border bg-white p-8 shadow-xl">
        <h1 className="mb-2 text-center text-xl font-semibold text-reiki-dark">
          Admin login
        </h1>
        <p className="mb-6 text-center text-sm text-reiki-dark/70">
          Enter the admin password to continue.
        </p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="admin-password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <input
                id="admin-password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                autoComplete="current-password"
                autoFocus
                className="w-full rounded-xl border border-reiki-card-border bg-page-bg/50 px-4 py-3 pr-11 text-reiki-dark placeholder:text-reiki-dark/50 focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/30"
                disabled={loading}
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-reiki-dark/60 hover:text-reiki-dark"
                tabIndex={-1}
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? (
                  <HiEyeSlash className="h-5 w-5" aria-hidden />
                ) : (
                  <HiEye className="h-5 w-5" aria-hidden />
                )}
              </button>
            </div>
          </div>
          {error && (
            <p className="text-center text-sm text-red-600" role="alert">
              {error}
            </p>
          )}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-reiki-olive px-4 py-3 font-medium text-white transition hover:bg-reiki-olive/90 focus:outline-none focus:ring-2 focus:ring-reiki-olive focus:ring-offset-2 disabled:opacity-60"
          >
            {loading ? "Checking…" : "Log in"}
          </button>
        </form>
      </div>
    </div>
  );
}
