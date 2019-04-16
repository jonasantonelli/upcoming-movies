import React from 'react';
import PropTypes from 'prop-types'
import shortid from 'shortid';
import Card from './Card.jsx';

const List = ({data}) => {
    return (
        <div className="upcoming-list">
            { data.map(value =>
                <Card
                    key={shortid.generate()}
                    id={value.id}
                    name={value.name}
                    poster={value.poster}
                    genre={value.genre}
                    release={value.release}
                />
            )}
        </div>
    )
};

List.defaultProps = {
    data: []
};

List.propTypes = {
    data: PropTypes.array
};

export default List;