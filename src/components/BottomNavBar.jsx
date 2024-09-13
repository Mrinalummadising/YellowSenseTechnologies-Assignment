// src/components/BottomNavBar.js
import React from "react";
import { Link } from "react-router-dom";
import { BiBriefcase } from "react-icons/bi"; // Jobs icon
import { BsBookmark } from "react-icons/bs";

const BottomNavBar = () => {
  return (
    <div className="fixed bottom-0 w-full bg-[#5d6ea1] text-white">
      <div className="flex justify-around p-4">
        {/* Jobs Button - Use Link to navigate */}
        <Link to="/jobs" className="flex flex-col items-center">
          <BiBriefcase className="h-6 w-6 mb-1" />
          <span>Jobs</span>
        </Link>

        {/* Bookmarks Button - No navigation for now */}
        <Link to="/bookmarks" className="flex flex-col items-center">
          <BsBookmark className="h-6 w-6 mb-1" />
          <span>Bookmarks</span>
        </Link>
      </div>
    </div>
  );
};

export default BottomNavBar;
