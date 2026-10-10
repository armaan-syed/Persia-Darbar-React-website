import "./ChefSpecial.css";

export default function ChefSpecial() {
  return (
    <section id="chef" className="section section--charcoal chef">
      <div className="container chef__grid">
        <div className="chef__media reveal">
          <img
            src="https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&w=1000&q=80"
            alt="Chef's special signature platter"
            loading="lazy"
          />
          <div className="chef__ribbon">
            <span>Chef’s</span>
            <strong>Special</strong>
          </div>
        </div>

        <div className="chef__content reveal">
          <span className="eyebrow">This Month’s Highlight</span>
          <h2
            className="section-title"
            data-patchwork-id="chef-special-heading"
          >
            Shahi Murgh Platter
          </h2>
          <div className="divider" />
          <p className="chef__text" data-patchwork-id="chef-special-description">
            Our Chef’s most-prized creation — a royal platter pairing
            saffron-infused Mughlai chicken with crisp, wok-charred Chinese
            greens. Slow-cooked for hours and finished at your table for a
            touch of theatre.
          </p>

          <ul className="chef__meta">
            <li>
              <span>Prep Time</span>
              <strong>30 mins</strong>
            </li>
            <li>
              <span>Serves</span>
              <strong>2–3 Guests</strong>
            </li>
            <li>
              <span>Price</span>
              <strong data-patchwork-id="chef-special-price">₹899</strong>
            </li>
          </ul>

          <div className="chef__actions">
            <a href="#contact" className="btn btn--gold">
              Book a Table
            </a>
            <a href="#menu" className="btn btn--outline">
              Explore Full Menu
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
