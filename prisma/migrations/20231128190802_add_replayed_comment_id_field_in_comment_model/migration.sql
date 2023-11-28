-- AlterTable
ALTER TABLE `Comment` ADD COLUMN `replayedCommentId` INTEGER NULL;

-- CreateIndex
CREATE INDEX `Comment_replayedCommentId_idx` ON `Comment`(`replayedCommentId`);
