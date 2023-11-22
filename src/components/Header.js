import React, { useContext } from 'react';
import AddIcon from '@mui/icons-material/Add';
import { Button } from '@mui/material';
import { Link } from "react-router-dom";
import { Appstate } from '../App';


const Header = () => {
  
  return (
    <div className="sticky z-10 bg-black top-0 text-3xl flex justify-between text-red-500 font-bold p-3 border-b-2 border-gray-300 ">
    <Link to={'/'}><span>MOVIE<span className="text-white">RATE</span></span></Link>
    <Link to={'/addmovie'}><h1 className=' text-lg  flex items-center cursor-pointer '>
    <Button><AddIcon className='mr-2'/><span className="text-white">ADD NEW</span></Button>
    </h1></Link>
    </div>
  )
}

export default Header;
