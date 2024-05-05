import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { SaveLocalStorage } from '../helpers/SaveLocalStorage';

const dashboard = () => {
  const location = useLocation();
  useEffect(()=>{
    const searchParams = new URLSearchParams(location.search)
    const token = searchParams.get('token')
    console.log(token);
    SaveLocalStorage("token",token)
  },[location])
  return (
    <div>dashboard</div>
  )
}

export default dashboard