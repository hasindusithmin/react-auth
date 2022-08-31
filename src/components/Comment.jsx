
import React from "react";


export default function Comment({comment}) {
    const {id,name,email,body} = comment;
    return (
        <li className="w3-display-container" key={id}>
            <div className="w3-small">{name} <span className="w3-right">{email}</span></div>
            <div className="w3-text-grey">{body}</div>
        </li>
    )
}