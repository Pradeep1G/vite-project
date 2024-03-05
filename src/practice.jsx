

export default function Practice(){
    return (
        <>
            <div className="flex items-center justify-center">
  <div className="container mx-auto p-4 flex flex-wrap gap-4 w-fit items-center justify-center">
    {/* First Card - Student 1 */}
    <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
      <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
        <h1 className="text-2xl font-bold text-center">Student 1</h1>
      </div>
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-700">Name: John Doe</p>
        <p className="text-lg text-gray-600">Reg No: ABC123</p>
        <p className="text-lg text-gray-600 ">Section: A</p>
      </div>
    </div>

    {/* Second Card - Student 2 (if exists) */}
    <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
      <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
        <h1 className="text-2xl font-bold text-center">Student 2</h1>
      </div>
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <div className="p-4">
        <p className="text-lg font-semibold text-gray-700">Name: Jane Smith</p>
        <p className="text-lg text-gray-600">Reg No: XYZ456</p>
        <p className="text-lg text-gray-600">Section: B</p>
      </div>
      {/* Add other details for the second student here */}
    </div>

    {/* Third Card - Guide */}
    {/* <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80 relative group">
  <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
    <h1 className="text-2xl font-bold text-center">Guide Details</h1>
  </div>
  <div className="flip-card-inner absolute inset-0 transform transition-transform duration-500 group-hover:rotate-y-180">
    <div className="flip-card-front flex justify-center items-center">
      <img
        src="https://via.placeholder.com/150"
        alt="Profile"
        className="w-32 h-32 rounded-full mx-auto mb-4"
      />
      <div className="p-4 text-center">
        <p className="text-lg text-gray-600">Name: Dr. Smith</p>
        <p className="text-lg text-gray-600">Email: smith@example.com</p>
      </div>
    </div>
    <div className="flip-card-back absolute inset-0 bg-white flex flex-col justify-center items-center rotate-y-180">
      <h1 className="text-2xl font-bold mb-4">Problem Statements</h1>
      <ul className="text-lg text-gray-600">
        <li>Problem Statement 1</li>
        <li>Problem Statement 2</li>
        <li>Problem Statement 3</li>
      </ul>
    </div>
  </div>
</div> */}

        <div className="group">

            <div className=" h-full w-full rounded-xl shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

                <div className="inset-0">






                                    <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
                    <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                        <h1 className="text-2xl font-bold text-center">Guide Details</h1>
                    </div>
                    <img
                        // src={getDirectLinkFromShareableLink(guideImg)}
                        alt="Profile"
                        className="w-32 h-32 rounded-full mx-auto mb-4"
                    />
                    <div className="p-4">
                        <p className="text-lg text-gray-600 text-center">Name: </p>
                        <p className="text-lg text-gray-600 text-center">Email: </p>
                    </div>
                    </div>






                </div>

                <div className="absolute inset-0 bg-white [transform:rotateY(180deg)] [backface-visibility:hidden]">





                            



                <div className="bg-white rounded-xl shadow-xl mb-4 overflow-hidden min-w-96 min-h-80">
                    <div className="bg-[#9e1c3f] text-white py-2 rounded-t-xl mb-4 mx-0">
                        <h1 className="text-2xl font-bold text-center">Problem Statements</h1>
                    </div>
                    <div className="p-4">
                        <p className="text-lg text-gray-600 text-center">Name: </p>
                        <p className="text-lg text-gray-600 text-center">Email: </p>
                        <p className="text-lg text-gray-600 text-center">Email: </p>
                        <p className="text-lg text-gray-600 text-center">Email: </p>
                        <p className="text-lg text-gray-600 text-center">Email: </p>

                    </div>
                    </div>






                </div>

            </div>

        </div>





  </div>
</div>




        </>
    )
}