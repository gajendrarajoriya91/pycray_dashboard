import React from "react";
import {
  LayoutGrid,
  FolderPlus,
  List,
  HelpCircle,
  Settings,
} from "lucide-react";

const Sidebar = () => {
  const menuItems = [
    { icon: LayoutGrid, label: "Dashboard", active: true },
    { icon: FolderPlus, label: "Create Portfolio" },
    { icon: List, label: "Property List" },
  ];

  const menuItemsOther = [
    { icon: HelpCircle, label: "Support" },
    { icon: Settings, label: "Settings" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 p-6">
      {/* <h2 className="text-xl font-bold mb-6">PyCray</h2>
       */}
      <div className="flex items-center mb-6">
        {/* <img src="icon-url" alt="Logo" className="h-8 w-8 mr-2" /> */}
        <h2 className="text-4xl font-extrabold text-blue-600">PyCray</h2>
      </div>

      <nav>
        <h3 className="text-xs font-semibold text-gray-500 mb-2">MAIN MENU</h3>
        <ul>
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`mb-2 ${
                item.active ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              <a href="#" className="flex items-center">
                <item.icon className="mr-2" size={20} />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <h3 className="text-xs font-semibold text-gray-500 mb-2">
          OTHER SETTINGS
        </h3>
        <ul>
          {menuItemsOther.map((item, index) => (
            <li
              key={index}
              className={`mb-2 ${
                item.active ? "text-blue-600 font-semibold" : "text-gray-700"
              }`}
            >
              <a href="#" className="flex items-center">
                <item.icon className="mr-2" size={20} />
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
