import { Container } from "@mui/material";
import "./App.css";
import type { User } from "./CardUser";
import CardUser from "./CardUser";
import { Avatar } from "./assets/images";
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
function App() {
  return (
    <Container sx={{ mt: 5 }}>
      <CardUser user={demoUser} />
    </Container>
  );
}

export default App;
