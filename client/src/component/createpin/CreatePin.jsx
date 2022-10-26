import React from 'react'
import { useState } from 'react'
import { AiOutlineCloudUpload } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { MdDelete } from 'react-icons/md';

import { categories } from '../utils/data'
import { client } from '../../client'
import Spinner2 from './Spinner2';
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
// import svg from './style.svg'
const Createpin = ({user}) => {
  const [title,setitle]=useState('')
  const [about,setabout]=useState('')
  const [destination,setdestination]=useState('')
  const [loading,setloading]=useState(false)
  const [fields,setfields]=useState(false)
  const [category,setcategory]=useState(null)
  const [imageasset,setimageasset]=useState(null)
  const [wrongimagetype,setwrongimagetype]=useState(false)
  const navigate=useNavigate();

  const uploadImage=(e)=>{
    const selectedfile=e.target.files[0];
    if(selectedfile.type==='image/png' || selectedfile.type==='image/jpg' || selectedfile.type==='image/jpeg' || selectedfile.type==='image/svg' || selectedfile.type=='image/gif')
    {
      setwrongimagetype(false)
      setloading(true)
      client.assets.upload('image',selectedfile,{contentType:selectedfile.type,filename:selectedfile.name})
      .then((document)=>{
        console.log(document)
        setimageasset(document)
        setloading(false)
      })
    }
    else
    {
      setwrongimagetype(true)
    }

  }
  const notify=()=>{
    toast.success('Post uploaded successfully!!', {
      position: "top-right",
      autoClose: 4000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      
      })
  }
  function savepin()
  {
    if(title &&destination && about && category && imageasset?._id)
    {
      const doc={
        _type:'imagepin',
        title,
        about,
        destination,
        image:{
          _type:'image',
          asset:{
            _type:'reference',
            _ref:imageasset?._id,

          },
        },
        userId:user?._id,
        postedBy:{
          _type:'postedBy',
          _ref:user._id,
        },
        category,

      };
      client.create(doc).then((response)=>{

        console.log(response)
        setfields(false);
        notify();
        setTimeout(()=>{
          window.location.reload()
        },3000)

      })
    }
    else
    {
      setfields(true);
      setTimeout(()=>{
        setfields(false)
      },2000)
      
    }
  }

  return (
    <div className="flex flex-col justify-center items-center mt-5 lg:h-4/5" >
      <ToastContainer/>
      {fields &&(
        <p className="text-red-500 mb-5 text-xl transition-all duration-150 ease-in ">Please add all fields.</p>
      )}
      <div className=' flex lg:flex-row flex-col justify-center items-center bg-white lg:p-5 p-3 lg:w-4/5 w-full' >
      <div className="bg-secondaryColor p-3 flex flex-0.7 w-full">
      <div className=" flex justify-center items-center flex-col border-2 border-dotted border-gray-300 p-3 w-full h-420" >
      {loading && (
              <Spinner2 />
            )}
       {
              wrongimagetype && (
                <p>It&apos;s wrong file type.</p>
              )
        }
        {!imageasset ? (
              // eslint-disable-next-line jsx-a11y/label-has-associated-control
              <label style={{cursor:'pointer'}}>
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="flex flex-col justify-center items-center">
                    <p className="font-bold text-2xl">
                      <AiOutlineCloudUpload />
                    </p>
                    <p className="text-lg">Click to upload</p>
                  </div>

                  <p className="mt-32 text-gray-400">
                    Recommendation: Use high-quality JPG, JPEG, SVG, PNG, GIF or TIFF less than 15MB
                  </p>
                </div>
                <input
                  type="file"
                  name="upload-image"
                  onChange={uploadImage}
                  className="w-0 h-0"
                />
              </label>
            ) :(
             <div className='relative h-full'>
               <img src={imageasset?.url} alt="uploaded-image" className='h-full w-full'/>
               <button
               type='button'
               className='absolute bottom-3 right-3 p-3 rounded-full bg-white text-xl cursor-pointer hover:shadow-md transition-all duration-500'
               onClick={()=>setimageasset(null)}
               >
                <MdDelete/>
                 
               </button>
               </div>
            )
}
      </div>
      </div>
      {/* form starts from here */}
      <div className='flex flex-1 flex-col gap-6 lg:pl-5 mt-5 w-full '>
        <input
        type='text'
        value={title}
        onChange={(e)=>setitle(e.target.value)}
        placeholder='Add your title!!'
        className='outline-none text-xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
         />
         <input
        type='text'
        value={about}
        onChange={(e)=>setabout(e.target.value)}
        placeholder='What is your post about!!'
        className='outline-none text-xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2 '
         />
         <input
        type='text'
        value={destination}
        onChange={(e)=>setdestination(e.target.value)}
        placeholder='Add a destination link!!'
        className='outline-none text-xl sm:text-3xl font-bold border-b-2 border-gray-200 p-2'
         />
         <div className='flex flex-col'>
           <p className='mb-2 font-semibold text-lg sm:text-xl'>Choose a Category</p>
           <select
             onChange={(e)=>setcategory(e.target.value)}
             className='outline-none w-4/5 text-base border-b-2 p-2 rounded-md cursor-pointer '
              >
               <option value="other" className='bg-white '>Select category</option> 
               {categories?.map((item)=>(
                 <option className='text-base border-0 outline-none capitalize bg-white text-black font-bold' value={item?.name}>
                   {item.name}
                 </option>
               ))}
              </select>
         </div>
         <div className='flex  mt-5'>
           <button type='button'
            onClick={savepin}
            className='bg-red-500 text-white font-bold p-2 rounded-full w-28 outline-none'>
              Upload

           </button>
         </div>
         {user &&(
           <div className='flex justify-end items-end gap-2 my-2 items-center bg-white rounded-lg'>
             <img src={user.image}
             className='w-10 h-10 rounded-full'
             alt='user-profile'
             />
             <p className='font-bold'>{user.userName}</p>
           </div>
         )}
      </div>
      </div>
    </div>
  )
}

export default Createpin