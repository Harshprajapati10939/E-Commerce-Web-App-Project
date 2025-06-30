function Header() {
    return (
        <>
            {/* [ Header Topbar ] start */}
            <header className="bg-white shadow-md p-4">
                <div className="flex justify-between items-center">
                    {/* [Mobile Media Block] start */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-black" id="sidebar-hide">
                            <i className="ti ti-menu-2" />
                        </button>
                        <button className="text-gray-600 hover:text-black" id="mobile-collapse">
                            <i className="ti ti-menu-2" />
                        </button>
                        <div className="relative md:hidden">
                            <button className="text-gray-600 hover:text-black">
                                <i className="ph-duotone ph-magnifying-glass" />
                            </button>
                            <div className="absolute top-full left-0 bg-white shadow-md p-3 hidden">
                                <form className="flex items-center">
                                    <input type="search" className="border rounded p-2 w-full" placeholder="Search..." />
                                    <button className="bg-blue-500 text-white px-3 py-2 ml-2">Search</button>
                                </form>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center space-x-2 border p-2 rounded">
                            <i className="ph-duotone ph-magnifying-glass text-gray-600" />
                            <input type="search" className="border-none outline-none" placeholder="Search..." />
                            <button className="text-gray-600 text-sm"><kbd>ctrl+k</kbd></button>
                        </div>
                    </div>
                    {/* [Mobile Media Block end] */}
                    <div className="flex items-center space-x-4">
                        <button className="text-gray-600 hover:text-black">
                            <i className="ph-duotone ph-gear-six" />
                        </button>
                        <button className="text-gray-600 hover:text-black">
                            <i className="ph-duotone ph-diamonds-four" />
                        </button>
                        <div className="relative">
                            <button className="flex items-center space-x-2">
                                <img src="/lightable/images/avatar-2.jpg" alt="user-image" className="w-8 h-8 rounded-full" />
                            </button>
                            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md hidden">
                                <div className="p-3 border-b">
                                    <h5 className="text-sm font-bold">Profile</h5>
                                </div>
                                <ul className="space-y-2 p-3">
                                    <li>
                                        <a href="#" className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded">
                                            <i className="ph-duotone ph-user" />
                                            <span>My Account</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded">
                                            <i className="ph-duotone ph-gear" />
                                            <span>Settings</span>
                                        </a>
                                    </li>
                                    <li>
                                        <a href="#" className="flex items-center space-x-2 hover:bg-gray-100 p-2 rounded">
                                            <i className="ph-duotone ph-power" />
                                            <span>Logout</span>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* [ Header ] end */}
        </>
    );
}

export default Header;
