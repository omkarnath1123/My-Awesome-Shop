import React from 'react';
import {Link} from 'react-router-dom';
import './Navbar.css';

const Navigation = ()=>{
    // adding class to highlight bad does not work
    let className = 'remove';
    if (localStorage.getItem('myList') !== null) {
        if (localStorage.getItem('myList').length !== 0 && localStorage.getItem('myList').length !== 1 && localStorage.getItem('myList').length !== 2){
            // console.log(localStorage.getItem('myList').length);
            className += ' menu-active';
        }
    }
   return(
     <div className="navdiv" >

       <ul>
           {/*<Link to={'/',post_id} key={post_id}>*/}
           <li className={className} ><Link  to='/bag' > BAG </Link></li>
           <li className='remove'><a className='active' href='#about'> CONTACT </a></li>
           <li className='remove'><a href='#contact'> ABOUT </a></li>
           <li className='remove'> <Link to='/'> HOME </Link> </li>
           <li style={{float: 'left'}} className='My Awesome Shop' ><a style={{textDecoration: 'none'}} href='#home'> MY AWESOME SHOP </a></li>
           {/* </Link> */}
       </ul>
     </div>

         );

}


export default Navigation;