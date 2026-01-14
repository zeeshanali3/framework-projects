import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import Typography from '@mui/material/Typography';
import { Close } from '@mui/icons-material';
import { Transition } from '../../Animation/Animation';
import { Alert, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const warning = [
    {
        id: "1",
        courseName: "Object Oriented Programing",
        issueDate: "2022-02-01",
        text: "Your Attendance in Object Oriented Programing is below 80 %",
    },
    {
        id: "2",
        courseName: "Data Structure and Algorithm",
        issueDate: "2022-02-05",
        text: "Your Attendance in Data Structure and Algorithm is below 80 %",
    }
];

export default function WarningModal({ open, close }) {
    return (
        <Dialog open={open} onClose={close} TransitionComponent={Transition} fullScreen>
            <DialogTitle className='flex justify-between'>
                <Typography as="h3" fontSize={18} fontWeight={500} mb='2px'>
                    Warnings
                </Typography>

                <IconButton onClick={close}>
                    <Close />
                </IconButton>
            </DialogTitle>
            <DialogContent dividers>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="custom pagination table" className="dark-table">
                        <TableHead sx={{ background: "#F7FAFF" }}>
                            <TableRow>
                                <TableCell
                                  style={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                  }}
                                >Course Name</TableCell>
                                <TableCell
                                  style={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                  }}
                                >Issue Date</TableCell>
                                <TableCell
                                  style={{
                                    borderBottom: "1px solid #F7FAFF",
                                    fontSize: "13.5px",
                                  }}
                                >Warning</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {warning.map((item) => (
                                <TableRow key={item.id}>
                                    <TableCell>{item.courseName}</TableCell>
                                    <TableCell>{item.issueDate}</TableCell>
                                    <TableCell>
                                        <Alert severity="warning" color="warning">
                                            <Typography>
                                                {item.text}
                                            </Typography>
                                        </Alert>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </DialogContent>
           
        </Dialog>
    );
}
