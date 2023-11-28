/*
  Warnings:

  - You are about to drop the column `replayedCommentId` on the `Comment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `Comment_replayedCommentId_idx` ON `Comment`;

-- AlterTable
ALTER TABLE `Comment` DROP COLUMN `replayedCommentId`,
    ADD COLUMN `repliedCommentId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Comment_repliedCommentId_idx` ON `Comment`(`repliedCommentId`);
