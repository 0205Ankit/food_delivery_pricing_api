import { Router } from "express";
import PricingController from "./pricing.controller";

const pricingRouter = Router();

/**
 * @openapi
 * '/api/pricing':
 *   post:
 *     tags:
 *       - Pricing
 *     description: Get prices of delivery based on zone and item
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/pricing_request_schema'
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/pricing_response_schema'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/pricing_error_response_schema'
 */
pricingRouter.post("/", PricingController.getPricesOfDelivery);

export default pricingRouter;
