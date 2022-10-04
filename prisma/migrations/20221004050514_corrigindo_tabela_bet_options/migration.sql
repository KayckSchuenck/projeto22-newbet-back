/*
  Warnings:

  - You are about to drop the column `betAt` on the `betsGoalsOverUnder` table. All the data in the column will be lost.
  - You are about to drop the `betsThreeOptions` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `betsTwoOptions` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "homeAwayDraw" AS ENUM ('home', 'away', 'draw');

-- DropForeignKey
ALTER TABLE "betsThreeOptions" DROP CONSTRAINT "betsThreeOptions_userId_fkey";

-- DropForeignKey
ALTER TABLE "betsTwoOptions" DROP CONSTRAINT "betsTwoOptions_userId_fkey";

-- AlterTable
ALTER TABLE "betsGoalsOverUnder" DROP COLUMN "betAt",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- DropTable
DROP TABLE "betsThreeOptions";

-- DropTable
DROP TABLE "betsTwoOptions";

-- DropEnum
DROP TYPE "homeAway";

-- CreateTable
CREATE TABLE "betsOptions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,
    "fixtureId" INTEGER NOT NULL,
    "value" "homeAwayDraw" NOT NULL,
    "odd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "betsOptions_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "betsOptions" ADD CONSTRAINT "betsOptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
