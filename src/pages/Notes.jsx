import Grid from "@mui/material/Grid";
import NotesForm from "../components/Notes/NotesForm";
import NotesTree from "../components/Notes/NotesTree";

function Notes() {
    return (
        <Grid container sx={{justifyContent: "center", mt: 3}} spacing={3}>
            {/* @TODO mobile */}
            <Grid size={{xs: 3, xl: 2}} component={'aside'} className="right-column">
                <NotesTree/>
            </Grid>
            <Grid size={{xs: 9, xl: 10}}>
                <NotesForm/>
            </Grid>
        </Grid>
    );
}
export default Notes;



