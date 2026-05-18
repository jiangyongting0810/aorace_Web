export function CookiePanel({ t, setCookieConsent }) {
  return (
    <aside className="cookie-panel">
      <h3>{t.cookieTitle}</h3>
      <p>{t.cookieBody}</p>
      <div>
        <button onClick={() => setCookieConsent("accepted")}>{t.accept}</button>
        <button onClick={() => setCookieConsent("declined")}>{t.decline}</button>
      </div>
    </aside>
  );
}
