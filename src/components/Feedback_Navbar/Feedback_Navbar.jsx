import { Link } from "react-router-dom"

function Feedback_Navbar() {
  return (
    <div className="bg-black p-2 flex justify-center items-center">
      <div>
        <h1 className="text-white">Beta Version</h1>
      </div>
      <button
          className=" ml-3 px-3 py-1 text-sm font-medium text-white bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-md"
          onClick={() => setHamburger(false)}
        >
          <Link to="/feedback">Feedback Form</Link>
        </button>
    </div>
  )
}

export default Feedback_Navbar
