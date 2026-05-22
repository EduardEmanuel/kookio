/*
  Rename Recipe.youtubeUrl → Recipe.videoUrl. The column was originally
  named after its TheMealDB-only source; the underlying data is a generic
  video link (YouTube, Vimeo, source-site embed, etc.), so the field name
  is generalized to match.

  RENAME COLUMN preserves existing data.
*/

-- AlterTable
ALTER TABLE "public"."Recipe" RENAME COLUMN "youtubeUrl" TO "videoUrl";
