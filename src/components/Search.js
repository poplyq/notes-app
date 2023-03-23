import { React, useContext, useState } from "react";
import { Link } from "react-router-dom";

import { Context } from "./context/Context";

export const Search = () => {
    const { arrayOfNotes, setCurrentHashtag, setIsSort } = useContext(Context)
    const [array, setArray] = useState([])
    const [isDisplay, setIsDisplay] = useState(false)

    const displayOn = () => {
        if (!isDisplay) {
            arrayOfNotes
                .map(element => {

                    element.hashtags
                        .forEach(element => {
                            setArray(prev => [...prev, element])
                            console.log(array);
                        }
                        );
                 return arrayOfNotes
                }
                )
            setIsDisplay(true)
        }
    }
    function displayOff() {
        setArray([])
        setIsDisplay(false)
    }
    function sortOn(element) {
        setCurrentHashtag(element)
        setIsSort(true)
    }
    return (
        <div
            onMouseLeave={displayOff}
        >
            <h2
                className="searchDisplay"
                onMouseEnter={displayOn}
            >
                # Search #
            </h2>
            {
                array.length > 0 && (
                    <div
                        className="hashtagContainer">

                        <ul >
                            {
                                array
                                    .map((element, index) => (
                                        <Link to="/sort"
                                            key={index}
                                            className="hashtagLink"
                                            onClick={event => sortOn(element)}
                                        >
                                            {element}
                                        </Link>
                                    )
                                    )
                            }
                        </ul>
                    </div>
                )
            }
        </div>
    )
}