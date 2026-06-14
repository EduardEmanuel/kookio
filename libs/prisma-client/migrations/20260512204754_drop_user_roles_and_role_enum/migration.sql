/*
  Warnings:

  - The `roles` column on the `User` table is dropped (was Role[] with
    default `[USER]`). 17 rows currently carry non-null values; this
    migration discards them.
  - The `Role` enum is dropped after the column it backed.

  Data is intentionally NOT migrated — the role-based access surface
  (admin route, roleGuard, role-procedure middleware) was removed in
  the same change. No consumer reads `User.roles` after this commit,
  so the column is dead data.
*/

-- AlterTable
ALTER TABLE "public"."User" DROP COLUMN "roles";

-- DropEnum
DROP TYPE "public"."Role";
