import React, { useEffect, useState } from 'react'
import MyContext from './MyContext';
import { fireDB } from '../../Firebase/FirebaseConfig';
import { addDoc, collection, deleteDoc, doc, getDocs, onSnapshot, orderBy, query, setDoc, Timestamp } from 'firebase/firestore';
import { toast } from 'react-toastify';

function MyState(props) {
    const [mode,setMode] =useState('light');

    const toggleMode = () =>{
        if(mode === 'light'){
            setMode('dark');
            document.body.style.backgroundColor ='rgb(17, 24, 39)';
        }else{
            setMode('light');
            document.body.style.backgroundColor ='white';
        }
    }
    const [loading,setLoading]= useState(false);
    const [products, setProducts] = useState({
      title: null,
      price: null,
      imageUrl: null,
      category: null,
      description: null,
      time: Timestamp.now(),
      date: new Date().toLocaleString(
        "en-US",
        {
          month: "short",
          day: "2-digit",
          year: "numeric",
        }
      )
  
    })
  
    // ********************** Add Product Section  **********************
    const addProduct = async () => {
      if (products.title == null || products.price == null || products.imageUrl == null || products.category == null || products.description == null) {
        return toast.error('Please fill all fields')
      }
      const productRef = collection(fireDB, "products")
      setLoading(true)
      try {
        await addDoc(productRef, products)
        toast.success("Product Add successfully")
        setTimeout(()=>{
          window.location.href = '/dashboard'
        },800);
        getProductData()
        closeModal()
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
      // setProducts("")
    }
  
    const [product, setProduct] = useState([]);
  
    // ****** get product
    const getProductData = async () => {
      setLoading(true)
      try {
        const q = query(
          collection(fireDB, "products"),
          orderBy("time"),
          // limit(5)
        );
        const data = onSnapshot(q, (QuerySnapshot) => {
          let productsArray = [];
          QuerySnapshot.forEach((doc) => {
            productsArray.push({ ...doc.data(), id: doc.id });
          });
          setProduct(productsArray)
          setLoading(false);
        });
        return () => data;
      } catch (error) {
        console.log(error)
        setLoading(false)
      }
    }
  
    useEffect(() => {
      getProductData();
    }, []);
  

    //updaate product function

    const edithandle = (item) => {
      setProducts(item)
    }

    const updateproduct = async () =>{
      setLoading(true)
      try{
        await setDoc(doc(fireDB,"products",products.id),products);
        toast.success("product updated successfully")
        setTimeout(()=>{
          window.location.href = '/dashboard'
        },800);
        getProductData()
        setLoading(false)
      }catch(error){
        console.log(error)
        setLoading(false)
      }
    }

    const deleteProduct  =  async (item) =>{
      setLoading(true)
      try{
        await deleteDoc(doc(fireDB,"products",item.id));
        toast("product deleted successfully")
        getProductData()
        setLoading(false)

      }catch(error){
        console.log(error)
        setLoading(false)
      }
    }

    const [orders,setOrder]=useState();

   const getOrderData = async () => {
  setLoading(true);
  try {
    const result = await getDocs(collection(fireDB, "orders"));
    const ordersArray = [];
    result.forEach((doc) => {
      ordersArray.push({ id: doc.id, ...doc.data() }); // Ensure id and all fields are included
    });
    setOrder(ordersArray);
    console.log("Fetched Orders:", ordersArray); // Debugging
    setLoading(false);
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

   useEffect(()=>{
    getOrderData();
   },[]);

const [users,setUser] =useState([]);

const getUserData = async () => {
  setLoading(true)
  try {
    const result = await getDocs(collection(fireDB,"users"))
    const usersArray = [];
    result.forEach((doc)=>{
      usersArray.push(doc.data());
      setLoading(false)
    });
    setUser(usersArray);
    console.log(usersArray)
    setLoading(false);
  } catch (error) {
    console.log(error)
    setLoading(false)
  }
}

   useEffect(()=>{
     getUserData();
   },[]);


   const deleteUser = async (uid) => {
    try {
        await deleteDoc(doc(fireDB, 'users', uid));
        setUser(prevUsers => prevUsers.filter(user => user.uid !== uid));
        console.log(`User ${uid} deleted successfully`);
    } catch (error) {
        console.error('Error deleting user:', error);
    }
};

  

const [searchKey,setSearchkey]=useState('');
const [filterType,setFilterType]= useState('');
const [filterPrice,setFilterPrice]=useState('');

  return (
    <MyContext.Provider value = {{mode, toggleMode,loading,setLoading,products,setProducts,addProduct,product,edithandle,updateproduct,deleteProduct,orders,setOrder,users,searchKey,setSearchkey,filterType,setFilterType,filterPrice,setFilterPrice,deleteUser}}>
       {props.children}
    </MyContext.Provider>
  )
}

export default MyState