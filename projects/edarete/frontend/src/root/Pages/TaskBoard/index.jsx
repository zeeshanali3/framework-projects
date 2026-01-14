import React, { useState } from 'react'
import {
    Stack,
    Box,
} from '@mui/material'
import {
    DragDropContext,
    Droppable,
    Draggable
} from '@hello-pangea/dnd'
import Column from '../../Components/TaskBoard/Column'
import TypographyComponent from '../../Components/TaskBoard/Common/Typography'
import ButtonComponent from '../../Components/TaskBoard/Common/Button'
import ModalComponent from '../../Components/TaskBoard/Common/Modal'
import FormComponent from '../../Components/TaskBoard/Common/Form'
import { data, config } from './props'

const TaskBoard = () => {
    const title = config.title;
    const features = config.features;
    const labels = config.labels;

    // ---------- Board ----------
    const [boardData, setBoardData] = useState(data.features.board.columns);
    const boardFeatures = features.board;
    const boardLabels = labels.board;
    const boardButtonLabels = boardLabels.buttons;
    const boardFormLabels = boardLabels.forms;

    // ---------- Column ----------
    const [editingColumnId, setEditingColumnId] = useState(null);
    const [isColumnModalOpen, setIsColumnModalOpen] = useState(false);
    const columnDragDrop = boardFeatures.columnDragAndDrop;

    // ---------- Card ----------
    const [isCardModalOpen, setIsCardModalOpen] = useState(false);
    const columnOptions = boardData.map((col) => ({
        label: col.columnTitle,
        value: col.columnId,
    }));
    const cardFieldsWithOptions = boardFormLabels.cards.fields.map((field) => {
        if (field.type === "select" && field.id.toLowerCase().includes("column")) {
            return {
                ...field,
                options: columnOptions
            };
        }
        if (field.type === "select" && field.id.toLowerCase().includes("priority")) {
            return {
                ...field,
                options: boardLabels.priorities
            };
        }
        return field;
    });

    // ---------- Drag & Drop Handler ----------
    const handleDragEnd = (result) => {
        const { source, destination, type } = result;

        if (!destination) return;
        if (
            source.index === destination.index &&
            source.droppableId === destination.droppableId
        ) return;

        if (type === "COLUMN") {
            setBoardData((prev) => {
                const updated = Array.from(prev);
                const [moved] = updated.splice(source.index, 1);
                updated.splice(destination.index, 0, moved);
                return updated;
            });
        }

        if (type === "CARD") {
            setBoardData((prev) => {
                const updated = prev.map((col) => ({
                    ...col,
                    columnCards: [...col.columnCards],
                }));

                const sourceColIndex = updated.findIndex(
                    (col) => String(col.columnId) === String(source.droppableId)
                );
                const destColIndex = updated.findIndex(
                    (col) => String(col.columnId) === String(destination.droppableId)
                );

                console.log(`Source Column Index: ${sourceColIndex}, Destination Column Index: ${destColIndex}`);

                if (sourceColIndex === -1 || destColIndex === -1) return prev;

                const sourceCol = updated[sourceColIndex];
                const destCol = updated[destColIndex];

                console.log("Source Column", sourceCol);
                console.log("Destination Column", destCol);

                // Split "colId-cardId" back into [colId, cardId]
                const [dragColId, dragCardId] = result.draggableId.split("-");

                console.log(`Drag Col Id: ${dragColId}, Drag Card Id: ${dragCardId}`);

                // Find the card by cardId inside the sourceCol
                const movedCardIndex = sourceCol.columnCards.findIndex(
                    (c) => String(c.cardId) === dragCardId
                );

                if (movedCardIndex === -1) return prev;

                const [movedCard] = sourceCol.columnCards.splice(movedCardIndex, 1);

                if (sourceColIndex === destColIndex) {
                    // Reorder inside same column
                    sourceCol.columnCards.splice(destination.index, 0, movedCard);
                    updated[sourceColIndex] = { ...sourceCol };
                } else {
                    const maxCardId = destCol.columnCards.length > 0
                        ? Math.max(...destCol.columnCards.map(c => Number(c.cardId) || 0))
                        : 0;
                    movedCard.cardId = maxCardId + 1;

                    // Move across columns
                    destCol.columnCards.splice(destination.index, 0, movedCard);
                    updated[sourceColIndex] = { ...sourceCol };
                    updated[destColIndex] = { ...destCol };
                }

                return updated;
            });
        }
    };

    // ---------- Column Handlers ----------
    const handleColumnModal = () => {
        setIsColumnModalOpen(true);
    }

    // ---------- Card Handlers ----------
    const handleCardModal = () => {
        setIsCardModalOpen(true);
    }

    // ---------- Logs ----------
    console.log("Board Data", boardData);
    console.log("Column Options", columnOptions);
    console.log("Card Fields With Options", cardFieldsWithOptions);

    return (
        <>
            <Stack direction="column" spacing="15px">
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                    }}
                >
                    <TypographyComponent
                        title={title}
                        variant="h2"
                        fontSize="17px"
                        fontWeight="700"
                        color="#333"
                    />
                    {
                        (boardFeatures.addColumn || boardFeatures.addCard) && (
                            <Stack direction="row" spacing="10px">
                                {
                                    boardFeatures.addCard && columnOptions.length > 0 && (
                                        <ButtonComponent
                                            variant="contained"
                                            label={boardButtonLabels.create.card}
                                            handleClick={handleCardModal}
                                        />
                                    )
                                }
                                {
                                    boardFeatures.addColumn && (
                                        <ButtonComponent
                                            variant="outlined"
                                            label={boardButtonLabels.create.column}
                                            handleClick={handleColumnModal}
                                        />
                                    )
                                }
                            </Stack>
                        )
                    }
                </Stack>
                {/* Kanban Layout */}
                <Box
                    sx={{
                        backgroundColor: "#FFFFFF",
                        borderRadius: "8px",
                        height: "calc(100vh - 172.4px)",
                        padding: 2,
                        boxSizing: 'border-box'
                    }}
                >
                    <DragDropContext onDragEnd={handleDragEnd}>
                        <Droppable
                            droppableId="board"
                            direction="horizontal"
                            type="COLUMN"
                            isDropDisabled={!columnDragDrop}
                        >
                            {(provided) => (
                                <Stack
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                    direction="row"
                                    spacing={2}
                                    sx={{
                                        boxSizing: 'border-box',
                                        height: '100%',
                                        overflowX: 'auto',
                                        overflowY: 'hidden',
                                        flexWrap: "nowrap"
                                    }}
                                >
                                    {
                                        boardData.map((col, index) => (
                                            <Draggable
                                                key={col.columnId}
                                                draggableId={String(col.columnId)}
                                                index={index}
                                                isDragDisabled={!columnDragDrop}
                                            >
                                                {(provided) => (
                                                    <Box
                                                        ref={provided.innerRef}
                                                        {...provided.draggableProps}
                                                        {...provided.dragHandleProps}
                                                        style={provided.draggableProps.style}
                                                        sx={{
                                                            flex: "0 0 320px",
                                                        }}
                                                    >
                                                        <Column
                                                            columnData={col}
                                                            setColumns={setBoardData}
                                                            editingColumnId={editingColumnId}
                                                            setEditingColumnId={setEditingColumnId}
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
                    </DragDropContext>
                </Box>
            </Stack>

            {/* Column Modal */}
            {
                boardFeatures.addColumn && (
                    <ModalComponent
                        open={isColumnModalOpen}
                        handleClose={() => setIsColumnModalOpen(false)}
                        title={boardFormLabels.columns.create.title}
                        description={boardFormLabels.columns.create.description}
                        width={400}
                    >
                        <FormComponent
                            fields={boardFormLabels.columns.fields}
                            cancelLabel={boardButtonLabels.generic.cancel}
                            confirmLabel={boardButtonLabels.generic.save}
                            onCancel={() => setIsColumnModalOpen(false)}
                            handleOnSubmit={(formValues) => {
                                const fieldIds = boardFormLabels.columns.fields.map(f => f.id);

                                // ---------- Title Field ----------
                                const titleId = fieldIds.find((id) => id.toLowerCase().includes("title"));
                                const titleValue = titleId ? formValues[titleId]?.trim?.() || null : null;

                                if (titleValue) {
                                    setBoardData((prev) => {
                                        const maxColumnId = prev.length > 0
                                            ? Math.max(...prev.map(col => Number(col.columnId) || 0))
                                            : 0;

                                        return [
                                            ...prev,
                                            {
                                                columnId: maxColumnId + 1,
                                                columnTitle: titleValue,
                                                columnCards: []
                                            }
                                        ];
                                    });
                                    setIsColumnModalOpen(false);
                                }
                            }}
                        />
                    </ModalComponent>
                )
            }

            {/* Card Modal */}
            {
                boardFeatures.addCard && (
                    <ModalComponent
                        open={isCardModalOpen}
                        handleClose={() => setIsCardModalOpen(false)}
                        title={boardFormLabels.cards.create.title}
                        description={boardFormLabels.cards.create.description}
                        width={400}
                    >
                        <FormComponent
                            fields={cardFieldsWithOptions}
                            cancelLabel={boardButtonLabels.generic.cancel}
                            confirmLabel={boardButtonLabels.generic.save}
                            onCancel={() => setIsCardModalOpen(false)}
                            handleOnSubmit={(formValues) => {
                                const fieldIds = boardFormLabels.cards.fields.map(f => f.id);

                                // ---------- Column Field ----------
                                const columnId = fieldIds.find((id) => id.toLowerCase().includes("column"));
                                const columnValue = columnId ? formValues[columnId] || null : null;
                                // ---------- Title Field ----------
                                const titleId = fieldIds.find((id) => id.toLowerCase().includes("title"));
                                const titleValue = titleId ? formValues[titleId]?.trim?.() || null : null;
                                // ---------- Description Field ----------
                                const descriptionId = fieldIds.find((id) => id.toLowerCase().includes("description"));
                                const descriptionValue = descriptionId ? formValues[descriptionId]?.trim?.() || null : null;
                                // ---------- Priority Field ----------
                                const priorityId = fieldIds.find((id) => id.toLowerCase().includes("priority"));
                                const priorityValue = priorityId ? formValues[priorityId] || null : null;

                                if (titleValue) {
                                    setBoardData((prev) =>
                                        prev.map((column) => {
                                            if (column.columnId === Number(columnValue)) {
                                                const maxCardId = column.columnCards.length > 0
                                                    ? Math.max(...column.columnCards.map(card => Number(card.cardId) || 0))
                                                    : 0;

                                                return {
                                                    ...column,
                                                    columnCards: [
                                                        ...column.columnCards,
                                                        {
                                                            cardId: maxCardId + 1,
                                                            cardTitle: titleValue,
                                                            cardDescription: descriptionValue,
                                                            cardPriority: priorityValue,
                                                            cardFlowId: maxCardId + 1,
                                                            createdBy: '',
                                                            createdAt: new Date().toISOString().replace(/\.\d{3}/, ''),
                                                            updatedBy: '',
                                                            updatedAt: '',
                                                        }
                                                    ]
                                                };
                                            }
                                            return column;
                                        })
                                    );
                                    setIsCardModalOpen(false);
                                }
                            }}
                        />
                    </ModalComponent>
                )
            }
        </>
    )
}

export default TaskBoard