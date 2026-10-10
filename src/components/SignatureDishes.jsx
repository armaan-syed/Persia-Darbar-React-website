import "./SignatureDishes.css";

const DISHES = [
  {
    name: "Butter Chicken Darbari",
    cuisine: "Mughlai",
    price: "₹495",
    desc: "Char-grilled chicken simmered in a velvety tomato-cashew gravy, finished with cream and a hint of fenugreek.",
    img: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?auto=format&fit=crop&w=800&q=80",
    tag: "Chef’s Pick",
  },
  {
    name: "Dragon Chilli Prawns",
    cuisine: "Chinese",
    price: "₹620",
    desc: "Wok-tossed tiger prawns glazed in a smoky Szechuan sauce with bell peppers and spring onion.",
    img: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?auto=format&fit=crop&w=800&q=80",
    tag: "Spicy",
  },
  {
    name: "Murgh Dum Biryani",
    cuisine: "Mughlai",
    price: "₹540",
    desc: "Long-grain basmati layered with saffron, tender chicken, and fried onions, sealed and slow-cooked on dum.",
    img: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80",
    tag: "Signature",
  },
  {
    name: "Hakka Noodles Supreme",
    cuisine: "Chinese",
    price: "₹380",
    desc: "Silky hand-pulled noodles tossed with julienned vegetables and house sauces over high flame.",
    img: "https://images.unsplash.com/photo-1585032226651-759b368d7246?auto=format&fit=crop&w=800&q=80",
    tag: "Veg",
  },
];

const slugify = (name) =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export default function SignatureDishes() {
  return (
    <section id="menu" className="section signature">
      <div className="container">
        <div className="center signature__head reveal">
          <span className="eyebrow eyebrow--center">Signature Dishes</span>
          <h2
            className="section-title"
            data-patchwork-id="menu-section-heading"
          >
            Favourites From Our Kitchen
          </h2>
          <div className="divider divider--center" />
          <p className="section-subtitle">
            A curated selection where Chinese finesse meets Mughlai
            indulgence — each plate prepared fresh, to order.
          </p>
        </div>

        <div className="signature__grid">
          {DISHES.map((dish, i) => (
            <article
              key={dish.name}
              className="dish card reveal"
              style={{ animationDelay: `${i * 0.08}s` }}
            >
              <div className="dish__media">
                <img src={dish.img} alt={dish.name} loading="lazy" />
                <span className="dish__tag">{dish.tag}</span>
                <span className="dish__cuisine">{dish.cuisine}</span>
              </div>
              <div className="dish__body">
                <div className="dish__row">
                  <h3
                    data-patchwork-id={`menu-${slugify(dish.name)}-name`}
                  >
                    {dish.name}
                  </h3>
                  <span
                    className="dish__price"
                    data-patchwork-id={`menu-${slugify(dish.name)}-price`}
                  >
                    {dish.price}
                  </span>
                </div>
                <p>{dish.desc}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="center signature__foot">
          <a href="#contact" className="btn btn--gold">
            Reserve Your Table
          </a>
        </div>
      </div>
    </section>
  );
}
