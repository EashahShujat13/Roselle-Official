import {
FaInstagram,
FaFacebookF,
FaPinterestP,
FaTwitter
} from "react-icons/fa";

export default function Footer() {

return (

<footer
className="
`bg-gradient-to-b`
from-[#f7f1ff]
to-[#e7d4ff]
mt-20
border-t
border-[#d7b7ff]
"
>

<div
className="
`max-w-[1400px]`
mx-auto
px-6
lg:px-16
py-20
"
>

<div
className="
grid
grid-cols-1
sm:grid-cols-2
lg:grid-cols-4
gap-12
"
>

{/* Brand */}

<div>

<h2
className="
text-[42px]
font-black
tracking-[8px]
text-[#b48cf0]
"
>

ROSELLE

</h2>

<p
className="
mt-5
leading-8
text-[#655b75]
"
>

Luxury jewelry crafted for
timeless elegance and
modern beauty.

Discover pieces designed
to elevate everyday style.

</p>

<div
className="
flex
gap-4
mt-8
"
>
<a
  href="https://www.instagram.com/roselle_official_pk/"
  target="_blank"
  rel="noopener noreferrer"
  className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:-translate-y-1 duration-300 cursor-pointer"
>
  <FaInstagram className="text-[#b48cf0]" />
</a>
<div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:-translate-y-1 duration-300 cursor-pointer">

<FaFacebookF className="text-[#b48cf0]" />

</div>

<div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:-translate-y-1 duration-300 cursor-pointer">

<FaTwitter className="text-[#b48cf0]" />

</div>

<div className="w-11 h-11 rounded-full bg-white flex items-center justify-center shadow-md hover:-translate-y-1 duration-300 cursor-pointer">

<FaPinterestP className="text-[#b48cf0]" />

</div>

</div>

</div>

{/* Shop */}

<div>

<h3
className="
font-bold
text-xl
text-[#7f56c7]
mb-6
"
>

Shop

</h3>

<div className="space-y-4 text-[#655b75]">

<p className="hover:text-[#b48cf0] cursor-pointer">
Bracelets
</p>

<p className="hover:text-[#b48cf0] cursor-pointer">
Necklaces
</p>

<p className="hover:text-[#b48cf0] cursor-pointer">
Rings
</p>

<p className="hover:text-[#b48cf0] cursor-pointer">
Collections
</p>

</div>

</div>

{/* Support */}

<div>

<h3
className="
font-bold
text-xl
text-[#7f56c7]
mb-6
"
>

Support

</h3>

<div className="space-y-4 text-[#655b75]">

<p className="hover:text-[#b48cf0] cursor-pointer">
Contact Us
</p>

<p className="hover:text-[#b48cf0] cursor-pointer">
Shipping
</p>

<p className="hover:text-[#b48cf0] cursor-pointer">
Returns
</p>

<p className="hover:text-[#b48cf0] cursor-pointer">
FAQs
</p>

</div>

</div>

{/* Newsletter */}

<div>

<h3
className="
font-bold
text-xl
text-[#7f56c7]
mb-6
"
>

Join Our Club

</h3>

<p
className="
text-[#655b75]
mb-5
"
>

Get updates and exclusive offers.

</p>

<div
className="
bg-white
rounded-xl
overflow-hidden
shadow-md
flex
"
>

<input
type="email"
placeholder="Enter email"
className="
flex-1
px-5
py-4
outline-none
"
/>

<button
className="
bg-[#b48cf0]
text-white
px-6
font-semibold
hover:bg-[#9f74e7]
duration-300
"
>

Join

</button>

</div>

</div>

</div>

{/* Bottom */}

<div
className="
border-t
border-[#d9c1ff]
mt-16
pt-8
flex
flex-col
md:flex-row
justify-between
items-center
gap-5
"
>

<p className="text-[#786b92]">

© 2026 ROSELLE — Designed with elegance

</p>

<div
className="
flex
gap-8
text-[#786b92]
"
>

<p className="cursor-pointer hover:text-[#b48cf0]">
Privacy
</p>

<p className="cursor-pointer hover:text-[#b48cf0]">
Terms
</p>

<p className="cursor-pointer hover:text-[#b48cf0]">
Support
</p>

</div>

</div>

</div>

</footer>

);

}