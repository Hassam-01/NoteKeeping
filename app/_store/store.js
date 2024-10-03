import { combineReducers, configureStore } from '@reduxjs/toolkit';
import themeReducer from './features/theme/themeSlice';
import userIdReducer from './features/user/userIdSlice';
import noteReducer from './features/notes/noteSlice';
import drawingReducer from './features/drawing/drawingSlice';

// Combine all your reducers into a single root reducer
const rootReducer = combineReducers({
  theme: themeReducer,
  userId: userIdReducer,
  note: noteReducer,
  drawing: drawingReducer,
});

// Create and configure the Redux store without persistence
export const makeStore = () =>
  configureStore({
    reducer: rootReducer,  // Simply use the rootReducer
  });

export const store = makeStore();
