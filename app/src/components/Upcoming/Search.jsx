import React from 'react';
import PropTypes from 'prop-types';

const Search = ({onChange}) => (
    <div className="search">
        <div className="search__input">
            <input type="text" onChange={onChange} placeholder="Titles" name="search" />
        </div>
        <button type="button" onClick={onChange}>Find</button>
    </div>
);

Search.defaultProps = {
    onChange: () => {}
};

Search.propTypes = {
    onChange: PropTypes.func
};

export default Search;
