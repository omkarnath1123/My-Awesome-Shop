import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navigation = ()=>{
   return(
     <div className="navdiv" >

       <ul>
           <li> <Link to='/'> HOME </Link> </li>
           <li><a href='#contact'> ABOUT </a></li>
           <li><a className='active' href='#about'> CONTACT </a></li>
           <li><a className='active' href='#about'> BAG </a></li>
           <li className='My Awesome Shop' ><a href='#home'> MY AWESOME SHOP </a></li>
       </ul>
     </div>

         );

}


export default Navigation;