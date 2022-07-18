import React, { useEffect,useState } from "react";
import { useNavigate } from 'react-router-dom';
import {auth} from '../base'



function Nav() {
    const[user,setUser]=useState([])
    const navigate = useNavigate();
    

    useEffect(() => {
        // will only run once when the app component loads...
    
        auth.onAuthStateChanged((authUser) => {
          console.log("THE USER IS >>> ", authUser);
          
          if(authUser){
            setUser(authUser)
        }else{
            navigate("/")
        }
        });
      }, [navigate]);

    const logout = () => {
        if (user) {
          auth.signOut();
          
          navigate("/")
        }
      }
    
    return (
      <>
      <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800">
  <div class="container flex flex-wrap justify-between items-center mx-auto">
    <button  class="flex items-center">
        <span onClick={()=>{navigate("/dashboard")}} class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">Library</span>
    </button>
    <button data-collapse-toggle="mobile-menu" type="button" class="inline-flex items-center p-2 ml-3 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
      <span class="sr-only">Open main menu</span>
      <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
      <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
    </button>
    <div class="hidden w-full md:block md:w-auto" id="mobile-menu">
      <ul class="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
        <li onClick={()=>{navigate("/dashboard")}}>
          <button  class="block py-2 pr-4 pl-3  bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-black" aria-current="page">Home</button>
        </li>

        <li onClick={()=>{navigate("/addbook")}}>
          <button  class="block py-2 pr-4 pl-3  bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-black" aria-current="page">Add Books</button>
        </li>
      
      </ul>
    </div>
  </div>
</nav>
    
        

    

    
    

       
        </>
    )
}

export default Nav
