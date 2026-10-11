import "./Hero.css";

export default function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero__bg" />
      <div className="hero__overlay" />

      <div className="container hero__inner">
        <p className="hero__eyebrow reveal">Est. 1994 · Lahore · Dubai</p>

        <h1 className="hero__title reveal" data-patchwork-id="hero-heading">
          Persia <span>Darbar</span>
        </h1>

        <div className="hero__rule reveal" />

        <p
          className="hero__tagline reveal"
          data-patchwork-id="hero-tagline"
        >
          Authentic Chinese &amp; Mughlai Flavours, Served with Royal Hospitality
        </p>

        <p className="hero__lead reveal" data-patchwork-id="hero-description">
          Where the delicate artistry of Chinese cuisine meets the royal
          richness of Mughlai cooking — served in an ambience of warmth,
          heritage, and quiet luxury.
        </p>

        <div className="hero__actions reveal">
          <a
            href="#contact"
            className="btn btn--gold"
            data-patchwork-id="hero-reservation-cta"
          >
            Book a Table
          </a>
          <a href="#menu" className="btn btn--outline">
            View Menu
          </a>
        </div>

        <div className="hero__stats reveal">
          <div className="hero__stat">
            <strong>30+</strong>
            <span>Years of Legacy</span>
          </div>
          <div className="hero__stat">
            <strong>120+</strong>
            <span>Signature Dishes</span>
          </div>
          <div className="hero__stat">
            <strong>4.9</strong>
            <span>Guest Rating</span>
          </div>
        </div>
      </div>

      <a href="#about" className="hero__scroll" aria-label="Scroll to about">
        <span />
      </a>
    </section>
  );
}
