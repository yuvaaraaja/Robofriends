import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components//SearchBox';
import Scroll from '../components//Scroll'
import './App.css'
//import { robotlist } from '../components/robots'
import ErrorBoundary from '../components/ErrorBoundary';

class App extends Component {

    constructor() {
        super()
        this.state = {
            robots : [],
            searchfield : ''
        };
    }

    //not working as the request to the url https://jsonplaceholder.typicode.com/users 
    //is not returning any data
    componentDidMount() {
        // console.log("check!");
        fetch('https://jsonplaceholder.typicode.com/users')
         .then((response) => response.json())
         .then((users) => this.setState({robots: users}))
    }

    onSearchChange = (event) => {
        this.setState( {searchfield : event.target.value} );
    }

    render() {
        const {robots,searchfield} = this.state;
        const filteredRobots = robots.filter((robot) => {
            return (robot.name.toLowerCase().includes(searchfield.toLowerCase()));
        })
        if(!robots.length) {
            return (<h1 className="tcgit ">LOADING..</h1>)
        }
        else {
            return (
                <div className = 'tc'>
                    <h1 className = 'f1'>RoboFriends</h1>
                    <SearchBox searchChange = {this.onSearchChange} />
                    <Scroll>
                        <ErrorBoundary>
                            <CardList robots = {filteredRobots}/>
                            </ErrorBoundary>
                    </Scroll>
                </div>
            );
        }
    }
}

export default App;