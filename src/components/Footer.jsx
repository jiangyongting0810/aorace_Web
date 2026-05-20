import { Link } from "react-router-dom";

function SmartLink({ href, children }) {
  return href?.startsWith("/") ? <Link to={href}>{children}</Link> : <a href={href || "#"}>{children}</a>;
}

export function Footer({ t, navItems }) {
  return (
    <footer className="footer" id="support">
      <div>
        <h3>{t.footerExplore}</h3>
        {navItems.slice(0, 5).map((item) => (
          <SmartLink href={item.href || "/?scroll=best-sellers"} key={item.key}>{item.label}</SmartLink>
        ))}
      </div>
      <div>
        <h3>{t.footerService}</h3>
        {["Shipping & Return", "Warranty", "Pay Methods", "FAQ", "Contact Us"].map((item) => (
          <a href="#" key={item}>{item}</a>
        ))}
      </div>
      <div>
        <h3>{t.footerAbout}</h3>
        {["About Us", "Why Choose Us", "Customer Reviews", "Privacy Policy", "Wholesale"].map((item) => (
          <a href="#" key={item}>{item}</a>
        ))}
      </div>
      <div className="footer-signup">
        <h3>{t.signup}</h3>
        <form onSubmit={(event) => event.preventDefault()}>
          <input placeholder={t.email} type="email" />
          <button>{t.subscribe}</button>
        </form>
        <p>Facebook  Instagram  YouTube  TikTok</p>
        <small>© 2026 TideForge Fishing Tackle. Powered by Shopify-style commerce.</small>
      </div>
    </footer>
  );
}
