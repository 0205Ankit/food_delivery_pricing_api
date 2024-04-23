import { Request, Response } from "express";
import { pricing_request_schema } from "./pricing.schema";
import { StatusCodes } from "http-status-codes";
import prisma from "../../prisma";

export default class PricingController {
  static async getPricesOfDelivery(req: Request, res: Response) {
    //// validating the input request using zod
    const validRequest = pricing_request_schema.safeParse(req.body);

    if (!validRequest.success) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: validRequest.error.issues,
      });
    }

    // destructuring input request
    const { zone, organization_id, total_distance, item_type } =
      validRequest.data;

    // fetching organization and its pricing
    const organization = await prisma.organization.findUnique({
      where: {
        id: organization_id,
      },
      include: {
        pricing: true,
      },
    });

    // if organization not found
    if (!organization) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Organization not found",
      });
    }

    // getting item from item_type property
    const item = await prisma.item.findFirst({
      where: {
        type: item_type,
      },
    });

    // if item not found
    if (!item) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Item not found",
      });
    }

    // filtering out the required pricing for the zone column from the pricing table linked to the organization
    const requiredPricing = organization.pricing.find(
      (el) => el.zone === zone && el.itemId === item.id
    );

    // if required pricing not found
    if (!requiredPricing) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Pricing not found",
      });
    }

    const chargedDistance =
      total_distance - requiredPricing.base_distance_in_km;
    const per_km_rate_in_cents = requiredPricing.km_price_in_cents;
    const fix_price_in_cents = requiredPricing.fix_price_in_cents;

    // calculating the total price for the request
    const price = fix_price_in_cents + chargedDistance * per_km_rate_in_cents;

    return res.status(200).json({
      success: true,
      message: "Prices fetched successfully",
      data: {
        total_price_in_cents: price,
        total_price_in_euros: +(price / 100).toFixed(2),
      },
    });
  }
}
