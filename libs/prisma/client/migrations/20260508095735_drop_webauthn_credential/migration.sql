/*
  Warnings:

  - You are about to drop the `WebAuthnCredential` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."WebAuthnCredential" DROP CONSTRAINT "WebAuthnCredential_userId_fkey";

-- DropTable
DROP TABLE "public"."WebAuthnCredential";
