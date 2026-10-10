import { useEffect, useState } from "react";
import "./Navbar.css";

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Menu", href: "#menu" },
  { label: "Chef’s Special", href: "#chef" },
  { label: "Reviews", href: "#reviews" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        <a
          href="#home"
          className="brand"
          data-patchwork-id="navbar-brand"
          onClick={() => setOpen(false)}
        >
          <span className="brand__mark">PD</span>
          <span className="brand__text">
            <strong>Persia Darbar</strong>
            <em>Chinese &amp; Mughlai</em>
          </span>
        </a>

        <nav className={`nav ${open ? "nav--open" : ""}`}>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav__link"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            className="btn btn--gold nav__cta"
            data-patchwork-id="navbar-cta"
            onClick={() => setOpen(false)}
          >
            Book a Table
          </a>
        </nav>

        <button
          className={`burger ${open ? "burger--open" : ""}`}
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
