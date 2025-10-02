const PostSkeleton = () => (
  <div className="w-full max-w-[1250px] animate-pulse">
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

export default PostSkeleton;
