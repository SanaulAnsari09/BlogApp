import React, { useEffect, useState } from "react";
import Layout from "../../component/Layout";
import { axiosComment, axiosPost } from "../../axiosInstance";
import {
  addCommentEndpoint,
  getCommentByPostId,
  singlepostById,
} from "../../endpoint";
import { useLocation } from "react-router-dom";
import { notifyError, notifySuccess } from "../../notifyMessage";
import { Toaster } from "react-hot-toast";
import { format, formatDistanceToNow } from "date-fns";

const SinglePost = () => {
  const [singlePost, setSinglePost] = useState({});
  const [postComment, setPostComment] = useState("");
  const [allComments, setAllComments] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCommentLoading, setIsCommentLoading] = useState(true);
  const [isSubmittingComment, setIsSubmittingComment] = useState(false);
  const [activeTab, setActiveTab] = useState("content");
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const { state } = useLocation();

  const fetchSinglePost = async () => {
    try {
      setIsLoading(true);
      const { data } = await axiosPost.post(
        `${singlepostById}?Id=${state?.Id}`
      );
      setSinglePost(data?.Post);
      setLikesCount(data?.Post?.LikesCount || 0);
      setIsLiked(data?.Post?.IsLiked || false);
      setIsBookmarked(data?.Post?.IsBookmarked || false);

      // Simulate fetching related posts (you'll need to implement this endpoint)
      setRelatedPosts([
        {
          id: 1,
          title: "The Future of Web Development",
          image:
            "https://images.unsplash.com/photo-1581276879432-15e50529f34b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
        },
        {
          id: 2,
          title: "React Best Practices for 2023",
          image:
            "https://images.unsplash.com/photo-1633356122544-f134324a6cee?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
          date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
        },
        {
          id: 3,
          title: "Building Scalable APIs with Node.js",
          image:
            "https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80",
          date: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
        },
      ]);
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

  const handleLike = async () => {
    try {
      // Implement like functionality
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount - 1 : likesCount + 1);
      // await axiosPost.post(likeEndpoint, { PostId: singlePost?._id });
    } catch (error) {
      console.log("like-error", error);
      setIsLiked(!isLiked);
      setLikesCount(isLiked ? likesCount + 1 : likesCount - 1);
    }
  };

  const handleBookmark = async () => {
    try {
      // Implement bookmark functionality
      setIsBookmarked(!isBookmarked);
      // await axiosPost.post(bookmarkEndpoint, { PostId: singlePost?._id });
    } catch (error) {
      console.log("bookmark-error", error);
      setIsBookmarked(!isBookmarked);
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

  // Skeleton components
  const PostSkeleton = () => (
    <div className="w-full max-w-5xl animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-3/4 mb-6 mx-auto"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-10 mx-auto"></div>
      <div className="h-96 bg-gray-200 rounded-xl mb-8"></div>

      <div className="flex flex-col md:flex-row gap-8 mb-10">
        <div className="w-full md:w-8/12">
          <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="h-4 bg-gray-200 rounded w-full"></div>
            ))}
          </div>
        </div>

        <div className="w-full md:w-4/12">
          <div className="h-6 bg-gray-200 rounded w-1/3 mb-6"></div>
          <div className="space-y-4">
            {[1, 2, 3].map((item) => (
              <div key={item} className="flex gap-3">
                <div className="h-16 w-16 bg-gray-200 rounded"></div>
                <div className="flex-1">
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const CommentSkeleton = () => (
    <div className="min-h-30 bg-gray-50 rounded-xl p-6 mt-8 animate-pulse">
      <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
      <div className="h-12 bg-gray-200 rounded-lg w-full mb-6"></div>
      <div className="space-y-4">
        {[1, 2, 3].map((item) => (
          <div className="flex gap-4" key={item}>
            <div className="h-10 w-10 bg-gray-200 rounded-full"></div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <Layout>
      <div className="w-full justify-center my-15 flex flex-col items-center">
        <Toaster />
        {isLoading ? (
          <PostSkeleton />
        ) : (
          <article className="w-full max-w-5xl">
            {/* Post Header */}
            <header className="text-center mb-10 px-4">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {singlePost?.Title}
              </h1>

              <div className="flex flex-wrap items-center justify-center gap-4 text-gray-600 mb-6">
                <div className="flex items-center">
                  <img
                    src={
                      singlePost?.AuthorImage ||
                      "https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg"
                    }
                    alt={singlePost?.AuthorName || "Author"}
                    className="h-10 w-10 rounded-full object-cover mr-3"
                  />
                  <span className="font-medium">
                    {singlePost?.AuthorName || "Unknown Author"}
                  </span>
                </div>
                <span>•</span>
                <time dateTime={singlePost?.CreatedAt}>
                  {singlePost?.CreatedAt
                    ? format(new Date(singlePost.CreatedAt), "MMMM dd, yyyy")
                    : "Unknown date"}
                </time>
                <span>•</span>
                <span>{singlePost?.ReadTime || "5"} min read</span>
              </div>

              <div className="w-full max-w-2xl mx-auto mb-8">
                <p className="text-lg text-gray-600 italic">
                  {singlePost?.MetaDescription || singlePost?.Title}
                </p>
              </div>

              <div className="flex items-center justify-center gap-4">
                <button
                  onClick={handleLike}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full ${
                    isLiked
                      ? "bg-red-50 text-red-600"
                      : "bg-gray-100 text-gray-700"
                  } transition-colors`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`h-5 w-5 ${isLiked ? "fill-current" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span>{likesCount}</span>
                </button>

                <button
                  onClick={handleBookmark}
                  className={`p-2 rounded-full ${
                    isBookmarked
                      ? "bg-blue-50 text-blue-600"
                      : "bg-gray-100 text-gray-700"
                  } transition-colors`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                  </svg>
                </button>

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

            {/* Featured Image */}
            <div className="rounded-xl overflow-hidden mb-10 shadow-lg">
              <img
                src={
                  singlePost?.Image ||
                  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
                }
                alt={singlePost?.Title}
                className="w-full h-auto max-h-[32rem] object-cover"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-8 px-4">
              {/* Main Content */}
              <main className="w-full lg:w-8/12">
                {/* Content Tabs */}
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

                {/* Article Content */}
                {activeTab === "content" && (
                  <div className="prose prose-lg max-w-none">
                    <div
                      dangerouslySetInnerHTML={{
                        __html: singlePost?.Description,
                      }}
                      className="text-gray-700 leading-relaxed"
                    />

                    {/* Tags */}
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

                {/* Comments Section */}
                {activeTab === "comments" && (
                  <div className="bg-white rounded-xl">
                    <h3 className="text-2xl font-semibold text-gray-800 mb-6">
                      Comments ({allComments.length})
                    </h3>

                    {/* Comment Input */}
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

                    {/* Comments List */}
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
                                src={
                                  comment?.UserId?.Profile ||
                                  "https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg"
                                }
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
                                  {comment?.CreatedAt &&
                                    formatDistanceToNow(
                                      new Date(comment.CreatedAt),
                                      { addSuffix: true }
                                    )}
                                </span>
                              </div>
                              <p className="text-gray-700">
                                {comment?.Comment}
                              </p>

                              <div className="mt-3 flex items-center gap-4">
                                <button className="text-sm text-gray-500 flex items-center gap-1">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-4 w-4"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905a3.61 3.61 0 01-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
                                    />
                                  </svg>
                                  <span>12</span>
                                </button>
                                <button className="text-sm text-gray-500 hover:text-blue-600">
                                  Reply
                                </button>
                              </div>
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

              {/* Sidebar */}
              <aside className="w-full lg:w-4/12">
                {/* Author Bio */}
                <div className="bg-gray-50 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    About the Author
                  </h3>
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={
                        singlePost?.AuthorImage ||
                        "https://i.pinimg.com/736x/59/37/5f/59375f2046d3b594d59039e8ffbf485a.jpg"
                      }
                      alt={singlePost?.AuthorName || "Author"}
                      className="h-14 w-14 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {singlePost?.AuthorName || "Unknown Author"}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {singlePost?.AuthorBio || "Content creator and blogger"}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-700 text-sm">
                    {singlePost?.AuthorDescription ||
                      "Writer with passion for technology and design. Loves to share knowledge and experiences through articles."}
                  </p>
                </div>

                {/* Related Posts */}
                <div className="bg-white border border-gray-200 rounded-xl p-6 mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Related Articles
                  </h3>
                  <div className="space-y-5">
                    {relatedPosts.map((post) => (
                      <div key={post.id} className="flex gap-3 group">
                        <div className="flex-shrink-0">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="h-16 w-16 rounded object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-gray-900 text-sm group-hover:text-blue-600 transition-colors line-clamp-2">
                            {post.title}
                          </h4>
                          <p className="text-xs text-gray-500 mt-1">
                            {format(post.date, "MMM dd, yyyy")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
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
