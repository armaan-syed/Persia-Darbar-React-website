import "./WhyChooseUs.css";

const REASONS = [
  {
    icon: "✦",
    title: "Authentic Recipes",
    text: "Time-honoured methods and hand-ground spices keep every dish true to its Chinese and Mughlai roots.",
  },
  {
    icon: "❖",
    title: "Premium Ingredients",
    text: "We source fresh produce, prime cuts, and imported aromatics — quality you can taste in every bite.",
  },
  {
    icon: "❁",
    title: "Warm Hospitality",
    text: "From the door to the last spoon, our team makes every visit feel personal, relaxed, and memorable.",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="section why">
      <div className="container">
        <div className="center why__head reveal">
          <span className="eyebrow eyebrow--center">Why Choose Us</span>
          <h2 className="section-title">The Persia Darbar Difference</h2>
          <div className="divider divider--center" />
          <p className="section-subtitle">
            Three decades of perfecting the craft — so that every table, every
            evening, feels unforgettable.
          </p>
        </div>

        <div className="why__grid">
          {REASONS.map((item, i) => (
            <article
              key={item.title}
              className="why__card reveal"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="why__icon" aria-hidden="true">
                {item.icon}
              </div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
