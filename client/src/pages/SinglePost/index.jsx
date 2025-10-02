import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { axiosComment, axiosPost, axiosUser } from "../../axiosInstance";
import {
  addCommentEndpoint,
  getCommentByPostId,
  getUserDetais,
  singlepostById,
  getRelatedPost,
} from "../../endpoint";
import { useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from "../../notifyMessage";
import { Toaster } from "react-hot-toast";
import { getFormattedDate, readingTime } from "../../utile";
import PostSkeleton from "../../component/PostSkeleton";
import CommentSkeleton from "../../component/CommentSkeleton";

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState({});
  const [postComment, setPostComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [userDetails, setUserDetails] = useState({});
  const [relatedPost, setRelatedPost] = useState([]);

  const { state } = useLocation();

  const fetchSinglePost = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosPost.post(
        `${singlepostById}?Id=${state?.Id}`
      );
      setSinglePost(data?.Post);
    } catch (error) {
      console.log("error", error);
      notifyError("Failed to load post");
    } finally {
      setIsLoading(false);
    }
  };

  const getAllComments = async () => {
    try {
      if (singlePost) {
        setIsCommentLoading(true);
        const { data } = await axiosComment.get(
          `${getCommentByPostId}?id=${singlePost?._id}`
        );
        setAllComments(data?.Comments);
      }
    } catch (error) {
      console.log("Error fetching comments", error);
    } finally {
      setIsCommentLoading(false);
    }
  };

  useEffect(() => {
    fetchSinglePost();
  }, []);

  useEffect(() => {
    if (singlePost?._id) {
      getAllComments();
    }
  }, [singlePost]);

  const addComment = async () => {
    try {
      if (!postComment) {
        notifyError("Please write a comment");
        return null;
      }

      if (!singlePost?._id) {
        notifyError("Technical Issues!");
        return null;
      }

      setIsSubmittingComment(true);
      const { data } = await axiosComment.post(addCommentEndpoint, {
        Comment: postComment,
        PostId: singlePost?._id,
      });

      if (data?.Success) {
        setPostComment("");
        getAllComments();
        notifySuccess("Comment added successfully");
      }
    } catch (error) {
      console.log("add-comment-err", error);
      notifyError("Failed to add comment");
    } finally {
      setIsSubmittingComment(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: singlePost?.Title,
          text: singlePost?.MetaDescription || singlePost?.Title,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error));
    } else {
      navigator.clipboard.writeText(window.location.href);
      notifySuccess("Link copied to clipboard");
    }
  };

  const getUserDetails = async () => {
    try {
      const { data } = await axiosUser.get(getUserDetais, {
        params: { userId: singlePost?.UserId },
      });
      setUserDetails(data?.User);
      console.log("user-details-log", data);
    } catch (error) {
      console.log("allpost-err", error);
    } finally {
      console.log("fetched");
    }
  };

  useEffect(() => {
    if (singlePost?.UserId) {
      getUserDetails();
    }
  }, [singlePost?.UserId]);

  const fetchRelatedPost = async () => {
    try {
      const { data } = await axiosPost.get(
        `${getRelatedPost}?page=${1}&limit=${3}&category=technology`
      );
      setRelatedPost(data?.RelatedPost);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchRelatedPost();
  }, []);

  return (
    <Layout>
      <div className="w-full justify-center my-15 flex flex-col items-center">
        <Toaster />
        {isLoading ? (
          <PostSkeleton />
        ) : (
          <article className="w-full max-w-[1250px]">
            <header className="text-center my-10">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {singlePost?.Title}
              </h1>
              <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center">
                  <img
                    src={userDetails?.Profile}
                    alt={singlePost?.FirstName || "Author"}
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                  <span className="font-medium">
                    {singlePost?.FirstName || "Unknown Author"}
                  </span>
                </div>
                <span>•</span>
                <time dateTime={singlePost?.CreatedAt}>
                  {getFormattedDate(singlePost?.CreatedAt)}
                </time>
                <span>•</span>
                <span>{readingTime(singlePost?.Description)} min read</span>
              </div>

              <div className="w-full max-w-2xl mx-auto mb-8">
                <p className="text-lg text-gray-600 italic">
                  {singlePost?.MetaDescription || singlePost?.Title}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleShare}
                  className="p-2 rounded-full bg-gray-100 text-gray-700 transition-colors hover:bg-gray-200"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M15 8a3 3 0 10-2.977-2.63l-4.94 2.47a3 3 0 100 4.319l4.94 2.47a3 3 0 10.895-1.789l-4.94-2.47a3.027 3.027 0 000-.74l4.94-2.47C13.456 7.68 14.19 8 15 8z" />
                  </svg>
                </button>
              </div>
            </header>
            <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
              <img
                src={singlePost?.Image}
                alt={singlePost?.Title}
                className="w-full h-auto max-h-[32rem] object-cover"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 px-4">
              <main className="w-full lg:w-8/12">
                <div className="border-b border-gray-200 mb-8">
                  <nav className="flex space-x-8">
                    <button
                      onClick={() => setActiveTab("content")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "content"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Article
                    </button>
                    <button
                      onClick={() => setActiveTab("comments")}
                      className={`py-4 px-1 border-b-2 font-medium text-sm ${
                        activeTab === "comments"
                          ? "border-blue-500 text-blue-600"
                          : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      Comments ({allComments.length})
                    </button>
                  </nav>
                </div>
                {activeTab === "content" && (
                  <div className="prose prose-lg max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: singlePost?.Description,
                      }}
                      className="text-gray-700 leading-relaxed"
                    />
                    {singlePost?.Tags && (
                      <div className="mt-10 flex flex-wrap gap-2">
                        {singlePost.Tags.split(",").map((tag, index) => (
                          <span
                            key={index}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800"
                          >
                            #{tag.trim()}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                )}
                {activeTab === "comments" && (
                  <div className="bg-white rounded-xl">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                      Comments ({allComments.length})
                    </h3>
                    <div className="flex gap-3 mb-8">
                      <img
                        src="https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg"
                        alt="Your profile"
                        className="h-12 w-12 rounded-full object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <textarea
                          rows="3"
                          name="Comment"
                          className="w-full border border-gray-300 rounded-lg bg-gray-50 p-4 outline-none focus:ring-2 focus:ring-blue-400 resize-none"
                          placeholder="Share your thoughts..."
                          onChange={(e) => setPostComment(e.target.value)}
                          value={postComment}
                          disabled={isSubmittingComment}
                        />
                        <div className="mt-3 flex justify-end">
                          <button
                            className="h-10 px-6 bg-blue-600 rounded-lg text-white font-medium flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50"
                            onClick={addComment}
                            disabled={isSubmittingComment}
                          >
                            {isSubmittingComment ? (
                              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              "Post Comment"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                    {isCommentLoading ? (
                      <CommentSkeleton />
                    ) : allComments.length > 0 ? (
                      <div className="space-y-6">
                        {allComments?.map((comment, index) => (
                          <div
                            className="flex gap-4 p-6 bg-gray-50 rounded-xl border border-gray-200"
                            key={index}
                          >
                            <div className="flex-shrink-0">
                              <img
                                src={comment?.UserId?.Profile}
                                alt="Profile"
                                className="h-12 w-12 rounded-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="font-medium text-gray-900">
                                  {comment?.UserId?.FirstName}{" "}
                                  {comment?.UserId?.LastName}
                                </span>
                                <span className="text-xs text-gray-500">
                                  {getFormattedDate(comment?.CreatedAt)}
                                </span>
                              </div>
                              <p className="text-gray-700">
                                {comment?.Comment}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 bg-gray-50 rounded-xl border border-gray-200">
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
                              strokeWidth={1.5}
                              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                          </svg>
                        </div>
                        <h4 className="text-lg font-medium text-gray-600 mb-2">
                          No comments yet
                        </h4>
                        <p className="text-gray-500 max-w-md mx-auto">
                          Be the first to share your thoughts on this article.
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </main>
              <aside className="w-full lg:w-4/12">
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    About the Author
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={userDetails?.Profile}
                      alt={userDetails?.FirstName || "Author"}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {`${userDetails?.FirstName} ${userDetails?.LastName}` ||
                          "Unknown Author"}
                      </h4>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm text-ellipsis line-clamp-3">
                    {userDetails?.Bio}
                  </p>
                </div>
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-5">
                    {relatedPost.map((post) => (
                      <div key={post.id} className="flex gap-3 group">
                        <div className="flex-shrink-0">
                          <img
                            src={post?.Image}
                            alt={post?.Title}
                            className="h-16 w-16 rounded object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post?.Title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {getFormattedDate(post?.createdAt)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Stay in the loop
                  </h3>
                  <p className="text-sm text-gray-700 mb-4">
                    Subscribe to the newsletter to receive updates about new
                    posts.
                  </p>
                  <div className="flex gap-2">
                    <input
                      type="email"
                      placeholder="Your email address"
                      className="flex-1 bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-400"
                    />
                    <button className="bg-blue-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Subscribe
                    </button>
                  </div>
                </div>
              </aside>
            </div>
          </article>
        )}
      </div>
    </Layout>
  );
};

export default SinglePost;
