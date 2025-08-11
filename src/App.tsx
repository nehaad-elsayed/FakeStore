import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Cmponents/Layout/Layout";
import NotFound from "./Cmponents/NotFound/NotFound";
import { lazy, Suspense } from "react";
import LoadingSpinner from "./Cmponents/LoadingSpinner/LoadingSpinner";
import { ChakraProvider, createSystem } from "@chakra-ui/react";
import { Toaster } from "react-hot-toast";
// Lazy load components
const UserData = lazy(() => import("./Pages/UserData/UserData"));
const Home = lazy(() => import("./Pages/Home/Home"));
const Products = lazy(() => import("./Pages/Products/Products"));
const Contact = lazy(() => import("./Pages/Contact/Contact"));
const AddProduct = lazy(() => import("./Cmponents/AddProduct/AddProduct"));

const queryClient = new QueryClient();
const system = createSystem();

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/products",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: "/contact",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Contact />
          </Suspense>
        ),
      },
      {
        path: "/users",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <UserData />
          </Suspense>
        ),
      },
      {
        path: "/add-product",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AddProduct />
          </Suspense>
        ),
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

function App() {
  return (
    <>
      <ChakraProvider value={system}>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router} />
          <Toaster position="top-right" />
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ChakraProvider>
    </>
  );
}

export default App;
