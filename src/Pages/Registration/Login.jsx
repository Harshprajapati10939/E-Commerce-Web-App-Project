import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import myContext from '../../Context/Data/MyContext';
import { auth } from '../../Firebase/FirebaseConfig';
import Loader from '../../Components/Loader/Loader';
// import Navbar from '../Navbar/navbar'
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const context = useContext(myContext);
    const { loading, setLoading } = context;
    const navigate = useNavigate();

    const login = async () => {
        setLoading(true);
        try {
            const result = await signInWithEmailAndPassword(auth, email, password);
            localStorage.setItem('user', JSON.stringify(result));
            navigate('/');
            toast.success('Signin Successfully', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        } catch (error) {
            toast.error('Signin Failed', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        }
        setLoading(false);
    };

    const handleGooglesSignIn = async (e) => {
        e.preventDefault();
        setLoading(true);
        const provider = new GoogleAuthProvider();
        provider.setCustomParameters({ prompt: "select_account" }); // ✅ Forces account selection
    
        try {
            const result = await signInWithPopup(auth, provider);
            const user = result.user;
    
            localStorage.setItem("user", JSON.stringify(user)); 
            navigate("/");
    
            toast.success(`Signed in as ${user.displayName || user.email}`, {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                theme: "colored",
            });
        } catch (err) {
            toast.error("Google Sign-In Failed! Try Again.");
            console.error("Google Sign-In Error:", err);
        }
        setLoading(false);
    };
    

    return (
       
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-8">
          
            {loading && <Loader />}
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
                <div className="flex justify-center mb-4">
                    <img src="/lightable/images/ebharat.png" alt="Website Logo" className="w-24" />
                </div>
                <h1 className="text-center text-gray-800 text-2xl font-bold mb-6">Login</h1>
                <div className="mb-4">
                    <input 
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder='Email'
                        autoComplete="email"
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500"
                        placeholder='Password'
                    />
                </div>
                <button
                    onClick={login}
                    className="w-full bg-yellow-500 text-black font-bold py-3 rounded-lg hover:bg-yellow-600 transition duration-300 mb-4">
                    Login
                </button>
                <button
                    onClick={handleGooglesSignIn}
                    className="w-full bg-white border flex justify-center items-center py-3 rounded-lg hover:shadow-md transition duration-300">
                    <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-6 h-6 mr-2" alt="Google Logo" />
                    <span className="text-gray-700 font-semibold">Sign in with Google</span>
                </button>
                <p className="text-gray-600 text-center mt-4">
                    Don't have an account? 
                    <Link className="text-yellow-500 font-bold" to={'/signup'}> Signup</Link>
                </p>
            </div>
        </div>
        
    );
}

export default Login;
