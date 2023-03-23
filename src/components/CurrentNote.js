import React from "react";

export const CurrentNote = (props) => {
    return (
        <div
            className="currentNote"
        >
            {props.children}
        </div>
    )
}