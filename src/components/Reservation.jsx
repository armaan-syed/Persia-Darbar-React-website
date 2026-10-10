import { useState } from "react";
import "./Reservation.css";

const INFO = [
  {
    label: "Visit Us",
    value: "12 Mall Road, Grand Heritage Plaza, Lahore",
    patchworkId: null,
  },
  {
    label: "Call to Reserve",
    value: "+92 300 123 4567",
    patchworkId: "contact-phone",
  },
  {
    label: "Opening Hours",
    value: "Daily · 12:00 PM – 12:00 AM",
    patchworkId: "opening-hours-text",
  },
];

export default function Reservation() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="section reservation">
      <div className="container reservation__grid">
        <div className="reservation__intro reveal">
          <span className="eyebrow">Reservations</span>
          <h2 className="section-title" data-patchwork-id="reservation-heading">
            Reserve Your Table
          </h2>
          <div className="divider" />
          <p className="reservation__text">
            Join us for an evening of Chinese finesse and Mughlai indulgence.
            Book in advance for weekends and special occasions, and let us
            take care of the rest.
          </p>

          <ul className="reservation__info">
            {INFO.map((item) => (
              <li key={item.label}>
                <span className="reservation__dot" aria-hidden="true" />
                <div>
                  <strong>{item.label}</strong>
                  <p
                    {...(item.patchworkId
                      ? { "data-patchwork-id": item.patchworkId }
                      : {})}
                  >
                    {item.value}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div className="reservation__form-card reveal">
          {sent ? (
            <div className="reservation__success">
              <div className="reservation__success-icon">✦</div>
              <h3>Thank You!</h3>
              <p>
                Your table request has been received. Our team will call you
                shortly to confirm your reservation.
              </p>
              <button
                className="btn btn--maroon"
                onClick={() => setSent(false)}
              >
                Make Another Booking
              </button>
            </div>
          ) : (
            <form className="reservation__form" onSubmit={handleSubmit}>
              <h3>Book a Table</h3>
              <div className="reservation__row">
                <label>
                  <span>Full Name</span>
                  <input type="text" name="name" placeholder="Your name" required />
                </label>
                <label>
                  <span>Phone</span>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="+92 300 000 0000"
                    required
                  />
                </label>
              </div>

              <div className="reservation__row">
                <label>
                  <span>Date</span>
                  <input type="date" name="date" required />
                </label>
                <label>
                  <span>Time</span>
                  <input type="time" name="time" required />
                </label>
              </div>

              <div className="reservation__row">
                <label>
                  <span>Guests</span>
                  <select name="guests" defaultValue="2">
                    <option value="1">1 Guest</option>
                    <option value="2">2 Guests</option>
                    <option value="3">3 Guests</option>
                    <option value="4">4 Guests</option>
                    <option value="5">5 Guests</option>
                    <option value="6">6+ Guests</option>
                  </select>
                </label>
                <label>
                  <span>Occasion</span>
                  <select name="occasion" defaultValue="Casual Dining">
                    <option>Casual Dining</option>
                    <option>Birthday</option>
                    <option>Anniversary</option>
                    <option>Business Dinner</option>
                  </select>
                </label>
              </div>

              <label className="reservation__full">
                <span>Special Requests</span>
                <textarea
                  name="message"
                  rows="3"
                  placeholder="Seating preference, allergies, celebrations…"
                />
              </label>

              <button
                type="submit"
                className="btn btn--gold reservation__submit"
                data-patchwork-id="reservation-submit"
              >
                Confirm Reservation
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
