import { React, useContext, useEffect, useState } from "react";
import { Context } from "./context/Context";
import { Link } from "react-router-dom";

let newarray = []
export const Edit = () => {

    // debugger
    const { arrayOfNotes, setArrayOfNotes, currentNoteIndex ,setIsEdit} = useContext(Context)
    const initialState = arrayOfNotes[currentNoteIndex].text
    const [text, setText] = useState(initialState)
    const [newNote, setNewNote] = useState({
        id: '',
        text: '',
        hashtags: [],
    })
    const setTextFunction = (elem) => {
        console.log(text);
        setText(elem)
    }
    const editNote = () => {
        let array = text
            .split(' ')
            .map(element => {
                if (element[0] === '#') {
                    newarray.push(element)
                } return console.log(newarray);
                
            }
            )
        setNewNote({
            id: currentNoteIndex,
            text: text,
            hashtags: newarray
        })
    
        console.log(array);
    }
    useEffect(() => {
        console.log(newNote);
        setArrayOfNotes(prev => [...prev.slice(0, currentNoteIndex), newNote, ...prev.slice(currentNoteIndex + 1)])
        if (newNote.text.length>0){
    setIsEdit(false)

        newarray=[]
    }}, [newNote,currentNoteIndex, setArrayOfNotes, setIsEdit]
    )

    return (
        <div
            className="editNote"
        >
            <textarea
                className="addNoteText"
                value={text}
                onChange={event => setTextFunction(event.target.value)}
                autoFocus={true}
            >
            </textarea>
            <button
                className="editNoteButton"
                onClick={event => editNote()}
            >
                Edit
            </button>
            <Link to='/'
                className="addNoteCloseButton"

            >
                X
            </Link>

        </div>
    )
}