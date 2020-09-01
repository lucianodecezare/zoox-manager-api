import { server } from './app';

const PORT = process.env.APP_PORT;

server.listen(PORT, () => {
  console.log(`Server is ready!\nhttp://localhost:${PORT}`);
});
