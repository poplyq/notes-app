import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "./context/Context";
import { CurrentNote } from "./CurrentNote";
import { Edit } from "./Edit";


export const ListNotes = () => {
    const { arrayOfNotes, setArrayOfNotes, setCurrentHashtag, setIsSort, setCurrentNoteIndex, isEdit, setIsEdit} = useContext(Context)
    const [isOpen, setOpen] = useState(false)
    const [text, setText] = useState('')


    const onClick = (event, e) => {
        setText(e)
        setOpen(true)
    }

    const close = () => setOpen(false)

    const deleteItem = (event, index) => {
     setArrayOfNotes(prev => [...prev.slice(0, index), ...prev.slice(index + 1)])
    }

    function sortOn(element) {
        setCurrentHashtag(element)
        setIsSort(true)
    }
 function editNote (index){
    setCurrentNoteIndex(index)
    setIsEdit(true)
 }
    return (
        <div>
            <ul
                className="noteBLock"
            >
                {arrayOfNotes
                    ?.map((item, index) => (
                        <div
                            key={index}
                            className='note'
                        >
                            <p
                                onClick={event => onClick(event, item.text)}
                            >
                                {item.text}
                            </p>

                            <div
                                className="noteButtonContainer"
                            >
                                <button
                                    className="noteButton"
                                    onClick={event => deleteItem(event, index)}
                                >
                                    delete
                                </button>
                                <button 
                                    className="noteButton"
                                    onClick={event=>editNote(index)}
                                >
                                    edit 
                                </button>

                            </div>


                        </div>
                    ))
                }
            </ul>

            {isOpen &&
                (<CurrentNote>
                    <p>
                        {text}
                    </p>
                    <p>
                        {text
                            .split(" ")
                            .map((element, index) => {

                                if (element[0] === '#') {

                                    return <Link  key={index} to="/sort"
                                        onClick={event => sortOn(element)}
                                        className="curentHashtag"
                                    >
                                        {element}
                                    </Link>
                                } return <br key={index}/>
                            }
                            )
                        }
                    </p>
                    <button
                        onClick={close}
                        className="currentNoteClose"
                    >
                        X
                    </button>
                </CurrentNote>
                )
            }
            {
                isEdit && <Edit/>
            }
        </div>
    )
}