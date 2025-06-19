import Card from "./Card/Card";
import Box from "@mui/material/Box";

function ListCards() {
    return (
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
            <Card />
        </Box>
    );
}

export default ListCards;
