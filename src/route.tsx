import { Routes, Route } from "react-router-dom";
import { Home } from "./pages/Home";
import { Void } from "./pages/Void";
import { Hadoop } from "./pages/blogs/2022/Hadoop";
import { Hive } from "@pages/blogs/2022/Hive";
import { Kafka } from "@pages/blogs/2022/Kafka";
import { Spark } from "@pages/blogs/2022/Spark";
import { Tello } from "@pages/blogs/2022/Tello";
import { Kismet } from "@pages/blogs/2022/Kismet";

const routes = [
  { path: "*", element: <Void /> },
  // { path: Pages.about, element: <About /> },
  { path: "/", element: <Home /> },
  { path: "/2022/Hadoop", element: <Hadoop /> },
  { path: "/2022/Hive", element: <Hive /> },
  { path: "/2022/Kafka", element: <Kafka /> },
  { path: "/2022/Spark", element: <Spark /> },
  { path: "/2022/Tello", element: <Tello /> },
  { path: "/2022/Kismet", element: <Kismet /> },
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
