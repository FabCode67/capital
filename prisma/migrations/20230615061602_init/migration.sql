-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "description" TEXT NOT NULL,
    "checked" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);
