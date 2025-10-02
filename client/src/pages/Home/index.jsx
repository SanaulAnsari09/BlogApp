import React, { useEffect, useState } from "react";
import Navbar from "../../component/Navbar";
import { FaStar } from "react-icons/fa";
import Footer from "../../component/Footer";
import { axiosPost } from "../../axiosInstance";
import { allCategoryList, allPots } from "../../endpoint";
import SkeletonLoader from "../../component/SkeletonLoader";

const Home = () => {
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryList, setCategoryList] = useState([]);
  const [postList, setPostList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalRecords, setTotalRecords] = useState(0);
  const [totalPage, setTotalPage] = useState(1);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(6);
  const [error, setError] = useState(null);

  const fetchAllPost = async () => {
    try {
      setLoading(true);
      setError(null);
      const { data } = await axiosPost.get(
        `${allPots}?page=${page}&limit=${limit}`
      );
      setPostList(data?.PostList || []);
      setTotalPage(data?.TotalPage || 1);
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

  const fetchCategoryList = async () => {
    try {
      setCategoryLoading(true);
      const { data } = await axiosPost.get(allCategoryList);
      setCategoryList(data?.TotalPost || []);
    } catch (error) {
      console.log("error");
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoryList();
  }, []);

  function stripHtml(html) {
    return html.replace(/<[^>]+>/g, "");
  }

  const Description = (description) => {
    const textOnly = stripHtml(description);
    return textOnly;
  };

  return (
    <>
      <Navbar />
      <div className="pt-16">
        <section
          className="relative h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[85vh] xl:h-[100vh] w-full bg-no-repeat bg-cover bg-center bg-fixed flex items-center justify-center"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/34013/pexels-photo.jpg)`,
          }}
        >
          <div className="absolute inset-0 bg-black/30"></div>
          <div className="container max-w-7xl mx-auto relative z-10">
            <div className="bg-white/95 backdrop-blur-sm rounded-xl p-6 md:p-10 lg:p-14 mx-4 shadow-2xl">
              <p className="text-gray-600 text-lg text-center mb-2">
                Food, Drink & Restaurants Reviews
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-6 leading-tight">
                Join our 100,000+ Subscribers List Today!
              </h1>
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                <input
                  type="email"
                  placeholder="Email Address"
                  className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:max-w-xs"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 w-full sm:w-auto uppercase">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 lg:py-20 bg-white">
          <div className="container max-w-7xl mx-auto px-4">
            <h2 className="text-center text-gray-700 uppercase tracking-wider text-sm font-semibold mt-16 mb-8 md:mb-12">
              Latest Blog Post's
            </h2>

            {loading ? (
              <SkeletonLoader num={8} />
            ) : (
              <React.Fragment>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {postList.map((post, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                    >
                      <div className="h-56 overflow-hidden">
                        <img
                          src={post.Image}
                          alt={post.Title}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                      </div>
                      <div className="p-6">
                        <p className="text-blue-600 font-semibold text-sm uppercase tracking-wide text-center mb-2">
                          {post.Category}
                        </p>
                        <h3 className="text-xl font-bold text-gray-800 text-center mb-3 line-clamp-2">
                          {post.Title}
                        </h3>
                        <p className="text-gray-600 text-center text-sm line-clamp-3">
                          {Description(post.Description)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="w-full flex justify-end items-center gap-4 mt-8">
                  <button
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                  >
                    Prev
                  </button>
                  <button
                    disabled={page === totalPage}
                    onClick={() => setPage(page + 1)}
                    className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </React.Fragment>
            )}
          </div>
        </section>
        <section className="py-12 md:py-16 bg-gray-50">
          <h2 className="text-center text-gray-700 uppercase tracking-wider text-sm font-semibold mt-16 mb-8 md:mb-12">
            Most Liked Post's
          </h2>
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {postList?.map((item, index) => (
                <div
                  key={index}
                  className="relative h-80 md:h-96 rounded-xl overflow-hidden group"
                >
                  <img
                    src={item.Image}
                    alt={item.Title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/50 flex flex-col justify-end p-6 text-white">
                    <p className="text-sm font-bold uppercase tracking-wider mb-2">
                      {item.tag}
                    </p>
                    <h3 className="text-2xl font-bold mb-2">{item.Title}</h3>
                    <p className="font-semibold">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 bg-blue-50">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <p className="text-blue-800 uppercase font-semibold text-sm tracking-wide mb-2">
              Technologies, Sports & Entertainment Reviews
            </p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
              Join our 100,000+ <br className="hidden sm:inline" />
              Subscribers List Today!
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter Email"
                className="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300 w-full sm:w-auto uppercase text-nowrap">
                Subscribe Now
              </button>
            </div>
          </div>
        </section>
        <section className="py-12 md:py-16 bg-white">
          <div className="container max-w-4xl mx-auto px-4 text-center">
            <p className="text-gray-700 uppercase font-bold text-sm tracking-wider mb-4">
              Featured Reviewed Categories
            </p>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
              A modern platform where readers connect with writers, and ideas
              turn into conversations.
            </h3>
          </div>
        </section>
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {categoryList?.map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
                >
                  <div className="h-48 overflow-hidden">
                    <img
                      src={item?.Image}
                      alt="Review thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 text-center">
                    <h4 className="font-bold text-gray-800 mb-3 line-clamp-2">
                      {item?.Category}
                    </h4>
                    <div className="flex justify-center gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar key={star} className="text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="relative bg-[url('https://images.pexels.com/photos/10186702/pexels-photo-10186702.jpeg')] bg-cover bg-center bg-fixed">
          <div className="absolute inset-0 bg-black/50"></div>
          <div className="container max-w-6xl mx-auto px-4 py-16 md:py-24 relative z-10">
            <div className="text-center text-white">
              <p className="font-bold uppercase tracking-wider text-sm mb-4">
                Are you a restaurant owner?
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mb-8 leading-tight">
                Stay inspired with daily blogs, <br />
                trending insights, and meaningful
                <br /> conversations.
              </h2>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-300 uppercase">
                Get in touch
              </button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
    </>
  );
};

export default Home;
