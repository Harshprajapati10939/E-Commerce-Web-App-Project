import { useContext } from "react";
import { Link } from "react-router-dom";
import myContext from "../../Context/Data/MyContext";

function Footer() {
    const context = useContext(myContext);
    const { mode } = context;

    return (
        <footer
            className="text-gray-600 body-font bg-gray-100 "
            style={{
                
                backgroundColor: mode === "dark" ? "rgb(46 49 55)" : "",
                color: mode === "dark" ? "white" : "",
            }}
        >
            <div className="container px-2 py-5 mx-auto flex flex-wrap  text-center  " >
                <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                    <img
                        src="/lightable/images/venomlogo.png"
                        alt="Payment Options"
                        className="mx-auto" style={{ height: 150}} />

                    <div className="w-full flex flex-wrap mx-auto ">
                        <p>
                            We specialize in cutting-edge Website and Mobile App Development, and provide final-year internships to kickstart careers.
                        </p>

                    </div>
                    <span className="inline-flex sm:ml-auto sm:mt-0 mt-4 justify-center  sm:justify-start">
                        <a href="https://www.facebook.com/your-profile" target="_blank" rel="noopener noreferrer" className="text-gray-500">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                            </svg>
                        </a>
                        <a href="https://twitter.com/your-profile" target="_blank" rel="noopener noreferrer" className="ml-3 text-gray-500">
                            <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
                            </svg>
                        </a>
                        <a href="https://www.instagram.com/your-profile" target="_blank" rel="noopener noreferrer" className="ml-3 text-gray-500">
                            <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-5 h-5" viewBox="0 0 24 24">
                                <rect width={20} height={20} x={2} y={2} rx={5} ry={5} />
                                <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zm1.5-4.87h.01" />
                            </svg>
                        </a>
                        <a href="https://www.linkedin.com/in/harshkumarprajapati/" target="_blank" rel="noopener noreferrer" className="ml-3 text-gray-500">
                            <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={0} className="w-5 h-5" viewBox="0 0 24 24">
                                <path stroke="none" d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
                                <circle cx={4} cy={4} r={2} stroke="none" />
                            </svg>
                        </a>
                    </span>
                </div>

                {["Categories", "Address"].map((title, index) => (
                    <div key={index} className="lg:w-1/4 md:w-1/2 w-full px-4">
                        <h2
                            className="title-font font-medium tracking-widest text-xl mb-3 uppercase text-center mt-12"
                            style={{ color: mode === "dark" ? "white" : "" }}
                        >
                            {title}
                        </h2>
                        <nav className="list-none mb-0 text-center text-m">
                            {title === "Categories" && (

                                <>
                                    <div className="h-1 w-24 bg-pink-600 rounded mx-auto"></div>
                                    <div className="mt-5">
                                        <li><Link to="/" className="hover:text-gray-800 mt-5" style={{ color: mode === "dark" ? "white" : "" }}>Home</Link> </li>
                                        
                                        <li><Link to="/about" className="hover:text-gray-800  mt-2 " style={{ color: mode === "dark" ? "white" : "" }}>About</Link></li>
                                        <li><Link to="/services" className="hover:text-gray-800 mt-2" style={{ color: mode === "dark" ? "white" : "" }}>Services</Link></li>
                                        <li><Link to="/Dashboard" className="hover:text-gray-800 mt-2" style={{ color: mode === "dark" ? "white" : "" }}>Dashboard</Link></li>
                                        <li><Link to="/contact" className="hover:text-gray-800 mt-2" style={{ color: mode === "dark" ? "white" : "" }}>Contact Us</Link></li>
                                    </div>
                                </>
                            )}
                            {title === "Address" && (
                                <>
                                    <div className="h-1 w-24 bg-pink-600 rounded mx-auto"></div>
                                    <div className="mt-5">
                                        <p className="hover:text-gray-800" style={{ color: mode === "dark" ? "white" : "" }}>301, Radhaswami Swamipia, above Poptos, Patel Society, Mota Bazaar, Vallabh Vidyanagar, Anand,Gujarat 388120 </p>
                                        <p className="hover:text-gray-800" style={{ color: mode === "dark" ? "white" : "" }}><span>Email:-</span> hello@venomtechnologies.in</p>
                                        <p className="hover:text-gray-800 " style={{ color: mode === "dark" ? "white" : "" }}><span >phone:-</span><span>+91</span> 7990456948</p><span />

                                    </div>

                                </>
                            )}
                        </nav>
                    </div>

                ))}
                <div className="lg:w-1/4 md:w-1/2 w-full px-4">
                    <img
                        src="/lightable/images/ebharat.png"
                        alt="Payment Options"
                        className="mx-auto "
                        style={{height:150}}
                    />
                    <div className="w-full flex flex-wrap mx-auto ">
                        <p>
                            We specialize in cutting-edge Website and Mobile App Development, and provide final-year internships to kickstart careers.
                        </p>

                    </div>

                </div>
                  {/* <ul>
              <li>
                <span>Mon-Tue:</span>
                <span className="right">6:00AM-10:00PM</span>
              </li>
              <li>
                <span>Wed-Thu:</span>
                <span className="right">6:00AM-10:00PM</span>
              </li>
              <li>
                <span>Fri:</span>
                <span className="right">8:00AM-04:00PM</span>
              </li>
              <li>
                <span>Sat:</span>
                <span className="right">10:00AM-06:00PM</span>
              </li>
              <li>
                <span>Sun:</span>
                <span className="right">Closed</span>
              </li>
            </ul> */}
            </div>

            <div className="bg-gray-200" style={{ backgroundColor: mode === 'dark' ? 'rgb(55 57 61)' : '', color: mode === 'dark' ? 'white' : '', }}>
                <div className="container px-2 py-3 mx-auto flex items-center sm:flex-row flex-col">
                    <Link to={'/'} className='flex'>
                        <div className="flex ">
                            <h1 className=' text-2xl font-bold text-black  py-1 rounded' style={{ color: mode === 'dark' ? 'white' : '', }}>E-Bharat</h1>
                        </div>
                    </Link>
                    <p className="text-sm text-gray-500 sm:ml-6 sm:mt-0 mt-4" style={{ color: mode === 'dark' ? 'white' : '' }}>© 2023 E-bharat —
                        <a href="https://twitter.com/knyttneve" rel="noopener noreferrer" className="text-gray-600 ml-1" target="_blank" style={{ color: mode === 'dark' ? 'white' : '' }}>www.ebharat.com</a>
                    </p>

                </div>
            </div>
        </footer>
    );
}
export default Footer