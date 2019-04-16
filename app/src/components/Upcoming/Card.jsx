import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';

const Card = ({id, poster, genre, name, release}) => {

    let style = {};

    if (poster) {
        style = {
            backgroundImage: `url(${window.IMAGE_URL + poster})`
        };
    }

    const genres = genre.join(', ');

    return (
        <NavLink to={`/details/${id}`} className="card" style={style} >
            <div className="card__title">{name}</div>
            <div className="card__release">{release}</div>
            <div className="card__genre">{genres}</div>
        </NavLink>
    )
};

Card.defaultProps = {
    poster: null
};

Card.propTypes = {
    id: PropTypes.number.isRequired,
    poster: PropTypes.string,
    name: PropTypes.string.isRequired,
    genre: PropTypes.array.isRequired,
    release: PropTypes.string.isRequired
};

export default Card;