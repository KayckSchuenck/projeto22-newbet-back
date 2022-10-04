/*
  Warnings:

  - You are about to drop the `bets` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "overUnder" AS ENUM ('over', 'under');

-- CreateEnum
CREATE TYPE "homeAway" AS ENUM ('home', 'away');

-- DropForeignKey
ALTER TABLE "bets" DROP CONSTRAINT "bets_userId_fkey";

-- DropTable
DROP TABLE "bets";

-- DropEnum
DROP TYPE "marketType";

-- CreateTable
CREATE TABLE "betsTwoOptions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "betAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,
    "fixtureId" INTEGER NOT NULL,
    "value" "homeAway" NOT NULL,
    "odd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "betsTwoOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "betsThreeOptions" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "betAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,
    "fixtureId" INTEGER NOT NULL,
    "value" TEXT NOT NULL,
    "odd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "betsThreeOptions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "betsGoalsOverUnder" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "betAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,
    "fixtureId" INTEGER NOT NULL,
    "type" "overUnder" NOT NULL,
    "value" INTEGER NOT NULL,
    "odd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "betsGoalsOverUnder_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "betsTwoOptions" ADD CONSTRAINT "betsTwoOptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "betsThreeOptions" ADD CONSTRAINT "betsThreeOptions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "betsGoalsOverUnder" ADD CONSTRAINT "betsGoalsOverUnder_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
