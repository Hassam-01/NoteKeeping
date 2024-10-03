import {createSlice} from '@reduxjs/toolkit';

const initialState = {
    drawing: [],
};

const drawingSlice = createSlice({
    name: 'drawing',
    initialState,
    reducers:{
        addDrawing: (state, action) => {
            state.drawing.push(action.payload);
        },
        deleteDrawing: (state, action)=>{
            state.drawing = state.drawing.filter(drawing => drawing.drawing_id !== action.payload);
        },
        updateDrawing: (state, action) => {
            const {drawing_id, title, content} = action.payload;
            const drawing = state.drawing.find(drawing => drawing.drawing_id === drawing_id);
            if(drawing){
                drawing.title = title;
                drawing.content = content;
            }
        },
        setDrawing: (state, action) => {
            state.drawing = action.payload; 
        }    
    }
    });

export const {addDrawing, deleteDrawing, updateDrawing, setDrawing} = drawingSlice.actions
export default drawingSlice.reducer