import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import CardList from '../components/CardList';
import Searchbox from '../components/Searchbox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry';
import './App.css';
import { requestRobots, setSearchfield } from "../actions";

const mapStateToProps = state => {
    return {
        searchField: state.searchRobots.searchField,
        robots: state.requestRobots.robots,
        isPending: state.requestRobots.isPending,
        error: state.requestRobots.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        onSearchChange: (event) => dispatch(setSearchfield(event.target.value)),
        onRequestRobots: () => dispatch(requestRobots())
    }
}

function App(props) {
    const { searchField, onSearchChange, onRequestRobots, robots, isPending } = props;
    const filteredRobots = robots.filter(robot => {
        return robot.name.toLowerCase().includes(searchField.toLowerCase());
    })

    useEffect(() => {
        onRequestRobots()
    },[onRequestRobots]);

    if (isPending) {
        return <h1 className='tc'>Loading</h1>
    } else {
        return(
            <div className='tc'>
                <h1 className='f1'>Robofriends</h1>
                <Searchbox searchChange={onSearchChange} />
                <Scroll>
                    <ErrorBoundry>
                        <CardList robots={filteredRobots}/>
                    </ErrorBoundry>
                </Scroll>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
