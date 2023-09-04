import react, { useState } from "react";
import { noteContext } from "./noteContext";

export const NoteState = (props) => {

    const host = "http://localhost:5000"

    const notesInitial = []

    const [notes, setNotes] = useState(notesInitial)

    //Get All Notes
    const getNotes = async () => {

        const response = await fetch(host+'/api/notes/fetchAllNotes', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        console.log(json);
        setNotes(json);
    }

    //Add a note
    const addNote = async (title, description, tag) => {

        const response = await fetch(host+'/api/notes/addNote/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const note = await response.json();
        //todo api call
        setNotes(notes.concat(note));
    }

    //Edt a note
    const editNote = async (id, title, description, tag) => {

        const response = await fetch(host+'/api/notes/updateNote/'+id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
            body: JSON.stringify({title, description, tag})
        });
        const json = await response.json();
        let newNotes = JSON.parse(JSON.stringify(notes));

        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    //Delete a note
    const deleteNote = async (id) => {
        //todo api call
        const response = await fetch(host+'/api/notes/deleteNote/'+id, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('token')
            },
        });
        const json = await response.json();
        setNotes(json);

        console.log("Deleting a note" + id);
        const newNotes = notes.filter((note) => { return note._id !== id })
        setNotes(newNotes)
    }

    return (
        <noteContext.Provider value={{ notes, getNotes, addNote, editNote, deleteNote }}>
            {props.children}
        </noteContext.Provider>
    )
}