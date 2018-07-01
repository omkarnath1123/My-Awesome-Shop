import React, { Component } from 'react';
import Posts from '../Posts/Posts'
// import axios from 'axios';
import './MainPage.css';
import { Route, Switch } from 'react-router-dom';
import Navbar from '../../Components/Navbar/Navbar';

import FullView from '../FullView/FullView';

class MainPage extends Component{
    render(){
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
                    <Route path="/:id" exact component={FullView} />
                </Switch>
            </div>
        )
    }

}

export default MainPage;