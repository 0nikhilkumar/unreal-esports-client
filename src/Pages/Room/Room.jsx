const Room = () => {
    return (
        <div className="bg-black min-h-screen flex flex-col p-4">
            <div className="bg-white flex p-4 rounded-lg shadow-md">
                <div className="w-full flex space-x-2">
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Tier 1</button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Tier 2</button>
                    <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">Tier 3</button>
                </div>
                <div className="flex flex-col justify-center w-full space-y-2 ml-4">
                    <button className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700">Create Room</button>
                    <input 
                        type="text" 
                        placeholder="search room..." 
                        className="py-2 px-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
            <div className="flex-1 mt-4"></div>
        </div>
    );
};

export default Room;
