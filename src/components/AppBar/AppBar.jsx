import { useState } from "react";
import Box from "@mui/material/Box";
import ModeSelect from "~/components/ModeSelect/ModeSelect";
import AppIcon from "@mui/icons-material/Apps";
import { ReactComponent as TrelloIcon } from "~/assets/mdi--trello.svg";
import SvgIcon from "@mui/material/SvgIcon";
import Typography from "@mui/material/Typography";
import Workspaces from "./Menus/Workspaces";
import Recent from "./Menus/Recent";
import Starred from "./Menus/Starred";
import Templates from "./Menus/Templates";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Badge from "@mui/material/Badge";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import Tooltip from "@mui/material/Tooltip";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import Profiles from "./Menus/Profiles";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import CloseIcon from "@mui/icons-material/Close";

function AppBar() {
    const [searchValue, setSearchValue] = useState("");
    return (
        <Box
            sx={{
                width: "100%",
                height: (theme) => theme.trello.appBarHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                paddingX: 2,
                overflowX: "auto",
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#2c3e50" : "#1565c0",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <AppIcon sx={{ color: "white" }} />
                <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    <SvgIcon
                        component={TrelloIcon}
                        fontSize='small'
                        inheritViewBox
                        sx={{ color: "white" }}
                    />
                    <Typography
                        variant='h6'
                        sx={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "white",
                        }}
                    >
                        Trello
                    </Typography>
                </Box>

                <Box sx={{ display: { xs: "none", md: "flex", gap: 1 } }}>
                    <Workspaces />
                    <Recent />
                    <Starred />
                    <Templates />
                </Box>

                <Button
                    sx={{
                        color: "white",
                        border: "none",
                        "&:hover": {
                            border: "none",
                        },
                    }}
                    variant='outlined'
                    startIcon={<LibraryAddIcon />}
                >
                    Create
                </Button>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <TextField
                    size='small'
                    id='outlined-search'
                    label='Search field'
                    type='text'
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position='start'>
                                <SearchIcon sx={{ color: "white" }} />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position='end'>
                                <CloseIcon
                                    onClick={() => setSearchValue("")}
                                    fontSize='small'
                                    sx={{
                                        color: "white",
                                        cursor: "pointer",
                                        display:
                                            searchValue.length <= 0 ? "none" : "block",
                                    }}
                                />
                            </InputAdornment>
                        ),
                    }}
                    sx={{
                        minWidth: "120px",
                        maxWidth: "180px",
                        "& label": { color: "white" },
                        "& input": { color: "white" },
                        "& label.Mui-focused": { color: "white" },
                        "& .MuiOutlinedInput-root": {
                            "& fieldset": { borderColor: "white" },
                            "&:hover fieldset": { borderColor: "white" },
                            "&.Mui-focused fieldset": { borderColor: "white" },
                        },
                    }}
                />
                <ModeSelect />
                <Tooltip title='Notification'>
                    <Badge color='warning' variant='dot' sx={{ cursor: "pointer" }}>
                        <NotificationsNoneIcon sx={{ color: "white" }} />
                    </Badge>
                </Tooltip>
                <Tooltip title='Help'>
                    <HelpOutlineIcon sx={{ cursor: "pointer", color: "white" }} />
                </Tooltip>

                <Profiles />
            </Box>
        </Box>
    );
}

export default AppBar;
