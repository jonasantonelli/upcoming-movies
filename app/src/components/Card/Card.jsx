import React from 'react';
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom';
import './style.scss';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w200';

const Card = ({id, poster, genre, name, release}) => {

    let style = {};

    const genres = genre.join(', ');

    return (
        <NavLink to={`/details/${id}`} className="card" style={style} >
            { poster && <img src={IMAGE_URL + poster} alt={name} />}
            <div className="card__info">
                <div className="card__title">{name}</div>
                <div className="card__release">{release}</div>
                <div className="card__genre">{genres}</div>
            </div>
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