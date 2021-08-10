import React from 'react';
import { Link } from "react-router-dom";

export default function GenreLink(props) {
    return (
        <Link className="genre_link" to={"/genre/" + props.genre.id}>
            {props.genre.name}
        </Link>
    )
}
