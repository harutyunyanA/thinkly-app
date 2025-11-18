import { Search, Plus } from "lucide-react";

export function Header() {
  return (
    <header className="h-16 bg-white shadow-md flex items-center justify-between px-6">
      {/* Search */}
      <div className="flex items-center gap-2 bg-gray-100 px-4 py-2 rounded-md">
        <Search size={18} className="text-gray-500" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent outline-none text-sm"
        />
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-4">
        {/* Add Quiz Button */}
        <button className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md text-sm hover:bg-indigo-700 transition">
          <Plus size={18} />
          Add Quiz
        </button>
      </div>
    </header>
  );
}
