import { useContext } from "react";
import myContext from "../../Context/Data/MyContext";
import { FaSignOutAlt } from "react-icons/fa";
function Sidebar() {
    const context = useContext(myContext)
      const { toggleMode, mode } = context


      const logout = () => {
        localStorage.clear('user')
        window.location.href = "/login"
      }
    return (
        
        <>
            {/* [ Sidebar Menu ] start */}
            <nav className="pc-sidebar  bg-white text-white w-64 min-h-screen"style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="navbar-wrapper">
                    {/* <div className="m-header p-4 flex items-center">
                        <a href="../dashboard/index.html" className="b-brand text-primary flex items-center">
                            <img src="/iceshop/assets/images/logo.png" alt="logo image" className="h-10" />
                            <span className="badge bg-blue-500 text-white rounded-full ml-2 px-2 py-1 text-sm">v1.3.0</span>
                        </a>
                    </div> */}
                    <div className="navbar-content p-4">
                        <ul className="space-y-4">
                        <li className="pc-item">
                                <a href="/myprofile" className="pc-link flex items-center gap-2 text-gray-300 hover:text-black">
                                    {/* <i className="ph-duotone ph-database text-lg" /> */}
                                    <span className="pc-micon">
                                            <i className="ph-duotone ph-database" />
                                        </span>
                                    <span className="pc-mtext text-sm font-medium text-gray-700"style={{ color: mode === 'dark' ? 'white' : '', }}>My Profile</span>
                                </a>
                            </li>
                            <li className="pc-item ">
                                <a href="/order" className="pc-link flex items-center gap-2 text-gray-300 hover:text-black">
                                    <i className="ph-duotone ph-projector-screen-chart text-lg" />
                                    <span className="pc-mtext text-sm font-medium text-gray-700"style={{ color: mode === 'dark' ? 'white' : '', }}>My orders</span>
                                </a>
                            </li>
                            <li className="pc-item">
                                <a href="/allproducts" className="pc-link flex items-center gap-2 text-gray-300 hover:text-black">
                                    <i className="ph-duotone ph-identification-card text-lg" />
                                    <span className="pc-mtext text-sm font-medium text-gray-700"style={{ color: mode === 'dark' ? 'white' : '', }}>View Product</span>
                                </a>
                            </li>
                            
                            
                        </ul>
                        {/* <div className="card bg-blue-500 p-4 mt-6 rounded-md text-white">
                            <h5 className="text-lg">Help Center</h5>
                            <p className="text-sm opacity-75">Please contact us for more questions.</p>
                            <a href="https://phoenixcoded.support-hub.io/" className="btn bg-white text-blue-500 px-4 py-2 rounded-md mt-2" target="_blank">Go to help Center</a>
                        </div> */}
                        <div className="flex mt-10 ">
                        <button
                            onClick={logout}
                            className="bg-red-500 hover:bg-red-600 text-white px-8 py-3 rounded-lg transition duration-300"
                        >
                            <FaSignOutAlt className="inline mr-2" />
                            Logout
                        </button>
                    </div>
                    </div>

                    
                </div>
            </nav>
            {/* [ Sidebar Menu ] end */}
        </>
    );
}

export default Sidebar;
