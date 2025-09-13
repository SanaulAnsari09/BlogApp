import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import PieCircleChart from "../../component/PieCircleChart";
import { axiosPost } from "../../axiosInstance";
import { allPostByUser, deletePostByUser } from "../../endpoint";
import { useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { notifySuccess } from "../../notifyMessage";
import { Toaster } from "react-hot-toast";

const Profile = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [activeDeleteId, setActiveDeleteId] = useState(null);
  const navigate = useNavigate();

  const authData = localStorage.getItem("authToken");
  const parsedAuth = JSON.parse(authData);

  async function fetchAllPost() {
    try {
      setLoading(true);
      const { data } = await axiosPost.get(allPostByUser);
      setPostList(data?.AllPosts || []);
    } catch (error) {
      console.log("allpost-err", error);
    } finally {
      setLoading(false);
    }
  }

  const statsData = [
    { name: "Posts", value: postList.length, color: "#0088FE" },
    { name: "Reads", value: 500, color: "#00C49F" },
    { name: "Reach", value: 3500, color: "#FFBB28" },
  ];

  useEffect(() => {
    fetchAllPost();
  }, []);

  const handleDeletePost = async (id) => {
    try {
      setIsDeleting(true);
      setActiveDeleteId(id);
      const { data } = await axiosPost.delete(`${deletePostByUser}/${id}`);

      if (data?.Success) {
        fetchAllPost();
        notifySuccess(data?.Message);
      }
    } catch (error) {
      console.log("delete-post-item", error);
    } finally {
      setIsDeleting(false);
      setActiveDeleteId(null);
    }
  };

  const handleUpdatePost = (data) => {
    navigate("/createblog", { state: data });
  };

  return (
    <Layout>
      <div className="w-full flex justify-center bg-gray-50 min-h-screen mt-16">
        <Toaster position="top-center" />
        <div className="w-full max-w-[1200px] py-8 px-4 md:px-6 min-h-[calc(100vh-150px)]">
          {/* Profile Header Section */}
          <div className="w-full flex flex-col md:flex-row gap-8 md:gap-10 items-center md:items-start mb-12">
            <div className="w-40 h-40 md:w-60 md:h-60 rounded-full overflow-hidden border-4 border-white shadow-lg">
              <img
                src={parsedAuth?.Profile || "/assets/user-profile.jpg"}
                className="w-full h-full object-cover"
                alt="Profile"
              />
            </div>

            <div className="flex-1 text-center md:text-left">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                {parsedAuth?.Name || "Jeremy Rose"}
              </h1>
              <span className="text-sm font-medium text-blue-500 bg-blue-50 px-3 py-1 rounded-full">
                Content Writer
              </span>

              <p className="text-gray-600 mt-4 max-w-2xl">
                Passionate about creating engaging content that resonates with
                readers. Specializing in technology, lifestyle, and personal
                development topics.
              </p>

              <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-6">
                {statsData.map((stat, index) => (
                  <div
                    key={index}
                    className="bg-white p-4 rounded-xl shadow-sm flex flex-col items-center w-28"
                  >
                    <span
                      className="text-2xl font-bold"
                      style={{ color: stat.color }}
                    >
                      {stat.value}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      {stat.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <button
              onClick={() => navigate("/createblog")}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              <FiEdit2 size={16} />
              <span>New Post</span>
            </button>
          </div>

          {/* Posts Grid Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6 border-b pb-2">
              Your Posts
            </h2>

            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg overflow-hidden shadow"
                  >
                    {/* <Skeleton height={180} /> */}
                    <div className="p-4">{/* <Skeleton count={3} /> */}</div>
                  </div>
                ))}
              </div>
            ) : postList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {postList.map((post) => (
                  <div
                    className="bg-white rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow duration-200 flex flex-col h-full"
                    key={post?._id}
                  >
                    <div className="relative group h-48 overflow-hidden">
                      <img
                        src={post?.Image || "/assets/placeholder-blog.jpg"}
                        alt={post?.Title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all duration-300 flex items-end justify-end p-3">
                        <div className="flex translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 gap-2">
                          <button
                            disabled={isDeleting}
                            onClick={() => handleDeletePost(post?._id)}
                            className={`h-9 w-9 rounded-full flex justify-center items-center text-white ${
                              isDeleting && activeDeleteId === post?._id
                                ? "bg-red-400 cursor-not-allowed"
                                : "bg-red-500 hover:bg-red-600"
                            }`}
                            aria-label="Delete post"
                          >
                            <FaTrashCan size={14} />
                          </button>
                          <button
                            onClick={() => handleUpdatePost(post)}
                            className="h-9 w-9 rounded-full flex justify-center items-center bg-green-500 hover:bg-green-600 text-white"
                            aria-label="Edit post"
                          >
                            {/* <FaPencilAlt size={12} /> */}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 flex flex-col flex-grow">
                      <h3 className="font-semibold text-gray-800 mb-2 line-clamp-2 leading-tight">
                        {post?.Title}
                      </h3>
                      <div
                        className="text-gray-600 text-sm line-clamp-3 mb-4 flex-grow"
                        dangerouslySetInnerHTML={{ __html: post?.Description }}
                      />
                      <div className="flex justify-between items-center text-xs text-gray-500 pt-2 border-t border-gray-100">
                        <span>
                          {new Date(
                            post?.createdAt || Date.now()
                          ).toLocaleDateString()}
                        </span>
                        <span>5 min read</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-16 px-4 text-center bg-white rounded-lg shadow">
                <div className="mb-6 text-gray-400">
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
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">
                  No posts yet
                </h3>
                <p className="text-gray-500 mb-6 max-w-md">
                  Start writing and share your thoughts with the world. Your
                  journey begins with your first post.
                </p>
                <button
                  onClick={() => navigate("/createblog")}
                  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition-colors duration-200"
                >
                  {/* <FaPenToSquare /> */}
                  <span>Create Your First Post</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
