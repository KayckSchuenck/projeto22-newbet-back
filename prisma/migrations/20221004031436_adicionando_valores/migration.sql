-- CreateEnum
CREATE TYPE "marketType" AS ENUM ('twoOptions', 'threeOptions', 'totalGoals');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "availableMoney" DOUBLE PRECISION NOT NULL DEFAULT 20;

-- CreateTable
CREATE TABLE "bets" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "betAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "finished" BOOLEAN NOT NULL DEFAULT false,
    "amount" DOUBLE PRECISION NOT NULL,
    "gameId" INTEGER NOT NULL,
    "type" "marketType" NOT NULL,
    "odd" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "bets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "bets" ADD CONSTRAINT "bets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
