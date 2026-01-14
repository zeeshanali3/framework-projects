

import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { PostclasscomponentAction } from "../../Common/Store/Actions/General/PostActions/postclasscomponentAction.js";
import { GetclasscomponentAction } from "../../Common/Store/Actions/General/GetActions/getclasscomponentAction.js";
import AddItemComponent from "../../custom/AddModal";
import { useParams } from "react-router-dom";
import { getAccessToken } from "../../Utils/loginData/loginData.jsx";
import { toast, ToastContainer } from "react-toastify";
import { isLoadingAction } from "../../Common/Store/Actions/General/PostActions/isLoadingAction.js";
const AddclassComponent = ({ open, close, classItem }) => {
  const dispatch = useDispatch();
  const { loginData } = useSelector((state) => state?.LOGINREDUCER);
  const token = getAccessToken(loginData);
  const [ComponentType, setComponentType] = useState("");
  const [ComponentName, setComponentName] = useState("");
  const [Weightage, setWeightage] = useState("");
  const [ComponentPolicy, setComponentPolicy] = useState("");
  const { id } = useParams();

  const handleAddAssignment = () => {
    dispatch(isLoadingAction(true));
    let weightageToSend = ComponentType === "Not Graded" ? "0" : Weightage;
    let componentPolicyToSend =
      ComponentType === "Not Graded" ? "0" : ComponentPolicy;
    dispatch(
      PostclasscomponentAction(
        token,
        id,
        ComponentType,
        ComponentName,
        weightageToSend,
        componentPolicyToSend,
        (response) => {
          console.log("Policy added successfully", response);
          dispatch(GetclasscomponentAction(token, id,
            (response) => {
              dispatch(isLoadingAction(false));
              dispatch(isLoadingAction(false));
              console.log("success", response);
            },
            (error) => {
              dispatch(isLoadingAction(false));
              dispatch(isLoadingAction(false));
              console.log("error", error);
            }
          ));
         toast.success( response?.message);
         setTimeout(() => {
          close();
        }, 2000); 
        },
        (error) => {
          dispatch(isLoadingAction(false));
        
          if(error?.message?.status!=500)
            {
              if (error?.message?.payload != "") {
                const payloadKeys = Object.keys(error?.message?.payload);
                if (payloadKeys.length > 0) {
                  console.log("myError", error?.message);
                  toast.error(error?.message?.payload[payloadKeys[0]]);
                }
              }
              else
              {
                toast.error(error?.message?.message);
              }
            }
          else{
            toast.error("Server Error " + error?.message?.status);
          }
        }
      )
    );
  };

  const textFields = [
    {
      title: "TYPE *",
      value: ComponentType,
      onSelect: (selectedOption) => setComponentType(selectedOption),
      dropdownOptions: ["Graded", "Not Graded"],
      getOptionLabel: (option) => option,
      getOptionValue: (option) => option,
    },
    {
      title: "COMPONENT NAME *",
      value: ComponentName,
      onChange: (e) => setComponentName(e.target.value),
    }
,    
    {
      title: "WEIGHTAGE *",
      value: Weightage,
      onChange: (e) => setWeightage(e.target.value),
      type: "number",
      hide: ComponentType === "Not Graded",
      disabled: ComponentType === "Not Graded",
    },
    {
      title: "COMPONENT POLICY *",
      value: ComponentPolicy,
      type: "number",
      onChange: (e) => setComponentPolicy(e.target.value),
      hide: ComponentType === "Not Graded",
      disabled: ComponentType === "Not Graded",
    },
  ];

  return (
    <>
    <AddItemComponent
      open={open}
      close={close}
      token={token}
      title="CREATE CLASS COMPONENT"
      textFields={textFields}
      handleAddItem={handleAddAssignment}
      btnLabel="Add Class Component"
    />
    <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
    </>

  );
};

export default AddclassComponent;

