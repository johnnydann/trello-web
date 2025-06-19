import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import ContentCut from "@mui/icons-material/ContentCut";
import ContentCopy from "@mui/icons-material/ContentCopy";
import ContentPaste from "@mui/icons-material/ContentPaste";
import Cloud from "@mui/icons-material/Cloud";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Tooltip from "@mui/material/Tooltip";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddCardIcon from "@mui/icons-material/AddCard";
import Button from "@mui/material/Button";
import DragHandleIcon from "@mui/icons-material/DragHandle";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const Column_Header_Height = "50px";
const Column_Footer_Height = "56px";

function BoardContent() {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };
    return (
        <Box
            sx={{
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
                width: "100%",
                height: (theme) => theme.trello.boardContenHeight,
                p: "10px 0",
            }}
        >
            <Box
                sx={{
                    bgcolor: "inherit",
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    overflowX: "auto",
                    overflowY: "hidden",
                    "&::-webkit-scrollbar-track": { m: 2 },
                }}
            >
                {/* box 1 */}
                <Box
                    sx={{
                        minWidth: "300px",
                        maxWidth: "300px",
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#333643"
                                : "#ebecf0",
                        ml: 2,
                        borderRadius: "6px",
                        height: "fit-content",
                        maxHeight: (theme) =>
                            `calc(${
                                theme.trello.boardContenHeight
                            } - ${theme.spacing(5)})`,
                    }}
                >
                    {/* header */}
                    <Box
                        sx={{
                            height: Column_Header_Height,
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            variant='h6'
                            sx={{ fontSize: "1rem", cursor: "pointer" }}
                        >
                            Column name
                        </Typography>
                        <Box>
                            <Tooltip title='More options'>
                                <ExpandMoreIcon
                                    sx={{
                                        color: "text.primary",
                                        cursor: "pointer",
                                    }}
                                    id='basic-column-dropdown'
                                    aria-controls={
                                        open
                                            ? "basic-menu-column-dropdown"
                                            : undefined
                                    }
                                    aria-haspopup='true'
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                />
                            </Tooltip>
                            <Menu
                                id='basic-menu-workspaces'
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby":
                                        "basic-button-workspaces",
                                }}
                            >
                                <MenuItem>
                                    <ListItemIcon>
                                        <AddCardIcon fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>Add new card</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <ContentCut fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>Cut</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <ContentCopy fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>Copy</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <ContentPaste fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>Paste</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <ListItemIcon>
                                        <DeleteForeverIcon fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Remove this column
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Cloud fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Archive this column
                                    </ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {/* list card */}
                    <Box
                        sx={{
                            flexDirection: "column",
                            gap: 1,
                            p: "0 5px ",
                            display: "flex",
                            overflowX: "hidden",
                            overflowY: "auto",
                            maxHeight: (theme) =>
                                `calc(${
                                    theme.trello.boardContenHeight
                                } - ${theme.spacing(5)} - 
                            ${Column_Header_Height} - 
                            ${Column_Footer_Height}
                        )`,
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#ced0da",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "#bfc2cf",
                            },
                        }}
                    >
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/28/1172827/Messi-World-Cup.jpg'
                                title='green iguana'
                            />
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Goat Messi</Typography>
                            </CardContent>
                            <CardActions sx={{ p: "0  4px 8px 4px" }}>
                                <Button size='small' startIcon={<GroupIcon />}>
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<ModeCommentIcon />}
                                >
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<AttachFileIcon />}
                                >
                                    20
                                </Button>
                            </CardActions>
                        </Card>
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/28/1172827/Messi-World-Cup.jpg'
                                title='green iguana'
                            />
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Goat Messi</Typography>
                            </CardContent>
                            <CardActions sx={{ p: "0  4px 8px 4px" }}>
                                <Button size='small' startIcon={<GroupIcon />}>
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<ModeCommentIcon />}
                                >
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<AttachFileIcon />}
                                >
                                    20
                                </Button>
                            </CardActions>
                        </Card>
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/28/1172827/Messi-World-Cup.jpg'
                                title='green iguana'
                            />
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Goat Messi</Typography>
                            </CardContent>
                            <CardActions sx={{ p: "0  4px 8px 4px" }}>
                                <Button size='small' startIcon={<GroupIcon />}>
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<ModeCommentIcon />}
                                >
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<AttachFileIcon />}
                                >
                                    20
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                    {/* footer */}
                    <Box
                        sx={{
                            height: Column_Footer_Height,
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button startIcon={<AddCardIcon />}>
                            Add new card
                        </Button>
                        <Tooltip title=' Drag to move'>
                            <DragHandleIcon sx={{ cursor: "pointer" }} />
                        </Tooltip>
                    </Box>
                </Box>
                {/* box 2 */}
                <Box
                    sx={{
                        minWidth: "300px",
                        maxWidth: "300px",
                        bgcolor: (theme) =>
                            theme.palette.mode === "dark"
                                ? "#333643"
                                : "#ebecf0",
                        ml: 2,
                        borderRadius: "6px",
                        height: "fit-content",
                        maxHeight: (theme) =>
                            `calc(${
                                theme.trello.boardContenHeight
                            } - ${theme.spacing(5)})`,
                    }}
                >
                    {/* header */}
                    <Box
                        sx={{
                            height: Column_Header_Height,
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Typography
                            variant='h6'
                            sx={{ fontSize: "1rem", cursor: "pointer" }}
                        >
                            Column name
                        </Typography>
                        <Box>
                            <Tooltip title='More options'>
                                <ExpandMoreIcon
                                    sx={{
                                        color: "text.primary",
                                        cursor: "pointer",
                                    }}
                                    id='basic-column-dropdown'
                                    aria-controls={
                                        open
                                            ? "basic-menu-column-dropdown"
                                            : undefined
                                    }
                                    aria-haspopup='true'
                                    aria-expanded={open ? "true" : undefined}
                                    onClick={handleClick}
                                />
                            </Tooltip>
                            <Menu
                                id='basic-menu-workspaces'
                                anchorEl={anchorEl}
                                open={open}
                                onClose={handleClose}
                                MenuListProps={{
                                    "aria-labelledby":
                                        "basic-button-workspaces",
                                }}
                            >
                                <MenuItem>
                                    <ListItemIcon>
                                        <AddCardIcon fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>Add new card</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <ContentCut fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>Cut</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <ContentCopy fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>Copy</ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <ContentPaste fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>Paste</ListItemText>
                                </MenuItem>
                                <Divider />
                                <MenuItem>
                                    <ListItemIcon>
                                        <DeleteForeverIcon fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Remove this column
                                    </ListItemText>
                                </MenuItem>
                                <MenuItem>
                                    <ListItemIcon>
                                        <Cloud fontSize='small' />
                                    </ListItemIcon>
                                    <ListItemText>
                                        Archive this column
                                    </ListItemText>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </Box>

                    {/* list card */}
                    <Box
                        sx={{
                            flexDirection: "column",
                            gap: 1,
                            p: "0 5px ",
                            display: "flex",
                            overflowX: "hidden",
                            overflowY: "auto",
                            maxHeight: (theme) =>
                                `calc(${
                                    theme.trello.boardContenHeight
                                } - ${theme.spacing(5)} - 
                            ${Column_Header_Height} - 
                            ${Column_Footer_Height}
                        )`,
                            "&::-webkit-scrollbar-thumb": {
                                backgroundColor: "#ced0da",
                            },
                            "&::-webkit-scrollbar-thumb:hover": {
                                backgroundColor: "#bfc2cf",
                            },
                        }}
                    >
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/28/1172827/Messi-World-Cup.jpg'
                                title='green iguana'
                            />
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Goat Messi</Typography>
                            </CardContent>
                            <CardActions sx={{ p: "0  4px 8px 4px" }}>
                                <Button size='small' startIcon={<GroupIcon />}>
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<ModeCommentIcon />}
                                >
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<AttachFileIcon />}
                                >
                                    20
                                </Button>
                            </CardActions>
                        </Card>
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/28/1172827/Messi-World-Cup.jpg'
                                title='green iguana'
                            />
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Goat Messi</Typography>
                            </CardContent>
                            <CardActions sx={{ p: "0  4px 8px 4px" }}>
                                <Button size='small' startIcon={<GroupIcon />}>
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<ModeCommentIcon />}
                                >
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<AttachFileIcon />}
                                >
                                    20
                                </Button>
                            </CardActions>
                        </Card>
                        <Card
                            sx={{
                                cursor: "pointer",
                                boxShadow: "0 1px 1px rgba(0,0,0,0.2)",
                                overflow: "unset",
                            }}
                        >
                            <CardMedia
                                sx={{ height: 140 }}
                                image='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/28/1172827/Messi-World-Cup.jpg'
                                title='green iguana'
                            />
                            <CardContent
                                sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}
                            >
                                <Typography>Goat Messi</Typography>
                            </CardContent>
                            <CardActions sx={{ p: "0  4px 8px 4px" }}>
                                <Button size='small' startIcon={<GroupIcon />}>
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<ModeCommentIcon />}
                                >
                                    20
                                </Button>
                                <Button
                                    size='small'
                                    startIcon={<AttachFileIcon />}
                                >
                                    20
                                </Button>
                            </CardActions>
                        </Card>
                    </Box>
                    {/* footer */}
                    <Box
                        sx={{
                            height: Column_Footer_Height,
                            p: 2,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                        }}
                    >
                        <Button startIcon={<AddCardIcon />}>
                            Add new card
                        </Button>
                        <Tooltip title=' Drag to move'>
                            <DragHandleIcon sx={{ cursor: "pointer" }} />
                        </Tooltip>
                    </Box>
                </Box>
            </Box>
            {/* board content */}
        </Box>
    );
}

export default BoardContent;
