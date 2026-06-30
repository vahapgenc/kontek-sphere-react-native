// ============================================================
// k-absence.jsx — Registrera frånvaro (absence) flow
// type → dates → (intyg om krävs) → påverkan → bekräfta → klart
// ============================================================
const { useState: useStateAb } = React;

function absenceImpact(typeId, days) {
  switch (typeId) {
    case "sick": {
      const karens = -890;
      const sjukavdrag = Math.round(-1010 * Math.max(0, days - 0));
      return {
        amount: karens + sjukavdrag,
        lines: [
          { label: "Waiting day deduction (once)", amount: karens },
          { label: `Sick deduction · ${days} ${days === 1 ? "day" : "days"}`, amount: sjukavdrag },
          { label: "Sick pay (days 2–14)", amount: Math.round(Math.max(0, days - 1) * 760), note: days > 1 ? undefined : "—" },
        ],
      };
    }
    case "vab": {
      const avd = Math.round(-1090 * days);
      return { amount: avd, lines: [
        { label: `Pay deduction · ${days} ${days === 1 ? "day" : "days"}`, amount: avd },
        { label: "Compensation via Social Insurance Agency", amount: 0, note: "Apply via the SIA" },
      ] };
    }
    case "vacation":
      return { amount: 0, lines: [
        { label: `Holiday days · ${days}`, amount: 0, note: `−${days} day` },
        { label: "Holiday pay", amount: 0, note: "Pay unchanged" },
      ] };
    case "parental": {
      const avd = Math.round(-1430 * days);
      return { amount: avd, lines: [
        { label: `Pay deduction · ${days} ${days === 1 ? "day" : "days"}`, amount: avd },
        { label: "Parental benefit", amount: 0, note: "Apply via SIA" },
      ] };
    }
    default: {
      const avd = Math.round(-1430 * days);
      return { amount: avd, lines: [{ label: `Pay deduction · ${days} ${days === 1 ? "day" : "days"}`, amount: avd }] };
    }
  }
}

