const data = {
  features: {
    textCustomization: {
      toolbar: {
        basicFormatting: {
          bold: true
          ,
          italic: true,
          underline: true,
          strike: true,
          clear: true,
        },
        advancedFormatting: {
          highlight: true,
          codeBlock: true,
          blockquote: true,
          horizontalLine: true,
        },
        headers: {
          h1: true,
          h2: true,
          h3: true,
          h4: true,
          h5: true,
          h6: true,
        },
        lists: {
          unorderedList: true,
          orderedList: true,
        },
        superscriptSubscript: {
          sup: true,
          sub: true,
        },
        alignment: {
          alignLeft: true,
          alignCenter: true,
          alignRight: true,
          alignJustify: true,
        },
        links: {
          link: true,
          unlink: true,
        },
        colors: {
          color: true,
        },
        actions: {
          undo: true,
          redo: true,
          insertTag: true,
        },
      },
      predefinedTags: [
        { label: "Student Name", value: "{studentName}" },
        { label: "Roll Number", value: "{rollNumber}" },
        { label: "Course Title", value: "{courseTitle}" },
        { label: "Enrollment Date", value: "{enrollmentDate}" },
        { label: "Program Name", value: "{programName}" },
        { label: "Total Credits", value: "{totalCredits}" },
      ],
      buttons: [
        {
          label: "Generate Report",
          type: "submit",
          onClick: () => {
            console.log("Generate Report");
          },
        },
        // {
        //   label: "Preview Report",
        //   type: "button",
        //   onClick: () => {
        //     console.log("Preview Report");
        //   },
        // },
      ],
    },
  },
};

const config = {
  features: {
    textCustomization: true,
    enableTagInsertion: true,
    autoSave: {
      enabled: true,
      interval: 5000,
    },
  },
  editor: {
    placeholder: "Enter the ",
    maxCharacterCount: 5000,
  },
};

const appearance = {
  features: {
    textCustomization: {
      toolbarStyle: {
        backgroundColor: "#f4f4f4",
        borderColor: "#dcdcdc",
      },
      editorStyle: {
        backgroundColor: "#FFFFFF",
        color: "#333333",
      },
    },
  },
  buttons: {
    defaultStyle: {
      backgroundColor: "#5A67D8",
      color: "#FFFFFF",
    },
    hoverStyle: {
      backgroundColor: "#434C9C",
      color: "#FFFFFF",
    },
  },
};

export { data, config, appearance };
