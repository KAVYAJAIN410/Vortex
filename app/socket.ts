import { io, Socket } from "socket.io-client";

// Define the type for our socket instance
type ClientToServerEvents = {
  authenticate: (data: { token: string }) => void;
  allocate: (data: { choice: string }) => void;
};

type ServerToClientEvents = {
  connect: () => void;
  disconnect: () => void;
  authenticated: () => void;
  userDetails: (data: { team: { teamName: string } }) => void;
  vertical: (data: { VerticalTeams: string[] }) => void;
  horizontal: (data: { HorizontalTeams: string[] }) => void;
  auth_error: (error: string) => void;
  allocate_error: (data: { message: string }) => void;
};

// Create a typed socket instance
const socket: Socket<ServerToClientEvents, ClientToServerEvents> = io(
  "http://localhost:3000",
  {
    transports: ["websocket", "polling"], // Ensure both transports are allowed
    autoConnect: false, // Don't connect automatically
    withCredentials: true, // Enable credentials for cross-origin
  }
);

// Export the socket instance
export { socket };
