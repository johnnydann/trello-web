import Box from "@mui/material/Box";
import ListColumns from "./ListColumns/ListColumns";
import { mapOrder } from "~/utils/sorts";
import {
    DndContext,
    // PointerSensor,
    useSensor,
    useSensors,
    MouseSensor,
    TouchSensor,
} from "@dnd-kit/core";
import { useEffect, useState } from "react";
import { arrayMove } from "@dnd-kit/sortable";

function BoardContent({ board }) {
    const [orderedColsState, setOrderedColsState] = useState([]);

    // const pointerSensor = useSensor(PointerSensor, {
    //     activationConstraint: { distance: 10 },
    // });

    //di chuyển chuột 10px thì mới kích hoạt event
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: { distance: 10 },
    });

    //nhấn giữ 250ms và dung sai của ứng dụng (di chuyển 500px) thì mới kích hoạt event
    const touchSensor = useSensor(TouchSensor, {
        activationConstraint: { delay: 250, tolerance: 500 },
    });

    // const mySensors = useSensors(pointerSensor);
    const mySensors = useSensors(mouseSensor, touchSensor);

    const handleDragEnd = (event) => {
        console.log("handleDragEnd:", event);
        const { active, over } = event;

        //kiểm tra lỗi nếu ko tồn tại
        if (!over) return;

        if (active.id !== over.id) {
            //lấy vị trí cũ từ thằng active
            const oldIndex = orderedColsState.findIndex((c) => c._id === active.id);
            //lấy vị trí mới từ thằng over
            const newIndex = orderedColsState.findIndex((c) => c._id === over.id);

            //packages/sortable/src/utilities/arrayMove.ts src code cảu arrayMove
            const dndOrderedColsState = arrayMove(
                orderedColsState,
                oldIndex,
                newIndex
            );
            // const dndOrderedColsIds = dndOrderedColsState.map((c) => c._id);
            // // 2 cái clg này sau dùng để xử lý api
            // console.log(dndOrderedColsState);
            // console.log(dndOrderedColsIds);

            //cập nhật lại sau khi kéo thả
            setOrderedColsState(dndOrderedColsState);
        }
    };

    useEffect(() => {
        setOrderedColsState(mapOrder(board?.columns, board?.columnOrderIds, "_id"));
    }, [board]);

    return (
        <DndContext onDragEnd={handleDragEnd} sensors={mySensors}>
            <Box
                sx={{
                    bgcolor: (theme) =>
                        theme.palette.mode === "dark" ? "#34495e" : "#1976d2",
                    width: "100%",
                    height: (theme) => theme.trello.boardContenHeight,
                    p: "10px 0",
                }}
            >
                <ListColumns columns={orderedColsState} />
            </Box>
        </DndContext>
    );
}

export default BoardContent;
