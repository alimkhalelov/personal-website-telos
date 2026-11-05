"use client";

import * as React from "react";
import { X, ShieldCheck, UserCheck, ArrowRight, CheckCircle2 } from "lucide-react";
import { useAuth, ADMIN_EMAIL } from "./auth-context";

export function GoogleLogoIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );
}

export function GoogleSignInModal() {
  const { isAuthModalOpen, closeAuthModal, loginWithGoogle, user, isAdmin, logout } = useAuth();
  const [customEmail, setCustomEmail] = React.useState("");
  const [showCustomInput, setShowCustomInput] = React.useState(false);

  React.useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        closeAuthModal();
      }
    }
    if (isAuthModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isAuthModalOpen, closeAuthModal]);

  if (!isAuthModalOpen) return null;

  const handleAdminSignIn = () => {
    loginWithGoogle(ADMIN_EMAIL, "Alimzhan Khalelov");
  };

  const handleCustomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (customEmail.trim()) {
      loginWithGoogle(customEmail.trim(), customEmail.split("@")[0]);
      setCustomEmail("");
      setShowCustomInput(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md animate-in fade-in duration-200"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Google Sign In"
        className="relative w-full max-w-md rounded-3xl bg-neutral-900/90 border border-white/15 p-6 sm:p-7 shadow-[0_24px_72px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-white flex flex-col gap-6 animate-in zoom-in-95 fade-in duration-200 z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
              <GoogleLogoIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white">Google Sign-In</h2>
              <p className="text-xs text-white/50">Authenticate for administrative access</p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeAuthModal}
            className="p-2 rounded-xl text-white/60 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status if already logged in */}
        {user ? (
          <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30 font-bold text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="font-medium text-sm text-white truncate">{user.name}</span>
                  {isAdmin ? (
                    <span className="text-[10px] uppercase font-mono font-bold tracking-wider px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                      Admin
                    </span>
                  ) : (
                    <span className="text-[10px] uppercase font-mono font-medium tracking-wider px-2 py-0.5 rounded-md bg-white/10 text-white/60">
                      Guest
                    </span>
                  )}
                </div>
                <p className="text-xs text-white/50 truncate">{user.email}</p>
              </div>
            </div>

            {isAdmin && (
              <div className="flex items-start gap-2.5 text-xs text-emerald-300/90 bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/30 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Admin privileges active. All unreleased projects, articles, and wiki nodes are visible in semi-transparent mode.
                </span>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={closeAuthModal}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Done
              </button>
              <button
                type="button"
                onClick={() => {
                  logout();
                  closeAuthModal();
                }}
                className="py-2.5 px-4 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-300 text-xs font-medium border border-red-500/20 transition-colors cursor-pointer"
              >
                Sign Out
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            {/* Primary Action: 1-Click Google Sign In as Admin */}
            <button
              type="button"
              onClick={handleAdminSignIn}
              className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 font-medium text-sm transition-all shadow-md active:scale-98 cursor-pointer group"
            >
              <div className="flex items-center gap-3">
                <GoogleLogoIcon className="w-5 h-5 shrink-0" />
                <div className="flex flex-col text-left">
                  <span className="font-semibold text-neutral-900">Sign in with Google</span>
                  <span className="text-[11px] text-neutral-500">Continue as {ADMIN_EMAIL}</span>
                </div>
              </div>
              <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 group-hover:translate-x-0.5 transition-transform">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Admin</span>
              </div>
            </button>

            {/* Custom Google Email Accordion */}
            {!showCustomInput ? (
              <button
                type="button"
                onClick={() => setShowCustomInput(true)}
                className="text-xs text-white/50 hover:text-white/80 transition-colors text-center py-1 cursor-pointer"
              >
                Or sign in with another Google account →
              </button>
            ) : (
              <form onSubmit={handleCustomSubmit} className="flex flex-col gap-2.5 pt-2 border-t border-white/10">
                <label className="text-xs text-white/60">Enter Google Account Email:</label>
                <div className="flex gap-2">
                  <input
                    type="email"
                    required
                    placeholder="user@gmail.com"
                    value={customEmail}
                    onChange={(e) => setCustomEmail(e.target.value)}
                    className="flex-1 px-3.5 py-2 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-blue-400"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-xl bg-white/15 hover:bg-white/25 text-white text-xs font-medium transition-colors cursor-pointer flex items-center gap-1"
                  >
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </form>
            )}

            <div className="text-[11px] text-white/40 leading-relaxed text-center px-2">
              Admin email <code className="text-white/60 bg-white/5 px-1 py-0.5 rounded font-mono">{ADMIN_EMAIL}</code> grants visibility into private projects, drafts, and knowledge wiki graphs.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
