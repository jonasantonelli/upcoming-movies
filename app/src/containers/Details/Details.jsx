import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from '../../actions/details';
import Movie from '../../components/Movie/Movie.jsx';

class Details extends React.Component {

    componentDidMount() {
        this.props.fetching(this.props.id);
    }

    render() {
        const { movie, isLoading } = this.props;

        if(isLoading) {
            return <div>Loading...</div>
        }

        return (
            <Movie data={movie} />
        )
    }
}

const mapStateToProps = (state, props) => {
    return {
        isLoading: state.details.isLoading,
        isError: state.details.isError,
        movie: state.details.movie,
        id: props.match.params.id
    }
};

const mapDispatchToProps = {
    fetching: actions.fetchingDetails
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Details));