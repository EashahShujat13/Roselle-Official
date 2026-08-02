const categories = [

"All",

"Bracelets",

"Necklaces",

"Rings",

"Earrings",

];

export default function CategoryFilter(){

return(

<div
className="
max-w-7xl
mx-auto
px-6
pb-10
flex
flex-wrap
justify-center
gap-4
"
>

{

categories.map((item)=>(

<button

key={item}

className="
px-6
py-3
rounded-full
border
border-[#B48CF0]
text-[#5E4B7A]
hover:bg-[#B48CF0]
hover:text-white
duration-300
"

>

{item}

</button>

))

}

</div>

)

}