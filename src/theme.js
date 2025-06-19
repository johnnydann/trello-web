import { experimental_extendTheme as extendTheme } from "@mui/material/styles";
// import { teal, deepOrange, cyan, orange } from "@mui/material/colors";

const App_Bar_Height = "58px";
const Board_Bar_Height = "60px";
const Board_Content_Height = `calc(100vh - ${App_Bar_Height} - ${Board_Bar_Height})`;

const Column_Header_Height = "50px";
const Column_Footer_Height = "56px";

const theme = extendTheme({
    trello: {
        appBarHeight: App_Bar_Height,
        boardBarHeight: Board_Bar_Height,
        boardContenHeight: Board_Content_Height,
        columnHeaderHeight: Column_Header_Height,
        columnFooterHeight: Column_Footer_Height,
    },
    // colorSchemes: {
    //     light: {
    //         palette: {
    //             primary: teal,
    //             secondary: deepOrange,
    //         },
    //     },
    //     dark: {
    //         palette: {
    //             primary: cyan,
    //             secondary: orange,
    //         },
    //     },
    // },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    "*::-webkit-scrollbar": {
                        width: "8px",
                        height: "8px",
                    },

                    "*::-webkit-scrollbar-thumb": {
                        backgroundColor: "#dcdde1",
                        borderRadius: "8px",
                    },
                    "*::-webkit-scrollbar-thumb:hover": {
                        backgroundColor: "white",
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    textTransform: "none",
                    borderWidth: "0.5px",
                    "&:hover": { borderWidth: "0.5px" },
                },
            },
        },
        MuiInputLabel: {
            styleOverrides: {
                root: { "&.MuiTypography-body1": { fontSize: "0.875rem" } },
            },
        },
        MuiOutlinedInput: {
            styleOverrides: {
                root: {
                    fontSize: "0.875rem",

                    "& fieldset": {
                        borderWith: "0.5px !important",
                    },
                    "&:hover fieldset": {
                        borderWith: "1px !important",
                    },
                    "&.Mui-focused fieldset": {
                        borderWith: "1px !important",
                    },
                },
            },
        },
    },
    // ...other properties
});

export default theme;
