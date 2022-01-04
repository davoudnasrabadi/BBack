/*
  Warnings:

  - You are about to drop the column `user_id` on the `ShoppingCard` table. All the data in the column will be lost.
  - You are about to alter the column `expired_at` on the `user_active_session` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `ShoppingCard` DROP COLUMN `user_id`,
    ADD COLUMN `userUser_id` INTEGER UNSIGNED;

-- AlterTable
ALTER TABLE `user_active_session` MODIFY `expired_at` TIMESTAMP NOT NULL;

-- AddForeignKey
ALTER TABLE `ShoppingCard` ADD FOREIGN KEY (`userUser_id`) REFERENCES `User`(`user_id`) ON DELETE SET NULL ON UPDATE CASCADE;
