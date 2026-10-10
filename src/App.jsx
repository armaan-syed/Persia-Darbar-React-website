import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import About from "./components/About.jsx";
import SignatureDishes from "./components/SignatureDishes.jsx";
import ChefSpecial from "./components/ChefSpecial.jsx";
import WhyChooseUs from "./components/WhyChooseUs.jsx";
import Reviews from "./components/Reviews.jsx";
import Reservation from "./components/Reservation.jsx";
import Footer from "./components/Footer.jsx";

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <SignatureDishes />
        <ChefSpecial />
        <WhyChooseUs />
        <Reviews />
        <Reservation />
      </main>
      <Footer />
    </>
  );
}

export default App;
