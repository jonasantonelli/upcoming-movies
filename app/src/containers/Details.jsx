import React from 'react';
import { withRouter } from 'react-router-dom';
import {connect} from "react-redux";
import * as actions from '../actions/details';

class Details extends React.Component {

    componentDidMount() {
        this.props.fetching(this.props.id);
    }

    render() {
        const { movie, isLoading } = this.props;

        if(isLoading) {
            return <div>Loading...</div>
        }

        const poster = movie.poster
            ? <img src={window.IMAGE_URL + movie.poster} alt={movie.name} />
            : null;

        return (
            <div className="movie">
                <div className="movie__poster">
                    { poster }
                </div>
                <div className="movie__name">{ movie.name}</div>
                <div className="movie__overview">{ movie.overview }</div>
                <div className="movie__release">{ movie.release }</div>
                Details { movie.name }
            </div>
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