import React, { Component } from 'react';
import Posts from '../Posts/Posts'
// import axios from 'axios';
import './MainPage.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/bottomNav/bottomNav';
import FullView from '../FullView/FullView';
import Bag from '../Bag/Bag'

class MainPage extends Component{
    render(){
        // let data = 0;
        // localStorage.setItem('myData','data');
        return(
            <div>
                {/* <header>
                    <nav className = "nav">
                        <ul>
                            <li><Link to ='/'>Home</Link></li>
                        </ul>
                    </nav>
                </header> */}
                <Navbar/>
                <Switch>
                    <Route path="/" exact component={Posts} />
                    <Route path="/bag" exact component={Bag} />
                    <Route path="/:id" exact component={FullView} />
                </Switch>
                <Footer/>
            </div>
        )
    }

}

export default MainPage;