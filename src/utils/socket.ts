import app from "../app";
import { createServer } from "http";
import { Server } from "socket.io";

const server = createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
        credentials: true,
    },
});

io.on("connection", (socket) => {
    console.log(`🟢 New connection: ${socket.id}`);

    socket.on("driver-join", (routeId) => {
        socket.join(routeId);
        console.log(`🚍 Driver joined Bus-${routeId}`);
    });

    socket.on("student-join", (routeId) => {
        socket.join(routeId);
        console.log(`🎓 Student joined Bus-${routeId}`);
    });

    socket.on("driver-location", ({ routeId, location }) => {
        console.log(`📍 Location update for Bus-${routeId}:`, location);
        io.to(routeId).emit("location-update", location);
    });

    socket.on("disconnect", () => {
        console.log(`🔴 Disconnected: ${socket.id}`);
    });
});
;

export { server, io };