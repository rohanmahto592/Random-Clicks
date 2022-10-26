import React from 'react'
import {useNavigate} from 'react-router-dom'
// import { HashLink as Link } from 'react-router-hash-link'
import { BubblyLink as Link } from 'react-bubbly-transitions'
import {IoMdAdd,IoMdSearch} from 'react-icons/io'
const Navbar = ({searchitem,setsearchitem,user}) => {
    const navigate=useNavigate()

    if(user)
    {
        return (
            <div className='flex gap-2 md:gap-5 w-full mt-5 pb-7'>
                <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none focus-within:shadow-sm '>
                    <IoMdSearch fontSize={21} className='ml-1'/>
                    <input
                    type="text"
                    onChange={(e)=>setsearchitem(e.target.value)}
                    placeholder='Search'
                    value={searchitem}
                     onFocus={()=>navigate('/search')}
                    className='p-2 w-full bg-white outline-none'
                    />
                </div>
                <div className="flex gap-3 ">
          <Link to={`user-profile/${user?._id}`} className="hidden md:block">
            <img src={user.image} alt="user-pic" className="w-14 h-12 rounded-lg " />
          </Link>
          <Link to="/create-pin" className="bg-purple text-white rounded-lg w-12 h-12 md:w-14 md:h-12 flex justify-center items-center">
            <IoMdAdd />
          </Link>
        </div>
            </div>
          )

    }
    return null;
    
  
}

export default Navbar
