import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../actions/upcoming';

class Upcoming extends React.Component {
    componentDidMount() {
        this.props.fetching();
    }

    render() {
        return (
            <div className="upcoming">
                { this.props.results }
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
        results: state.upcoming.results
    }
};

const mapDispatchToProps = {
    fetching: actions.fetchingUpcoming
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Upcoming));
