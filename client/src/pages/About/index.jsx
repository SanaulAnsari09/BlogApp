import React from "react";
import Layout from "../../component/Layout";

const About = () => {
  return (
    <Layout>
      <div className="min-h-screen bg-gray-50 mt-20 mb-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              About Blogosphere
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover, share, and connect with the world's best ideas and
              stories. Join our community of writers and readers today.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-12 mb-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Our Mission
              </h2>
              <p className="text-gray-600 mb-4">
                At Blogosphere, we believe in the power of storytelling to
                connect people, share knowledge, and inspire change. Our
                platform is designed to give writers a voice and readers access
                to diverse perspectives from around the world.
              </p>
              <p className="text-gray-600">
                Founded in 2020, we've grown into a community of over 100,000
                subscribers who value quality content and meaningful
                connections.
              </p>
            </div>
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1472&q=80"
                alt="Writing community"
                className="w-full h-64 object-cover"
              />
            </div>
          </div>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Our Values
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Quality Content
                </h3>
                <p className="text-gray-600">
                  We prioritize well-researched, thoughtful content that adds
                  value to our readers' lives.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Community First
                </h3>
                <p className="text-gray-600">
                  We foster a supportive environment where writers and readers
                  can connect and grow together.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md text-center">
                <div className="w-14 h-14 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-indigo-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  Authenticity
                </h3>
                <p className="text-gray-600">
                  We encourage genuine voices and authentic stories that reflect
                  diverse experiences and perspectives.
                </p>
              </div>
            </div>
          </div>
          <div className="mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Meet Our Team
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Jordan Walsh
                </h3>
                <p className="text-indigo-600 mb-2">Founder & CEO</p>
                <p className="text-gray-600 text-sm">
                  Food, Drink & Restaurant Reviews
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=764&q=80"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Emma Chen
                </h3>
                <p className="text-indigo-600 mb-2">Editor-in-Chief</p>
                <p className="text-gray-600 text-sm">
                  Content Strategy & Editorial
                </p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Marcus Johnson
                </h3>
                <p className="text-indigo-600 mb-2">Tech Lead</p>
                <p className="text-gray-600 text-sm">Platform Development</p>
              </div>

              <div className="text-center">
                <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-4 shadow-md">
                  <img
                    src="https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=699&q=80"
                    alt="Team member"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-gray-900">
                  Sophia Rodriguez
                </h3>
                <p className="text-indigo-600 mb-2">Community Manager</p>
                <p className="text-gray-600 text-sm">
                  Writer Relations & Engagement
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-indigo-600 rounded-xl p-8 text-center text-white">
            <h2 className="text-2xl font-bold mb-4">
              Join Our 100,000+ Subscribers List Today!
            </h2>
            <p className="mb-6 max-w-2xl mx-auto">
              Stay updated with the latest articles, insights, and community
              news from Blogosphere.
            </p>
            <div className="flex flex-col sm:flex-row max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email address"
                className="flex-grow px-4 py-3 rounded-l sm:rounded-r-none sm:rounded-l-lg focus:outline-none text-gray-900"
              />
              <button className="bg-indigo-800 px-6 py-3 font-medium rounded-r sm:rounded-l-none sm:rounded-r-lg mt-2 sm:mt-0 hover:bg-indigo-900 transition">
                SUBSCRIBE NOW
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default About;
