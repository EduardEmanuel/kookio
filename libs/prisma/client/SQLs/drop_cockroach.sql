---------------------------
-- Kookio — Drop All Databases
-- !! DESTRUCTIVE: permanently drops kookio_dev, kookio_test, kookio_prod !!
-- Dev / schema-reset only. Never run against production.
-- After this script, run bootstrap_cockroach.sql to recreate databases and roles.
---------------------------

DROP DATABASE IF EXISTS kookio_dev  CASCADE;
DROP DATABASE IF EXISTS kookio_test CASCADE;
DROP DATABASE IF EXISTS kookio_prod CASCADE;

---------------------------
-- End of Script
---------------------------
