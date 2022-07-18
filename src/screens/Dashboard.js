import React, { useEffect,useState } from "react";
import {db,storage,auth} from '../base'
import firebase from "firebase";
import { useNavigate } from 'react-router-dom';
import Nav from "../components/Nav";


function Dashboard() {
  const[data,setData]=useState([])
  const navigate = useNavigate();
  const[term,setTerm] =useState("")
   
//fetching books
useEffect(() => {
  db.collection("books").onSnapshot(querySnapshot=>{
      setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
    })
}, [])


  const open = (book)=>{
    navigate('/book', { state: book});
  }

  const search = (e)=>{
    e.preventDefault()
    if(term == ""){
      db.collection("books").onSnapshot(querySnapshot=>{
        setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
      })
    }else{
    db.collection("books").where("title","==",term.toLowerCase()).onSnapshot(querySnapshot=>{
      setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
    })
  }
  }

  console.log(data)
  return (
    <>
     <Nav/>
     <form onSubmit={search} class="m-auto max-w-lg">   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-gray-300">Search</label>
    <div class="relative">
       
        <input value={term} onChange={(e)=>{setTerm(e.target.value)}} type="search" id="default-search" class="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..."/>
        <button type="submit" class="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
</form>
    <div style={{"display":"grid", "gridTemplateColumns":"1fr 1fr 1fr","marginTop":"20px"}}>
     {
      data.map((e)=>(
        <>
         <div class=" ml-10 mr-10 mb-10 max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="https://images.pexels.com/photos/1130980/pexels-photo-1130980.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{e.title}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{e.desc}</p>
       
        <button onClick={()=>{open(e.book)}} class="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read Book
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
    </div>
</div>
        </>
      ))
     }
   
    </div>
        

    </>
  )
}

export default Dashboard