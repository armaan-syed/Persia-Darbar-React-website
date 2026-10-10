import "./About.css";

const HIGHLIGHTS = [
  {
    title: "Traditional Recipes",
    text: "Family recipes passed down through generations, cooked slow and true to their origins.",
  },
  {
    title: "Warm Hospitality",
    text: "Every guest is welcomed like family — attentive service with genuine warmth.",
  },
  {
    title: "Premium Ingredients",
    text: "Hand-picked spices, fresh produce, and the finest cuts, sourced with care.",
  },
];

export default function About() {
  return (
    <section id="about" className="section section--cream about">
      <div className="container about__grid">
        <div className="about__media reveal">
          <div className="about__img about__img--tall">
            <img
              src="https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=900&q=80"
              alt="Signature Mughlai dish being prepared"
              loading="lazy"
            />
          </div>
          <div className="about__img about__img--small">
            <img
              src="https://images.unsplash.com/photo-1552566626-52f8b828add9?auto=format&fit=crop&w=700&q=80"
              alt="Elegant dining room interior"
              loading="lazy"
            />
          </div>
          <div className="about__badge">
            <strong>30</strong>
            <span>Years of Taste</span>
          </div>
        </div>

        <div className="about__content reveal">
          <span className="eyebrow">Our Story</span>
          <h2 className="section-title">
            A Legacy of Flavour, Served with Pride
          </h2>
          <div className="divider" />
          <p className="about__text">
            Persia Darbar was born from a simple belief — that great food is a
            celebration. For three decades we have brought together the refined
            balance of Chinese cooking and the regal depth of Mughlai cuisine
            under one elegant roof.
          </p>
          <p className="about__text">
            Our chefs honour age-old techniques: hand-pounded masalas, slow
            simmering gravies, and wok-fired specialities prepared over a
            roaring flame. From the first aroma to the final bite, every dish is
            crafted to feel like home, only finer.
          </p>

          <ul className="about__list">
            {HIGHLIGHTS.map((item) => (
              <li key={item.title}>
                <span className="about__check" aria-hidden="true">
                  ✦
                </span>
                <div>
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              </li>
            ))}
          </ul>

          <a href="#chef" className="btn btn--maroon about__btn">
            Discover Our Kitchen
          </a>
        </div>
      </div>
    </section>
  );
}
