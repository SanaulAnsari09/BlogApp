import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { axiosPost } from "../../axiosInstance";
import { singlepostById } from "../../endpoint";
import { useParams } from "react-router-dom";

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState({});
  const { id } = useParams();

  const fetchSinglePost = async () => {
    try {
      const { data } = await axiosPost.post(`${singlepostById}?Id=${id}`);
      setSinglePost(data?.Post);
    } catch (error) {
      console.log("error", error);
    }
  };

  useEffect(() => {
    fetchSinglePost();
  }, []);

  console.log("singlePost", singlePost);

  return (
    <Layout>
      <div className="w-full justify-center my-4 flex flex-col items-center">
        <div className="w-full max-w-[1200px]">
          <div className="h-50 w-full flex gap-4">
            <div className="h-50 w-80 p-2 bg-gray-50 rounded">
              <img
                src={singlePost?.Image}
                alt="post-image"
                className="w-full h-full object-cover rounded"
              />
            </div>
            <div className="h-full w-[calc(100vw-320px)] p-1 bg-gray-50 rounded">
              <h1 className="text-2xl text-blue-400 font-medium">
                {singlePost?.Title}
              </h1>
              <p
                className="text-lg text-gray-700 line-clamp-3"
                dangerouslySetInnerHTML={{ __html: singlePost?.Description }}
              ></p>
            </div>
          </div>
          <div className="h-auto w-[70%] p-1 mt-5">
            <div className="h-auto w-full flex flex-col gap-3">
              <h1 className="text-lg font-medium text-gray-900">
                {singlePost?.Title}
              </h1>
              <div
                className="text-gray-900 mt-4 text-justify"
                dangerouslySetInnerHTML={{ __html: singlePost?.Description }}
              ></div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1200px]">
          <div className="min-h-30 bg-gray-200 rounded py-4 px-2 relative">
            <input
              type="text"
              name="Comment"
              id=""
              className="h-12 border border-gray-300 rounded shadow bg-white w-full px-4 outline-0"
              placeholder="Comment Here."
            />
            <button
              className="h-7 text-xs font-medium w-auto px-2 bg-gray-300 rounded text-gray-700 flex items-center absolute right-5 bottom-16 cursor-pointer"
              onClick={() => alert("Working")}
            >
              Comment
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SinglePost;
