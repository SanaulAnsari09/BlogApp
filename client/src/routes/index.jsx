import React, { lazy } from "react";
import { Routes, Route } from "react-router-dom";
const Signup = lazy(() => import("../pages/Signup/index"));
const Login = lazy(() => import("../pages/Login/index"));
const Home = lazy(() => import("../pages/Home/index"));
import ProtectedRoute from "../component/ProtectedRoute";
import Category from "../pages/Category";
import CreateBlog from "../pages/CreateBlog";
import Post from "../pages/Post";
import Blog from "../pages/Blog";
import Profile from "../pages/Profile/index";
import SingleCategoryList from "../pages/Category/SigleCategoryList";

const index = () => {
  const allRoutes = [
    {
      path: "/",
      component: <Home />,
    },
    {
      path: "/blog",
      component: <Blog />,
    },
    {
      path: "/category",
      component: <Category />,
    },
    {
      path: "/category/:catt",
      component: <SingleCategoryList />,
    },
    {
      path: "/createblog",
      component: <CreateBlog />,
    },
    {
      path: "/posts",
      component: <Post />,
    },
    {
      path: "/profile",
      component: <Profile />,
    },
  ];

  return (
    <Routes>
      <Route path="/signup" element={<Signup />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route element={<ProtectedRoute />}>
        {allRoutes?.map((route, ind) => {
          return (
            <Route
              path={route.path}
              element={route.component}
              key={ind}
            ></Route>
          );
        })}
      </Route>
    </Routes>
  );
};

export default index;
