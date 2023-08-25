/*
  Warnings:

  - You are about to drop the column `workspaceId` on the `Contact` table. All the data in the column will be lost.
  - You are about to drop the column `workspaceId` on the `User` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Contact" DROP COLUMN "workspaceId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "workspaceId";
