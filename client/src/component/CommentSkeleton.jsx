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
export default CommentSkeleton;
