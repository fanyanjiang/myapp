import Home from "../views/Home";
import Login from "../views/Login";
import First from "../views/Home/First";
import Setting from '../views/Home/Setting'
import Goods from "../views/Home/Goods";
import Transition from "../views/Home/Transition";
import Insurance from "../views/Home/Insurance";
import ChangeImg from "../views/Home/ChangeImg";
export const routes = [
    {
        path:'/',
        redirect: '/login'
    },
    {
        path:'/home',
        component:Home,
        
        children:[
            {
                path:'/home/first',
                component:First
            },
            {
                path:'/home/set',
                component:Setting
            },
            {
                path:'/home/goods',
                component:Goods
            },
            {
                path:'/home/transition',
                component:Transition
            },
            {
                path:'/home/insurance',
                component:Insurance
            },
            {
                path:'/home/changeimg',
                component:ChangeImg
            }
        ]
    },
    {
        path:'/login',
        component:Login
    }
]