import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { allPots } from "../../endpoint";
import { axiosPost } from "../../axiosInstance";
const dummyImage =
  "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";

const Blog = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);

  async function fetchAllPost() {
    try {
      setLoading(true);
      const { data } = await axiosPost.get(allPots);
      setPostList(data?.PostList);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchAllPost();
  }, []);

  return (
    <Layout>
      <div className="w-full flex justify-center my-4">
        <div className="w-full max-w-[1200px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {postList?.map((post) => {
              return (
                <div
                  className="min-h-70 w-full bg-gray-100 p-1 rounded-md flex flex-col justify-between"
                  key={post?._id}
                >
                  <div className="h-[60%] w-full rounded-sm">
                    <img
                      src={post?.Image || dummyImage}
                      alt="image"
                      className="w-full h-full object-fill rounded-sm"
                    />
                  </div>
                  <div className="h-[38%] w-full flex flex-col gap-1">
                    <h4 className="text-sm md:text-md lg:text-lg font-medium text-gray-700 leading-[16px] md:leading-[20px]">
                      {post?.Title}
                    </h4>
                    <p
                      className="text-ellipsis line-clamp-3 overflow-hidden 
                    leading-[14px] lg:leading-[20px] text-xs md:text-sm lg:text-md
                "
                    >
                      {post?.Description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
