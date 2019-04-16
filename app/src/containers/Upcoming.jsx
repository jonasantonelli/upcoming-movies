import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions/upcoming';
import UpcomingList from '../components/Upcoming/List.jsx';
import Search from '../components/Upcoming/Search.jsx';

function debounced(fn, delay) {
    let timerId;
    return function (...args) {
        if (timerId) {
            clearTimeout(timerId);
        }
        timerId = setTimeout(() => {
            fn(...args);
            timerId = null;
        }, delay);
    }
}

class Upcoming extends React.Component {
    constructor(props) {
        super(props);
        this.handleSearch = debounced(this.handleSearch.bind(this), 300);
    }

    componentDidMount() {
        this.props.fetching();
    }

    handleSearch(text) {
        if(!text) {
            return;
        }
        this.props.search(text);
    }

    render() {

        const { result } = this.props;

        return (
            <div className="upcoming">
                <Search onChange={(e) => this.handleSearch(e.target.value)} />
                <UpcomingList data={result} />
                {/*Pagination*/}
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        isLoading: state.upcoming.isLoading,
        isError: state.upcoming.isError,
        totalResults: state.upcoming.totalResults,
        totalPages: state.upcoming.totalPages,
        result: state.upcoming.result
    }
};

const mapDispatchToProps = {
    fetching: actions.fetchingUpcoming,
    search: actions.fetchSearch
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Upcoming));
