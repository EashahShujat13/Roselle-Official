import Hero from "../components/Hero";
import CollectionsPreview from "../components/CollectionsPreview/CollectionsPreview";
import RoselleStory from "../components/RoselleStory/RoselleStory";
import FeaturedProducts from "../components/Products/FeaturedProducts";
import BeadsEditorial from "../components/BeadsEditorial/BeadsEditorial";
import Newsletter from "../components/Newsletter/Newsletter";


export default function Home() {
  return (
    <>
      <Hero />
      <CollectionsPreview />
      <RoselleStory />
      <FeaturedProducts />
      <BeadsEditorial />
      <Newsletter />
      
    </>
  );
}