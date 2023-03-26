/*
  Warnings:

  - You are about to drop the column `name` on the `Pet` table. All the data in the column will be lost.
  - Added the required column `pet_name` to the `Pet` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Pet" DROP COLUMN "name",
ADD COLUMN     "pet_name" TEXT NOT NULL;


CREATE OR REPLACE FUNCTION add_pet()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO "Pet" (owner, pet_name)
  VALUES (NEW.id, CONCAT(NEW.name, ' ', CASE floor(random() * 2) WHEN 0 THEN 'gato' ELSE 'cachorro' END));
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE TRIGGER add_pet_trigger AFTER INSERT ON "Person" FOR EACH ROW EXECUTE FUNCTION add_pet();
