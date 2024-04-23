import { Router } from "express";
import SeedController from "./seed.controller";

const seedRouter = Router();

/**
 * @openapi
 * '/api/seed':
 *   post:
 *     tags:
 *       - Seeding
 *     description: Run this to seed the database with sample data for testing purposes, Running this will delete all data before seeding
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
