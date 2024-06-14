//완료 & 미완료 수 표시
import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Finish from "../Icons/finish.png";
import Incomplete from "../Icons/incomplete.png";

function TodoStats({ todos }) {
  const completedCount = todos.filter((todo) => todo.done).length;
  const incompleteCount = todos.length - completedCount;

  return (
    <Box sx={{ my: 2, display: "flex", alignItems: "center" }}>
      <Box sx={{ display: "flex", alignItems: "center", mr: 4 }}>
        <img src={Finish} alt="완료 아이콘" style={{ marginRight: "8px" }} />
        <Typography variant="h6">Completed: {completedCount}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <img
          src={Incomplete}
          alt="미완료 아이콘"
          style={{ marginRight: "8px" }}
        />
        <Typography variant="h6">Incomplete: {incompleteCount}</Typography>
      </Box>
    </Box>
  );
}

export default TodoStats;
