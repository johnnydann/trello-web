import Card from "./Card/Card";
import Box from "@mui/material/Box";
import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";

function ListCards({ cards }) {
    return (
        <SortableContext
            items={cards?.map((c) => c._id)}
            strategy={verticalListSortingStrategy}
        >
            <Box
                sx={{
                    flexDirection: "column",
                    gap: 1,
                    p: "0 5px ",
                    m: "0 5px",
                    display: "flex",
                    overflowX: "hidden",
                    overflowY: "auto",
                    maxHeight: (theme) =>
                        `calc(${theme.trello.boardContenHeight} - ${theme.spacing(
                            5
                        )} - 
                ${theme.trello.columnHeaderHeight} - 
                ${theme.trello.columnFooterHeight}
            )`,
                    "&::-webkit-scrollbar-thumb": {
                        backgroundColor: "#ced0da",
                    },
                    "&::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "#bfc2cf",
                    },
                }}
            >
                {cards?.map((card) => (
                    <Card key={card._id} card={card} />
                ))}
            </Box>
        </SortableContext>
    );
}

export default ListCards;
