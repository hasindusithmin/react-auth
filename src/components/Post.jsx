import React from "react";

export default function Post({ post,comment }) {

    const { id, title, body } = post;


    return (
        <li className="w3-display-container" key={id} onClick={()=>{comment(id)}}>
            <div className="w3-center w3-small">{title}</div>
            <div className="w3-text-grey">{body}</div>
        </li>
    )
}