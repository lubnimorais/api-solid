/*
  Warnings:

  - Added the required column `password_hash` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "password_hash" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "check_ins" (
    "id" UUID NOT NULL,
    "created_at" TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "validated_at" TIMESTAMPTZ,

    CONSTRAINT "check_ins_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "gyms" (
    "id" UUID NOT NULL,
    "title" VARCHAR NOT NULL,
    "description" VARCHAR,
    "phone" VARCHAR,
    "latitude" DECIMAL NOT NULL,
    "longitude" DECIMAL NOT NULL,

    CONSTRAINT "gyms_pkey" PRIMARY KEY ("id")
);
