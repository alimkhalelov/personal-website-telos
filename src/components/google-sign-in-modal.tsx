"use client";

import * as React from "react";
import { X, ShieldCheck, CheckCircle2, KeyRound, ExternalLink, Sparkles, AlertCircle } from "lucide-react";
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
  const { 
    isAuthModalOpen, 
    closeAuthModal, 
    user, 
    isAdmin, 
    logout,
    googleClientId,
    isGoogleScriptLoaded,
    loginWithGoogleCredential,
    loginWithDevFastPass,
    setRuntimeGoogleClientId
  } = useAuth();

  const googleBtnContainerRef = React.useRef<HTMLDivElement>(null);
  const [clientIdInput, setClientIdInput] = React.useState(googleClientId);
  const [showConfig, setShowConfig] = React.useState(false);

  // Close on Escape
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

  // Render official Google Identity Services button if script & client ID ready
  React.useEffect(() => {
    if (!isAuthModalOpen || !isGoogleScriptLoaded || !googleClientId || user) return;

    try {
      if (window.google?.accounts?.id && googleBtnContainerRef.current) {
        googleBtnContainerRef.current.innerHTML = "";
        window.google.accounts.id.initialize({
          client_id: googleClientId,
          callback: (response: { credential: string }) => {
            loginWithGoogleCredential(response.credential);
          },
        });
        window.google.accounts.id.renderButton(googleBtnContainerRef.current, {
          type: "standard",
          theme: "outline",
          size: "large",
          shape: "pill",
          text: "signin_with",
          logo_alignment: "left",
          width: 320,
        });
      }
    } catch (err) {
      console.error("Error rendering Google Sign-In button:", err);
    }
  }, [isAuthModalOpen, isGoogleScriptLoaded, googleClientId, user, loginWithGoogleCredential]);

  if (!isAuthModalOpen) return null;

  const handleSaveClientId = (e: React.FormEvent) => {
    e.preventDefault();
    if (clientIdInput.trim()) {
      setRuntimeGoogleClientId(clientIdInput.trim());
      setShowConfig(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/75 backdrop-blur-md animate-in fade-in duration-200"
        onClick={closeAuthModal}
      />

      {/* Modal Dialog */}
      <div 
        role="dialog"
        aria-modal="true"
        aria-label="Google Authentication"
        className="relative w-full max-w-md rounded-3xl bg-neutral-900/95 border border-white/15 p-6 sm:p-7 shadow-[0_24px_72px_rgba(0,0,0,0.6)] backdrop-blur-2xl text-white flex flex-col gap-6 animate-in zoom-in-95 fade-in duration-200 z-10"
      >
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center border border-white/10">
              <GoogleLogoIcon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-white">Google Identity Services</h2>
              <p className="text-xs text-white/50">Official OAuth 2.0 Cryptographic Auth</p>
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

        {/* Status: Logged in */}
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
                <div className="flex items-center gap-1.5 pt-0.5 text-[10px] text-white/40">
                  <span>Provider:</span>
                  <span className="font-mono text-emerald-400 uppercase">{user.provider || "google"}</span>
                  {user.token && <span>· Cryptographically Signed JWT</span>}
                </div>
              </div>
            </div>

            {isAdmin && (
              <div className="flex items-start gap-2.5 text-xs text-emerald-300/90 bg-emerald-950/30 p-3 rounded-xl border border-emerald-800/30 leading-relaxed">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>
                  Admin privileges verified. All unreleased projects, articles, and wiki nodes are rendered in semi-transparent mode.
                </span>
              </div>
            )}

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={closeAuthModal}
                className="flex-1 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-medium transition-colors cursor-pointer"
              >
                Close
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
          <div className="flex flex-col gap-5">
            {/* Real Official Google Button Container */}
            {googleClientId ? (
              <div className="flex flex-col items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/10">
                <div className="text-xs text-white/70 font-medium">Official Google OAuth 2.0:</div>
                <div ref={googleBtnContainerRef} className="min-h-[44px] flex items-center justify-center" />
                <div className="text-[11px] text-white/40 text-center">
                  Client ID: <span className="font-mono text-white/60">{googleClientId.slice(0, 16)}...</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-3 p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200/90 text-xs">
                <div className="flex items-center gap-2 font-medium text-amber-300">
                  <AlertCircle className="w-4 h-4" />
                  <span>Real Google OAuth Setup</span>
                </div>
                <p className="leading-relaxed text-[11.5px] text-amber-200/80">
                  To enable live Google login popups on your domain and localhost, Google requires a <strong>Google Cloud Client ID</strong> in <code className="bg-amber-950/50 px-1 py-0.5 rounded font-mono text-amber-300">NEXT_PUBLIC_GOOGLE_CLIENT_ID</code>.
                </p>
                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setShowConfig(!showConfig)}
                    className="text-[11px] underline text-amber-300 hover:text-white transition-colors cursor-pointer"
                  >
                    {showConfig ? "Hide Client ID Input" : "Enter Google Client ID now →"}
                  </button>
                  <a
                    href="https://console.cloud.google.com/apis/credentials"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] text-amber-300 hover:text-white inline-flex items-center gap-1 underline ml-auto"
                  >
                    <span>GCP Console</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            )}

            {/* Custom Client ID Input */}
            {showConfig && (
              <form onSubmit={handleSaveClientId} className="flex flex-col gap-2 p-3 rounded-2xl bg-white/5 border border-white/10 text-xs">
                <label className="text-white/60 font-mono text-[11px]">Paste Google OAuth Client ID:</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    placeholder="xxxx-xxxx.apps.googleusercontent.com"
                    value={clientIdInput}
                    onChange={(e) => setClientIdInput(e.target.value)}
                    className="flex-1 px-3 py-1.5 rounded-xl bg-white/5 border border-white/15 text-white text-xs placeholder:text-white/30 focus:outline-none focus:border-blue-400 font-mono"
                  />
                  <button
                    type="submit"
                    className="px-3 py-1.5 rounded-xl bg-blue-500 hover:bg-blue-600 text-white text-xs font-medium transition-colors cursor-pointer"
                  >
                    Save
                  </button>
                </div>
              </form>
            )}

            {/* Dev Fast-Pass for local convenience */}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => loginWithDevFastPass(ADMIN_EMAIL, "Alimzhan Khalelov")}
                className="w-full flex items-center justify-between p-3.5 rounded-2xl bg-white hover:bg-neutral-100 text-neutral-900 font-medium text-sm transition-all shadow-md active:scale-98 cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <GoogleLogoIcon className="w-5 h-5 shrink-0" />
                  <div className="flex flex-col text-left">
                    <span className="font-semibold text-neutral-900">Sign in as Admin (Fast-Pass)</span>
                    <span className="text-[11px] text-neutral-500">{ADMIN_EMAIL}</span>
                  </div>
                </div>
                <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-700 bg-emerald-50 px-2 py-1 rounded-lg">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>Admin</span>
                </div>
              </button>
              <p className="text-[11px] text-white/40 text-center px-1">
                Admin email <code className="text-white/60 font-mono">{ADMIN_EMAIL}</code> unlocks semi-transparent rendering for drafts &amp; private projects.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
