import { React, useContext, useEffect, useState } from "react";
import { Context } from "./context/Context";


export const Sort = () => {
    const { arrayOfNotes, currentHashtag } = useContext(Context)
    const [array, setArray] = useState([])


    useEffect(() => {
        setArray([])
        arrayOfNotes
            .forEach(element => {
                if (element.hashtags
                    .includes(currentHashtag)) {
                    setArray(prev => [...prev, element])

                }
            }
            );
    }, [currentHashtag, arrayOfNotes])

    return (
        <div>
            {
                <ul
                    className="noteBLock"
                >
                    {array
                        .map((item, index) => (
                            <div
                                key={index}
                                className='note'>
                                <p>
                                    {item.text}
                                </p>
                            </div>
                        )
                        )
                    }
                </ul>
            }
        </div>
    )
}