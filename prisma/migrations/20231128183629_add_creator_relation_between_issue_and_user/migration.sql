-- AlterTable
ALTER TABLE `Issue` ADD COLUMN `creatorId` VARCHAR(255) NULL;

-- CreateIndex
CREATE INDEX `Issue_creatorId_idx` ON `Issue`(`creatorId`);
