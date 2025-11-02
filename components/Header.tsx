import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b border-gray-200 shadow-sm p-4 z-10">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-gray-800">
          AI Image Generator
        </h1>
      </div>
    </header>
  );
};

export default Header;
