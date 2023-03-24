import React, { useContext, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Context } from "./context/Context";


let newarray = []
export const AddNewNote = () => {
    const { setArrayOfNotes, isSort, setIsSort } = useContext(Context)
    const [text, setText] = useState("")
    const [addNote, setAddNote] = useState(false)

    const [newNote, setNewNote] = useState(
        {
            id: "",
            text: "",
            hashtags: [],
        }
    )

    const addText = (texts) => {
        setText(texts)
    }

    const addNewNote = () => {
        let array = text
            .split(' ')
            .map(element => {
                if (element[0] === '#') {
                  newarray.push(element)
                }
              return newarray
            }
            )
        setNewNote
            (
                {
                    text: text,
                    hashtags: newarray
                }
            )
        setAddNote(false)
      
    console.log(array);
   
    }

    function addNoteArea(parametr) {
        setAddNote(parametr)
    }

    const escape = (key) => {
        if (key === 'Escape') {
            setAddNote(false)
        }
    }
    useEffect(() => {
        if (newNote.text) {
            setArrayOfNotes(prev => [newNote, ...prev])
        }
        setText('')
        newarray = []

    }, [newNote,setArrayOfNotes])

    return (
        <div onKeyUp={event => escape(event.key)}>
            {
                isSort
                    ?
                    <Link to='/'
                        className="returnButton"
                        onClick={event => setIsSort(false)}
                    >
                        *Return*
                    </Link>
                    :
                    <button
                        className="addNoteArea"
                        onClick={event => addNoteArea(true)}
                    >
                        +
                    </button>
            }
            {
                addNote &&
                <div className="addNote">

                    <textarea
                        className="addNoteText"
                        value={text}
                        onChange={event => addText(event.target.value)}
                        autoFocus={true}
                    >
                    </textarea>
                    <button
                        className="addNoteButton"
                        onClick={addNewNote}
                    >
                        Add New Note
                    </button>
                    <button
                        className="addNoteCloseButton"
                        onClick={event => addNoteArea(false)}
                    >
                        X
                    </button>
                </div>
            }
        </div>
    )
}