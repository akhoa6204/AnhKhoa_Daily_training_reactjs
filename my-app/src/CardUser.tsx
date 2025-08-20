import {
  Avatar,
  Box,
  Card,
  CardContent,
  CardHeader,
  Chip,
  Stack,
  Typography,
} from "@mui/material";
export interface User {
  readonly id: number;
  avatar?: string;
  name: string;
  age?: number;
  email?: string;
  school?: string;
  hobbies?: string[];
  address?: string;
  job?: string;
  company?: string;
  introduce: () => string;
}
const CardUser: React.FC<{ user: User }> = ({ user }) => {
  return (
    <Card
      sx={{
        maxWidth: 400,
        borderRadius: 3,
        boxShadow: 3,
        p: 2,
        bgcolor: "background.paper",
      }}
    >
      <CardHeader
        avatar={
          <Avatar
            src={user.avatar}
            alt={user.name}
            sx={{ width: 56, height: 56 }}
          >
            {user.name.charAt(0)}
          </Avatar>
        }
        title={
          <Typography variant="h6" fontWeight="bold">
            {user.name}
          </Typography>
        }
        subheader={user.email || "No email provided"}
      />

      <CardContent>
        {user.age ? (
          <Typography variant="body2" color="text.secondary">
            🎂 Age: {user.age}
          </Typography>
        ) : (
          ""
        )}
        {user.school ? (
          <Typography variant="body2" color="text.secondary">
            🏫 School: {user.school}
          </Typography>
        ) : (
          ""
        )}
        {user.job ? (
          <Typography variant="body2" color="text.secondary">
            💼 Job: {user.job}
          </Typography>
        ) : (
          ""
        )}

        {user.company ? (
          <Typography variant="body2" color="text.secondary">
            🏢 Company: {user.company}
          </Typography>
        ) : (
          ""
        )}
        {user.address ? (
          <Typography variant="body2" color="text.secondary">
            📍 Address: {user.address}
          </Typography>
        ) : (
          ""
        )}

        {user.hobbies && user.hobbies.length > 0 ? (
          <Box mt={1}>
            <Typography variant="subtitle2" fontWeight="bold">
              Hobbies:
            </Typography>
            <Stack
              direction="row"
              spacing={1}
              flexWrap="wrap"
              mt={0.5}
              justifyContent={"center"}
            >
              {user.hobbies.map((hobby, idx) => (
                <Chip key={idx} label={hobby} size="small" />
              ))}
            </Stack>
          </Box>
        ) : (
          ""
        )}

        <Box mt={2}>
          <Typography variant="body1" fontStyle="italic">
            {user.introduce()}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
export default CardUser;
