/*
  Warnings:

  - You are about to drop the column `ownerId` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `owner` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Pet" DROP CONSTRAINT "Pet_ownerId_fkey";

-- AlterTable
ALTER TABLE "Person" ADD COLUMN     "email" TEXT,
ADD COLUMN     "phone" TEXT;

-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "ownerId",
ADD COLUMN     "owner" TEXT NOT NULL;
