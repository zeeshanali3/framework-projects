import React from 'react'

import StatCard from "./StateCard";
import {routesName} from "../../../routes/adminConstants";
import  emp from "../../../../assets/images/icon3.png"
import  stu from "../../../../assets/images/icon4.png"
import  cor from "../../../../assets/images/icon1.png"
import dep from "../../../../assets/images/icon2.png"
const AdminDashboard = () => {

    // rgb(248, 238, 226)  ,rgb(221, 240, 241) ,rgb(251, 234, 234)
    const statCardData = [
        { 
            id: "1",
            title: " Course's",
            subTitle: "All Departments",
            image: cor,
            buttonLabel:"View Course",
            routePath:routesName.plannedCourse,
            count:'12',
            backgroundColor:'linear-gradient(-20deg, #2b5876 0%, #4e4376 100%)'


        },
        {
            id: "2",
            title: "Students",
            subTitle: "All Departments",
            // image: work_icon,
            image:stu ,
            buttonLabel:"View Student",
            routePath:routesName.students,
            count:'54',
            backgroundColor:'radial-gradient(circle at center, #16d9e3, #30c7ec, #46aef7)'
        },
        {
            id: "3",
            title: "Employee ",
            subTitle: "All Departments",
            image: emp,
            buttonLabel:"View Employee",
            routePath:routesName.Employee,
            count:'89',
            backgroundColor:'linear-gradient(to top, #0ba360 0%, #3cba92 100%)'
        },
        {
            id: "4",
            title: "Departments ",
            subTitle: "All Departments",
            image:dep,
            buttonLabel:"View Employee",
            routePath:routesName.departments,
            count:'89',
            backgroundColor:'linear-gradient(to right, #434343 0%, black 100%)'
        },
    ];


    return (
        <div>
            <StatCard statCardData={statCardData}  />
        </div>
    )
}

export default AdminDashboard