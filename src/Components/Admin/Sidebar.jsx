import { useContext } from "react";
import myContext from "../../Context/Data/MyContext";

function Sidebar() {
    const context = useContext(myContext)
      const { toggleMode, mode } = context
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
                            <li className="pc-item pc-hasmenu">
                                <a href="/dashboard" className="pc-link flex items-center gap-2 text-gray-300 hover:text-black"style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} >
                                    <i className="ph-duotone ph-gauge" />
                                    <span className="pc-mtext text-sm font-medium text-gray-700"style={{ color: mode === 'dark' ? 'white' : '', }}>Dashboard</span>
                                    {/* <span className="ml-auto text-sm bg-gray-700 px-2 py-1 rounded-full">2</span> */}
                                </a>
                            </li>
                            <li className="pc-item ">
                                <a href="/addproduct" className="pc-link flex items-center gap-2 text-gray-300 hover:text-black">
                                    <i className="ph-duotone ph-projector-screen-chart text-lg" />
                                    <span className="pc-mtext text-sm font-medium text-gray-700"style={{ color: mode === 'dark' ? 'white' : '', }}>Add Product</span>
                                </a>
                            </li>
                            <li className="pc-item">
                                <a href="/productdetail" className="pc-link flex items-center gap-2 text-gray-300 hover:text-black">
                                    <i className="ph-duotone ph-identification-card text-lg" />
                                    <span className="pc-mtext text-sm font-medium text-gray-700"style={{ color: mode === 'dark' ? 'white' : '', }}>View Product</span>
                                </a>
                            </li>
                            <li className="pc-item">
                                <a href="/orderdetail" className="pc-link flex items-center gap-2 text-gray-300 hover:text-black">
                                    {/* <i className="ph-duotone ph-database text-lg" /> */}
                                    <span className="pc-micon">
                                            <i className="ph-duotone ph-database" />
                                        </span>
                                    <span className="pc-mtext text-sm font-medium text-gray-700"style={{ color: mode === 'dark' ? 'white' : '', }}>Manage Orders</span>
                                </a>
                            </li>
                            <li className="pc-item">
                                <a href="/userdetail" className="pc-link flex items-center gap-2 text-gray-300 hover:text-black">
                                    <i className="ph-duotone ph-users text-lg" />
                                    <span className="pc-mtext text-sm font-medium text-gray-700"style={{ color: mode === 'dark' ? 'white' : '', }}>View Users</span>
                                </a>
                            </li>
                        </ul>
                        {/* <div className="card bg-blue-500 p-4 mt-6 rounded-md text-white">
                            <h5 className="text-lg">Help Center</h5>
                            <p className="text-sm opacity-75">Please contact us for more questions.</p>
                            <a href="https://phoenixcoded.support-hub.io/" className="btn bg-white text-blue-500 px-4 py-2 rounded-md mt-2" target="_blank">Go to help Center</a>
                        </div> */}
                    </div>

                    <div className="card p-4 mt-100 bg-gray-300 text-white justify-end "style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>
                        <div className="flex items-center">
                            <img src="/lightable/images/avatar-1.jpg" alt="user-image" className="w-12 h-12 rounded-full" />
                            <div className="ml-3" >
                                <h6 className="text-lg text-sm font-medium text-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>Harsh Prajapati</h6>
                                <small className="text-gray-400 text-sm font-medium text-gray-700"style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}>Administrator</small>
                            </div>
                        </div>
                        {/* <ul className="mt-4 space-y-2"> */}
                            {/* <li><a className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium text-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} href="#"><i className="ph-duotone ph-user" />My Account</a></li> */}
                            {/* <li><a className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium text-gray-700"style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }} href="#"><i className="ph-duotone ph-gear" />Settings</a></li> */}
                            {/* <li><a className="flex items-center gap-2 text-gray-300 hover:text-white" href="#"><i className="ph-duotone ph-lock-key" />Lock Screen</a></li> */}
                            {/* <li><a className="flex items-center gap-2 text-gray-300 hover:text-white text-sm font-medium text-gray-700" style={{ backgroundColor: mode === 'dark' ? 'rgb(46 49 55)' : '', color: mode === 'dark' ? 'white' : '', }}href="#"><i className="ph-duotone ph-power" />Logout</a></li> */}
                        {/* </ul> */}
                    </div>
                </div>
            </nav>
            {/* [ Sidebar Menu ] end */}
        </>
    );
}

export default Sidebar;
