import "./Reviews.css";

const REVIEWS = [
  {
    name: "Ayesha Khan",
    role: "Food Blogger",
    initials: "AK",
    text: "The Shangri-La platter and butter chicken were flawless. Hands down the finest blend of Chinese and Mughlai flavours I’ve had in years.",
  },
  {
    name: "Daniel Rodrigues",
    role: "Regular Guest",
    initials: "DR",
    text: "Elegant ambience, attentive staff, and a biryani that tastes like a royal celebration. Persia Darbar has become our family tradition.",
  },
  {
    name: "Priya Menon",
    role: "Celebrated Her Anniversary",
    initials: "PM",
    text: "We booked for our anniversary and they made it special — the service was warm and the Hakka noodles were perfectly smoky.",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" className="section reviews">
      <div className="container">
        <div className="center reviews__head reveal">
          <span className="eyebrow eyebrow--center">Guest Reviews</span>
          <h2 className="section-title">Loved by Our Guests</h2>
          <div className="divider divider--center" />
          <p className="section-subtitle">
            Over 4.9 stars from thousands of diners who keep coming back for
            more.
          </p>
        </div>

        <div className="reviews__grid">
          {REVIEWS.map((review, i) => (
            <figure
              key={review.name}
              className="review card reveal"
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              <div className="review__quote" aria-hidden="true">
                &ldquo;
              </div>
              <div className="review__stars" aria-label="5 out of 5 stars">
                ★★★★★
              </div>
              <blockquote>{review.text}</blockquote>
              <figcaption>
                <span className="review__avatar">{review.initials}</span>
                <span className="review__who">
                  <strong>{review.name}</strong>
                  <em>{review.role}</em>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
