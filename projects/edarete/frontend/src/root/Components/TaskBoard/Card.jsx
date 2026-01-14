import React, { useState } from 'react'
import {
    Box,
    Stack,
} from '@mui/material'
import {
    Edit,
    Delete
} from "@mui/icons-material"
import TypographyComponent from './Common/Typography'
import IconButtonComponent from './Common/IconButton'
import MenuComponent from './Common/Menu'
import ModalComponent from './Common/Modal'
import FormComponent from './Common/Form'
import DialogComponent from './Common/Dialog'

const Card = ({
    columnId = null,
    cardData = {},
    setColumns,
    boardData = [],
    boardFeatures = {},
    boardLabels = {}
}) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const [modal, setModal] = useState(false);
    const [dialog, setDialog] = useState(false);
    const modalTitle = boardLabels.forms.cards.edit.title;
    const modalDescription = boardLabels.forms.cards.edit.description;
    const modalCancelLabel = boardLabels.buttons.generic.cancel;
    const modalConfirmLabel = boardLabels.buttons.generic.save;
    const dialogTitle = boardLabels.dialogs.delete.card.title;
    const dialogDescription = boardLabels.dialogs.delete.card.description;
    const dialogCancelLabel = boardLabels.buttons.generic.cancel;
    const dialogConfirmLabel = boardLabels.buttons.delete.card;
    const editCard = boardFeatures.editCard;
    const deleteCard = boardFeatures.deleteCard;

    const columnOptions = boardData.map((col) => ({
        label: col.columnTitle,
        value: col.columnId,
    }));

    const cardFieldsWithOptions = boardLabels.forms.cards.fields.map((field) => {
        if (field.type === "select" && field.id.toLowerCase().includes("column")) {
            return {
                ...field,
                value: columnId,
                options: columnOptions
            };
        }
        if (field.type === "text" && field.id.toLowerCase().includes("title")) {
            return {
                ...field,
                value: cardData.cardTitle,
            };
        }
        if (field.type === "text" && field.id.toLowerCase().includes("description")) {
            return {
                ...field,
                value: cardData.cardDescription,
            };
        }
        if (field.type === "select" && field.id.toLowerCase().includes("priority")) {
            return {
                ...field,
                value: cardData.cardPriority,
                options: boardLabels.priorities
            };
        }
        return field;
    });

    const getBorderStyles = (priority) => {
        if (!priority) {
            return { borderLeft: '4px solid #b0bec5' };
        }

        const lowerPriority = priority.toLowerCase();
        if (lowerPriority.includes('high')) {
            return { borderLeft: '4px solid #d32f2f' };
        }
        if (lowerPriority.includes('medium')) {
            return { borderLeft: '4px solid #FFA500' };
        }
        if (lowerPriority.includes('low')) {
            return { borderLeft: '4px solid #008000' };
        }
        return { borderLeft: '4px solid #b0bec5' };
    };

    const handleRemoveCard = (columnId, cardId) => {
        setColumns((prevColumns) =>
            prevColumns.map((col) =>
                col.columnId === columnId
                    ? {
                        ...col,
                        columnCards: col.columnCards.filter((card) => card.cardId !== cardId),
                    }
                    : col
            )
        );
    };

    // ---------- Logs ----------
    console.log("Column Id", columnId);
    console.log("Card Data", cardData);

    return (
        <>
            <Box
                sx={{
                    backgroundColor: '#FFFFFF',
                    borderRadius: '4px',
                    boxSizing: 'border-box',
                    ...getBorderStyles(cardData.cardPriority || ""),
                }}
            >
                <Stack
                    direction="row"
                    sx={{
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderBottom: '1px solid #b0bec576',
                        padding: 2,
                    }}
                >
                    <TypographyComponent
                        title={cardData.cardTitle}
                        variant="h4"
                        fontSize="15px"
                        fontWeight="700"
                        color="#333"
                    />
                    {
                        (editCard || deleteCard) && (
                            <IconButtonComponent
                                fontSize={20}
                                color='#666'
                                type='MoreVert'
                                handleClick={(event) => setAnchorEl(event.currentTarget)}
                            />
                        )
                    }
                    {
                        anchorEl && (
                            <MenuComponent
                                anchorEl={anchorEl}
                                actions={[
                                    editCard && {
                                        label: "Edit Card",
                                        icon: <Edit
                                            sx={{
                                                fontSize: 18,
                                                color: '#666',
                                            }}
                                        />,
                                        onClick: () => setModal(true)
                                    },
                                    deleteCard && {
                                        label: "Delete Card",
                                        icon: <Delete
                                            sx={{
                                                fontSize: 18,
                                                color: '#666',
                                            }}
                                        />,
                                        onClick: () => setDialog(true)
                                    },
                                ].filter(Boolean)}
                                handleMenuClose={() => setAnchorEl(null)}
                                fontSize="16px"
                            />
                        )
                    }
                </Stack>
                <Box
                    sx={{
                        padding: 2,
                    }}
                >
                    <TypographyComponent
                        title={cardData.cardDescription}
                        variant="p"
                        fontSize="15px"
                        fontWeight="500"
                        color="#333"
                        textAlign="left"
                    />
                </Box>
            </Box>

            {/* Modal */}
            <ModalComponent
                open={modal}
                handleClose={() => setModal(false)}
                title={modalTitle}
                description={modalDescription}
                width={400}
            >
                <FormComponent
                    fields={cardFieldsWithOptions}
                    cancelLabel={modalCancelLabel}
                    confirmLabel={modalConfirmLabel}
                    onCancel={() => setModal(false)}
                    handleOnSubmit={(formValues) => {
                        const fieldIds = boardLabels.forms.cards.fields.map(f => f.id);

                        // ---------- Column Field ----------
                        const columnIdd = fieldIds.find((id) => id.toLowerCase().includes("column"));
                        const columnValue = columnIdd ? formValues[columnIdd] || null : null;
                        // ---------- Title Field ----------
                        const titleId = fieldIds.find((id) => id.toLowerCase().includes("title"));
                        const titleValue = titleId ? formValues[titleId]?.trim?.() || null : null;
                        // ---------- Description Field ----------
                        const descriptionId = fieldIds.find((id) => id.toLowerCase().includes("description"));
                        const descriptionValue = descriptionId ? formValues[descriptionId]?.trim?.() || null : null;
                        // ---------- Priority Field ----------
                        const priorityId = fieldIds.find((id) => id.toLowerCase().includes("priority"));
                        const priorityValue = priorityId ? formValues[priorityId] || null : null;

                        if (columnId === columnValue) {
                            // Case 1: Column didn't change → update in place
                            setColumns((prev) =>
                                prev.map((column) => {
                                    if (column.columnId === columnValue) {
                                        return {
                                            ...column,
                                            columnCards: column.columnCards.map((card) => {
                                                if (card.cardId === cardData.cardId) {
                                                    return {
                                                        ...card,
                                                        cardTitle: titleValue,
                                                        cardDescription: descriptionValue,
                                                        cardPriority: priorityValue,
                                                        updatedAt: new Date().toISOString().replace(/\.\d{3}/, ''),
                                                    };
                                                }
                                                return card;
                                            }),
                                        };
                                    }
                                    return column;
                                })
                            );
                        }
                        else {
                            // Case 2: Column changed → move card
                            setColumns((prev) => {
                                let movedCard = null;

                                // First pass: extract the card from old column
                                const updatedColumns = prev.map((column) => {
                                    if (column.columnId === columnId) {
                                        const cardToMove = column.columnCards.find(
                                            (card) => card.cardId === cardData.cardId
                                        );

                                        if (cardToMove) {
                                            // save the card for later insertion
                                            movedCard = {
                                                ...cardToMove,
                                                cardTitle: titleValue,
                                                cardDescription: descriptionValue,
                                                cardPriority: priorityValue,
                                                updatedAt: new Date().toISOString().replace(/\.\d{3}/, ''),
                                            };
                                        }

                                        return {
                                            ...column,
                                            columnCards: column.columnCards.filter(
                                                (card) => card.cardId !== cardData.cardId
                                            ),
                                        };
                                    }
                                    return column;
                                });

                                // Second pass: insert into the new column
                                return updatedColumns.map((column) => {
                                    if (column.columnId === columnValue && movedCard) {
                                        const maxId = column.columnCards.length > 0
                                            ? Math.max(...column.columnCards.map(c => Number(c.cardId) || 0))
                                            : 0;

                                        movedCard = {
                                            ...movedCard,
                                            cardId: maxId + 1,
                                        };

                                        return {
                                            ...column,
                                            columnCards: [...column.columnCards, movedCard],
                                        };
                                    }
                                    return column;
                                });
                            });
                        }
                        setModal(false);
                    }}
                />
            </ModalComponent>

            {/* Dialog */}
            <DialogComponent
                title={dialogTitle}
                description={dialogDescription}
                cancelLabel={dialogCancelLabel}
                confirmLabel={dialogConfirmLabel}
                open={dialog}
                onClose={() => setDialog(false)}
                onConfirm={() => { handleRemoveCard(columnId, cardData.cardId); setDialog(false); }}
            />
        </>
    )
}

export default Card