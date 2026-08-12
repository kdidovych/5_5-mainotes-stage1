import {useNavigate} from 'react-router';
import Box from "@mui/material/Box";

function NoteItem({item, current = false}) {
    const navigate = useNavigate();
    const onClick = () => {
        if (!current) {
            navigate(`/notes/${item.id}`);
        }
    };
    return (
        <Box component="span"
             onClick={onClick}
             className={current ? "current" : ""}
             sx={{
                 p: 1,
                 lineHeight: '18px',
                 '&:hover:not(.current)': {cursor: 'pointer', bgcolor: 'grey.300'},
                 '&.current': {bgcolor: 'grey.400'}
             }}>
            {item.title}
        </Box>
    );
}

export default NoteItem;