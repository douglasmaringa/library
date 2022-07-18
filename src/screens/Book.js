import React, { useEffect,useState } from "react";
import { useNavigate,useLocation} from 'react-router-dom';
import Nav from "../components/Nav";
import {db} from "../base"
import { Document, Page } from 'react-pdf/dist/esm/entry.webpack';


function Book() {
    const {state} = useLocation();
    const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
   
  console.log(state)
  
  const next = ()=>{
    if(numPages==pageNumber){
        alert("end of document")
    }else{
        setPageNumber(pageNumber + 1)
    }
  }

  const prev = ()=>{
    if(numPages==1){
        alert("start of document")
    }else{
        setPageNumber(pageNumber - 1)
    }
  }
  return (
    <div>
        <Nav/>
        <div className="text-center">
       
                            </div>
                           
                            <div>
                                <div className="mt-10 ml-40 w-full">
                                Page {pageNumber} of {numPages}
                                <button onClick={()=>{prev()}} class=" mb-20 inline-flex items-center ml-40 py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Prev Page
            </button>
                            <button onClick={()=>{next()}} class="inline-flex items-center ml-40 py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Next Page
            <svg aria-hidden="true" class="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
        </button>
                            <Document
    file={{url:state}}
    onLoadSuccess={onDocumentLoadSuccess}
    onLoadError={(error) => console.log("Inside Error", error)}
    
> <Page width={1000} pageNumber={pageNumber} />
      </Document>
      <p>
      

       
      </p>
    </div>
    </div>
    </div>
  )
}

export default Book
