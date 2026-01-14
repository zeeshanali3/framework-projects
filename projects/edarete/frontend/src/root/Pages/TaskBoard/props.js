const data = {
    features: {
        board: {
            columns: [
                {
                    columnId: 1,
                    columnTitle: "To-Do",
                    columnCards: [
                        {
                            cardId: 1,
                            cardTitle: "Project Initialization",
                            cardDescription: "Create GitHub account, create repository, clone it, install react project with vite, and push it.",
                            cardPriority: "high",
                            cardFlowId: 1,
                            createdBy: "Admin",
                            createdAt: "2025-08-12T09:00:00Z",
                            updatedBy: 1,
                            updatedAt: "2025-08-13T12:30:06Z",
                        },
                        {
                            cardId: 2,
                            cardTitle: "Dependencies",
                            cardDescription: "Install required react dependencies and push the code.",
                            cardPriority: "medium",
                            cardFlowId: 2,
                            createdBy: "Admin",
                            createdAt: "2025-08-12T10:00:00Z",
                            updatedBy: null,
                            updatedAt: null,
                        },
                    ]
                },
                {
                    columnId: 2,
                    columnTitle: "In Progress",
                    columnCards: []
                },
                {
                    columnId: 3,
                    columnTitle: "Completed",
                    columnCards: []
                },
            ],
        }
    }
}

const config = {
    title: "Task Board",
    features: {
        board: {
            addColumn: true,
            addCard: true,
            editColumn: true,
            editCard: true,
            deleteColumn: true,
            deleteCard: true,
            columnDragAndDrop: true,
            cardDragAndDrop: true,
        }
    },
    labels: {
        board: {
            buttons: {
                create: {
                    column: "Add Column",
                    card: "Add Task",
                },
                edit: {
                    card: "Edit Task",
                },
                delete: {
                    column: "Delete Column",
                    card: "Delete Task",
                },
                generic: {
                    cancel: "Cancel",
                    save: "Save",
                }
            },
            forms: {
                columns: {
                    create: {
                        title: "Create new column",
                        description: "Add a new column to your task board.",
                    },
                    fields: [
                        {
                            id: "title",
                            label: "Column Title",
                            placeholder: "Enter column title",
                            type: "text",
                            required: true,
                        },
                    ],
                },
                cards: {
                    create: {
                        title: "Create new task",
                        description: "Add a new task card inside a column to track progress.",
                    },
                    edit: {
                        title: "Edit task card",
                        description: "Update task details such as column, title, description, or priority.",
                    },
                    fields: [
                        {
                            id: "column",
                            label: "Select Column",
                            placeholder: "Choose a column",
                            type: "select",
                            required: true,
                            options: []
                        },
                        {
                            id: "title",
                            label: "Task Title",
                            placeholder: "Enter task title",
                            type: "text",
                            required: true,
                        },
                        {
                            id: "description",
                            label: "Task Description",
                            placeholder: "Enter task description",
                            type: "text",
                            required: false,
                        },
                        {
                            id: "priority",
                            label: "Select Priority",
                            placeholder: "Choose priority",
                            type: "select",
                            required: false,
                            options: []
                        }
                    ],
                },
            },
            dialogs: {
                delete: {
                    column: {
                        title: "Delete Column",
                        description: "Are you sure you want to delete this column? This action cannot be undone."
                    },
                    card: {
                        title: "Delete Task Card",
                        description: "Are you sure you want to delete this task card? This action cannot be undone."
                    },
                },
            },
            priorities: [
                { label: "High Priority", value: "high" },
                { label: "Medium Priority", value: "medium" },
                { label: "Low Priority", value: "low" },
            ]
        }
    }
}

export { data, config };