function AbsenceFlow({ nav, store }) {
  const [step, setStep] = useStateAb(0);
  const [typeId, setTypeId] = useStateAb(null);
  const [dates, setDates] = useStateAb(null); // {start,end}
  const [attachment, setAttachment] = useStateAb(null);
  const [noAttach, setNoAttach] = useStateAb(false);
  const [done, setDone] = useStateAb(false);

  const type = ABSENCE_TYPES.find(t => t.id === typeId);
  const days = rangeDays(dates);
  const needsCert = type && type.needsCert === "after7" && days > 7;
  // build the dynamic step list
  const steps = ["type", "dates", ...(needsCert ? ["cert"] : []), "confirm"];
  const cur = steps[step];
  const total = steps.length;

  const impact = type ? absenceImpact(typeId, days) : null;

  function next() { setStep(s => Math.min(s + 1, total - 1)); }
  function back() { if (step === 0) nav.pop(); else setStep(s => s - 1); }

  function submit() {
    const m = MONTHS[5].slice(0, 3);
    store.addActivity({
      id: "a" + Date.now(), kind: "absence", icon: type.icon, title: type.label,
      sub: `${fmtRange(2026, 5, dates)} · ${days} ${days === 1 ? "day" : "days"}`,
      status: "pending", who: "Awaiting approval", amount: impact.amount,
    });
    setDone(true);
  }

  if (done) {
    const isVac = typeId === "vacation";
    return <Success
      title={`${type.label} registered`}
      status="pending"
      lines={[
        { text: <>A notification has been sent to <b>{store.ME.hrName}</b> for approval.</>, icon: "bell" },
        { text: `Period: ${fmtRange(2026, 5, dates)} (${days} ${days === 1 ? "day" : "days"}).`, icon: "calendar" },
        isVac
          ? { text: "Your pay is not affected – holiday pay is paid as usual.", icon: "wallet" }
          : { text: <>Affects the pay on {store.PERIOD.payday} by approx. <b>{kr(impact.amount)}</b>.</>, icon: "wallet" },
        needsCert && !attachment
          ? { text: "Don't forget to upload your certificate – otherwise sick pay may not be paid.", icon: "warn", tone: "warn" }
          : { text: "You can follow the status on the home page until it is approved.", icon: "clock" },
      ]}
      primaryLabel="Go to home"
      onPrimary={() => nav.go("home")}
      secondaryLabel="Register more"
      onSecondary={() => { setStep(0); setTypeId(null); setDates(null); setAttachment(null); setNoAttach(false); setDone(false); }}
    />;
  }

  // ---- per-step content ----
  let content, footer, title, kicker;

  if (cur === "type") {
    title = "What is the absence for?"; kicker = "Absence";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {ABSENCE_TYPES.map(t => (
          <OptionCard key={t.id} icon={t.icon} title={t.label} desc={t.desc} selected={typeId === t.id} onClick={() => setTypeId(t.id)}
            badge={t.needsCert === "after7" ? "May require certificate" : undefined} badgeTone="neutral" />
        ))}
      </div>
    );
    footer = <Button full size="lg" disabled={!typeId} onClick={next}>Continue</Button>;
  }

  else if (cur === "dates") {
    title = "Which days?"; kicker = type.label;
    const salaryNote = {
      sick: "A waiting day deduction is applied once at the start of the sick period. From day 2 you receive sick pay from your employer.",
      vab: "Your pay is reduced for child sick care days. You apply for compensation from the Social Insurance Agency yourself.",
      vacation: "Annual leave does not affect your net pay – you receive holiday pay instead of regular pay.",
      parental: "Your pay is reduced for the relevant days. Compensation is applied for separately via the Social Insurance Agency.",
      leave: "Your pay is reduced for the relevant days. Compensation is applied for separately via the Social Insurance Agency.",
    }[typeId];
    const certNote = type.needsCert === "after7"
      ? (type.id === "sick"
          ? <>For sick leave a <b>medical certificate is required from day 8</b>. {days > 7 ? "Your period is longer than 7 days – you will upload the certificate in the next step." : "Your period is within 7 days – no certificate needed."}</>
          : <>For child sick care a <b>certificate is required after day 7</b>. {days > 7 ? "Your period is longer than 7 days." : "No certificate needed for this period."}</>)
      : null;
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "2px 4px" }}>
          <span style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-2)" }}>Selected period</span>
          <span style={{ fontWeight: 700, fontSize: "var(--t-body-sm)" }}>{dates && dates.start != null ? `${fmtRange(2026, 5, dates)} · ${days} ${days === 1 ? "day" : "days"}` : "None selected"}</span>
        </div>
        <Calendar range value={dates} onChange={setDates} />
        <InfoNote tone={type.needsCert === "after7" && days > 7 ? "warn" : "info"} icon={type.needsCert === "after7" && days > 7 ? "warn" : "info"} title="How this affects your pay">
          {salaryNote}
          {certNote && <> {certNote}</>}
        </InfoNote>
      </div>
    );
    footer = <Button full size="lg" disabled={!dates || dates.start == null} onClick={next}>Continue</Button>;
  }

  else if (cur === "cert") {
    title = type.id === "sick" ? "Upload medical certificate" : "Upload certificate"; kicker = "Step required";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Attachment label={type.id === "sick" ? "Attach medical certificate" : "Attach certificate"} hint="PDF or photo · max 10 MB" value={attachment} onChange={(v) => { setAttachment(v); if (v) setNoAttach(false); }} />
        <button onClick={() => { setNoAttach(!noAttach); setAttachment(null); }} style={{ border: "none", background: "none", color: "var(--ink-3)", fontSize: "var(--t-body-sm)", fontWeight: 600, cursor: "pointer", fontFamily: "var(--font)", textAlign: "left", padding: "2px 4px", textDecoration: "underline", textUnderlineOffset: 3 }}>
          I don't have a certificate yet
        </button>
        <InfoNote tone="warn" icon="warn" title="Certificate required">
          Since the absence is longer than 7 days, a certificate must be attached for compensation to be paid out.
        </InfoNote>
        {noAttach && (
          <InfoNote tone="danger" icon="info" title="What happens then?">
            You can register the absence now, but <b>sick pay will not be paid</b> until the certificate is uploaded. You will find a reminder on the home page under <b>To do</b>.
          </InfoNote>
        )}
      </div>
    );
    footer = <Button full size="lg" disabled={!attachment && !noAttach} onClick={next}>{attachment ? "Continue" : "Continue without certificate"}</Button>;
  }

  else if (cur === "confirm") {
    title = "Does everything look right?"; kicker = "Confirm";
    content = (
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <Card pad={0}>
          <div style={{ padding: "4px 16px" }}>
            <SummaryRow label="Type" value={type.label} />
            <SummaryRow label="Period" value={`${fmtRange(2026, 5, dates)} · ${days} ${days === 1 ? "day" : "days"}`} />
            {needsCert && <SummaryRow label="Certificate" value={attachment ? attachment : "Missing – upload later"} tone={attachment ? "ok" : "warn"} />}
            <SummaryRow label="Pay impact" value={typeId === "vacation" ? "None (holiday pay)" : kr(impact.amount)} tone={typeId === "vacation" ? undefined : "danger"} last />
          </div>
        </Card>
        <InfoNote icon="bell" tone="info" title="When you confirm">
          A notification is sent to <b>{store.ME.hrName}</b> for approval. You can follow the status on the home page and make changes until it is approved.
        </InfoNote>
      </div>
    );
    footer = (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <Button full size="lg" onClick={submit}>Confirm & send for approval</Button>
        <Button full variant="secondary" onClick={() => nav.pop()}>Cancel</Button>
      </div>
    );
  }

  return <FlowShell onClose={() => nav.pop()} onBack={step > 0 ? back : null} step={step} total={total} title={title} kicker={kicker} footer={footer}>{content}</FlowShell>;
}

function SummaryRow({ label, value, tone, last }) {
  const colors = { ok: "var(--ok)", warn: "color-mix(in oklch,var(--warn),black 18%)", danger: "var(--danger)" };
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, padding: "12px 0", borderBottom: last ? "none" : "1px solid var(--line-2)" }}>
      <span style={{ fontSize: "var(--t-body-sm)", color: "var(--ink-3)", flexShrink: 0 }}>{label}</span>
      <span className="tnum" style={{ fontSize: "var(--t-body-sm)", fontWeight: 700, textAlign: "right", flex: 1, minWidth: 0, color: tone ? colors[tone] : "var(--ink)" }}>{value}</span>
    </div>
  );
}

Object.assign(window, { AbsenceFlow, SummaryRow, absenceImpact });
