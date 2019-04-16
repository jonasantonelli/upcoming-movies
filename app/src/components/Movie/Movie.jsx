import React from 'react';
import { NavLink } from "react-router-dom";
import './style.scss';

const IMAGE_URL = 'https://image.tmdb.org/t/p/original/';


export default ({data}) => {

    if(!data) {
        return;
    }

    const poster = data.poster
        ? <img src={IMAGE_URL + data.poster} alt={data.name} />
        : null;

    const genres = [];

    if(data.genre) {
        data.genre.map(v => genres.push(v.name));
    }

    return (
        <div className="movie">
            <NavLink to={'/upcoming'} className="close">
                <svg width="40" height="40" viewBox="0 0 24 24">
                    <path fill="#ffffff" d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                    <path d="M0 0h24v24H0z" fill="none"/></svg>
            </NavLink>
            <div className="movie__poster">
                { poster }
            </div>
            <div className="movie__details">
                <div className="movie__name">{ data.name}</div>
                <div className="movie__overview">{ data.overview }</div>
                <div className="movie__genre">Genre: { genres.join(', ') }</div>
                <div className="movie__release">Release date: <time>{ data.release }</time></div>
            </div>
        </div>
    )
}

