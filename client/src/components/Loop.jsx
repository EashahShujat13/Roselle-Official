export default function Loop({ text = "Place ✦ Your ✦ Order ✦ Now ✦" }) {
  return (
    <div className="overflow-hidden w-full py-10">
      
      <div className="flex w-max animate-scroll">
        
        {/* First set */}
        <div className="flex gap-10 pr-10 whitespace-nowrap">
          <span className="text-2xl font-mono text-[#b48cf0]">{text}</span>
          <span className="text-2xl font-mono text-[#b48cf0]">{text}</span>
          <span className="text-2xl font-mono text-[#b48cf0]">{text}</span>
        </div>

        {/* Duplicate set (IMPORTANT for seamless loop) */}
        <div className="flex gap-10 pr-10 whitespace-nowrap">
          <span className="text-2xl font-mono text-[#b48cf0]">{text}</span>
          <span className="text-2xl font-mono text-[#b48cf0]">{text}</span>
          <span className="text-2xl font-mono text-[#b48cf0]">{text}</span>
        </div>

      </div>

      {/* Animation */}
      <style>{`
        .animate-scroll {
          animation: scroll 12s linear infinite;
        }

        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
      `}</style>

    </div>
  );
}