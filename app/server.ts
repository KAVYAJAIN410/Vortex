import { createServer } from "http";
import next from "next";
import { Server, Socket } from "socket.io";
import jwt from "jsonwebtoken";
import { dbConnect } from "../lib/dbConnect";

// MongoDB Schema
import { Users } from "../models/user.model";
import  TeamsEvent1  from "../models/event1/Team.model";

const dev = process.env.NODE_ENV !== "production";
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

const app = next({ dev });
const handler = app.getRequestHandler();


app.prepare().then(async () => {
  const httpServer = createServer(handler);
  const io = new Server(httpServer);

  await dbConnect(); // Connect to MongoDB once for the server

  io.on("connection", (socket: Socket) => {
    socket.on("authenticate", async ({ token }: { token: string }) => {
      if (!token) {
        console.log("No token provided");
        socket.emit("auth_error", "No token provided");
        socket.disconnect();
        return;
      }

      try {
        const decoded = jwt.verify(
          token,
          process.env.ACCESS_TOKEN_SECRET!
        ) as { _id: string };

        const userId = decoded._id;

        // Fetch user details from MongoDB
        const user = await Users.findById(userId);
        if (!user) {
          console.log("User not found");
          socket.emit("auth_error", "User not found");
          socket.disconnect();
          return;
        }

        const team = await TeamsEvent1.findOne({ teamLeaderId: userId });
        if (!team) {
          console.log("User is not a team leader");
          socket.emit("auth_error", "User is not a team leader");
          socket.disconnect();
          return;
        }
        const VerticalTeams=await TeamsEvent1.find({choice:"vertical"})
        const HorizontalTeams=await TeamsEvent1.find({choice:"horizontal"})
        socket.emit("userDetails", { team });

        // Fetch bond bidding data

        io.emit("vertical", {VerticalTeams});
        io.emit("horizontal",{HorizontalTeams});

 

        socket.on("allocate", async ({ choice }: { choice: string }) => {
            try {
              if (!["vertical", "horizontal"].includes(choice)) {
                return socket.emit("allocate_error", { message: "Invalid choice" });
              }
      
              team.choice = choice;
              await team.save();
      
              if (choice === "vertical") {
                const VerticalTeams = await TeamsEvent1.find({ choice: "vertical" });
                io.emit("vertical", { VerticalTeams });
              } else if (choice === "horizontal") {
                const HorizontalTeams = await TeamsEvent1.find({ choice: "horizontal" });
                io.emit("horizontal", { HorizontalTeams });
              }
            } catch (error) {
              console.error("Error during bond allocation:", error);
              socket.emit("allocate_error", { message: "Error during allocation" });
            }
          });

      } catch (error) {
        console.error("Token verification failed:", error);
        socket.emit("auth_error", "Token verification failed");
        socket.disconnect();
      }
    });
  });

  io.on("disconnect", () => {
    console.log("A client disconnected");
  });

  httpServer
  .once("error", (err) => {
    console.error(err);
    process.exit(1);
  })
  .listen(port, () => {
    console.log(`> Ready on http://localhost:3000`);
  });
});
