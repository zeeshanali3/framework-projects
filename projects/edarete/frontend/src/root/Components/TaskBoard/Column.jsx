import React, { useState } from 'react'
import {
    Box,
    Stack,
} from '@mui/material'
import {
    Droppable,
    Draggable
} from '@hello-pangea/dnd'
import TypographyComponent from './Common/Typography'
import TextFieldComponent from './Common/Fields/TextField'
import IconButtonComponent from './Common/IconButton'
import DialogComponent from './Common/Dialog'
import Card from './Card'

const Column = ({
    columnData = {},
    setColumns,
    editingColumnId = null,
    setEditingColumnId,
    boardData = [],
    boardFeatures = {},
    boardLabels = {}
}) => {
    const [dialog, setDialog] = useState(false);
    const title = boardLabels.dialogs.delete.column.title;
    const description = boardLabels.dialogs.delete.column.description;
    const cancelLabel = boardLabels.buttons.generic.cancel;
    const confirmLabel = boardLabels.buttons.delete.column;
    const editColumn = boardFeatures.editColumn;
    const deleteColumn = boardFeatures.deleteColumn;
    const cardDragDrop = boardFeatures.cardDragAndDrop;

    const handleEditTitle = (columnId) => {
        setEditingColumnId(columnId);
    };

    const handleKeyDown = (e) => {
        if (e.key === "Escape" || e.key === "Enter") {
            setEditingColumnId(null);
        }
    };

    const handleTitleChange = (columnId, newTitle) => {
        setColumns(prevColumns =>
            prevColumns.map(col =>
                col.columnId === columnId
                    ? { ...col, columnTitle: newTitle }
                    : col
            )
        );
    };

    const handleRemoveColumn = (columnId) => {
        setColumns((prevColumns) => prevColumns.filter(col => col.columnId !== columnId));
    };

    return (
        <>
            <Stack
                direction="column"
                spacing={1}
                sx={{
                    backgroundColor: '#FAFAFA',
                    borderRadius: '8px',
                    paddingLeft: 2,
                    paddingTop: 2,
                    paddingBottom: 2,
                    boxSizing: 'border-box',
                    height: '100%',
                }}
            >
                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        minHeight: "28px",
                        paddingRight: 2,
                    }}
                >
                    {
                        editingColumnId === columnData.columnId && editColumn ? (
                            <TextFieldComponent
                                id={columnData.columnId}
                                value={columnData.columnTitle}
                                defaultValue={columnData.columnTitle}
                                variant="outlined"
                                size="small"
                                autoFocus={true}
                                handleChange={(event) => handleTitleChange(columnData.columnId, event.target.value)}
                                handleBlur={() => setEditingColumnId(null)}
                                handleKeyDown={handleKeyDown}
                                fontSize="17px"
                                fontWeight={500}
                                padding="0px 4px"
                                borderRadius="8px"
                                borderColor="#4C49ED"
                                hideOutline={false}
                            />
                        ) : (
                            <TypographyComponent
                                title={columnData.columnTitle}
                                variant="h3"
                                fontSize="17px"
                                fontWeight="500"
                                color="#333"
                                cursor={editColumn ? "pointer" : "default"}
                                handleClick={editColumn ? () => handleEditTitle(columnData.columnId) : undefined}
                            />
                        )
                    }
                    {
                        (editColumn || deleteColumn) && (
                            <Stack
                                direction="row"
                                spacing="2px"
                            >
                                {
                                    editColumn && (
                                        <IconButtonComponent
                                            fontSize={20}
                                            color='#666'
                                            type='Edit'
                                            handleClick={() => handleEditTitle(columnData.columnId)}
                                        />
                                    )
                                }
                                {
                                    deleteColumn && (
                                        <IconButtonComponent
                                            fontSize={20}
                                            color='#666'
                                            type='Close'
                                            handleClick={() => setDialog(true)}
                                        />
                                    )
                                }
                            </Stack>
                        )
                    }
                </Stack>
                <Droppable
                    droppableId={String(columnData.columnId)}
                    direction="vertical"
                    type="CARD"
                    isDropDisabled={!cardDragDrop}
                >
                    {(provided) => (
                        <Stack
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                            direction="column"
                            spacing={1}
                            sx={{
                                height: '100%',
                                overflowY: 'auto',
                                paddingRight: 2,
                            }}
                        >
                            {
                                columnData.columnCards?.map((card, index) => (
                                    <Draggable
                                        key={card.cardId}
                                        draggableId={String(`${columnData.columnId}-${card.cardId}`)}
                                        index={index}
                                        isDragDisabled={!cardDragDrop}
                                    >
                                        {(provided) => (
                                            <Box
                                                ref={provided.innerRef}
                                                {...provided.draggableProps}
                                                {...provided.dragHandleProps}
                                                style={provided.draggableProps.style}
                                            >
                                                <Card
                                                    columnId={columnData.columnId}
                                                    cardData={card}
                                                    setColumns={setColumns}
                                                    boardData={boardData}
                                                    boardFeatures={boardFeatures}
                                                    boardLabels={boardLabels}
                                                />
                                            </Box>
                                        )}
                                    </Draggable>
                                ))
                            }
                            {provided.placeholder}
                        </Stack>
                    )}
                </Droppable>
            </Stack>

            {/* Dialog */}
            <DialogComponent
                title={title}
                description={description}
                cancelLabel={cancelLabel}
                confirmLabel={confirmLabel}
                open={dialog}
                onClose={() => setDialog(false)}
                onConfirm={() => { handleRemoveColumn(columnData.columnId); setDialog(false); }}
            />
        </>
    )
}

export default Column