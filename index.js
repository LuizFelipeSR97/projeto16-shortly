import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

const server = express();
dotenv.config();

server.use(express.json());
server.use(cors());

server.listen(process.env.PORT, ()=> console.log(`Server running on port ${process.env.PORT}`));