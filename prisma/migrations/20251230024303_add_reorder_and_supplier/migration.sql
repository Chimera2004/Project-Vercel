-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "reorderLevel" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "supplier" TEXT;
