import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "./context/Context";
import { CurrentNote } from "./CurrentNote";
import { Edit } from "./Edit";

let newarray = []
export const ListNotes = () => {
    const { arrayOfNotes, setArrayOfNotes, setCurrentHashtag, setIsSort } = useContext(Context)
    const [isOpen, setOpen] = useState(false)
    const [text, setText] = useState('')
    const [isEdit, setIsEdit] = useState(false)
    const [index, setIndex] = useState('')
    const [editedNote, setNote] = useState({
        id: '',
        text: '',
        hashtags: [],
    })

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
    const editItem = (event, text, index) => {
        setIsEdit(true)
        setText(text)
        setIndex(index)
    }

    function editNote() {
        setIsEdit(false)
        let array = text
            .split(' ')
            .map(element => {
                if (element[0] === '#') {
                    newarray
                        .push(element)
                }
                return array
            }
            )
        setNote(
            {
                text: text,
                hashtags: newarray
            }
        )
    }
    useEffect(() => {
        if (isEdit) {
            setArrayOfNotes(prev => [...prev.slice(0, index), editedNote, ...prev.slice(index + 1)])
        }
    }, [editedNote,index, isEdit])

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
                                    onClick={event => editItem(event, item.text, index)}
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
                            .map(element => {

                                if (element[0] === '#') {

                                    return <Link to="/sort"
                                        onClick={event => sortOn(element)}
                                        className="curentHashtag"
                                    >
                                     {element}
                                    </Link>
                                }
                                return text
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
                isEdit && (
                    <Edit>
                        <textarea
                            className="addNoteText"
                            value={text}
                            onChange={event => setText(event.target.value)}
                            autoFocus='true'
                        >
                        </textarea>
                        <button
                            className="editNoteButton"
                            onClick={editNote}
                        >
                            Edit
                        </button>
                        <button
                            className="addNoteCloseButton"
                            onClick={event => setIsEdit(false)}
                        >
                            X
                        </button>

                    </Edit>
                )
            }
        </div>
    )
}