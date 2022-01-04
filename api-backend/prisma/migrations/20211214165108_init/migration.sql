/*
  Warnings:

  - You are about to alter the column `expired_at` on the `user_active_session` table. The data in that column could be lost. The data in that column will be cast from `Timestamp(0)` to `Timestamp`.

*/
-- AlterTable
ALTER TABLE `user_active_session` MODIFY `expired_at` TIMESTAMP NOT NULL;
