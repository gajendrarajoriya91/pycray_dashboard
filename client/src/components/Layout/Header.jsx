import React from "react";
import { Search, Bell, ChevronDown } from "lucide-react";

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 p-4 flex justify-between items-center">
      <div className="relative">
        <input
          type="text"
          placeholder="Search"
          className="pl-10 pr-4 py-2 border rounded-full"
        />
        <Search
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
          size={20}
        />
      </div>
      <div className="flex items-center">
        <Bell className="mr-4 text-gray-600" size={20} />
        <img
          src="public\user_avt.png"
          alt="User avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        <span className="mr-2">Gajendra R</span>
        <ChevronDown size={20} className="text-gray-600" />
      </div>
    </header>
  );
};

export default Header;
