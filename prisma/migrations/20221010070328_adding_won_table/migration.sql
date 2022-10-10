/*
  Warnings:

  - You are about to drop the `betsCorners` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "betsCorners" DROP CONSTRAINT "betsCorners_userId_fkey";

-- AlterTable
ALTER TABLE "betsGoals" ADD COLUMN     "won" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "betsOptions" ADD COLUMN     "won" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "betsScores" ADD COLUMN     "won" BOOLEAN NOT NULL DEFAULT false;

-- DropTable
DROP TABLE "betsCorners";
