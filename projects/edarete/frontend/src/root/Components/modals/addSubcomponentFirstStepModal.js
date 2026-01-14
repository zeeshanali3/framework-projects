
import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    Button,
    Typography,
    Grid,
    IconButton,
    DialogTitle,
    Card,
    Box,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import AddSubComponent from "../modals/addsubcomponentModal";
import 'react-quill/dist/quill.snow.css';
import TemplateDraftSubcomponents from "../templateSubcomponents";

const AddSubcomponentFirstStepModal = ({
    handleClose,
    open,
    classItem,
    componentID,
    componentName,
    userroleID,
    selectedComponentData,
    Num,
    ComponentType,
    handleSetLoading,
    handlegetclassComponent

}) => {
    const [subcomponentStatus, setSubcomponentStatus] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null)
    const handleSelectTemplate = (template) => {
        setSelectedTemplate(template)
    }

    const handleCreateFromTemplate = () => {
        setSubcomponentStatus("Template")
    };

    const handleCreateFromScratch = () => {
        handleClose();
        setSubcomponentStatus("New")
    };
    const HandleClose = () => {
        if (!subcomponentStatus) {
            handleClose()
        }
        else {
            setSubcomponentStatus(null)
        }
    }
    return (
        <>
            <Dialog open={open} onClose={HandleClose} fullWidth maxWidth="sm">
                <DialogTitle
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        m: 0,
                        p: 2
                    }}
                >
                    <Typography variant="h6">
                        Create Subcomponent
                    </Typography>
                    <IconButton
                        edge="end"
                        color="error" // Sets the color to red
                        onClick={HandleClose}
                        aria-label="close"
                    >
                        <Close />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    {subcomponentStatus == "Template" && (
                        <>
                            <TemplateDraftSubcomponents
                                componentID={componentID}
                                handleSelectTemplate={handleSelectTemplate}
                                subComponentStatus={subcomponentStatus}
                            />
                            <AddSubComponent
                                classItem={classItem}
                                componentID={componentID}
                                handleClose={() => { setSubcomponentStatus(null) }}
                                open={selectedTemplate}
                                componentName={componentName}
                                selectedComponentData={selectedComponentData}
                                userroleID={userroleID}
                                Num={Num}
                                handleSetLoading={handleSetLoading}
                                ComponentType={ComponentType}
                                handlegetclassComponent={handlegetclassComponent}
                                selectedTemplate={selectedTemplate}

                            />
                        </>
                    )

                    }

                    {!subcomponentStatus && (
                        <>
                            <Typography variant="h5" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
                                How would you like to create your subcomponent?
                            </Typography>

                            <Grid container spacing={3} justifyContent="space-evenly" >
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card sx={{ boxShadow: 3, borderRadius: 2, display: 'flex', flexDirection: 'column' }}>
                                        <Box
                                            p={3}
                                            sx={{
                                                flex: 1, // Allows Box to stretch
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <div>
                                                <Typography variant="h6" gutterBottom>
                                                    Start from a Template
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                                    Use a pre-designed template to quickly set up your subcomponent.
                                                </Typography>
                                            </div>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={handleCreateFromTemplate}
                                                fullWidth
                                            >
                                                Use Template
                                            </Button>
                                        </Box>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} sm={6} md={4}>
                                    <Card sx={{ boxShadow: 3, borderRadius: 2, display: 'flex', flexDirection: 'column', height: "248px" }}>
                                        <Box
                                            p={3}
                                            sx={{
                                                flex: 1,
                                                display: 'flex',
                                                flexDirection: 'column',
                                                justifyContent: 'space-between'
                                            }}
                                        >
                                            <div>
                                                <Typography variant="h6" gutterBottom>
                                                    Start from Scratch
                                                </Typography>
                                                <Typography variant="body2" color="textSecondary" sx={{ mb: 2 }}>
                                                    Build your subcomponent from the ground up.
                                                </Typography>
                                            </div>
                                            <Button
                                                variant="outlined"
                                                color="secondary"
                                                onClick={handleCreateFromScratch}
                                                fullWidth
                                            >
                                                Create from Scratch
                                            </Button>
                                        </Box>
                                    </Card>
                                </Grid>
                            </Grid>
                        </>
                    )}
                </DialogContent>
            </Dialog>
            <AddSubComponent
                classItem={classItem}
                componentID={componentID}
                handleClose={() => { setSubcomponentStatus(null) }}
                open={subcomponentStatus == "New"}
                componentName={componentName}
                selectedComponentData={selectedComponentData}
                userroleID={userroleID}
                Num={Num}
                handleSetLoading={handleSetLoading}
                ComponentType={ComponentType}
                handlegetclassComponent={handlegetclassComponent}

            />
        </>

    );

};

export default AddSubcomponentFirstStepModal;