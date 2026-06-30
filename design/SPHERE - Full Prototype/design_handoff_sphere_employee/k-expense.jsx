// ============================================================
// k-expense.jsx — Registrera utlägg + Komplettera (complete) flows
// ============================================================
const { useState: useStateEx } = React;

const EXP_CATS = [
  { id: "park", label: "Parkering", icon: "receipt" },
  { id: "mat", label: "Supplies", icon: "receipt" },
  { id: "resa", label: "Travel / fuel", icon: "receipt" },
  { id: "rep", label: "Entertainment", icon: "receipt" },
  { id: "ovrigt", label: "Other", icon: "receipt" },
];

function ExpenseFlow({ nav, store }) {
  const [step, setStep] = useStateEx(0);
  const [amount, setAmount] = useStateEx("");
  const [cat, setCat] = useStateEx(null);
  const [desc, setDesc] = useStateEx("");
  const [receipt, setReceipt] = useStateEx(null);
  const [noReceipt, setNoReceipt] = useStateEx(false);
  const [done, setDone] = useStateEx(false);

  const steps = ["details", "confirm"];
  const cur = steps[step];
  const total = steps.length;
  const amt = parseInt(amount || "0", 10);
  const category = EXP_CATS.find(c => c.id === cat);

  function next() { setStep(s => Math.min(s + 1, total - 1)); }
  function back() { if (step === 0) nav.pop(); else setStep(s => s - 1); }

  // Simulate reading the receipt and auto-filling the rest of the form
  function onReceiptChange(v) {
    setReceipt(v);
    if (v) {
      setNoReceipt(false);
      if (!amount) setAmount("540");
      if (!cat) setCat("mat");
      if (!desc) setDesc("Materials at client visit");
    } else {
      // Kvitto removed → clear the auto-filled fields
      setAmount(""); setCat(null); setDesc("");
    }
  }

  function submit() {
    store.addActivity({
      id: "e" + Date.now(), kind: "expense", icon: "receipt",
      title: "Expense – " + (category ? category.label.toLowerCase() : "other"),
      sub: `June 8 · ${receipt ? "receipt attached" : "receipt missing"}`,
      status: receipt ? "pending" : "action", who: receipt ? "Awaiting approval" : "Receipt missing", amount: amt,
    });
    if (!receipt) {
      store.todos.push({ id: "et" + Date.now(), kind: "expense", title: "Expense missing receipt", sub: `${category ? category.label : "Expense"} · SEK ${amt}`, status: "action", cta: "Attach receipt" });
    }
    setDone(true);
  }

  if (done) {
    return <Success
      title={receipt ? "Expense registered" : "Expense saved"}
      status="pending"
      lines={receipt ? [
        { text: <>Notification sent to <b>{store.ME.hrName}</b> for approval.</>, icon: "bell" },
        { text: <>Will be paid on {store.PERIOD.payday}: <b>{kr(amt, { plus: true })}</b>.</>, icon: "wallet" },
        { text: "You can follow the status on the home page.", icon: "clock" },
      ] : [
        { text: "The expense is saved but cannot be paid out yet.", icon: "info", tone: "warn" },
        { text: <><b>No receipt = no payment.</b> Attach a receipt to get the expense paid.</>, icon: "warn", tone: "warn" },
        { text: "You can find it under To do on the home page.", icon: "clock" },
      ]}
      primaryLabel="Go to home"
      onPrimary={() => nav.go("home")}
      secondaryLabel="Register more"
      onSecondary={() => { setStep(0); setAmount(""); setCat(null); setDesc(""); setReceipt(null); setNoReceipt(false); setDone(false); }}
    />;
  }

  let content, footer, title, kicker;

  if (cur === "details") {
    title = "What is the expense for?"; kicker = "Expense";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        <div>
          <Attachment label="Upload receipt" hint="PDF eller foto · max 10 MB" value={receipt} onChange={onReceiptChange} />
          {receipt
            ? <div style={{ display: "flex", alignItems: "center", gap: 7, marginTop: 8, fontSize: "var(--t-caption)", color: "var(--ok)", fontWeight: 600 }}><Icon name="check" size={14} sw={2.5} /> We've filled in the details for you – please check they are correct.</div>
            : <button onClick={() => { setNoReceipt(!noReceipt); }} style={{ border: "none", background: "none", color: "var(--ink-3)", fontSize: "var(--t-caption)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font)", textAlign: "left", padding: "8px 4px 0", textDecoration: "underline", textUnderlineOffset: 3 }}>I don't have a receipt right now</button>}
        </div>
        <div>
          <label style={{ fontSize: "var(--t-caption)", fontWeight: 700, color: "var(--ink-2)" }}>Amount</label>
          <div style={{ display: "flex", alignItems: "center", marginTop: 8, background: "var(--surface)", border: "1.5px solid var(--line)", borderRadius: "var(--r-md)", padding: "0 16px" }}>
            <input inputMode="numeric" value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ""))} placeholder="0" style={{ flex: 1, border: "none", outline: "none", fontSize: "var(--t-display)", fontWeight: 700, padding: "14px 0", fontFamily: "var(--font)", letterSpacing: "-0.02em", background: "transparent", color: "var(--ink)" }} className="tnum" />
            <span style={{ fontSize: "var(--t-h2)", fontWeight: 700, color: "var(--ink-3)" }}>kr</span>
          </div>
        </div>
        <div>
          <label style={{ fontSize: "var(--t-caption)", fontWeight: 700, color: "var(--ink-2)" }}>Category</label>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
            {EXP_CATS.map(c => (
              <button key={c.id} onClick={() => setCat(c.id)} style={{ display: "inline-flex", alignItems: "center", gap: 7, padding: "10px 14px", borderRadius: "var(--r-pill)", cursor: "pointer", fontFamily: "var(--font)", fontSize: "var(--t-body-sm)", fontWeight: 600,
                border: cat === c.id ? "1.5px solid var(--brand-600)" : "1.5px solid var(--line)",
                background: cat === c.id ? "var(--brand-100)" : "var(--surface)", color: cat === c.id ? "var(--brand-700)" : "var(--ink-2)" }}>
                <Icon name={c.icon} size={17} /> {c.label}
              </button>
            ))}
          </div>
        </div>
        <div>
          <label style={{ fontSize: "var(--t-caption)", fontWeight: 700, color: "var(--ink-2)" }}>Description <span style={{ color: "var(--ink-3)", fontWeight: 500 }}>· optional</span></label>
          <input value={desc} onChange={e => setDesc(e.target.value)} placeholder="E.g. Parking at client visit" style={{ width: "100%", marginTop: 8, border: "1.5px solid var(--line)", borderRadius: "var(--r-md)", padding: "13px 16px", fontSize: "var(--t-body-sm)", fontFamily: "var(--font)", outline: "none", background: "var(--surface)", color: "var(--ink)" }} />
        </div>
        {!receipt && noReceipt && (
          <InfoNote tone="danger" icon="warn" title="No receipt – no payment">
            Without a receipt the expense cannot be paid out. You can save it now and attach a receipt later – it will appear under <b>To do</b> on the home page until then.
          </InfoNote>
        )}
        {receipt && (
          <InfoNote icon="info" title="How this affects your pay">
            Expenses are paid out <b>tax-free</b> with your pay. The amount therefore does not affect your tax.
          </InfoNote>
        )}
      </div>
    );
    footer = <Button full size="lg" disabled={!amt || !cat || (!receipt && !noReceipt)} onClick={next}>{receipt ? "Continue" : "Continue without receipt"}</Button>;
  }

  else if (cur === "confirm") {
    title = "Does everything look right?"; kicker = "Confirm";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card pad={0}>
          <div style={{ padding: "4px 16px" }}>
            <SummaryRow label="Amount" value={kr(amt)} />
            <SummaryRow label="Category" value={category.label} />
            {desc && <SummaryRow label="Description" value={desc} />}
            <SummaryRow label="Receipt" value={receipt ? receipt : "Missing – attach later"} tone={receipt ? "ok" : "warn"} last />
          </div>
        </Card>
        <InfoNote icon="bell" tone="info" title="When you confirm">
          {receipt ? <>The expense will be sent to <b>{store.ME.hrName}</b> for approval and paid out on the next pay.</>
            : <>The expense will be saved. It will not be paid out until you have attached a receipt.</>}
        </InfoNote>
      </div>
    );
    footer = (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Button full size="lg" onClick={submit}>{receipt ? "Confirm & send for approval" : "Save expense"}</Button>
        <Button full variant="secondary" onClick={() => nav.pop()}>Cancel</Button>
      </div>
    );
  }

  return <FlowShell onClose={() => nav.pop()} onBack={step > 0 ? back : null} step={step} total={total} title={title} kicker={kicker} footer={footer}>{content}</FlowShell>;
}

