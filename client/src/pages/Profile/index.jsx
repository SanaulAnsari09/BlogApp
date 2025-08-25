import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import PieCircleChart from "../../component/PieCircleChart";
import { axiosPost } from "../../axiosInstance";
import { allPostByUser, deletePostByUser } from "../../endpoint";
import { useNavigate } from "react-router-dom";
import { FaTrashCan } from "react-icons/fa6";
import { FaPencilAlt } from "react-icons/fa";
import { FaPenToSquare } from "react-icons/fa6";
import { notifySuccess } from "../../notifyMessage";
import { Toaster } from "react-hot-toast";

const Profile = () => {
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
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

  const post = [{ name: "Post", value: postList.length }];
  const reads = [{ name: "Read", value: 500 }];
  const reach = [{ name: "Reach", value: 3500 }];

  useEffect(() => {
    fetchAllPost();
  }, []);

  const handleDeletPost = async (id) => {
    try {
      setIsDeleting(true);
      const { data } = await axiosPost.delete(`${deletePostByUser}/${id}`);

      if (data?.Success) {
        fetchAllPost();
        notifySuccess(data?.Message);
      }
    } catch (error) {
      console.log("delete-post-item", error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdatePost = (data) => {
    navigate("/createblog", { state: data });
  };

  return (
    <Layout>
      <div className="w-full flex justify-center">
        <Toaster />
        <div className="w-full max-w-[1200px] py-4 min-h-[calc(100vh-150px)]">
          <div className="w-full h-[14rem] flex gap-10">
            <div className="h-full w-[16rem]">
              <img
                src={parsedAuth?.Profile || "/assets/user-profile.jpg"}
                className="w-full h-full object-fill rounded"
                alt=""
              />
            </div>

            <div className="h-full w-full flex flex-col gap-2">
              <div>
                <h1 className="text-2xl text-gray-600 font-medium">
                  Jeremy Rose
                </h1>
                <span className="text-sm font-medium text-blue-400">
                  Content Writer
                </span>
              </div>

              <div className="w-full flex gap-[4rem]">
                <PieCircleChart data={post} color="#0088FE" />
                <PieCircleChart data={reads} color="#00C49F" />
                <PieCircleChart data={reach} color="#FFBB28" />
              </div>
            </div>
          </div>

          {!loading ? (
            postList.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-5">
                {postList?.map((post) => {
                  return (
                    <div
                      className="min-h-70 w-full bg-gray-100 p-1 rounded-md flex flex-col justify-between"
                      key={post?._id}
                    >
                      <div className="h-[60%] w-full rounded-sm relative group">
                        <img
                          src={post?.Image || dummyImage}
                          alt="image"
                          className="w-full h-full object-fill rounded-sm"
                        />
                        <div className="w-full bg-[#00000050] h-12 flex items-center justify-end gap-5 absolute top-0 px-4 opacity-0 group-hover:opacity-100 transition-all duration-200">
                          {!isDeleting ? (
                            <div
                              className="h-10 w-10 bg-red-100 hover:bg-red-300 rounded-full flex justify-center items-center text-red-500 cursor-pointer  transition-all duration-200"
                              onClick={() => handleDeletPost(post?._id)}
                            >
                              <FaTrashCan />
                            </div>
                          ) : (
                            <div className="h-10 w-10 bg-red-100  rounded-full flex justify-center items-center text-red-300 cursor-pointer  transition-all duration-200">
                              <FaTrashCan />
                            </div>
                          )}
                          <div
                            className="h-10 w-10 bg-green-100 hover:bg-green-300 rounded-full flex justify-center items-center text-green-500 cursor-pointer  transition-all duration-200"
                            onClick={() => handleUpdatePost(post)}
                          >
                            <FaPencilAlt />
                          </div>
                        </div>
                      </div>
                      <div className="h-[38%] w-full flex flex-col gap-1">
                        <h4 className="text-sm md:text-md lg:text-lg font-medium text-gray-700 leading-[16px] md:leading-[20px]">
                          {post?.Title}
                        </h4>
                        <div
                          className="text-ellipsis line-clamp-3 overflow-hidden 
                    leading-[14px] lg:leading-[20px] text-xs md:text-sm lg:text-md"
                          dangerouslySetInnerHTML={{
                            __html: post?.Description,
                          }}
                        ></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full flex justify-center items-center mt-15">
                <div className="flex flex-col gap-5 px-5 items-center">
                  <p className="text-4xl text-gray-500 custom-font">
                    No Post's Available
                  </p>

                  <div
                    className="flex gap-4 items-center h-10 bg-green-200 px-4 rounded cursor-pointer"
                    onClick={() => navigate("/createblog")}
                  >
                    <FaPenToSquare className="text-green-800" />
                    <span className="text-green-800 font-semibold">Write</span>
                  </div>
                </div>
              </div>
            )
          ) : (
            <div className="w-full flex justify-center items-center mt-15">
              <div className="flex flex-col gap-5 px-5 items-center">
                <p className="text-4xl text-gray-500 custom-font">Loading...</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
