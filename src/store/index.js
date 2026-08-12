import {configureStore} from '@reduxjs/toolkit';
import {logger} from "redux-logger/src/index";
import notesReducer from "./slices/notesSlice";

export const NOTE_KEY = 'note';
export const NOTES_LIST_KEY = 'notes';
export default configureStore({
    reducer: {
        [NOTES_LIST_KEY]: notesReducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger)
});