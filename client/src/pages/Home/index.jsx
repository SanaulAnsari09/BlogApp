import React from "react";
import Navbar from "../../component/Navbar";
import { FaStar } from "react-icons/fa";
import Footer from "../../component/Footer";


const Home = () => {

  return (
    <>
      <Navbar />
      <div className="">
        {/* hero section */}
        <div
          className="
              bg-[url('https://images.ctfassets.net/hrltx12pl8hq/28ECAQiPJZ78hxatLTa7Ts/2f695d869736ae3b0de3e56ceaca3958/free-nature-images.jpg?fit=fill&w=1200&h=630')]
              h-[50vh] sm:h-[60vh] md:h-[80vh] lg:h-[100vh] w-full bg-no-repeat bg-cover bg-center bg-fixed flex justify-center items-center
              "
        >
          <div className="container max-w-[1200px] flex justify-center">
            <div className="h-110 w-166 bg-white p-20">
              <p className="text-gray-600 text-lg text-center">
                Food, Drink & Restaurants Reviews
              </p>
              <h1
                className="text-4xl my-3 text-center"
                style={{ lineHeight: "3.5rem" }}
              >
                Join our 100,000+ Subscribers List Today!
              </h1>
              <div className="flex flex-col gap-5 items-center justify-center my-4">
                <input
                  type="text"
                  placeholder="Email Address"
                  className="h-10 px-3 outline-0 w-[75%] bg-gray-100 border border-gray-200"
                />
                <button className="h-15 w-50 uppercase bg-blue-500 text-white text-md font-bold cursor-pointer">
                  Subscribe Now
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* branding section */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1200px] bg-white">
            <p className="text-gray-700 text-center py-14 uppercase">
              Where we’ve been featured
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 lg:grid-cols-5 py-5">
              <div className="w-full h-40 flex justify-center items-center shadow-sm">
                <img
                  src="https://websitedemos.net/food-drinks-blog-04/wp-content/uploads/sites/896/2021/06/featured-logo-05.png"
                  alt="client1"
                  className="h-full w-full"
                />
              </div>
              <div className="w-full h-40 flex justify-center items-center shadow-sm">
                <img
                  src="https://websitedemos.net/food-drinks-blog-04/wp-content/uploads/sites/896/2021/06/featured-logo-02.png"
                  alt="client1"
                  className="h-full w-full"
                />
              </div>
              <div className="w-full h-40 flex justify-center items-center shadow-sm">
                <img
                  src="https://websitedemos.net/food-drinks-blog-04/wp-content/uploads/sites/896/2021/06/featured-logo-03.png"
                  alt="client1"
                  className="h-full w-full"
                />
              </div>
              <div className="w-full h-40 flex justify-center items-center shadow-sm">
                <img
                  src="https://websitedemos.net/food-drinks-blog-04/wp-content/uploads/sites/896/2021/06/featured-logo-04.png"
                  alt="client1"
                  className="h-full w-full"
                />
              </div>
              <div className="w-full h-40 flex justify-center items-center shadow-sm">
                <img
                  src="https://websitedemos.net/food-drinks-blog-04/wp-content/uploads/sites/896/2021/06/featured-logo-05.png"
                  alt="client1"
                  className="h-full w-full"
                />
              </div>
            </div>
            <p className="uppercase text-gray-700 text-center pt-16 pb-10">
              Latest Blog Posts
            </p>
          </div>
        </div>

        {/* blog post category */}
        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1200px]">
            <div className="grid grid-cols-12">
              <div className="col-span-4 p-4 bg-rose">
                <div className="w-full">
                  <img
                    src="https://websitedemos.net/food-drinks-blog-04/wp-content/uploads/sites/896/2021/06/blog-02.jpg"
                    alt="post"
                    className="h-60 w-full"
                  />
                </div>
                <div className="py-5">
                  <p className="text-center text-lg text-gray-700 underline">
                    FOOD
                  </p>
                  <h1 className="text-center text-2xl my-3 text-ellipsis line-clamp-1 overflow-hidden">
                    Spaghetti Sauce With Ground Beefffffff
                  </h1>
                  <p className="text-center text-sm text-ellipsis line-clamp-3 overflow-hidden text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud, write your more content here
                  </p>
                </div>
              </div>
              <div className="col-span-4 p-4 h-40 bg-rose">
                <div className="w-full">
                  <img
                    src="https://websitedemos.net/food-drinks-blog-04/wp-content/uploads/sites/896/2021/06/blog-01.jpg"
                    alt="post"
                    className="h-60 w-full"
                  />
                </div>
                <div className="py-5">
                  <p className="text-center text-lg text-gray-700">FOOD</p>
                  <h1 className="text-center text-2xl my-3 text-ellipsis line-clamp-1 overflow-hidden">
                    Spaghetti Sauce With Ground Beefffffff
                  </h1>
                  <p className="text-center text-sm text-ellipsis line-clamp-3 overflow-hidden text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud, write your more content here
                  </p>
                </div>
              </div>
              <div className="col-span-4 p-4 h-40 bg-rose-">
                <div className="w-full">
                  <img
                    src="https://websitedemos.net/food-drinks-blog-04/wp-content/uploads/sites/896/2021/06/blog-08.jpg"
                    alt="post"
                    className="h-60 w-full"
                  />
                </div>
                <div className="py-5">
                  <p className="text-center text-lg text-gray-700">DRINK</p>
                  <h1 className="text-center text-2xl my-3 text-ellipsis line-clamp-1 overflow-hidden">
                    Spaghetti Sauce With Ground Beefffffff
                  </h1>
                  <p className="text-center text-sm text-ellipsis line-clamp-3 overflow-hidden text-gray-700">
                    Lorem ipsum dolor sit amet, consectetur elit, sed do eiusmod
                    tempor incididunt ut labore et dolore magna aliqua. Ut enim
                    ad minim veniam, quis nostrud, write your more content here
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full flex justify-center">
          <div className="w-full max-w-[1200px]">
            <div className="grid grid-cols-3 gap-8">
              <div className="h-130 w-full overflow-hidden relative group">
                <div className="w-full h-full">
                  <img
                    src="https://websitedemos.net/food-drinks-blog-04/wp-content/uploads/sites/896/2021/06/blog-004-1.jpg"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    alt="img"
                  />
                </div>
                <div
                  className="absolute top-0 left-0 w-full h-full flex flex-col justify-end py-15 items-center text-white text-xl pointer-events-none"
                  style={{ backgroundColor: "black", opacity: "0.5" }}
                >
                  <p className="uppercase text-sm font-bold py-3 text-white">
                    Best Restaurant
                  </p>
                  <h1 className="text-3xl pt-3 text-white">
                    John's Restaurant
                  </h1>
                  <p className="pt-2 font-bold text-white">June,22, 2018</p>
                </div>
              </div>
              <div className="h-130 w-full overflow-hidden relative group">
                <div className="w-full h-full">
                  <img
                    src="https://websitedemos.net/food-drinks-blog-04/wp-content/uploads/sites/896/2021/06/blog-005-1.jpg"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    alt="img"
                  />
                </div>
                <div
                  className="absolute top-0 left-0 w-full h-full flex flex-col justify-end py-15 items-center text-white text-xl pointer-events-none"
                  style={{ backgroundColor: "black", opacity: "0.5" }}
                >
                  <p className="uppercase text-sm font-bold py-3 text-white">
                    Best Restaurant
                  </p>
                  <h1 className="text-3xl pt-3 text-white">
                    John's Restaurant
                  </h1>
                  <p className="pt-2 font-bold text-white">June,22, 2018</p>
                </div>
              </div>
              <div className="h-130 w-full overflow-hidden relative group">
                <div className="w-full h-full">
                  <img
                    src="https://websitedemos.net/food-drinks-blog-04/wp-content/uploads/sites/896/2021/06/blog-006-1.jpg"
                    className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110 cursor-pointer"
                    alt="img"
                  />
                </div>
                <div
                  className="absolute top-0 left-0 w-full h-full flex flex-col justify-end py-15 items-center text-white text-xl pointer-events-none"
                  style={{ backgroundColor: "black", opacity: "0.5" }}
                >
                  <p className="uppercase text-sm font-bold py-3 text-white">
                    Best Restaurant
                  </p>
                  <h1 className="text-3xl pt-3 text-white">
                    John's Restaurant
                  </h1>
                  <p className="pt-2 font-bold text-white">June,22, 2018</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* letter header */}
        <div className="w-full flex justify-center my-8">
          <div className="w-full max-w-[1200px] bg-blue-100 py-12">
            <p className="uppercase text-lg font-bold text-center">
              Food, Drink & Restaurants Reviews
            </p>
            <h1
              className="text-center text-5xl py-5 font-bold"
              style={{ lineHeight: "3.6rem" }}
            >
              Join our 100,000+ <br />
              Subscribers List Today!
            </h1>
            <div className="w-full flex flex-col items-center justify-center gap-10 py-5">
              <input
                type="text"
                className="w-[30%] h-9 border border-gray-400 outline-0 bg-white px-3 text-black placeholder:text-gray-500"
                placeholder="Enter Email"
              />
              <button className="h-14 w-40 uppercase bg-blue-500 text-white font-bold">
                Subscibe Now
              </button>
            </div>
          </div>
        </div>

        {/* cover letter */}
        <div className="w-full flex justify-center h-70 relative py-5">
          <div className="w-full max-w-[1200px] h-full flex gap-5 flex-col justify-center items-center">
            <p className="text-sm text-center font-bold uppercase">
              featured review videos
            </p>
            <p className="text-center text-2xl font-bold">
              Lorem ipsum dolor sit amet, consectetur <br /> adipisicing elit,
              sed do eiusmod tempor incididunt
              <br /> ut laborep
            </p>
          </div>
        </div>

        {/* video section */}
        <div className="w-full flex justify-center items-center">
          <div className="w-full max-w-[1200px]">
            <div className="grid grid-cols-4 gap-4">
              <div className="h-80 w-full">
                <div className="h-[50%] w-full">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0edrRA4NjuhABS8puZg_1avBqQPAlIEFHzenVEqSl2AaGWy0qazT769SCct7VxFD6RPg&usqp=CAU"
                    alt="postimage"
                    className="h-full w-full object-fill"
                  ></img>
                </div>
                <div className="h-[50%] w-full flex flex-col gap-1 items-center">
                  <p className="text-center text-2xl text-ellipsis line-clamp-3 overflow-hidden font-bold py-2">
                    Lorem ipsum dolor sit amet consectetur.?
                  </p>
                  <div className="flex gap-2">
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-80 w-full">
                <div className="h-[50%] w-full">
                  <img
                    src="https://okcredit-blog-images-prod.storage.googleapis.com/2021/06/organicproducts1-1.jpg"
                    alt="postimage"
                    className="h-full w-full object-fill"
                  ></img>
                </div>
                <div className="h-[50%] w-full flex flex-col gap-1 items-center">
                  <p className="text-center text-2xl text-ellipsis line-clamp-3 overflow-hidden font-bold py-2">
                    Lorem ipsum dolor sit amet consectetur.?
                  </p>
                  <div className="flex gap-2">
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-80 w-full">
                <div className="h-[50%] w-full">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpLn5reWRgbF_8Et4qBAtE60bLmFcvwAElMw&s"
                    alt="postimage"
                    className="h-full w-full object-fill"
                  ></img>
                </div>
                <div className="h-[50%] w-full flex flex-col gap-1 items-center">
                  <p className="text-center text-2xl text-ellipsis line-clamp-3 overflow-hidden font-bold py-2">
                    Lorem ipsum dolor sit amet consectetur.?
                  </p>
                  <div className="flex gap-2">
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                  </div>
                </div>
              </div>
              <div className="h-80 w-full">
                <div className="h-[50%] w-full">
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAzHeZ9YsdC0EKMr_KlJN9Rt9JeuPOb1uU0g&s"
                    alt="postimage"
                    className="h-full w-full object-fill"
                  ></img>
                </div>
                <div className="h-[50%] w-full flex flex-col gap-1 items-center">
                  <p className="text-center text-2xl text-ellipsis line-clamp-3 overflow-hidden font-bold py-2">
                    Lorem ipsum dolor sit amet consectetur.?
                  </p>
                  <div className="flex gap-2">
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                    <span className="text-orange-400">
                      <FaStar />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* footer section */}
        <div className="h-[100vh] w-full bg-[url('https://images.pexels.com/photos/1107717/pexels-photo-1107717.jpeg?cs=srgb&dl=pexels-fotios-photos-1107717.jpg&fm=jpg')] bg-no-repeat bg-center bg-fixed bg-cover flex flex-col justify-between">
          <div className="w-full h-full py-10 bg-black/40 flex justify-center">
            <div className="w-full h-80 max-w-[1200px]">
              <p className="text-center font-bold text-white uppercase">
                Are you a restaurant owner?
              </p>
              <h1 className="text-6xl text-center py-3 font-bold text-white">
                Contact Jordan Walsh for a<br />
                meaningful review for your
                <br />
                restaurant.
              </h1>
              <div className="w-full flex justify-center py-4">
                <button className="bg-blue-500 uppercase h-16 w-50 text-white font-semibold">
                  Get in touch
                </button>
              </div>
            </div>
          </div>

          <Footer />
        </div>

      </div>
    </>
  );

};

export default Home;
