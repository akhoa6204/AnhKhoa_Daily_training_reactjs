import { Button, Stack, TableBody, TableCell, TableRow } from "@mui/material";
import type { Todo } from ".";
interface ITableBody extends Todo {
  handleEditItem: (itemId: string) => void;
  handleRemoveItem: (itemId: string) => void;
}
const TableItems = ({
  id,
  description,
  completed,
  priority,
  dueDate,
  handleEditItem,
  handleRemoveItem,
}: ITableBody) => {
  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{description}</TableCell>
      <TableCell>{completed ? "Active" : "UnActive"}</TableCell>
      <TableCell>{priority}</TableCell>
      <TableCell>{dueDate}</TableCell>
      <TableCell>
        <Stack direction="row" spacing={1} justifyContent="center">
          <Button variant="contained" onClick={() => handleEditItem(id)}>
            Edit
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleRemoveItem(id)}
          >
            Remove
          </Button>
        </Stack>
      </TableCell>
    </TableRow>
  );
};
export default TableItems;
