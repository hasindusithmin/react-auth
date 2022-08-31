import React from "react";

export default function Chart({ post,comment }) {

    const { id, title, body } = post;


    return (
        <li className="w3-display-container" key={id} onClick={comment}>
            <div className="w3-center w3-small">{title}</div>
            <div className="w3-text-grey">{body}</div>
        </li>
    )
}