import React from "react";
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
import Typography from "@mui/material/Typography";
import { useState } from "react";
import Box from "@mui/material/Box";
import ListCards from "./ListCards/ListCards";
import { mapOrder } from "~/utils/sorts";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function Column({ column }) {
    const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
        useSortable({
            id: column._id,
            data: { ...column },
        });

    const dndKitColumnStyle = {
        // touchAction: "none",
        //sử dụng css.transform như docs sẽ bị lỗi stretch
        transform: CSS.Translate.toString(transform),
        transition,
        //chiều cao phải max 100% vì nếu ko sẽ lỗi kéo columns bị giựt
        //
        height: "100%",
        opacity: isDragging ? 0.5 : undefined,
    };

    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const orderdCards = mapOrder(column?.cards, column?.cardOrderIds, "_id");

    //phải bọc div ở đây vì vấn đề bị giựt khi kéo thả columns
    return (
        <div ref={setNodeRef} style={dndKitColumnStyle} {...attributes}>
            <Box
                // {...listeners} để ở trong box này để tránh trường hợp kéo vào vùng xanh mà vẫn kéo đc
                {...listeners}
                sx={{
                    minWidth: "300px",
                    maxWidth: "300px",
                    bgcolor: (theme) =>
                        theme.palette.mode === "dark" ? "#333643" : "#ebecf0",
                    ml: 2,
                    borderRadius: "6px",
                    height: "fit-content",
                    maxHeight: (theme) =>
                        `calc(${theme.trello.boardContenHeight} - ${theme.spacing(
                            5
                        )})`,
                }}
            >
                {/* header */}
                <Box
                    sx={{
                        height: (theme) => theme.trello.columnHeaderHeight,
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
                        {column?.title}
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
                                    open ? "basic-menu-column-dropdown" : undefined
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
                                "aria-labelledby": "basic-button-workspaces",
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
                                <ListItemText>Remove this column</ListItemText>
                            </MenuItem>
                            <MenuItem>
                                <ListItemIcon>
                                    <Cloud fontSize='small' />
                                </ListItemIcon>
                                <ListItemText>Archive this column</ListItemText>
                            </MenuItem>
                        </Menu>
                    </Box>
                </Box>

                {/* list card */}
                <ListCards cards={orderdCards} />
                {/* footer */}
                <Box
                    sx={{
                        height: (theme) => theme.trello.columnFooterHeight,
                        p: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                    }}
                >
                    <Button startIcon={<AddCardIcon />}>Add new card</Button>
                    <Tooltip title=' Drag to move'>
                        <DragHandleIcon sx={{ cursor: "pointer" }} />
                    </Tooltip>
                </Box>
            </Box>
        </div>
    );
}

export default Column;
