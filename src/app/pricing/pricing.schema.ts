import z from "zod";

/**
 * @openapi
 * components:
 *   schemas:
 *     pricing_request_schema:
 *       type: object
 *       required:
 *         - zone
 *         - organization_id
 *         - total_distance
 *         - item_type
 *       properties:
 *         zone:
 *           type: string
 *           default: central
 *           description: Zone of the delivery location (east, west, north, south, central)
 *
 *         organization_id:
 *           type: number
 *           default: 1
 *
 *         total_distance:
 *           type: number
 *           default: 12
 *
 *         item_type:
 *           type: string
 *           default: perishable
 *           description: Type of the item (perishable, non_perishable)
 *
 *     pricing_response_schema:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           default: true
 *         message:
 *           type: string
 *           default: Prices fetched successfully
 *         data:
 *           type: object
 *           properties:
 *             total_price_in_cents:
 *               type: number
 *               default: 2050
 *             total_price_in_euros:
 *               type: number
 *               default: 20.5
 *
 *     pricing_error_response_schema:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           default: false
 *         message:
 *           type: string
 *           default: Error message from the server
 *
 */

export const pricing_request_schema = z.object({
  zone: z.string().min(1).max(30).trim(),
  organization_id: z.number().min(1).nonnegative(),
  total_distance: z.number().min(1).nonnegative(),
  item_type: z.enum(["perishable", "non_perishable"]),
});
