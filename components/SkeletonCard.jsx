const SkeletonCard = () => {
    return (
        <div className="snippet_card space-y-4 animate-pulse">
          <div className="h-6 bg-gray-300 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
          <div className="h-32 bg-gray-300 rounded"></div>
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="flex items-center gap-3 mt-3">
            <div className="w-10 h-10 bg-gray-300 rounded-full"></div>
            <div className="flex flex-col space-y-2">
              <div className="h-4 bg-gray-300 rounded w-24"></div>
              <div className="h-3 bg-gray-300 rounded w-16"></div>
            </div>
          </div>
          <div className="flex gap-4 border-t border-gray-100 pt-3">
            <div className="h-4 bg-gray-300 rounded w-10"></div>
            <div className="h-4 bg-gray-300 rounded w-10"></div>
          </div>
        </div>
      );
  };
  
  export default SkeletonCard;
  