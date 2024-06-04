/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `usrs` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `usrs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usrs" ADD COLUMN     "username" VARCHAR NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "usrs_username_key" ON "usrs"("username");
