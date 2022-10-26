import React from 'react'
import { useState } from 'react'
import {Routes,Route} from 'react-router-dom'
import Navbar from '../navbar/Navbar'
import Pindetails from '../pindetails/Pindetails'
import CreatePin from '../createpin/CreatePin'
import Feed from '../imagefeed/Feed'
import Search from '../search/Search'
const Pins = ({user}) => {
    const [searchitem,setsearchitem]=useState('')
      return (
    <div className='px-2 md:px-5'>

        <div className='bg-gray-50'>
            <Navbar searchitem={searchitem} setsearchitem={setsearchitem} user={user&& user}/>

        </div>
        <div className='h-full'>
            <Routes>
                <Route  path='/' element={<Feed/>}/> 
                <Route  path="/category/:categoryId" element={<Feed/>}/>
                <Route  path="/pin-detail/:pinId" element={<Pindetails user={user && user}/>}/> 
                <Route path="/create-pin" element={<CreatePin user={user && user}  />} />
                <Route  path="/search" element={<Search search={searchitem} setsearchitem={setsearchitem} />}/> 
            </Routes>

        </div>
    </div>
  )
}

export default Pins