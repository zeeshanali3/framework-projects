import React, { useEffect } from "react";
import Header from "../custom/topnavBar";
import { useLocation, useParams } from "react-router-dom";
import { routesName } from "../routes/adminConstants";

import ClassroomTabs from "./Tabs";
const publicClassroomLandingPage = () => {
    const location = useLocation();
    const { courseName, id } = useParams();
    const rows = location.state;
    const classItem = rows;

    return (
        <>
            <div style={{ overflow: "hidden" }}>
                <Header title={courseName} hideLogout={false} showAddIcon={false} navigations={routesName.dashboardView} sPath={routesName.setting} showpendingIcon={false} />
                <ClassroomTabs classItem={classItem} isPublic={true} />
            </div>
        </>
    );
};

export default publicClassroomLandingPage;
