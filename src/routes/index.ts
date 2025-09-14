import App from "@/App";
import AdminLayouts from "@/components/layouts/adminLayouts/AdminLayouts";
import About from "@/pages/About";
import Analytics from "@/pages/admin/Analytics";
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
    }]

    }
])




export default router;
