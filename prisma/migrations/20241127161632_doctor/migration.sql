/*
  Warnings:

  - You are about to drop the column `appoinmentFee` on the `doctors` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "doctors" DROP COLUMN "appoinmentFee",
ADD COLUMN     "appointmentFee" DOUBLE PRECISION NOT NULL DEFAULT 0,
ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL DEFAULT 0.0;
