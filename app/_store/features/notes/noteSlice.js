import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    notes: [],
};

const noteSlice = createSlice({
    name: 'note',
    initialState,
    reducers:{
        addNote: (state, action) => {
            state.notes.push(action.payload);
        },
        deleteNote: (state, action)=>{
            state.notes = state.notes.filter(note => note.note_id !== action.payload);
        },
        updateNote: (state, action) => {
            const {note_id, title, content} = action.payload;
            const note = state.notes.find(note => note.note_id === note_id);
            if(note){
                note.title = title;
                note.content = content;
            }
        },
        setNotes: (state, action) => {
            state.notes = action.payload; 
        }    
    }
    });

export const {addNote, deleteNote, updateNote, setNotes} = noteSlice.actions
export default noteSlice.reducer