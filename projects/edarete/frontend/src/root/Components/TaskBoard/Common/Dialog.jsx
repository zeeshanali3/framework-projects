import React from 'react'
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from '@mui/material'
import ButtonComponent from './Button'

const DialogComponent = ({
    title = "Title",
    description = "Description",
    cancelLabel = "Cancel",
    confirmLabel = "Confirm",
    open = false,
    onClose,
    onConfirm
}) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {title}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <ButtonComponent variant='outlined' label={cancelLabel} handleClick={onClose} />
                <ButtonComponent variant='contained' label={confirmLabel} handleClick={onConfirm} />
            </DialogActions>
        </Dialog>
    )
}

export default DialogComponent