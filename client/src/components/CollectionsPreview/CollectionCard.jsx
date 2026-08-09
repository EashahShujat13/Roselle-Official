export default function CollectionCard({
  title,
  image,
}) {
  return (
    <div className="group cursor-pointer">

      <div className="relative overflow-hidden">

        <img
          src={image}
          alt={title}
          className="
          w-full
          h-[480px]
          object-cover
          transition-transform
          duration-[900ms]
          group-hover:scale-105
          "
        />

        <div
          className="
          absolute
          inset-0
          bg-gradient-to-t
          from-[#3f3150]/60
          via-transparent
          to-transparent
          opacity-0
          group-hover:opacity-100
          transition
          duration-500
          "
        />

        <div
          className="
          absolute
          bottom-7
          left-7
          text-white
          opacity-0
          group-hover:opacity-100
          transition
          duration-500
          "
        >

          <p className="uppercase tracking-[4px] text-xs">
            Explore
          </p>

        </div>

      </div>


      <div className="flex items-center justify-between mt-5">

        <h3
          className="
          text-3xl
          font-['Cormorant_Garamond']
          text-[#5E4B7A]
          "
        >
          {title}
        </h3>

        <span className="text-[#B48CF0] text-xl">
          →
        </span>

      </div>

    </div>
  );
}