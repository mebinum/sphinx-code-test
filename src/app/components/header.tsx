import React from "react";

function Header() {
  return (
    <div className="px-10 py-5 border-b border-gray-200 bg-white shadow">
      <div className="mt-2 md:flex md:items-center md:justify-between">
        <div className="min-w-0 flex-1">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:truncate sm:text-3xl sm:tracking-tight">
            Sphinx Bio
          </h2>
        </div>
      </div>
    </div>
  );
}

export default Header;
