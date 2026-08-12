import {useState} from "react";
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function ConfirmDialogButton(
    {
        buttonProps = {},
        buttonLabel = "",
        disabled = false,
        title = "",
        description = "",
        confirmLabel = "Confirm",
        onConfirm = () => {
        },
        cancelLabel = "Cancel",
        onCancel = () => {
        }
    }) {
    const [isOpened, setIsOpened] = useState(false);
    const handleOpenDialog = (isOpened) => () => {
        setIsOpened(isOpened);
    };
    const handleCancel = () => {
        onCancel();
        setIsOpened(false);
    };
    const handleConfirm = () => {
        onConfirm();
        setIsOpened(false);
    };

    return (
        <>
            <Button
                {...buttonProps}
                disabled={disabled}
                onClick={handleOpenDialog(true)}
            >
                {buttonLabel}
            </Button>
            <Dialog
                open={isOpened}
                onClose={handleOpenDialog(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                role="alertdialog"
            >
                {
                    title &&
                    <DialogTitle id="alert-dialog-title">
                        {title}
                    </DialogTitle>
                }
                {
                    description &&
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            {description}
                        </DialogContentText>
                    </DialogContent>
                }
                <DialogActions>
                    <Button onClick={handleCancel} autoFocus>{cancelLabel}</Button>
                    <Button onClick={handleConfirm}>{confirmLabel}</Button>
                </DialogActions>
            </Dialog>
        </>
    );
}
