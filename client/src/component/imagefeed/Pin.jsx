import React,{useState} from 'react'
import { urlFor } from '../../client'
import { Link, useNavigate } from 'react-router-dom';
import {MdDownloadForOffline} from 'react-icons/md'
import {  v4 as uuid } from 'uuid';
import { client } from '../../client';
import { BsFillArrowUpRightCircleFill } from 'react-icons/bs';
import { AiTwotoneDelete } from 'react-icons/ai';
import { useEffect } from 'react';
const Pin = ({pin}) => {
    //console.log(pin)
    const navigate=useNavigate()
    const {postedBy}=pin;
    const image=pin.image.asset.url;
    const destination=pin.destination;
    const [checkwidth,setcheckwidth]=useState(false)
    const [saving,setsaving]=useState(false)
    const [postHovered, setPostHovered] = useState(false);
    const user = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();
    
    let alreadysaved=(pin?.save?.filter((item)=>item?.postedBy?._id===user.googleId))
    alreadysaved = alreadysaved?.length > 0 ? alreadysaved : [];
    useEffect(()=>{
      if(window.innerWidth>=500)
      {
        setcheckwidth(true)
      }
      else
      {
        setcheckwidth(false);
      }
    },[window.innerWidth])
    const savepin=(id)=>{

        
        if(alreadysaved?.length===0)
        {
            setsaving(true)
            //console.log("yess")
            client.patch(id).setIfMissing({save:[]}).insert('after','save[-1]',[{
                _key:uuid(),
                
                userId:user?.googleId,
                postedBy:{
                    _type:'postedBy',
                    _ref:user?.googleId
                },
            }]).commit()
            .then(()=>{
                //console.log(response)
                window.location.reload();
                setsaving(false);
                console.log('done')

            })

        }

    }
    const deletepin=(pin)=>{
      console.log(pin)
      client.delete(pin).then(()=>{
        
        setTimeout(()=>{
          
          window.location.reload();
          
        },2000) 
      })

    }

  return (
  
    <div className="m-2">
    {checkwidth?(
      <div
      onMouseEnter={() => setPostHovered(true)}
      onMouseLeave={() => setPostHovered(false)}
      onClick={() => navigate(`/pin-detail/${pin._id}`)}
      className=" relative cursor-zoom-in w-auto shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
    >
     {image && <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(400)}/>}
     {postHovered&&(
        <div
          className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
          style={{ height: '100%' }}
        >
      <div className="flex items-center justify-between">
      <div className="flex gap-2">
              <a
                href={`${pin?.image?.asset?.url}?dl=`}
                
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-100 hover:shadow-md outline-none"
              ><MdDownloadForOffline />
              </a>
      </div>
      {
          alreadysaved?.length !== 0 ?(
              <button onClick={(e)=>e.stopPropagation()} type='button' className='bg-red-500 opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none hover:shadow-md outline-none'>
              {pin?.save?.length} Saved</button>
          ):(
              <button onClick={(e)=>{
                  e.stopPropagation()
                  savepin(pin?._id)
                 

              }}
               type='button' className='bg-red-500 opacity-80 text-white font-bold px-5 py-1 rounded-3xl text-base ' >{pin?.save?.length}   {saving ? 'Saving' : 'Save'}</button>
          )
      }

      </div>
      <div className='flex justify-between items-center gap-2 w-full'>
        {destination&&(
          <a
           href={destination}
            target='_blank'
            rel="noreferrer"
            className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-100 hover:shadow-md'
            >
              <BsFillArrowUpRightCircleFill/>
              
            </a>
        )}
        {
          postedBy?._id===user.googleId &&(
            <button
            type="button"
            className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-100 hover:shadow-md"
            onClick={(e)=>{
              
              e.stopPropagation();
              deletepin(pin?._id);
            }}
            >
              < AiTwotoneDelete/>
            </button>
          )
        }
      </div>
      </div>
     )        
}
</div>

    ):(
      <div
      // onMouseEnter={() => setPostHovered(true)}
      // onMouseLeave={() => setPostHovered(false)}
      onClick={() => navigate(`/pin-detail/${pin._id}`)}
      className=" relative cursor-zoom-in w-auto shadow-lg rounded-lg overflow-hidden transition-all duration-500 ease-in-out"
    >
     {image && <img className='rounded-lg w-full' alt='user-post' src={urlFor(image).width(400)}/>}
     
        <div
          className="absolute top-0 w-full h-full flex flex-col justify-between p-1 pr-2 pt-2 pb-2 z-50"
          style={{ height: '100%' }}
        >
      <div className="flex items-center justify-between">
      <div className="flex gap-2">
              <a
                href={`${pin?.image?.asset?.url}?dl=`}
                
                onClick={(e) => {
                  e.stopPropagation();
                }}
                className="bg-white w-9 h-9 p-2 rounded-full flex items-center justify-center text-dark text-xl opacity-100 hover:shadow-md outline-none"
              ><MdDownloadForOffline />
              </a>
      </div>
      {
          alreadysaved?.length !== 0 ?(
              <button onClick={(e)=>e.stopPropagation()} type='button' className='bg-red-500 opacity-100 text-white font-bold px-5 py-1 text-base rounded-3xl shadow-md outline-none hover:shadow-md outline-none'>
              {pin?.save?.length} Saved</button>
          ):(
              <button onClick={(e)=>{
                  e.stopPropagation()
                  savepin(pin?._id)
                 

              }}
               type='button' className='bg-red-500 opacity-80 text-white font-bold px-5 py-1 rounded-3xl text-base ' >{pin?.save?.length}   {saving ? 'Saving' : 'Save'}</button>
          )
      }

      </div>
      <div className='flex justify-between items-center gap-2 w-full'>
        {destination&&(
          <a
           href={destination}
            target='_blank'
            rel="noreferrer"
            className='bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-100 hover:shadow-md'
            >
              <BsFillArrowUpRightCircleFill/>
              
            </a>
        )}
        {
          postedBy?._id===user.googleId &&(
            <button
            type="button"
            className="bg-white flex items-center gap-2 text-black font-bold p-2 pl-4 pr-4 rounded-full opacity-100 hover:shadow-md"
            onClick={(e)=>{
              
              e.stopPropagation();
              deletepin(pin?._id);
            }}
            >
              < AiTwotoneDelete/>
            </button>
          )
        }
      </div>
      </div>
            
</div>
    )
    }
      
    <Link to={`user-profile/${postedBy?._id}`} className='flex gap-2 items-center mt-2'>
      <img className='w-8 h-8 rounded-full object-cover' src={postedBy?.image} alt='user-pic'/>
      <p className='font-semibold capitalize'>{postedBy?.userName}</p>
    </Link>
    </div>
    
  )
}


export default Pin