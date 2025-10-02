import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { allPots } from "../../endpoint";
import { axiosPost } from "../../axiosInstance";
import { NavLink, useNavigate } from "react-router-dom";
import SkeletonLoader from "../../component/SkeletonLoader";

const Blog = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [totalRecords, setTotalRecords] = useState(0);

  const [sortBy, setSortBy] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const fetchAllPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosPost.get(
        `${allPots}?page=${page}&limit=${limit}`
      );
      setPostList(data?.PostList || []);
      setTotalPages(data?.TotalPage || 1);
      setTotalRecords(data?.TotalRecords || 0);
      setPage(data?.Page || 1);
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to load blog posts. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllPost();
  }, [page]);

  const handleNavigate = (id) => {
    navigate("/blog/post", { state: { Id: id } });
  };

  // Skeleton loader component

  // Format date function
  const formatDate = (dateString) => {
    if (!dateString) return "Unknown date";
    const options = { year: "numeric", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Truncate HTML content to plain text
  const stripHtml = (html) => {
    if (!html) return "";
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  return (
    <Layout>
      <div className="w-full flex justify-center my-16 min-h-[calc(100vh-120px)]">
        <div className="w-full max-w-[1250px]">
          {/* Header Section */}
          <div className="mb-8 text-center">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Blog Posts
            </h1>
            <p className="text-gray-600">
              Discover our latest articles and insights
            </p>
          </div>

          {/* Search and Filter Bar */}
          <div className="flex flex-col md:flex-row gap-4 mb-8 justify-between items-start md:items-center">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search blog posts..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors"
              />
              <svg
                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Results Count */}
          {!loading && (
            <div className="mb-4 text-sm text-gray-600">
              Showing {postList.length} of {totalRecords} posts
              {searchQuery && (
                <span>
                  {" "}
                  for "<strong>{searchQuery}</strong>"
                </span>
              )}
            </div>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center mb-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchAllPost}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          )}

          {/* Blog Posts Grid */}
          {loading ? (
            <SkeletonLoader />
          ) : postList.length === 0 ? (
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
                    d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-medium text-gray-700 mb-2">
                No posts found
              </h3>
              <p className="text-gray-500">
                {searchQuery
                  ? "Try adjusting your search query."
                  : "There are no blog posts available at the moment."}
              </p>
            </div>
          ) : (
            <React.Fragment>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {postList.map((post) => (
                  <div
                    key={post._id}
                    className="bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer h-full flex flex-col"
                    onClick={() => handleNavigate(post._id)}
                  >
                    <div className="h-48 overflow-hidden">
                      <img
                        src={post.Image}
                        alt={post.Title || "Blog post image"}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <div className="p-5 flex flex-col flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">
                        {post.Title || "Untitled Post"}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3 flex-grow">
                        {stripHtml(post.Description || "").substring(0, 120)}...
                      </p>
                      <div className="flex justify-between items-center mt-auto pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">
                          {formatDate(post.createdAt)}
                        </span>
                        <span className="text-blue-600 text-sm font-medium hover:underline">
                          Read more
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center items-center gap-4 mt-8">
                <button
                  disabled={page === 1}
                  onClick={() => setPage(page - 1)}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                  Prev
                </button>
                <span className="text-gray-700">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page === totalPages}
                  onClick={() => setPage(page + 1)}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Blog;
