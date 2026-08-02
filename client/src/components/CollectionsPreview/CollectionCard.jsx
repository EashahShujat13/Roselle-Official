export default function CollectionCard({
  title,
  image,
}) {

  return (

    <div
      className="
      group
      overflow-hidden
      rounded-[30px]
      cursor-pointer
      "
    >

      <img
        src={image}
        alt={title}
        className="
        h-[380px]
        w-full
        object-cover
        duration-500
        group-hover:scale-110
        "
      />

      <div className="mt-5 text-center">

        <h3
          className="
          text-2xl
          font-['Cormorant_Garamond']
          text-[#5E4B7A]
          "
        >
          {title}
        </h3>

      </div>

    </div>

  );

}