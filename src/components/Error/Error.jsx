import {useNavigate}  from "react-router-dom"

function Error() {
    const navigate = useNavigate()
  return (
    <div className='flex items-center justify-center h-screen bg-gray-900 text-white'>
      <div className="text-center">
        <h1 className="text-6xl  font-extrabold mb-4">404</h1>
        <p className="text-2xl mb-6">OOPs! Page Not Found</p>
        <button onClick={()=>navigate('/')} className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none">Go Back To Home</button>
      </div>
    </div>
  )
}

export default Error
