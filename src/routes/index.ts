import App from "@/App";
import AdminLayouts from "@/components/layouts/adminLayouts/AdminLayouts";
import About from "@/pages/About";
import Analytics from "@/pages/admin/Analytics";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import { createBrowserRouter } from "react-router";




// 
const router = createBrowserRouter([
    {
      Component:App,
      path:"/",
      children:[{
          Component:About,
          path:"about",
      }]
    },
    {
    Component:AdminLayouts,
    path:"/admin",
    children:[{
        Component:Analytics,
        path:"analytics"
    }],

    },
    {
      Component:Login,
      path:"/login"  
    },
    {
        Component:Register,
        path:"/register"
    },
    
])




export default router;
