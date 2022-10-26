
import React, { useEffect, useState } from 'react';
import { MdDownloadForOffline } from 'react-icons/md';
import { Link, useParams } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { client, urlFor } from '../../client';
import MasonaryLayout from '../imagefeed/MasonaryLayout';
import Spinner from '../imagefeed/Spinner';
import Spinnerdetail from './Spinnerdetail';
import { pinDetailMorePinQuery, pinDetailQuery } from '../utils/data';
import { Notifications } from 'react-push-notification';
 import addNotification from 'react-push-notification'
 import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
  import { AiTwotoneDelete } from 'react-icons/ai';
const Pindetails = ({user}) => {
  const { pinId } = useParams();
  const [pins, setPins] = useState();
  const [pinDetail, setPinDetail] = useState(null);
  const [comment, setComment] = useState('');
  const [addingComment, setAddingComment] = useState(false);

  const fetchpindetails=()=>{
    const query=pinDetailQuery(pinId);
    client.fetch(query).then((data)=>{
      setPinDetail(data[0])
      console.log(data);
      if(data[0])
      {
        const query1 = pinDetailMorePinQuery(data[0]);
        client.fetch(query1).then((res) => {
          setPins(res);
        });
      }
    })
  }
  useEffect(()=>{
    
    fetchpindetails();
  },[pinId])
  if(!pinDetail)
  {
    return <Spinnerdetail message='Details Loading!!'/>
  }
  const clickToNotify=()=>{
    addNotification({
      title: 'Warning',
      native:true         
    })
  }  
  const addComment=()=>{
    if (comment) {
      setAddingComment(true);

      client
        .patch(pinId)
        .setIfMissing({ comments: [] })
        .insert('after', 'comments[-1]', [{ comment, _key: uuidv4(), postedBy: { _type: 'postedBy', _ref: user._id } }])
        .commit()
        .then(() => {
          fetchpindetails()
          clickToNotify()
          setComment('');
          setAddingComment(false);
          
          
          
        });
    }
  }
  const notify=()=>{
    toast.success('Comment deleted successfully!!', {
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "dark",
    
    
    })}
  const deletecomment=(key)=>{
    
    client.patch(pinId).unset([`comments[_key=="${key}"]`]).commit()
    .then(()=>{
      notify()
      

      
    })

  }
  return (
    <>
    <ToastContainer
     />
    {
      pinDetail&&(
        <div className="flex xl:flex-row flex-col m-auto bg-white" style={{ maxWidth: '1500px', borderRadius: '32px' }}>
        <div className="flex justify-center items-center md:items-start flex-initial">
        <img
              className="rounded-t-3xl rounded-b-lg"
              src={(pinDetail?.image && urlFor(pinDetail?.image.asset.url))}
              alt="user-post"
            />
        </div>
        <div className="w-full p-5 flex-1 xl:min-w-620">
            <div className="flex items-center justify-between">
              <div className="flex gap-2 items-center">
              <a
                  href={`${pinDetail?.image.asset.url}?dl=`}
                  download
                  className="bg-secondaryColor p-2 text-xl rounded-full flex items-center justify-center text-dark opacity-75 hover:opacity-100"
                >
                  <MdDownloadForOffline />
                </a>
              </div>
              <a href={pinDetail.destination} target="_blank" rel="noreferrer">
                {pinDetail.destination}
              </a>
              
            </div>
            <div>
              <h1 className="text-4xl font-bold break-words mt-3">
                {pinDetail.title}
              </h1>
              <p className="mt-3">{pinDetail.about}</p>
            </div>
            <Link to={`/user-profile/${pinDetail?.postedBy._id}`} className="flex gap-2 mt-5 items-center bg-white rounded-lg ">
              <img src={pinDetail?.postedBy.image} className="w-10 h-10 rounded-full" alt="user-profile" />
              <p className="font-bold">{pinDetail?.postedBy.userName}</p>
            </Link>
            <h2 className="mt-5 text-2xl">Comments</h2>
            <div className="max-h-350 overflow-y-auto">
              {pinDetail?.comments?.map((item) => (
                <div className="flex gap-2 mt-5 items-center bg-white rounded-lg" key={item.comment}>
                  <img
                    src={item.postedBy?.image}
                    className="w-10 h-10 rounded-full cursor-pointer"
                    alt="user-profile"
                  />
                  <div className="flex flex-row">
                    <div className="flex flex-col">
                    <p className="font-bold">{item.postedBy?.userName}</p>
                    <p>{item.comment}</p>
                    </div>
                    {item.postedBy?._id===user?._id && <AiTwotoneDelete className='cursor-pointer  ml-5 mt-6 w-5 h-5 hover:transition ease-in' onClick={()=>deletecomment(item?._key)}/>}
                    
                    
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-wrap mt-6 gap-3">
            <Link to={`/user-profile/${user._id}`}>
                <img src={user.image} className="w-10 h-10 rounded-full cursor-pointer" alt="user-profile" />
              </Link>
              <input
                className=" flex-1 border-gray-100 outline-none border-2 p-2 rounded-2xl focus:border-gray-300"
                type="text"
                placeholder="Add a comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              />
               <button
                type="button"
                className="bg-red-500 text-white rounded-full px-6 py-2 font-semibold text-base outline-none"
                onClick={addComment}
              >
                {addingComment ? 'Doing...' : 'Done'}
              </button>
              
             
            </div>
            
        </div>
        </div>
      )
    }
    {pins?.length > 0 && (
        <h2 className="text-center font-bold text-2xl mt-8 mb-4">
          More like this
        </h2>
      )}
      {pins ? (
        <MasonaryLayout pins={pins} />
      ) : (
        <Spinner message="Loading more pins" />
      )}
    </>
  )
}

export default Pindetails