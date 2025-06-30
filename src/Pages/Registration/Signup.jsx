import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import myContext from '../../Context/Data/MyContext';
import { toast } from 'react-toastify';
import { auth, fireDB } from '../../Firebase/FirebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import Loader from '../../Components/Loader/Loader';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const context = useContext(myContext);
    const { loading, setLoading } = context;

    const signup = async () => {
        setLoading(true);
        if (name === "" || email === "" || password === "") {
            return toast.error("All fields are required");
        }
        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            };
            const userRef = collection(fireDB, "users");
            await addDoc(userRef, user);
            toast.success("Signup Successfully");
            setName("");
            setEmail("");
            setPassword("");
            setLoading(false);
        } catch (error) {
            toast.error('Signup failed');
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100 px-4">
            {loading && <Loader />}
            <div className="bg-white shadow-lg rounded-xl p-8 w-full max-w-sm">
                <div className="flex justify-center mb-4">
                    <img src="/lightable/images/ebharat.png" alt="Website Logo" className="w-24" />
                </div>
                <h1 className="text-center text-gray-800 text-2xl font-bold mb-6">Signup</h1>
                <div className="mb-4">
                    <input 
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        name='Name'
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder='Name'
                    />
                </div>
                <div className="mb-4">
                    <input 
                        type="email"
                        name='email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder='Email'
                    />
                </div>
                <div className="mb-4">
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                        placeholder='Password'
                    />
                </div>
                <button
                    onClick={signup}
                    className="w-full bg-red-500 text-white font-bold py-3 rounded-lg hover:bg-red-600 transition duration-300 mb-4">
                    Signup
                </button>
                <p className="text-gray-600 text-center">
                    Have an account? 
                    <Link className="text-red-500 font-bold" to={'/login'}> Login</Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;
