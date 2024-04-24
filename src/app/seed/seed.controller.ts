import { Request, Response } from "express";
import prisma from "../../prisma";
import { getPricings, organizations } from "./seed.data";
import { StatusCodes } from "http-status-codes";

export default class SeedController {
  static async seedData(req: Request, res: Response) {
    try {
      // delete all data before seeding
      Promise.all([
        await prisma.organization.deleteMany(),
        await prisma.pricing.deleteMany(),
        await prisma.item.deleteMany(),
      ]);

      // create items
      await prisma.item.createMany({
        data: [
          {
            type: "perishable",
            description: "Perishable Item",
          },
          {
            type: "non_perishable",
            description: "Non Perishable Item",
          },
        ],
      });

      const items = await prisma.item.findMany();

      if (!items) {
        return res.status(StatusCodes.BAD_REQUEST).json({
          success: false,
          message: "Items not created",
        });
      }

      const pricings = getPricings(items[0].id, items[1].id);

      // create organizations and their pricings related to items
      organizations.forEach(async (org) => {
        const organization = await prisma.organization.create({
          data: {
            name: org.name,
            pricing: {
              createMany: {
                data: pricings,
              },
            },
          },
        });

        if (!organization) {
          return res.status(StatusCodes.BAD_REQUEST).json({
            success: false,
            message: "Organization not created",
          });
        }
      });

      return res.status(StatusCodes.CREATED).json({
        success: true,
        message: "Data Seeded successfully",
      });
    } catch (err: any) {
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: err.message,
      });
    }
  }
}
