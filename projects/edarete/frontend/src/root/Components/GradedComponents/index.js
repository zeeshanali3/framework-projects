import React from "react";
import Card from "@mui/material/Card";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import EnrolledCourses from "./EnrolledCourses";
import CreatedCourses from "./CreatedCourses";
import styles from './Tabs.module.css';

const Courses = ({
  componentID,
  componentName,
  classItem,
  userroleID,
  roleName,
  TypeName,
  isPublic,
  roleID,
  selectedComponentData,
  courseName,
  CourseId,
  components
}) => {
    return (
    <>
      <Card
        sx={{
          boxShadow: "none",
          borderRadius: "10px",
          p: "25px 25px 15px",
          mb: "15px",
          mt:"20px",
        }}
      >
        <EnrolledCourses key={componentID} CourseId={CourseId} courseName={courseName}componentID={componentID} componentName={componentName} classItem={classItem} roleName={roleName} roleID={roleID} userroleID={userroleID} isPublic={isPublic} components={components} />

      </Card>
    </>
  );
};

export default Courses;
