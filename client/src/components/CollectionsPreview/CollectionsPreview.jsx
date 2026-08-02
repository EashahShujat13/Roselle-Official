import CollectionCard from "./CollectionCard";

import necklace from "../../assets/images/categories/cat2.jpeg";
import ring from "../../assets/images/categories/cat1.jpeg";
import bracelet from "../../assets/images/products/p3.jpeg";

export default function CollectionsPreview() {

  return (

    <section className="py-24 bg-white">

      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-14">

          <p className="
          uppercase
          tracking-[5px]
          text-[#B48CF0]
          ">
            Collections
          </p>

          <h2
            className="
            mt-3
            text-5xl
            font-['Cormorant_Garamond']
            text-[#5E4B7A]
            "
          >
            Discover Our Collections
          </h2>

        </div>

        <div
          className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-8
          "
        >

          <CollectionCard
            title="Necklaces"
            image={necklace}
          />

          <CollectionCard
            title="Bracelets"
            image={bracelet}
          />

          <CollectionCard
            title="Rings"
            image={ring}
          />

        </div>

      </div>

    </section>

  );

}