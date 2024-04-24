/*
  Warnings:

  - Changed the type of `zone` on the `Pricing` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "Zones" AS ENUM ('central', 'east', 'west', 'north', 'south');

-- AlterTable
ALTER TABLE "Pricing" DROP COLUMN "zone",
ADD COLUMN     "zone" "Zones" NOT NULL;
