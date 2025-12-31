/*
  Warnings:

  - The values [ONSITE] on the enum `AppointmentMode` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "AppointmentMode_new" AS ENUM ('ONLINE', 'OFFLINE');
ALTER TABLE "Appointment" ALTER COLUMN "mode" TYPE "AppointmentMode_new" USING ("mode"::text::"AppointmentMode_new");
ALTER TYPE "AppointmentMode" RENAME TO "AppointmentMode_old";
ALTER TYPE "AppointmentMode_new" RENAME TO "AppointmentMode";
DROP TYPE "AppointmentMode_old";
COMMIT;

-- AlterTable
ALTER TABLE "Appointment" ADD COLUMN     "zoomLink" TEXT;
