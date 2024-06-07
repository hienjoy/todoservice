//완료 & 미완료 수 표시
import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

function TodoStats({ todos }) {
  const completedCount = todos.filter((todo) => todo.done).length;
  const incompleteCount = todos.length - completedCount;

  return (
    <Box sx={{ my: 2 }}>
      <Typography variant="h6">Completed: {completedCount}</Typography>
      <Typography variant="h6">Incomplete: {incompleteCount}</Typography>
    </Box>
  );
}

export default TodoStats;
