import Fastify from "fastify";
import cors from "@fastify/cors";
import cookie from "@fastify/cookie";
import cron from "node-cron";
import registerRoutes from "./api/register";
import loginRoutes from "./api/login";
import meRoutes from "./api/me";
import fs from "fs";

const fastify = Fastify({
    // https: {
    //     key: fs.readFileSync("./ssl/key.pem"),
    //     cert: fs.readFileSync("./ssl/cert.pem"),
    // },
});
    
fastify.register(cors, {
    origin: "https://localhost:3000",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
});

fastify.register(cookie);
fastify.register(registerRoutes);
fastify.register(loginRoutes);
fastify.register(meRoutes);

cron.schedule("*/30 * * * * *", async () => {
    console.log("🔄 Checking something...");
});

const startServer = async () => {
    try {
        await fastify.listen({ port: 8080, host: "0.0.0.0" });
        console.log("Fastify server is running on https://localhost:8080");
    } catch (err) {
        fastify.log.error(err);
        console.log(err);
        process.exit(1);
    }
};

startServer();