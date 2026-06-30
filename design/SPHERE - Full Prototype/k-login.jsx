// ============================================================
// k-login.jsx — Sign-in screen for the Kontek Sphere employee app
// Two-step: (1) email → (2) password. Brand forest hero + white sheet.
// ============================================================
const { useState: useStateL } = React;

function LoginScreen({ onLogin }) {
  const [step, setStep] = useStateL("email");   // "email" | "password"
  const [email, setEmail] = useStateL("sara.lindqvist@nordvik.se");
  const [pw, setPw] = useStateL("kontek2026");
  const [show, setShow] = useStateL(false);
  const [busy, setBusy] = useStateL(false);

  const emailOk = /\S+@\S+\.\S+/.test(email.trim());
  const pwOk = pw.length > 0;

  function submit(method) {
    if (busy) return;
    setBusy(true);
    setTimeout(() => { onLogin && onLogin(); }, method === "bankid" ? 700 : 450);
  }

  const sheetStyle = {
    flex: 1, minHeight: 0, background: "var(--surface)",
    borderTopLeftRadius: "var(--r-sheet)", borderTopRightRadius: "var(--r-sheet)",
    padding: "20px 24px calc(env(safe-area-inset-bottom) + 16px)",
    display: "flex", flexDirection: "column", gap: 14, overflowY: "auto",
    boxShadow: "0 -10px 30px -8px rgba(32,59,60,0.16)",
  };

  return (
    <div style={{
      position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      background: "radial-gradient(130% 55% at 82% 0%, rgba(141,211,190,0.38) 0%, rgba(141,211,190,0) 58%), radial-gradient(120% 50% at 0% 12%, rgba(141,211,190,0.20) 0%, rgba(141,211,190,0) 50%), linear-gradient(180deg, #CFEAE2 0%, #E1F3EE 30%, #F1F8F6 66%, #FFFFFF 100%)", overflow: "hidden",
    }}>
      {/* ---------- Hero ---------- */}
      <div style={{
        flex: "0 0 auto", display: "flex", flexDirection: "column", alignItems: "flex-start",
        justifyContent: "center", gap: 0,
        padding: "calc(env(safe-area-inset-top) + 84px) 28px 68px",
      }}>
        <div className="fade-up">
          <img src={window.__resources?.kontekLogoWhite || "kontek-logo-white.png"} alt="Kontek" style={{ height: 22, display: "block", marginBottom: 14, filter: "brightness(0) invert(13%) sepia(56%) saturate(1200%) hue-rotate(106deg) brightness(95%) contrast(101%)" }} />
          <div style={{
            fontSize: "var(--t-eyebrow)", fontWeight: 700, letterSpacing: "0.18em",
            textTransform: "uppercase", color: "var(--green-deep)", marginBottom: 5,
          }}>Sphere · Employee</div>
          <h1 style={{
            margin: 0, fontSize: 25, fontWeight: 700, letterSpacing: "-0.02em",
            lineHeight: 1.1, color: "var(--signature)",
          }}>Welcome back</h1>
          <p style={{
            margin: "6px 0 0", fontSize: "var(--t-body-sm)", lineHeight: 1.4,
            color: "var(--ink-2)", maxWidth: 320,
          }}>Your pay, absence and expenses — all in one place.</p>
        </div>
      </div>

      {/* ---------- Step 1: email ---------- */}
      {step === "email" && (
        <form key="email" className="fade-up"
          onSubmit={(e) => { e.preventDefault(); if (emailOk) setStep("password"); }}
          style={sheetStyle}>
          <h2 className="ds-h2" style={{ margin: 0 }}>Sign in</h2>

          <div className="ds-field">
            <label className="ds-label" htmlFor="login-email">Work email</label>
            <input id="login-email" type="email" className="ds-input" autoComplete="username" autoFocus
              value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@company.com" />
          </div>

          <button type="submit" className="ds-btn ds-btn--primary ds-btn--block"
            disabled={!emailOk} style={{ marginTop: 2 }}>
            Continue
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
      )}

      {/* ---------- Step 2: password ---------- */}
      {step === "password" && (
        <form key="password" className="fade-up"
          onSubmit={(e) => { e.preventDefault(); if (pwOk) submit("password"); }}
          style={sheetStyle}>
          <button type="button" onClick={() => { setStep("email"); setBusy(false); }}
            style={{ alignSelf: "flex-start", display: "inline-flex", alignItems: "center", gap: 6, padding: "2px 2px", border: "none", background: "transparent", color: "var(--ink-3)", fontFamily: "var(--font)", fontSize: "var(--t-body-sm)", fontWeight: 600, cursor: "pointer", marginBottom: -2 }}>
            <Icon name="chevL" size={18} stroke="var(--ink-3)" /> Back
          </button>

          <h2 className="ds-h2" style={{ margin: 0 }}>Enter password</h2>

          {/* Signed-in-as chip */}
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 12px", background: "var(--surface-1)", border: "1px solid var(--line-2)", borderRadius: "var(--r-pill)", alignSelf: "flex-start", maxWidth: "100%" }}>
            <span style={{ width: 26, height: 26, borderRadius: 999, flexShrink: 0, display: "grid", placeItems: "center", background: "#053F22", color: "#fff" }}>
              <Icon name="user" size={15} stroke="#fff" />
            </span>
            <span style={{ fontSize: "var(--t-body-sm)", fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{email}</span>
          </div>

          <div className="ds-field">
            <label className="ds-label" htmlFor="login-pw">Password</label>
            <div style={{ display: "block", position: "relative" }}>
              <input id="login-pw" type={show ? "text" : "password"} className="ds-input"
                autoComplete="current-password" autoFocus style={{ paddingRight: 70 }}
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
            disabled={!pwOk || busy} style={{ marginTop: 2 }}>
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      )}
    </div>
  );
}

Object.assign(window, { LoginScreen });
