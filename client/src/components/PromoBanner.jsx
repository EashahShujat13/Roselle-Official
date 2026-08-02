import promo from "../assets/images/promo/promo.jpeg";

export default function PromoBanner(){

return(

<section
className="
bg-[#ead6ff]
my-20
"
>

<div
className="
`max-w-[1400px]`
mx-auto
grid
lg:grid-cols-2
items-center
"
>

<div
className="
p-10
lg:p-20
"
>

<p
className="
text-white
uppercase
text-2xl
font-semibold
mb-5
"
>

New Collection

</p>

<h2
className="
text-white
text-5xl
lg:text-7xl
font-black
leading-tight

"
>

ELEGANCE
IN STYLE

</h2>

<button
className="
bg-[#b48cf0]
mt-8
text-white
rounded-full
px-10
py-5
"
>

Shop Now

</button>

</div>

<div>

<img
src={promo}
className="
w-full
object-cover
"
/>

</div>

</div>

</section>

)

}