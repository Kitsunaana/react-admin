-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "caption" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);
