import React, { useState, useEffect } from "react";
import {
    Typography,
    Grid,
    Card,
    Box,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { GetTemplateSubComponentAction } from "../Common/Store/Actions/General/GetActions/getTemplateSubcomponentAction";

const TemplateDraftSubcomponents = ({componentID,handleSelectTemplate,subComponentStatus}) => {
    const dispatch = useDispatch();
    const getTemplateSubcomponent = useSelector((state) => state?.TEMPLATESUBCOMPONENTS.getTemplateSubcomponentReducer);
    const [templates, setTemplates] = useState(getTemplateSubcomponent?.payload || []);

    useEffect(() => {
        dispatch(GetTemplateSubComponentAction(
            componentID,
            subComponentStatus,
            (res) => {
                console.log("res:::", res);
                setTemplates(res.payload);
            },
            (err) => {
                console.log("err:::", err);
            }
        ));
    }, [componentID, dispatch]);
    return (
        <Grid container spacing={2}>
            {templates && templates.length > 0 ? (
                templates.map((template, index) => (
                    <Grid item xs={12} key={template.SubComponentId}>
                        <Card variant="outlined" sx={{ 
                            p: 2, 
                            cursor: "pointer", 
                            transition: "transform 0.3s", 
                            "&:hover": { 
                                transform: "scale(1.02)",
                                boxShadow: 3,
                            },
                            backgroundColor: "#f9f9f9",
                            borderRadius: 2
                        }}
                        onClick={() => handleSelectTemplate(template)}>
                            <Box display="flex" flexDirection="column" alignItems="flex-start">
                                <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#3f51b5' }}>
                                    {subComponentStatus} {index + 1}
                                </Typography>
                            </Box>
                        </Card>
                    </Grid>
                ))
            ) : (
                <Grid item xs={12}>
                    <Typography variant="body1" color="textSecondary" align="center">
                        No {subComponentStatus} available.
                    </Typography>
                </Grid>
            )}
        </Grid>
    );
};

export default TemplateDraftSubcomponents;
