import { Request, Response } from "express";
import prisma from "../../prisma";
import { organizations, pricings } from "./seed.data";
import { StatusCodes } from "http-status-codes";

export default class SeedController {
  static async seedData(req: Request, res: Response) {
    // delete all data before seeding
    await prisma.pricing.deleteMany({});
    await prisma.item.deleteMany({});
    await prisma.organization.deleteMany({});

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

    // create organizations and their pricings related to items
    organizations.map(async (organization) => {
      await prisma.organization.create({
        data: {
          name: organization.name,
          pricing: {
            createMany: {
              data: pricings,
            },
          },
        },
      });
    });

    return res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Data Seeded successfully",
    });
  }
}
