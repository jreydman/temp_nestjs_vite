-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "SignStatus" AS ENUM ('NONE', 'PENDING', 'ACTIVE', 'INACTIVE');

-- CreateEnum
CREATE TYPE "OAuthPlatform" AS ENUM ('GOOGLE', 'GITHUB', 'TWITTER');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" VARCHAR(80),
    "username" VARCHAR(80) NOT NULL,
    "password" VARCHAR(80) NOT NULL,
    "url" VARCHAR(1024),
    "roles" "UserRole"[] DEFAULT ARRAY['USER']::"UserRole"[],
    "avatar" VARCHAR(1024),
    "social_ids" JSONB DEFAULT '{}',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3),
    "last_login_ip" TEXT,
    "last_login_time" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailVerification" (
    "userId" TEXT NOT NULL,
    "token" TEXT,
    "status" "SignStatus" NOT NULL DEFAULT 'NONE',

    CONSTRAINT "EmailVerification_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "OAuth" (
    "userId" TEXT NOT NULL,
    "platform" "OAuthPlatform" NOT NULL,
    "oauthId" TEXT NOT NULL,

    CONSTRAINT "OAuth_pkey" PRIMARY KEY ("userId","platform","oauthId")
);

-- CreateTable
CREATE TABLE "ApiToken" (
    "id" TEXT NOT NULL DEFAULT '',
    "userId" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "token" TEXT NOT NULL,
    "expired" TIMESTAMP(3),
    "name" TEXT NOT NULL,

    CONSTRAINT "ApiToken_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerification_userId_key" ON "EmailVerification"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "ApiToken_name_key" ON "ApiToken"("name");

-- AddForeignKey
ALTER TABLE "EmailVerification" ADD CONSTRAINT "EmailVerification_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OAuth" ADD CONSTRAINT "OAuth_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ApiToken" ADD CONSTRAINT "ApiToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
