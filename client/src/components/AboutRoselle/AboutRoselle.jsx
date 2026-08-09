export default function AboutRoselle() {
  return (
    <section className="bg-white">

      <div className="max-w-7xl mx-auto px-6 py-32 md:py-44">

        <div className="grid lg:grid-cols-12 gap-12">

          {/* SMALL LABEL */}
          <div className="lg:col-span-3">

            <p className="uppercase tracking-[5px] text-xs text-[#B48CF0]">
              About Roselle
            </p>

          </div>


          {/* MAIN TEXT */}
          <div className="lg:col-span-9">

            <h2
              className="
              text-5xl
              md:text-7xl
              leading-[1]
              font-['Cormorant_Garamond']
              text-[#5E4B7A]
              "
            >
              Jewellery for the
              <br />
              beautifully individual.
            </h2>

            <p
              className="
              mt-10
              max-w-2xl
              text-[#655b75]
              leading-8
              text-base
              "
            >
              Roselle is a fine jewellery label inspired by colour,
              femininity and the beauty of individuality. From delicate
              everyday pieces to playful handmade beads, every collection
              is designed to bring a little more character to your style.
            </p>

            <button
              className="
              mt-10
              border-b
              border-[#5E4B7A]
              pb-2
              text-sm
              tracking-[3px]
              uppercase
              text-[#5E4B7A]
              hover:text-[#B48CF0]
              hover:border-[#B48CF0]
              transition
              "
            >
              Discover Roselle
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}