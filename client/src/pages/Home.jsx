import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CollectionsPreview from "../components/CollectionsPreview/CollectionsPreview"
import FeaturedProducts from "../components/Products/FeaturedProducts";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />

      <Hero />

      <CollectionsPreview />

      <FeaturedProducts />

     

      <Footer />
    </>
  );
}