// ---------------- Komplettera (complete a pending item) ----------------
function CompleteFlow({ nav, store, params }) {
  const todo = store.todos.find(t => t.id === params.id);
  const [file, setFile] = useStateEx(null);
  const [done, setDone] = useStateEx(false);
  const [removedTitle, setRemovedTitle] = useStateEx(null);

  if (removedTitle) {
    return <Success
      title="Registration deleted"
      status="approved"
      lines={[
        { text: <><b>{removedTitle}</b> has been removed.</>, icon: "checkCirc" },
        { text: "It no longer affects your pay and is no longer in To do.", icon: "wallet" },
      ]}
      primaryLabel="Go to home" onPrimary={() => nav.go("home")}
    />;
  }

  if (!todo) { return <FlowShell onClose={() => nav.pop()} title="Not found"><div style={{ color: "var(--ink-3)" }}>This item no longer exists.</div></FlowShell>; }

  const isExpense = todo.kind === "expense";

  if (done) {
    return <Success
      title={isExpense ? "Receipt attached" : "Certificate uploaded"}
      status="pending"
      lines={[
        { text: isExpense ? <>Your expense is now complete and sent to <b>{store.ME.hrName}</b> for approval.</> : <>The certificate has been uploaded and sent to <b>{store.ME.hrName}</b>.</>, icon: "checkCirc" },
        { text: isExpense ? "The expense will be paid on the next pay." : "Sick pay can now be paid out as planned.", icon: "wallet" },
        { text: "The item has been removed from To do.", icon: "check" },
      ]}
      primaryLabel="Go to home" onPrimary={() => nav.go("home")}
    />;
  }

  function submit() { store.resolveTodo(todo.id, { status: "pending", who: "Awaiting approval" }); setDone(true); }
  function remove() { const tt = todo.title; store.removeTodo(todo.id); setRemovedTitle(tt); }

  return (
    <FlowShell onClose={() => nav.pop()} onBack={() => nav.pop()} title="Complete" footer={
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Button full size="lg" disabled={!file} onClick={submit}>Submit</Button>
        <Button full size="lg" variant="danger" onClick={remove}>Delete registration</Button>
      </div>
    }>
      <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
        <div style={{ width: 60, height: 60, borderRadius: 16, flexShrink: 0, display: "grid", placeItems: "center", background: "var(--shell-bg)", color: "#fff" }}>
          <Icon name={isExpense ? "receipt" : "calendar"} size={26} stroke="#fff" />
        </div>
        <div>
          <div style={{ fontSize: "var(--t-h2)", fontWeight: 700, letterSpacing: "-0.02em", lineHeight: 1.2 }}>{todo.title}</div>
          <div style={{ fontSize: "var(--t-body)", color: "var(--ink-3)", marginTop: 3 }}>{todo.sub}</div>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Attachment label={isExpense ? "Attach receipt" : "Upload medical certificate"} hint={isExpense ? "Take photo or choose file" : "PDF or photo · max 10 MB"} value={file} onChange={setFile} />
        <InfoNote tone="warn" icon="warn" title="Why is this needed?">{todo.detail}</InfoNote>
      </div>
    </FlowShell>
  );
}

Object.assign(window, { ExpenseFlow, CompleteFlow, EXP_CATS });
