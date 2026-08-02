import {BrowserRouter,Routes,Route} from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/Auth";
import Shop from "../pages/Shop";
import ResetPassword from "../pages/ResetPassword";

export default function AppRoutes(){

return(

<BrowserRouter>

<Routes>

<Route
path="/"
element={<Home/>}
/>

<Route
path="/auth"
element={<Auth/>}
/>

<Route
path="/shop"
element={<Shop/>}
/>

<Route
  path="/reset-password/:token"
  element={<ResetPassword />}
/>

</Routes>

</BrowserRouter>

)

}