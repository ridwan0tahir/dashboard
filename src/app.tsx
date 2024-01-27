import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { MainLayout } from "@/components/layout";
import { ThemeProvider } from "@/providers/theme";
import Dashboard from "@/pages/dashboard";
import { HelmetProvider } from "react-helmet-async";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<Dashboard />} />
      <Route path="dashbord" element={<Dashboard />} />
    </Route>
  )
);

export default function App() {
  return (
    <HelmetProvider>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </HelmetProvider>
  );
}
