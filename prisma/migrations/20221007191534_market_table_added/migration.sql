/*
  Warnings:

  - You are about to drop the `betsGoalsOverUnder` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "betsGoalsOverUnder" DROP CONSTRAINT "betsGoalsOverUnder_userId_fkey";

-- DropTable
DROP TABLE "betsGoalsOverUnder";

-- CreateTable
CREATE TABLE "betsGoals" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,
    "fixtureId" INTEGER NOT NULL,
    "type" "overUnder" NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "odd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "betsGoals_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "betsScores" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,
    "fixtureId" INTEGER NOT NULL,
    "scoreHome" INTEGER NOT NULL,
    "scoreAway" INTEGER NOT NULL,
    "odd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "betsScores_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "betsCorners" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,
    "fixtureId" INTEGER NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "type" "overUnder" NOT NULL,
    "odd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "betsCorners_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "betsGoals" ADD CONSTRAINT "betsGoals_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "betsScores" ADD CONSTRAINT "betsScores_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "betsCorners" ADD CONSTRAINT "betsCorners_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
