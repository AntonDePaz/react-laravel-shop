import Page403 from "../components/errors/Page403";
import Page404 from "../components/errors/Page404";
import About from "../components/frontend/About";
import Login from "../components/frontend/auth/Login";
import Register from "../components/frontend/auth/Register";
import Contact from "../components/frontend/Contact";
import Home from "../components/frontend/Home";
import ViewCategory from "../components/frontend/collections/ViewCategory";
import { ViewProduct } from "../components/frontend/collections/ViewProduct";
import { ProductDetails } from "../components/frontend/collections/ProductDetails";
import Cart from "../components/frontend/Cart";
import Checkout from "../components/frontend/Checkout";
import Thankyou from "../components/frontend/Thankyou";


const publicroute = [
    { path : '/' , exact : true , name : 'Home' , component : Home},
    { path : '/about' , exact : true , name : 'About', component: About},
    { path : '/contact' , exact : true , name : 'Contact', component: Contact},
    { path : '/page403' , exact : true , name : 'Page403', component: Page403},
    { path : '/page404' , exact : true , name : 'Page404', component: Page404},
    { path : '/login' , exact : true , name : 'Login', component: Login},
    { path : '/register' , exact : true , name : 'Register', component: Register},
    { path : '/collections' , exact : true , name : 'ViewCategory', component: ViewCategory},
    { path : '/collections/:slug' , exact : true , name : 'ViewProduct', component: ViewProduct},
    { path : '/collections/:category/:product' , exact : true , name : 'ProductDetails', component: ProductDetails},
    { path : '/cart' , exact : true , name : 'Cart', component: Cart},
    { path : '/checkout' , exact : true , name : 'Checkout', component: Checkout},
    { path : '/thankyou' , exact : true , name : 'Thankyou', component: Thankyou},
];

export default publicroute;