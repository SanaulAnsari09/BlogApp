import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { allCategoryList } from "../../endpoint";
import { axiosPost } from "../../axiosInstance";
import { NavLink } from "react-router-dom";

const Category = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategoryList = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosPost.get(allCategoryList);
      setPostList(data?.TotalPost || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  // Skeleton loader component
  const SkeletonLoader = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-md overflow-hidden animate-pulse"
        >
          <div className="h-48 bg-gray-200"></div>
          <div className="p-4">
            <div className="h-6 bg-gray-200 rounded mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-2/3"></div>
          </div>
        </div>
      ))}
    </div>
  );

  // Error state component
  if (error) {
    return (
      <Layout>
        <div className="w-full flex justify-center my-4">
          <div className="w-full max-w-[1200px] p-4">
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-center">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchCategoryList}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full flex justify-center my-16">
        <div className="w-full max-w-[1200px] px-4">
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Blog Categories
            </h1>
            <p className="text-gray-600">
              Explore our collection of articles organized by topic
            </p>
          </div>

          {loading ? (
            <SkeletonLoader />
          ) : (
            <>
              {postList.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-16 w-16 mx-auto"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                      />
                    </svg>
                  </div>
                  <h3 className="text-xl font-medium text-gray-700 mb-2">
                    No categories found
                  </h3>
                  <p className="text-gray-500">
                    There are no blog categories available at the moment.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {postList.map((post) => (
                    <NavLink
                      to={`/category/${post?.Category}`}
                      className="block group"
                      key={post?._id}
                    >
                      <div className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 h-full flex flex-col">
                        <div className="h-48 overflow-hidden">
                          <img
                            src={
                              post?.Image ||
                              "https://images.unsplash.com/photo-1575936123452-b67c3203c357?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D"
                            }
                            alt={post?.Category || "Category image"}
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <div className="p-6 flex flex-col flex-grow justify-between">
                          <h3 className="text-xl font-semibold text-gray-800 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                            {post?.Category || "Unnamed Category"}
                          </h3>
                          <div className="mt-4 flex justify-between items-center">
                            <span className="text-sm text-gray-500">
                              {post?.count || 0} articles
                            </span>
                            <span className="text-blue-600 group-hover:underline text-sm font-medium">
                              Explore →
                            </span>
                          </div>
                        </div>
                      </div>
                    </NavLink>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Category;
