import { Router } from "express";
import SeedController from "./seed.controller";

const seedRouter = Router();

/**
 * @openapi
 * '/api/seed':
 *   post:
 *     tags:
 *       - Seeding
 *     description: Run this to seed the database with sample data for testing purposes, Running this will delete all data before seeding.
 *                  I have a sample data in my database, so you don't need to run this if you don't want to. Keep in mind that this will delete all data in the database, and create new entries so you have to change the ids in other routes documentation to match the ids in the database.
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: true
 *                 message:
 *                   type: string
 *                   default: Data Seeded successfully
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   default: false
 *                 message:
 *                   type: string
 *                   default: Error message from the server
 */
seedRouter.post("/", SeedController.seedData);

export default seedRouter;
