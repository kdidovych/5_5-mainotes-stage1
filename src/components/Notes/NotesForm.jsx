import {useRef, useState} from "react";
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router';
import {addNote, updateNote, deleteNote} from "../../store/slices/notesSlice";
import {Formik, Form} from 'formik';
import {object, string} from 'yup';
import {
    Box,
    Button,
    Container,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    TextareaAutosize,
    TextField,
    Stack
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import {red} from '@mui/material/colors';
import {NOTES_LIST_KEY} from "../../store";
import PageBuilder from "../PageBuilder/PageBuilder";
import ConfirmDialogButton from "../ConfirmDialogButton";
import {NOTE_EMPTY_ITEM} from "../../constants";
import {useTranslation} from "react-i18next";

export default function NotesForm() {
    const contentRef = useRef(null);
    const dispatch = useDispatch();
    const {t} = useTranslation();

    const [editMode, setEditMode] = useState(false);
    const [currentNote, setCurrentNote] = useState(NOTE_EMPTY_ITEM);

    const {id: queryId} = useParams();
    const {items} = useSelector(state => state[NOTES_LIST_KEY]);

    const queryItem = queryId && items.find(item => item.id === queryId);
    if (queryItem && queryItem.id !== currentNote.id) {
        setCurrentNote(queryItem);
    }
    editMode && contentRef.current.focus();

    const noteSchema = object({
        title: string().required(t('Title is required')),
        content: string()
    });
    const onValidateHandler = (values) => {
        const errors = {};
        try {
            noteSchema.validateSync(values, {abortEarly: false});
        } catch (error) {
            error.inner.forEach(err => {
                errors[err.path] = err.message;
            })
        }
        return errors;
    }
    const onSubmitHandler = async (values, actions) => {
        // @TODO temp solution - must be done on BE side
        const updatedNote = {
            ...values,
            updatedAt: (new Date().toISOString())
        }
        if (values.id === null) {
            dispatch(addNote(updatedNote));
        } else {
            dispatch(updateNote(updatedNote));
        }
        setEditMode(false);
        actions.setSubmitting(false);
    };
    const cleanForm = () => {
        setCurrentNote(NOTE_EMPTY_ITEM);
    }

    return (
        <Grid container spacing={3} sx={{justifyContent: "center"}}>
            <Grid size={{xs: 12, xl: 10}} component='section' className='main'>
                <Formik
                    enableReinitialize={true}
                    initialValues={currentNote}
                    onSubmit={onSubmitHandler}
                    validate={onValidateHandler}
                >
                    {({values, handleChange, errors, isSubmitting, setFieldValue, handleBlur, handleReset}) => (
                        <Form className="form-note" style={{height: '100%'}}>
                            <Stack spacing={3}
                                   sx={{justifyContent: "space-between", padding: 1, height: "stretch"}}>
                                <Container className="inputs-container" maxWidth="false" disableGutters={true}>
                                    <Stack spacing={2}>
                                        <FormControl size="small" variant="outlined">
                                            <TextField
                                                type="text"
                                                name="title"
                                                label={t("Title")}
                                                disabled={!editMode}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.title}
                                                variant="outlined"
                                                slotProps={{
                                                    inputLabel: {
                                                        // sx: textField, @TODO no-borders until not editable
                                                    },
                                                    input: {
                                                        endAdornment: (
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                    aria-label={t("delete")}
                                                                    size='small'
                                                                    sx={{
                                                                        padding: "2px",
                                                                        borderRadius: 0
                                                                    }}
                                                                    onClick={() => setFieldValue('title', '', false)}
                                                                >
                                                                    <CloseIcon style={{
                                                                        color: red[500],
                                                                        fontSize: 14,
                                                                    }}/>
                                                                </IconButton>
                                                            </InputAdornment>
                                                        ),
                                                    },
                                                }}
                                                helperText={errors.title}
                                            />
                                        </FormControl>
                                        <FormControl size="small" variant="outlined">
                                            <TextareaAutosize
                                                name="content"
                                                label={t("Content")}
                                                disabled={!editMode}
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.content}
                                                ref={contentRef}
                                                aria-label={t("Content")}
                                                placeholder={t("Content")}
                                                style={{padding: 10}}
                                            />
                                        </FormControl>
                                    </Stack>
                                </Container>
                                {
                                    editMode &&
                                    <Container className="form-buttons" maxWidth={false} disableGutters={true}>
                                        <Grid container
                                              sx={{justifyContent: 'space-between'}}
                                        >
                                            <Grid>
                                                <Button type="submit"
                                                        variant="contained"
                                                        disabled={isSubmitting}
                                                        size='small'>
                                                    {t("Save")}
                                                </Button>
                                            </Grid>
                                            <Grid>
                                                <Button type="reset"
                                                        disabled={isSubmitting}
                                                        size='small'
                                                        onClick={handleReset}>
                                                    {t("Reset")}
                                                </Button>
                                                <Button type="button"
                                                        disabled={isSubmitting}
                                                        size='small'
                                                        onClick={() => setEditMode(false)}>
                                                    {t("Cancel")}
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </Container>
                                }
                            </Stack>
                        </Form>
                    )}
                </Formik>
            </Grid>
            <Grid size={{xs: 12, xl: 2}} component={'aside'} className="right-column" sx={{mt: 1}}>
                <Stack spacing={2}>
                    <Button type="button"
                            disabled={editMode}
                            variant="contained"
                            onClick={() => setEditMode(true)}>
                        {t("Edit")}
                    </Button>
                    {
                        currentNote.id &&
                        <Grid container spacing={2} sx={{justifyContent: "flex-end", pr: 2}}
                        >
                            <Stack sx={{fontSize: "0.7rem"}}>
                                <Box component="span">
                                    {t("created")}: {new Date(currentNote.createdAt).toLocaleString()}
                                </Box>
                                <Box component="span">
                                    {t("updated")}: {new Date(currentNote.updatedAt).toLocaleString()}
                                </Box>
                            </Stack>
                        </Grid>
                    }
                    {
                        currentNote.id && <>
                            <ConfirmDialogButton
                                buttonProps={{
                                    variant: "outlined",
                                }}
                                disabled={editMode}
                                buttonLabel={t("Delete")}
                                title={t("Deleting Note...")}
                                description={`${t("Are you sure you want to delete note?")} ${t("Title")}: '${currentNote.title}'`}
                                confirmLabel={t("Confirm Deleting")}
                                cancelLabel={t("Cancel")}
                                onConfirm={() => dispatch(deleteNote({id: currentNote.id, callback: cleanForm}))}
                            />
                        </>
                    }
                    {
                        editMode && <Box>
                            <PageBuilder/>
                        </Box>
                    }
                </Stack>
            </Grid>
        </Grid>
    );
}