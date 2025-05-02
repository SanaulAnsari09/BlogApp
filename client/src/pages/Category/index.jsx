import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { allCategoryList } from "../../endpoint";
import { axiosPost } from "../../axiosInstance";
import { NavLink } from "react-router-dom";
const dummyImage =
  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";

const Category = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCategoryList = async () => {
    try {
      setLoading(true);
      const { data } = await axiosPost.get(allCategoryList);
      setPostList(data?.TotalPost);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  return (
    <Layout>
      <div className="w-full flex justify-center my-4">
        <div className="w-full max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {postList?.map((post) => {
              return (
                <NavLink
                to={`/category/${post?.Category}`}
                  className="min-h-50 w-full bg-gray-100 p-1 rounded-md flex flex-col justify-between"
                  key={post?._id}
                >
                  <div className="h-[80%] w-full rounded-sm">
                    <img
                      src={post?.Image || dummyImage}
                      alt="image"
                      className="w-full h-full object-fill rounded-sm"
                    />
                  </div>
                  <div className="h-[15%] w-full flex flex-col gap-2">
                    <h4 className="text-center text-md md:text-lg lg:text-xl font-bold text-gray-700 leading-[16px] md:leading-[20px] uppercase">
                      {post?.Category}
                    </h4>
                  </div>
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
