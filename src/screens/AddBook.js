import React, { useEffect,useState } from "react";
import {db,storage} from '../base'
import firebase from "firebase";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Nav from "../components/Nav";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };


function AddBook() {
    const[data,setData]=useState([])
    const [open1, setOpen1] = React.useState(false);
    const handleClose = () => setOpen1(false);
    const [open2, setOpen2] = React.useState(false);
    const handleClose2 = () => setOpen2(false);
    const[load,setLoad]=useState(false)
    const[id,setId]=useState("")
    const[imageAsFile,setImageAsFile]= useState("")
    const[title,setTitle]=useState("")
   const[desc,setDesc]=useState("")
   const[category,setCategory]=useState("")
  
   //fetching books
    useEffect(() => {
      db.collection("books").onSnapshot(querySnapshot=>{
          setData(querySnapshot.docs.map(doc=>({ ...doc.data(), id: doc.id })))
        })
  }, [])
  
  //uploading books
  const handleImageAsFile=(e)=>{
    const image = e.target.files[0]
    setImageAsFile(imageFile=>(image))
  }
  
  //uploading books
  const handleFireBaseUpload= ()=>{
  //e.preventDefault()
    setLoad(true)
    console.log('start of upload')
    if(imageAsFile===''){
        console.error("not an image")
    }
    const uploadTask =storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)
    uploadTask.on('state_changed',(snapShot)=>{
        console.log(snapShot)
    },(err)=>{
        console.log(err)
    },()=>{
        storage.ref('images').child(imageAsFile.name).getDownloadURL().then(firebaseUrl=>{
            
         // setImageAsUrl(firebaseUrl)
          save(firebaseUrl)
        })
    })
  }
  const save = async (firebaseUrl) =>{
    // e.preventDefault() // this stops the refresh
     setLoad(true)
     db.collection('books').add({
                 timestamp:firebase.firestore.FieldValue.serverTimestamp(),
          
                 title:title.toLowerCase(),
                 desc:desc,
                 book:firebaseUrl,
             })
             setLoad(false)
             alert("saved")
     
  }
  
  const open3=(id)=>{
    console.log(id)
    setId(id)
    setOpen1(true)
  }
  
  const open=()=>{
    setOpen2(true)
  }
  
  const update =()=>{
    db.collection('books').doc(id).update({
       
      title:title,
      desc:desc,
      category:category,
     })
     setOpen1(false)
  }
  const submit=(id)=>{
    db.collection('books').doc(id).delete()
    alert("Deleted Successfully")
   
  
  }
  console.log(data)
    
  return (
    <>
     <Nav/>
      <Modal
        open={open1}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                                 <div class="col-md-12 px-0 border-top">
                                 <div class="form-group">
                                        <label for="exampleInputName1">Title</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputName1">Desc</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
                                    </div>
                                   
                                    <div class="form-group">
                                        <label for="exampleInputName1">Category</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
                                    </div>
                               
                        </div>

                        
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
           Update
            <span class="float-right"><div class="text-right">
                                                    <button onClick={()=>{update()}} class="btn btn-outline-primary px-3">Update</button>
                                                </div></span>
          </Typography>
        </Box>
      </Modal>

      <Modal
        open={open2}
        onClose={handleClose2}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
                                 <div class="col-md-12 px-0 border-top">
                                 <div class="form-group">
                                        <label for="exampleInputName1">Title</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={title} onChange={(e)=>{setTitle(e.target.value)}}/>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputName1">Desc</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={desc} onChange={(e)=>{setDesc(e.target.value)}}/>
                                    </div>
                                  
                                    <div class="form-group">
                                        <label for="exampleInputName1">Category</label>
                                        <input type="text" class="form-control" id="exampleInputName1d" value={category} onChange={(e)=>{setCategory(e.target.value)}}/>
                                    </div>
                                    <div class="form-group">

                            <label for="exampleInputName1" class="text-dark">Book (Pdf)</label>
                           {
                             load?(<>
                             <h1>loading...</h1>
                             </>):(<></>)
                           }
                            <input type="file" onChange={handleImageAsFile} placeholder="upload image" class="form-control" id="exampleInputName1" aria-describedby="nameHelp" />
                        </div>
                        <div class="text-center">
                                        <button onClick={handleFireBaseUpload} class="btn btn-primary btn-block">Save</button>
                                    </div>
                        </div>
                       
                        
          </Typography>
          
        </Box>
      </Modal>
       

      <div class="flex flex-col mx-20 mt-6 mb-10">
    <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div class="inline-block py-2 min-w-full sm:px-6 lg:px-8">
            <div class="overflow-hidden shadow-md sm:rounded-lg">
                <table class="min-w-full">
                    <thead class="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Title
                            </th>
                            <th scope="col" class="py-3 px-6 text-xs font-medium tracking-wider text-left text-gray-700 uppercase dark:text-gray-400">
                            Desc
                            </th>
                            
                           
                        </tr>
                    </thead>
                    <tbody>
                    {
                        data.map((e)=>(
                            <tr class="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            {e.title}
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500  dark:text-gray-400">
                            {e.desc}
                            </td>
                           
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{marginRight:"5px"}} onClick={()=>{open3(e.id)}}>Edit</button>
                            </td>
                            <td class="py-4 px-6 text-sm text-gray-500 whitespace-nowrap dark:text-gray-400">
                            <button class="bg-red-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={()=>{submit(e.id)}}>Delete</button>
                            
                            </td>
                            
                           
                        </tr>
                       
                        

                        ))
                    }
                       
                      
                    </tbody>
                </table>
                
            </div>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" style={{marginLeft:"30px"}} onClick={open}>Add New Book To Library</button>
    </div>
</div>

    
    </>

  )
}

export default AddBook
