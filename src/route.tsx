import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Void } from "./pages/Void";
import { BlogHadoop } from "./pages/blogs/2022/hadoop";
import { BlogHive } from "@pages/blogs/2022/Hive";

const routes = [
  { path: "*", element: <Void /> },
  // { path: Pages.about, element: <About /> },
  { path: "/", element: <Home /> },
  { path: "/2022/hadoop", element: <BlogHadoop /> },
  { path: "/2022/hive", element: <BlogHive /> },
];

const PageRoutes = () => {
  return (
    <Routes>
      {routes.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}
    </Routes>
  );
};

export { PageRoutes, routes };
