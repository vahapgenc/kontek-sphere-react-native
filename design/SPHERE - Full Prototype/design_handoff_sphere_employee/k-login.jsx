// ============================================================
// k-login.jsx — Sign-in screen for the Kontek Sphere employee app
// Brand-led: forest hero + white form sheet. Exports to window.
// ============================================================
const { useState: useStateL } = React;

function LoginScreen({ onLogin }) {
  const [email, setEmail] = useStateL("sara.lindqvist@nordvik.se");
  const [pw, setPw] = useStateL("kontek2026");
  const [show, setShow] = useStateL(false);
  const [busy, setBusy] = useStateL(false);

  const canSubmit = email.trim().length > 0 && pw.length > 0 && !busy;

  function submit(method) {
    if (busy) return;
    setBusy(true);
    setTimeout(() => { onLogin && onLogin(); }, method === "bankid" ? 700 : 450);
  }

  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      background: "radial-gradient(70% 50% at 92% 22%, rgba(157,223,181,0.16) 0%, rgba(157,223,181,0.05) 40%, rgba(157,223,181,0) 64%), #203B3C", overflow: "hidden",
    }}>
      {/* ---------- Hero ---------- */}
      <div style={{
        flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "flex-start",
        justifyContent: "center", gap: 0,
        padding: "calc(env(safe-area-inset-top) + 36px) 28px 44px",
      }}>
        <div className="fade-up">
          <img src={window.__resources?.kontekLogoWhite || "kontek-logo-white.png"} alt="Kontek" style={{ height: 26, display: "block", marginBottom: 12 }} />
          <div style={{
            fontSize: "var(--t-eyebrow)", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--status-badge)", marginBottom: 5,
          }}>Sphere · Employee</div>
          <h1 style={{
            margin: 0, fontSize: 25, fontWeight: 700, letterSpacing: "-0.02em",
            lineHeight: 1.1, color: "var(--on-dark)",
          }}>Welcome back</h1>
          <p style={{
            margin: "6px 0 0", fontSize: "var(--t-body-sm)", lineHeight: 1.4,
            color: "#ffffff", maxWidth: 320,
          }}>Your pay, absence and expenses — all in one place.</p>
        </div>
      </div>

      {/* ---------- Form sheet ---------- */}
      <form
        onSubmit={(e) => { e.preventDefault(); if (canSubmit) submit("password"); }}
        style={{
          flex: 1, minHeight: 0, background: "var(--surface)",
          borderTopLeftRadius: "var(--r-sheet)", borderTopRightRadius: "var(--r-sheet)",
          padding: "20px 24px calc(env(safe-area-inset-bottom) + 16px)",
          display: "flex", flexDirection: "column", gap: 11, overflowY: "auto",
          boxShadow: "0 -8px 30px rgba(0,0,0,0.16)",
        }}>
        <h2 className="ds-h2" style={{ margin: 0 }}>Sign in</h2>

        <div className="ds-field">
          <label className="ds-label" htmlFor="login-email">Work email</label>
          <input id="login-email" type="email" className="ds-input" autoComplete="username"
            value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
        </div>

        <div className="ds-field">
          <label className="ds-label" htmlFor="login-pw">Password</label>
          <div style={{ display: "block", position: "relative" }}>
            <input id="login-pw" type={show ? "text" : "password"} className="ds-input"
              autoComplete="current-password" style={{ paddingRight: 70 }}
              value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
            <button type="button" onClick={() => setShow(s => !s)}
              style={{
                position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)",
                height: 36, padding: "0 12px", border: "none", background: "transparent",
                color: "var(--ink-3)", fontFamily: "var(--font)", fontSize: "var(--t-caption)",
                fontWeight: 600, cursor: "pointer", borderRadius: 8,
              }}>{show ? "Hide" : "Show"}</button>
          </div>
        </div>

        <div style={{ display: "flex", justifyContent: "flex-end", marginTop: -8 }}>
          <button type="button" className="ds-btn ds-btn--transparent"
            style={{ height: "auto", padding: "2px 2px", fontSize: "var(--t-body-sm)" }}>
            Forgot password?
          </button>
        </div>

        <button type="submit" className="ds-btn ds-btn--primary ds-btn--block"
          disabled={!canSubmit} style={{ marginTop: 2 }}>
          {busy ? "Signing in…" : "Sign in"}
        </button>

        {/* divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, color: "var(--ink-4)", margin: "0" }}>
          <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
          <span style={{ fontSize: "var(--t-caption)", fontWeight: 600 }}>or</span>
          <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
        </div>

        <button type="button" className="ds-btn ds-btn--secondary ds-btn--block"
          disabled={busy} onClick={() => submit("bankid")}>
          <Icon name="phone" size={20} /> Sign in with Mobile BankID
        </button>

        <div style={{ textAlign: "center", fontSize: "var(--t-caption)", color: "var(--ink-3)", marginTop: 2 }}>
          Trouble signing in? <span style={{ color: "var(--signature)", fontWeight: 600 }}>Contact your administrator</span>
        </div>
      </form>
    </div>
  );
}

Object.assign(window, { LoginScreen });
