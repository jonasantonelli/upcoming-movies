import React from 'react';

export default ({match}) => {

    const { id } = match.params;

    return (
        <div>Details { id }</div>
    )
}