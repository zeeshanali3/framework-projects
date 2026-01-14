import React,{useState} from "react"
import {AddbookAction} from "../../Common/Store/Actions/General/PostActions/addbookAction.js"
import { useDispatch, useSelector } from "react-redux";
import AddItemComponent from "../../custom/AddModal";
import {getAccessToken} from "../../Utils/loginData/loginData.jsx"
// const values = [ idObject.CourseId,BookIBN,namesObject.BookName,CreatedAtDate,CreatedAtTime,CreatedAtDate,CreatedAtTime,Status];
const AddbookComponent=({open ,close , courseid})=>{
    const dispatch = useDispatch();
    const { loginData } = useSelector((state) => state?.LOGINREDUCER);
    const token = getAccessToken(loginData);
     const [bookName , setbookName]=useState("");
     const [bookIbn , setbookIbn]=useState("");
     const handleaddBook=()=>{
        dispatch(
            AddbookAction(
                token,
                courseid,
                bookIbn,
                bookName,
                (response)=>{
                    console.log("successfully add" , response)
                },
                (error)=>{
                    console.log("error" , error)
                }
            )
        )
     }

     const textFields = [
        
        {
          title: "BOOK NAME *",
          label: "book name",
          value: bookName,
          onChange: (e) => setbookName(e.target.value),
        },
        {
          title: "BOOK IBN *",
          label: "book ibn ",
          value: bookIbn,
          onChange: (e) => setbookIbn(e.target.value),
        },
      ];
       return(
        <>
        <AddItemComponent
      open={open}
      close={close}
      token={token}
      title="CREATE BOOK"
      textFields={textFields}
      handleAddItem={handleaddBook}
      btnLabel="Add Book"
    />
        </>
    )
}

export default AddbookComponent;