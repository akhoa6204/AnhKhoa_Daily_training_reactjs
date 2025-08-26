import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useState } from "react";
import TableItems from "./TableBody";

const tableHeads = ["ID", "Description", "Status", "Priority", "Due Date"];

interface FormData {
  description: string;
  completed: boolean;
  priority: "High" | "Low" | "Medium";
  dueDate?: string;
}
export interface Todo extends FormData {
  id: string;
}
const mockTodos: Todo[] = [
  {
    id: "1",
    description: "Learn React basics",
    completed: true,
    priority: "High",
    dueDate: "2024-05-01",
  },
  {
    id: "2",
    description: "Practice rendering lists with map()",
    completed: false,
    priority: "Medium",
    dueDate: "2024-05-10",
  },
  {
    id: "3",
    description: "Understand keys in React",
    completed: false,
    priority: "Low",
    dueDate: "2024-05-15",
  },
];

const Day5 = () => {
  const [todos, setTodos] = useState<Todo[]>(mockTodos);
  const [formData, setFormData] = useState<FormData>({
    description: "",
    completed: false,
    priority: "Low",
    dueDate: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);
  const [keyword, setKeyword] = useState<string>("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setFormData((pre) => ({ ...pre, [e.target.name]: e.target.value }));

  const handleSubmitAdd = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (editingId) {
      setTodos((prev) =>
        prev.map((todo) =>
          todo.id === editingId ? { ...todo, ...formData } : todo
        )
      );
      setEditingId(null);
    } else {
      const newTodo = {
        id: uuidv4(),
        ...formData,
      };
      setTodos((prev) => [...prev, newTodo]);
    }

    setFormData({
      description: "",
      completed: false,
      priority: "Low",
      dueDate: "",
    });
  };

  const handleRemoveItem = (id: string | number) => {
    if (id === editingId) {
      setEditingId(null);
      setFormData({
        description: "",
        completed: false,
        priority: "Low",
        dueDate: "",
      });
    }
    setTodos((prev) => prev.filter((item) => item.id !== id));
  };

  const handleEditItem = (itemId: string) => {
    const todo = todos.find((item) => item.id === itemId);
    setFormData({
      description: todo?.description || "",
      completed: todo?.completed || false,
      priority: todo?.priority || "Low",
      dueDate: todo?.dueDate || "",
    });
    setEditingId(todo?.id || null);
  };

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleChangeKeyword = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(e.target.value);
  };

  const filteredTodos = todos.filter((todo) =>
    todo.description.toLowerCase().includes(keyword.toLowerCase())
  );

  return (
    <Container sx={{ p: 2 }}>
      <Box component={"form"} sx={{ mb: 2 }} onSubmit={handleSubmitSearch}>
        <Stack direction={"row"} spacing={1}>
          <TextField
            label="Search todo"
            type="text"
            fullWidth
            value={keyword}
            onChange={handleChangeKeyword}
          />
          <Button type="submit" variant="contained">
            Find
          </Button>
          {keyword && (
            <Button
              variant="outlined"
              color="secondary"
              onClick={() => setKeyword("")}
            >
              Clear
            </Button>
          )}
        </Stack>
      </Box>

      <Grid container columnSpacing={1}>
        <Grid size={8}>
          <Table>
            <TableHead sx={{ backgroundColor: "#ddd" }}>
              <TableRow>
                {tableHeads.map((item) => (
                  <TableCell key={item}>{item}</TableCell>
                ))}
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTodos.length > 0 ? (
                filteredTodos.map((item) => (
                  <TableItems
                    key={item.id}
                    handleEditItem={handleEditItem}
                    handleRemoveItem={handleRemoveItem}
                    {...item}
                  />
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6}>
                    <Typography textAlign="center" fontWeight={600}>
                      Không tìm thấy việc nào
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Grid>

        <Grid size={4}>
          <Paper sx={{ p: 2 }}>
            <Box component="form" onSubmit={handleSubmitAdd}>
              <Typography
                variant="h5"
                sx={{ textAlign: "center", fontWeight: 600, mb: 2 }}
              >
                {editingId ? "EDIT TODO" : "ADD TODO"}
              </Typography>
              <TextField
                type="text"
                name="description"
                value={formData.description}
                onChange={handleChange}
                fullWidth
                label="Description"
                sx={{ mb: 2 }}
                required
              />

              <TextField
                select
                name="priority"
                value={formData.priority}
                onChange={handleChange}
                fullWidth
                label="Priority"
                slotProps={{ select: { native: true } }}
                sx={{ mb: 2 }}
                required
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </TextField>

              <TextField
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                fullWidth
                label="Due Date"
                slotProps={{
                  inputLabel: { shrink: true },
                }}
                required
              />

              <Button
                variant="contained"
                sx={{ mt: 2 }}
                fullWidth
                type="submit"
              >
                {editingId ? "Update" : "Add"}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};
export default Day5;
