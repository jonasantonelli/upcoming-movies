import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import * as actions from '../../actions/upcoming';
import UpcomingList from '../../components/List/List.jsx';
import Search from '../../components/Search/Search.jsx';
import Paginate from '../../components/Paginate/Paginate.jsx';
import Loading from '../../components/Loading/Loading.jsx';

import './style.scss';

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
        this.handleSearchChange = debounced(this.handleSearchChange.bind(this), 200);
        this.handleNextPage = this.handleNextPage.bind(this);
        this.handlePreviousPage = this.handlePreviousPage.bind(this);
    }

    componentDidMount() {
        this.props.fetching();
    }

    handleSearchChange(text) {
        if(!text) {
            return;
        }
        this.props.search(text);
    }

    handleNextPage() {
        if(this.props.page >= this.props.totalPages) {
            return;
        }

        const nextPage = this.props.page + 1;

        if(this.props.searchContent) {
            this.props.search(this.props.searchContent, nextPage);
            return;
        }

        this.props.fetching(nextPage);
    }

    handlePreviousPage() {
        const previousPage = this.props.page - 1;

        if(!previousPage) {
            return;
        }

        if(this.props.searchContent) {
            this.props.search(this.props.searchContent, previousPage);
            return;
        }

        this.props.fetching(this.props.page - 1);
    }

    render() {

        const { result, page, isLoading, totalPages } = this.props;

        return (
            <div className="upcoming">
                <Search
                    onChange={(e) => this.handleSearchChange(e.target.value)}
                    onCleaning={() => this.props.fetching()}
                />
                { isLoading
                    ? <Loading />
                    : <UpcomingList data={result} />
                }
                <Paginate
                    onNext={this.handleNextPage}
                    onPrevious={this.handlePreviousPage}
                    currentPage={page}
                    totalPages={totalPages}
                />
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
        page: state.upcoming.currentPage,
        result: state.upcoming.result,
        searchContent: state.upcoming.search
    }
};

const mapDispatchToProps = {
    fetching: actions.fetchingUpcoming,
    search: actions.fetchSearch
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Upcoming));
