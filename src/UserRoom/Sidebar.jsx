import { useState } from "react"
import { Menu, X } from "lucide-react"
import {Link} from "react-router-dom"

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  return (
    <div className="relative">
      {/* Hamburger/Cross button */}
      <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {<Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white p-5 transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <nav className="mt-16">
          <ul className="space-y-4">
            <li className={"flex justify-end"}>
            <button
        onClick={toggleSidebar}
        className="fixed top-4 left-4 z-50 p-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-600"
        aria-label={isOpen ? "Close menu" : "Open menu"}
      >
        {<X size={24}/>}
      </button>
            </li>
            <li>
              <Link to="/" className="block hover:text-gray-300">
                Home
              </Link>
            </li>
            <li>
            <div className="text-white">
        <Link to={"/joined-rooms"}>Joined Rooms</Link>
      </div>
            </li>
          </ul>
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={toggleSidebar}></div>}
    </div>
  )
}

export default Sidebar