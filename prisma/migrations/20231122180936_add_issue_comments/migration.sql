-- CreateTable
CREATE TABLE `Comment` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `text` TEXT NOT NULL,
    `authorId` VARCHAR(255) NOT NULL,
    `issueId` INTEGER NOT NULL,

    INDEX `Comment_authorId_idx`(`authorId`),
    INDEX `Comment_issueId_idx`(`issueId`),
    INDEX `Comment_id_idx`(`id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
