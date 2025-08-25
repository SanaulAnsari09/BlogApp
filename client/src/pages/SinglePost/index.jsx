import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { axiosComment, axiosPost } from "../../axiosInstance";
import {
  addCommentEndpoint,
  getCommentByPostId,
  singlepostById,
} from "../../endpoint";
import { useParams } from "react-router-dom";
import { notifyError, notifySuccess } from "../../notifyMessage";
import { Toaster } from "react-hot-toast";

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState({});
  const [postComment, setPostComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const { id } = useParams();

  const fetchSinglePost = async () => {
    try {
      const { data } = await axiosPost.post(`${singlepostById}?Id=${id}`);
      setSinglePost(data?.Post);
    } catch (error) {
      console.log("error", error);
    }
  };

  const getAllComments = async () => {
    try {
      if (singlePost) {
        const { data } = await axiosComment.get(
          `${getCommentByPostId}?id=${singlePost?._id}`
        );

        setAllComments(data?.Comments);
      }
    } catch (error) {
      console.log("hghg");
    }
  };

  useEffect(() => {
    fetchSinglePost();
  }, []);

  useEffect(() => {
    getAllComments();
  }, [singlePost]);

  const addComment = async () => {
    try {
      if (!postComment) {
        notifyError("Please write a comment");
        return null;
      }

      if (!singlePost?._id) {
        notifyError("Technical Issues !");
        return null;
      }

      const { data } = await axiosComment.post(addCommentEndpoint, {
        Comment: postComment,
        PostId: singlePost?._id,
      });

      if (data?.Success) {
        setPostComment("");
        getAllComments();
      }
    } catch (error) {
      console.log("add-comment-err", error);
    }
  };

  console.log("singlePost", singlePost);

  return (
    <Layout>
      <div className="w-full justify-center my-4 flex flex-col items-center">
        <Toaster />
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
              onChange={(e) => setPostComment(e.target.value)}
              value={postComment}
            />
            <button
              className="h-7 text-xs font-medium w-auto px-2 bg-gray-300 rounded text-gray-700 flex items-center absolute right-5 top-7 cursor-pointer"
              onClick={addComment}
            >
              Comment
            </button>

            {allComments.length > 0 ? (
              <div className="w-full flex flex-col gap-3 mt-5 bg-gray-50 rounded px-2 py-1">
                {allComments?.map((comments, ind) => {
                  return (
                    <div
                      className="h-12 flex items-center gap-3 border-b border-b-gray-300"
                      key={ind + 1}
                    >
                      <div className="h-10 w-10 rounded-full">
                        <img
                          src={
                            comments?.UserId?.Profile ||
                            "https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg"
                          }
                          alt=""
                          className="h-full w-full rounded-full object-cover bg-center"
                        />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-[10px]">
                          {comments?.UserId?.FirstName}{" "}
                          {comments?.UserId?.LastName}{" "}
                        </span>
                        <span className="text-[12px] font-medium">
                          {comments?.Comment}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="w-full flex justify-center my-2">
                <span className="text-center font-bold text-md uppercase text-gray-400">
                  No comments yet
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SinglePost;
