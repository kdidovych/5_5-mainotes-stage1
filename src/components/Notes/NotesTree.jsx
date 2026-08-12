import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router';
import {addNote, getNotes} from "../../store/slices/notesSlice";
import {NOTES_LIST_KEY} from "../../store";
import {
    Button,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Stack,
    TextField
} from '@mui/material';
import NoteItem from "./NotesTree/NoteItem";
import {NOTE_EMPTY_ITEM} from '../../constants';
import {useTranslation} from "react-i18next";

export default function NotesTree() {
    const {t} = useTranslation();

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNotes());
    }, []);

    { /* @TODO: Temp solution. Should be on right mouse click - Add Folder/Note */ }
    const [isOpened, setIsOpened] = useState(false);
    const [title, setTitle] = useState('');
    const handleOpenDialog = (isOpened) => () => {
        setIsOpened(isOpened);
    };

    const handleChange = (e) => {
        setTitle(e.target.value);
    };

    const navigate = useNavigate();
    const handleNewSubmit = (e) => {
        e.preventDefault();
        const timestamp = Date.now();
        const newNote = {
            ...NOTE_EMPTY_ITEM,
            title,
            createdAt: timestamp,
            updatedAt: timestamp
        };
        dispatch(addNote(newNote))
            .then(({payload: newItem}) => {
                navigate(`/notes/${newItem.id}`)
            });
        setIsOpened(false);
    };

    const {id: noteId} = useParams();
    const notes = useSelector((state) => state[NOTES_LIST_KEY].items);

    return (
        <Stack component="section"
               direction="column"
               spacing={2}
               sx={{height: "stretch", padding: '10px'}}>
            <Stack className='contact-list-buttons'>
                {/*<Button variant="contained" size='small'>TODO: Add Folder</Button>*/}
                <Button variant="contained" size="small" onClick={handleOpenDialog(true)}>
                    {t("Add New Note")}
                </Button>
                {/* @TODO: Temp solution. Should be on right mouse click - Add Folder */}
                <Dialog open={isOpened} onClose={handleOpenDialog(false)}>
                    <DialogTitle>{t("Adding New Note")}</DialogTitle>
                    <form onSubmit={handleNewSubmit}>
                        <DialogContent>
                            <TextField
                                autoFocus
                                required
                                margin="dense"
                                name="title"
                                label={t("Title")}
                                type="text"
                                fullWidth
                                variant="outlined"
                                onChange={handleChange}
                                sx={{minWidth: {sx: "90%", sm: 400}}}
                            />
                            <DialogContentText>{t("path")}: / (<span style={{color: "red"}}>@TODO:</span> folder structure)</DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleOpenDialog(false)}>
                                {t("Cancel")}
                            </Button>
                            <Button type="submit" variant="contained">
                                {t("Submit")}
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </Stack>
            <Stack className="contact-list-items" spacing={1}>
                {/*@TODO: Should be a Tree structure*/}
                {notes.map( item => <NoteItem key={'noteId-' + item.id} item={item} current={item.id === noteId} /> )}
            </Stack>
        </Stack>
    );
}