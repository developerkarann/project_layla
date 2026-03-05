import { useState, useEffect } from "react";
import { apiGet } from "../../api/client";
import { getAdminToken, clearAdminToken } from "../../utils/adminAuth";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";

/**
 * Protects /admin: shows login if not authenticated, otherwise verifies token and shows dashboard.
 */
export default function AdminGate() {
  const [status, setStatus] = useState("loading"); // "loading" | "login" | "allowed"
  const [loginSuccessKey, setLoginSuccessKey] = useState(0); // force re-read token after login
  const token = getAdminToken();

  useEffect(() => {
    if (!token) {
      setStatus("login");
      return;
    }
    const verify = async () => {
      try {
        await apiGet("admin/verify");
        setStatus("allowed");
      } catch {
        clearAdminToken();
        setStatus("login");
      }
    };
    verify();
  }, [token, loginSuccessKey]);

  const handleLoginSuccess = () => {
    setStatus("loading");
    setLoginSuccessKey((k) => k + 1); // re-render so token = getAdminToken() picks up new value
  };

  if (status === "login") return <AdminLogin onLoginSuccess={handleLoginSuccess} />;
  if (status === "loading") {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-page-bg via-reiki-section-alt/20 to-page-bg">
        <p className="text-reiki-dark/70">Checking access…</p>
      </div>
    );
  }
  return <AdminDashboard />;
}
