import React,{useState,useEffect,useRef} from 'react'
import { useParams } from 'react-router-dom'
import { client } from '../../client'
import MasonaryLayout from './MasonaryLayout'
import Spinner from './Spinner'

import {searchQuery,feedQuery} from '../utils/data'
const Feed = () => {
    const [loading,setloading]=useState(false)
    const {categoryId}=useParams()
    //console.log(categoryId)
    const [pins,setpins]=useState(null)
    useEffect(()=>{
        setloading(true)
        if(categoryId)
        {
            const query=searchQuery(categoryId)
            client.fetch(query).then((response)=>{
                setpins(response)
                setloading(false)
            })

        }
        else
        {
            client.fetch(feedQuery).then((response)=>{
                console.log(response)
                setpins(response)
                setloading(false)

            })
        }


    },[categoryId])
    if(loading)
    {
        return (
            <Spinner message='We are adding new ideas to your feed!!'/>
          )
    }
    return (
        <div>
            {pins && <MasonaryLayout pins={pins}/>}
        </div>
    )
  
}

export default Feed