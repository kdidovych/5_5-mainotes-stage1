import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import api from "../../api/db-service";
import {NOTES_KEY, DB_TABLE_NOTES} from "../../constants";

export const getNotes = createAsyncThunk(
    `${NOTES_KEY}/getNotes`,
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get(DB_TABLE_NOTES)
            if (response.status >= 400) {
                rejectWithValue(`Getting notes error. Status ${response.status}`);
            }
            return response.data;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);
export const addNote = createAsyncThunk(
    `${NOTES_KEY}/addNote`,
    async (note, {rejectWithValue}) => {
        try {
            const response = await api.post(DB_TABLE_NOTES, note)
            if (response.status >= 400) {
                rejectWithValue(`Adding note error. Status ${response.status}`);
            }
            return response.data;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);
export const updateNote = createAsyncThunk(
    `${NOTES_KEY}/updateNote`,
    async (note, {rejectWithValue}) => {
        try {
            const response = await api.put(`${DB_TABLE_NOTES}/${note.id}`, note);
            if (response.status >= 400) {
                rejectWithValue(`Updating note id ${note.id} error. Status ${response.status}`);
            }
            return response.data;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);
export const deleteNote = createAsyncThunk(
    `${NOTES_KEY}/deleteNote`,
    async (payload, {rejectWithValue}) => {
        try {
            const response = await api.delete(`${DB_TABLE_NOTES}/${payload.id}`);
            if (response.status >= 400) {
                rejectWithValue(`Deleting note id ${payload.id} error. Status ${response.status}`);
            }
            return payload;
        } catch (error) {
            rejectWithValue(error.message);
        }
    }
);

const setError = (state, action) => {
    state.isFetching = false;
    state.error = action.payload;
}
const setFetching = (state) => {
    state.isFetching = true;
    state.error = null;
}

export const SLICE_NAME = 'notesSlice';
const notesSlice = createSlice({
    name: SLICE_NAME,
    initialState: {
        items: [],
        isFetching: false,
        error: null
    },
    extraReducers: (builder) => {
        builder.addCase(getNotes.pending, setFetching);
        builder.addCase(getNotes.rejected, setError);
        builder.addCase(getNotes.fulfilled, (state, {payload}) => {
            state.items = payload;
            state.isFetching = false;
        });
        builder.addCase(addNote.pending, setFetching);
        builder.addCase(addNote.rejected, setError);
        builder.addCase(addNote.fulfilled, (state, {payload}) => {
            state.items.push(payload);
            state.isFetching = false;

        });
        builder.addCase(updateNote.pending, setFetching);
        builder.addCase(updateNote.rejected, setError);
        builder.addCase(updateNote.fulfilled, (state, {payload}) => {
            state.items = state.items.map((item) => item.id === payload.id ? payload : item);
            state.isFetching = false;
        });
        builder.addCase(deleteNote.pending, setFetching);
        builder.addCase(deleteNote.rejected, setError);
        builder.addCase(deleteNote.fulfilled, (state, {payload}) => {
            state.items = state.items.filter(({id}) => id !== payload.id);
            state.isFetching = false;
            payload.callback();
        });
    }
});

export default notesSlice.reducer;