import React, { useEffect, useState } from "react";
import Layout from "../../../component/Layout";
import { NavLink, useLocation, useNavigate, useParams } from "react-router-dom";
import { axiosPost } from "../../../axiosInstance";
import { postListByCategory } from "../../../endpoint";

const SingleCategoryList = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { catt } = useParams();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const fetchSinleCategoryList = async () => {
    try {
      setLoading(true);
      const { data } = await axiosPost.get(
        `${postListByCategory}?category=${catt}`
      );
      setPostList(data?.PostList);
    } catch (error) {
      console.log("error", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSinleCategoryList();
  }, [catt]);

  const handleNavigate = (id) => {
    navigate(`${pathname}/post`, { state: { Id: id } });
  };

  // Format date function
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Loading skeleton component
  const LoadingSkeleton = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse"
        >
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            <div className="flex justify-between items-center mt-4">
              <div className="h-4 bg-gray-200 rounded w-1/3"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <Layout>
      <div className="w-full flex justify-center my-18">
        <div className="w-full max-w-[1250px]">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 capitalize">
              {catt}
            </h1>
            <p className="text-gray-600 mt-2">
              {postList.length} {postList.length === 1 ? "article" : "articles"}{" "}
              in this category
            </p>
          </div>

          {loading ? (
            <LoadingSkeleton />
          ) : postList.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {postList.map((post) => {
                // Extract plain text from HTML description for preview
                const plainText = post?.Description
                  ? post.Description.replace(/<[^>]*>/g, "").substring(0, 100) +
                    "..."
                  : "No description available";

                return (
                  <div
                    className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer transform hover:-translate-y-1 h-full flex flex-col"
                    key={post?._id}
                    onClick={() => handleNavigate(post?._id)}
                  >
                    <div className="h-48 w-full overflow-hidden">
                      <img
                        src={
                          post?.Image ||
                          `https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D`
                        }
                        alt={post?.Title}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                        onError={(e) => {
                          e.target.src =
                            "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D";
                        }}
                      />
                    </div>
                    <div className="p-4 flex flex-col flex-grow">
                      <h4 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {post?.Title}
                      </h4>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {plainText}
                      </p>
                      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          {post?.createdAt
                            ? formatDate(post.createdAt)
                            : "Date unknown"}
                        </span>
                        <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full capitalize">
                          {post?.Category || catt}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-5xl mb-4">📝</div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No posts found
              </h3>
              <p className="text-gray-500">
                There are no posts in this category yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default SingleCategoryList;
