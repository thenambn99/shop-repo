import React from "react";
import Layout from "@/layout/Layout";
import NotFoundPage from "@/modules/NotFound/NotFoundPage";
import { useRoutes, Navigate } from "react-router-dom";
import SplashScreen from "@/components/SplashScreen";
import { Suspense } from "react";
import ShoppingCart from "@/modules/Cart/page/ShoppingCart";
import Login from "@/modules/Login/page/Login";

const Home = React.lazy(() => import("@/modules/Home/page/Home"));
const About = React.lazy(() => import("@/modules/About/page/About"));
const Contact = React.lazy(() => import("@/modules/Contact/page/Contact"));
const Payment = React.lazy(() => import("@/modules/Payment/page/Payment"));
const Products = React.lazy(() => import("@/modules/Products/page/Products"));

const RootRoutes = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <Suspense fallback={<SplashScreen open={true} />}>
              <Home />
            </Suspense>
          ),
        },
        {
          path: "products",
          element: (
            <Suspense fallback={<SplashScreen open={true} />}>
              <Products />
            </Suspense>
          ),
        },
        {
          path: "shopping-cart",
          element: (
            <Suspense fallback={<SplashScreen open={true} />}>
              <ShoppingCart />
            </Suspense>
          ),
        },
        {
          path: "about",
          element: (
            <Suspense fallback={<SplashScreen open={true} />}>
              <About />
            </Suspense>
          ),
        },
        {
          path: "contact",
          element: (
            <Suspense fallback={<SplashScreen open={true} />}>
              <Contact />
            </Suspense>
          ),
        },
        {
          path: "login",
          element: <Login />,
        },
        {
          path: "register",
          element: <Login />,
        },
        {
          path: "payment",
          element: (
            <Suspense fallback={<SplashScreen open={true} />}>
              <Payment />
            </Suspense>
          ),
        },
      ],
    },
    {
      path: "/notfound",
      element: <NotFoundPage />,
    },
    {
      path: "*",
      element: <Navigate to="/notfound" replace />,
    },
  ]);
  return routes;
};

export default RootRoutes;
