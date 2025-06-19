import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import MuiCard from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import GroupIcon from "@mui/icons-material/Group";
import ModeCommentIcon from "@mui/icons-material/ModeComment";
import AttachFileIcon from "@mui/icons-material/AttachFile";

function Card() {
    return (
        <MuiCard
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
            <CardContent sx={{ p: 1.5, "&:last-child": { p: 1.5 } }}>
                <Typography>Goat Messi</Typography>
            </CardContent>
            <CardActions sx={{ p: "0  4px 8px 4px" }}>
                <Button size='small' startIcon={<GroupIcon />}>
                    20
                </Button>
                <Button size='small' startIcon={<ModeCommentIcon />}>
                    20
                </Button>
                <Button size='small' startIcon={<AttachFileIcon />}>
                    20
                </Button>
            </CardActions>
        </MuiCard>
    );
}

export default Card;
