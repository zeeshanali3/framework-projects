import React from 'react'
import {
    Modal,
    Box,
    Stack,
} from '@mui/material'
import TypographyComponent from './Typography'

const ModalComponent = ({ open = false, handleClose, title = '', description = '', children, width = 400 }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width,
                    bgcolor: 'background.paper',
                    outline: 'none',
                    boxShadow: 24,
                    p: 3,
                    borderRadius: '8px',
                }}
            >
                <Stack
                    direction="column"
                    spacing={3}
                >
                    <Stack
                        direction="column"
                        spacing={1}
                        sx={{
                            justifyContent: "center",
                            alignItems: "center",
                        }}
                    >
                        <TypographyComponent
                            id="modal-modal-title"
                            title={title}
                            variant="h1"
                            fontSize="18px"
                            fontWeight="700"
                            color="#333"
                            textAlign="center"
                            cursor="default"
                        />
                        <TypographyComponent
                            id="modal-modal-description"
                            title={description}
                            variant="p"
                            fontSize="17px"
                            fontWeight="500"
                            color="#333"
                            textAlign="center"
                            cursor="default"
                        />
                    </Stack>
                    <Box>
                        {children}
                    </Box>
                </Stack>
            </Box>
        </Modal>
    )
}

export default ModalComponent