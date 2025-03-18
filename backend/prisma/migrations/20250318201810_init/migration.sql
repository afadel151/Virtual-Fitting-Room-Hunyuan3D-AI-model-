-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ClothingItem" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "model3D" TEXT NOT NULL,

    CONSTRAINT "ClothingItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FittingSession" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "clothingId" TEXT NOT NULL,
    "user3DModel" TEXT NOT NULL,

    CONSTRAINT "FittingSession_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "FittingSession" ADD CONSTRAINT "FittingSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FittingSession" ADD CONSTRAINT "FittingSession_clothingId_fkey" FOREIGN KEY ("clothingId") REFERENCES "ClothingItem"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
