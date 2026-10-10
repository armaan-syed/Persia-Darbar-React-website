import "./Footer.css";

const QUICK_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Chef’s Special", href: "#chef" },
  { label: "Reviews", href: "#reviews" },
  { label: "Reservations", href: "#contact" },
];

const SOCIALS = [
  {
    label: "Instagram",
    href: "https://instagram.com",
    path: "M12 2.2c3.2 0 3.6 0 4.9.07 1.17.05 1.8.25 2.22.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.05.41 2.22.07 1.27.07 1.65.07 4.85s0 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.22-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.05.36-2.22.41-1.27.07-1.65.07-4.9.07s-3.63 0-4.9-.07c-1.17-.05-1.8-.25-2.22-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.05-.41-2.22C2.2 15.6 2.2 15.2 2.2 12s0-3.6.07-4.87c.05-1.17.25-1.8.41-2.22.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.05-.36 2.22-.41C8.42 2.2 8.8 2.2 12 2.2Zm0 4.6a5.2 5.2 0 1 0 0 10.4 5.2 5.2 0 0 0 0-10.4Zm0 8.58a3.38 3.38 0 1 1 0-6.76 3.38 3.38 0 0 1 0 6.76Zm6.63-8.79a1.22 1.22 0 1 1-2.44 0 1.22 1.22 0 0 1 2.44 0Z",
  },
  {
    label: "Facebook",
    href: "https://facebook.com",
    path: "M13.5 21v-7.5h2.5l.5-3h-3V8.5c0-.87.24-1.5 1.5-1.5H17V4.2c-.35-.05-1.3-.15-2.4-.15-2.4 0-4.1 1.5-4.1 4.2v2.25H8v3h2.5V21h3Z",
  },
  {
    label: "X",
    href: "https://x.com",
    path: "M17.6 3h3l-6.55 7.5L21.8 21h-5.9l-4.2-5.5L6.9 21h-3l7-8L2.5 3h6l3.8 5.05L17.6 3Zm-1 16h1.6L8.1 4.7H6.4L16.6 19Z",
  },
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <div className="brand brand--footer">
            <span className="brand__mark">PD</span>
            <span className="brand__text">
              <strong>Persia Darbar</strong>
              <em>Chinese &amp; Mughlai</em>
            </span>
          </div>
          <p className="footer__about">
            Authentic Chinese &amp; Mughlai flavours, crafted with tradition and
            served with warmth since 1994.
          </p>
          <div className="footer__socials">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="footer__social"
                target="_blank"
                rel="noreferrer"
              >
                <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                  <path d={social.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="footer__col">
          <h4>Explore</h4>
          <ul>
            {QUICK_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Visit Us</h4>
          <ul className="footer__contact">
            <li>12 Mall Road, Grand Heritage Plaza, Lahore</li>
            <li>
              <a href="tel:+923001234567">+92 300 123 4567</a>
            </li>
            <li>
              <a href="mailto:hello@persiadarbar.com">
                hello@persiadarbar.com
              </a>
            </li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Opening Hours</h4>
          <ul className="footer__hours">
            <li>
              <span>Mon – Thu</span>
              <strong>12:00 PM – 11:30 PM</strong>
            </li>
            <li>
              <span>Fri – Sun</span>
              <strong>12:00 PM – 12:30 AM</strong>
            </li>
            <li>
              <span>Public Holidays</span>
              <strong>1:00 PM – 12:00 AM</strong>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bar">
        <div className="container footer__bar-inner">
          <p>© {new Date().getFullYear()} Persia Darbar. All rights reserved.</p>
          <p>Crafted with tradition · Chinese &amp; Mughlai Cuisine</p>
        </div>
      </div>
    </footer>
  );
}
