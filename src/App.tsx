import type { User } from "./components/CardUser";
import { Avatar } from "./assets/images";
import { RouterProvider } from "react-router-dom";
import { router } from "./routers/router";
import { createTheme, ThemeProvider } from "@mui/material";
const demoUser: User = {
  id: 1,
  name: "Phan Nguyễn Anh Khoa",
  age: 22,
  email: "khoaanh662004@gmail.com",
  school: "DUE",
  hobbies: ["Coding", "Football", "Music", "Game"],
  address: "Đà Nẵng, Việt Nam",
  job: "Front-end Developer Intern",
  company: "XinkGroup",
  introduce: function () {
    return `Hi, I'm ${this.name}, nice to meet you!`;
  },
  avatar: Avatar,
};
const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />;
    </ThemeProvider>
  );
}

export default App;
