import React from "react";

const EmptyState = () => {
  return (
    <div className="flex items-center justify-center bg-gray-100 h-full px-4 py-10 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center text-center">
        <h3 className="mt-2 text-2xl font-semibold text-gray-900">
          Select a chat or start new conversation
        </h3>
      </div>
    </div>
  );
};

export default EmptyState;
