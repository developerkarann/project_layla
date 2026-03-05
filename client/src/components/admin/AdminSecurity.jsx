import { useState } from "react";
import { HiEye, HiEyeSlash } from "react-icons/hi2";
import toast from "react-hot-toast";
import { apiPut } from "../../api/client";

export default function AdminSecurity() {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [saving, setSaving] = useState(false);
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      toast.error("New password and confirmation do not match");
      return;
    }
    if (!newPassword || newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long");
      return;
    }
    setSaving(true);
    try {
      await apiPut("admin/password", { currentPassword, newPassword });
      toast.success("Admin password updated");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (err) {
      const msg = err?.message || "Failed to update password";
      toast.error(msg);
    } finally {
      setSaving(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-reiki-card-border bg-white px-4 py-3 text-sm text-reiki-body placeholder:text-reiki-muted focus:border-reiki-olive focus:outline-none focus:ring-2 focus:ring-reiki-olive/20";
  const labelClass = "mb-1.5 block text-sm font-medium text-reiki-dark";

  return (
    <div className="flex h-full flex-col bg-page-bg">
      <header className="shrink-0 border-b border-reiki-card-border bg-white/90 px-6 py-4 backdrop-blur-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-reiki-olive">
          Settings
        </p>
        <h1
          className="mt-1 text-2xl text-reiki-dark sm:text-3xl"
          style={{ fontFamily: "EB Garamond, serif" }}
        >
          Admin password
        </h1>
        <p className="mt-1 text-sm text-reiki-muted">
          Change the password required to access this admin dashboard.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-md rounded-2xl border border-reiki-card-border bg-white p-6 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="current-password" className={labelClass}>
                Current password
              </label>
              <div className="relative">
                <input
                  id="current-password"
                  type={showCurrent ? "text" : "password"}
                  autoComplete="current-password"
                  className={`${inputClass} pr-10`}
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  disabled={saving}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-reiki-dark/60 hover:text-reiki-dark"
                  tabIndex={-1}
                  aria-label={showCurrent ? "Hide current password" : "Show current password"}
                >
                  {showCurrent ? (
                    <HiEyeSlash className="h-4 w-4" aria-hidden />
                  ) : (
                    <HiEye className="h-4 w-4" aria-hidden />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="new-password" className={labelClass}>
                New password
              </label>
              <div className="relative">
                <input
                  id="new-password"
                  type={showNew ? "text" : "password"}
                  autoComplete="new-password"
                  className={`${inputClass} pr-10`}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled={saving}
                />
                <button
                  type="button"
                  onClick={() => setShowNew((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-reiki-dark/60 hover:text-reiki-dark"
                  tabIndex={-1}
                  aria-label={showNew ? "Hide new password" : "Show new password"}
                >
                  {showNew ? (
                    <HiEyeSlash className="h-4 w-4" aria-hidden />
                  ) : (
                    <HiEye className="h-4 w-4" aria-hidden />
                  )}
                </button>
              </div>
            </div>
            <div>
              <label htmlFor="confirm-password" className={labelClass}>
                Confirm new password
              </label>
              <div className="relative">
                <input
                  id="confirm-password"
                  type={showConfirm ? "text" : "password"}
                  autoComplete="new-password"
                  className={`${inputClass} pr-10`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  disabled={saving}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((v) => !v)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-reiki-dark/60 hover:text-reiki-dark"
                  tabIndex={-1}
                  aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
                >
                  {showConfirm ? (
                    <HiEyeSlash className="h-4 w-4" aria-hidden />
                  ) : (
                    <HiEye className="h-4 w-4" aria-hidden />
                  )}
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={saving}
              className="mt-2 w-full rounded-xl bg-reiki-olive px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:opacity-90 disabled:opacity-50"
            >
              {saving ? "Saving…" : "Update password"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
