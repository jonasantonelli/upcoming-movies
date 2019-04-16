import React from 'react';
import PropTypes from 'prop-types';

import './style.scss';

const Paginate = ({totalPages, currentPage, onPrevious, onNext}) => (
    <div className="paginate">
        { currentPage > 1 && <button onClick={onPrevious} className="button button--previous">Previous</button> }
        <span>{currentPage}</span>
        { currentPage < totalPages && <button onClick={onNext} className="button button--next">Next</button> }
    </div>
);

Paginate.defaultProps = {
    onPrevious: () => {},
    onNext: () => {},
    currentPage: 1,
    totalPages: 1
};

Paginate.propTypes = {
    onPrevious: PropTypes.func,
    onNext: PropTypes.func,
    currentPage: PropTypes.number,
    totalPages: PropTypes.number
};

export default Paginate;