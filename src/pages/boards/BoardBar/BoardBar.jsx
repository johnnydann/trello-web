import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PublicIcon from "@mui/icons-material/Public";
import AddToDriveIcon from "@mui/icons-material/AddToDrive";
import BoltIcon from "@mui/icons-material/Bolt";
import FilterListIcon from "@mui/icons-material/FilterList";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import Tooltip from "@mui/material/Tooltip";
import Button from "@mui/material/Button";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const MenuStyle = {
    color: "white",
    bgcolor: "transparent",
    border: "none",
    px: "5px",
    borderRadius: "4px",
    ".MuiSvgIcon-root": {
        color: "white",
    },
    "&:hover": {
        bgcolor: "primary.50",
    },
};

function BoardBar() {
    return (
        <Box
            sx={{
                width: "100%",
                height: (theme) => theme.trello.boardBarHeight,
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 2,
                paddingX: 2,
                overflowX: "auto",
                bgcolor: (theme) =>
                    theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Chip
                    sx={MenuStyle}
                    icon={<DashboardIcon />}
                    label='Dash board Icon'
                    clickable
                />

                <Chip
                    sx={MenuStyle}
                    icon={<PublicIcon />}
                    label='Public/Private Workspace'
                    clickable
                />

                <Chip
                    sx={MenuStyle}
                    icon={<AddToDriveIcon />}
                    label='Add To Google Drive'
                    clickable
                />

                <Chip
                    sx={MenuStyle}
                    icon={<BoltIcon />}
                    label='Automation'
                    clickable
                />

                <Chip
                    sx={MenuStyle}
                    icon={<FilterListIcon />}
                    label='Filters'
                    clickable
                />
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                <Button
                    variant='outlined'
                    sx={{
                        color: "white",
                        borderColor: "white",
                        "&:hover": { borderColor: "white" },
                    }}
                    startIcon={<PersonAddIcon />}
                >
                    Invite
                </Button>
                <AvatarGroup
                    max={4}
                    sx={{
                        gap: "10px",
                        "& .MuiAvatar-root": {
                            width: 34,
                            height: 34,
                            fontSize: 16,
                            border: "none",
                            color: "white",
                            cursor: "pointer",
                            "&:first-of-type": {
                                bgcolor: "#a4b0be",
                            },
                        },
                    }}
                >
                    <Tooltip>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/28/1172827/Messi-World-Cup.jpg'
                        />
                    </Tooltip>
                    <Tooltip>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/28/1172827/Messi-World-Cup.jpg'
                        />
                    </Tooltip>
                    <Tooltip>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/28/1172827/Messi-World-Cup.jpg'
                        />
                    </Tooltip>
                    <Tooltip>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/28/1172827/Messi-World-Cup.jpg'
                        />
                    </Tooltip>
                    <Tooltip>
                        <Avatar
                            alt='Remy Sharp'
                            src='https://media-cdn-v2.laodong.vn/Storage/NewsPortal/2023/3/28/1172827/Messi-World-Cup.jpg'
                        />
                    </Tooltip>
                </AvatarGroup>
            </Box>
        </Box>
    );
}

export default BoardBar;
