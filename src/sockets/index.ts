import { Server } from 'socket.io';
import { AppDataSource } from '../db/data-source';
import { ServerLog } from '../db/entities/Logs';

export const socketHandler = (io: Server) => {
  io.on('connection', (socket) => {
    console.log(`Client connected: ${socket.id}`);

    socket.on('log', async (data: { serverId: string; message: string }) => {
      console.log(`[Log] Server: ${data.serverId}, Message: ${data.message}`);
      const logRepository = AppDataSource.getRepository(ServerLog);
      await logRepository.save({ serverId: data.serverId, message: data.message });
    });

    socket.on('disconnect', () => {
      console.log(`Client disconnected: ${socket.id}`);
    });
  });
};
