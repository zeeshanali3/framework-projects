import React, { useState, useEffect } from 'react';
import FileField from '../Form/Fields/File';

const field = {
    alias: "file_upload.attachmentId",
    dependancyCheck: false,
    disabled: false,
    dynamicKey: "file_upload_attachmentId",
    fetchSubmitUrl: "/get/file/url/local?step=1",
    getFileUrl: "/get/file?step=1&token=",
    hideInCreateForm: false,
    hideInViewForm: false,
    isMultiple: false,
    isPrefilled: false,
    label: "",
    max: "",
    min: "",
    name: "attachmentId",
    required: true,
    selectServer: false,
    source: "req.body",
    title: "",
    type: "file",
    validations: [],
    visible: true,
};

const FileUpload = ({ editableText = "", setEditableText }) => {
    const dynamicKey = field.dynamicKey;
    const [formValues, setFormValues] = useState([
        {
            [dynamicKey]: "",
        }
    ]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (formValues[0]?.[dynamicKey]) {
            setEditableText("The rapid evolution of technology has fundamentally transformed the way individuals, organizations, and societies operate. In the past two decades, the widespread adoption of the internet, smartphones, and cloud computing has reshaped communication, commerce, and education, enabling people to access information and services at unprecedented speed and scale. However, with these advancements come challenges, particularly in the areas of data privacy, cybersecurity, and ethical use of artificial intelligence. Businesses are now under pressure to innovate while also safeguarding the trust of their customers, who are becoming increasingly aware of how their personal information is collected and used. At the same time, governments are working to regulate emerging technologies without stifling innovation, a delicate balance that is difficult to achieve. On an individual level, the digital revolution has created both opportunities and distractions: people are more connected than ever, yet many struggle with information overload, digital fatigue, and concerns about mental well-being in an always-online culture. Despite these challenges, the potential for positive impact is immense, particularly in areas such as healthcare, where technology is improving diagnostics and treatment, and education, where online learning platforms are breaking down geographical and financial barriers. The key question moving forward is not whether technology will continue to advance—it certainly will—but whether societies can adapt quickly and responsibly enough to ensure that these tools are used for the greater good, fostering inclusion, sustainability, and long-term progress.");
        }
    }, [formValues[0]?.[dynamicKey]]);

    // ---------- Logs ----------
    console.log("File Upload Values", formValues);

    return (
        <FileField
            field={field}
            errors={errors}
            setErrors={setErrors}
            isRequired={field.required}
            isReadOnly={false}
            inputFields={{}}
            formValues={formValues}
            setFormValues={setFormValues}
            currentStep={0}
            parentValues={undefined}
            fields={[]}
            parentFields={undefined}
        />
    )
}

export default FileUpload;