---------------------------
-- Kookio Databases & Roles
-- !! Run this script file in the SQL shell from CockroachDB before you delete defaultdb !!
-- (Also see: libs/prisma-client/README.md)
---------------------------

-- Databases (3 storage tiers)
CREATE DATABASE IF NOT EXISTS kookio_dev;
CREATE DATABASE IF NOT EXISTS kookio_test;
CREATE DATABASE IF NOT EXISTS kookio_prod;

---------------------------
-- DEV
---------------------------

-- Fail-fast for wrong/anonymous connections
REVOKE ALL ON DATABASE kookio_dev FROM public;
REVOKE ALL ON SCHEMA  public      FROM public;

-- Runtime (without DDL)
GRANT CONNECT ON DATABASE kookio_dev TO kookio_app;
GRANT USAGE   ON SCHEMA  public     TO kookio_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES    IN SCHEMA public TO kookio_app;
GRANT USAGE, SELECT                   ON ALL SEQUENCES IN SCHEMA public TO kookio_app;

-- Migrations (with full DDL)
GRANT ALL PRIVILEGES ON DATABASE kookio_dev TO kookio_migrate;
GRANT ALL PRIVILEGES ON SCHEMA   public     TO kookio_migrate;

-- New objects created by the migration user → auto-DML to runtime
ALTER DEFAULT PRIVILEGES FOR ROLE kookio_migrate IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES    TO kookio_app;
ALTER DEFAULT PRIVILEGES FOR ROLE kookio_migrate IN SCHEMA public
  GRANT USAGE, SELECT                   ON SEQUENCES TO kookio_app;

---------------------------
-- TEST
---------------------------

REVOKE ALL ON DATABASE kookio_test FROM public;
REVOKE ALL ON SCHEMA  public       FROM public;

GRANT CONNECT ON DATABASE kookio_test TO kookio_app;
GRANT USAGE   ON SCHEMA  public      TO kookio_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES    IN SCHEMA public TO kookio_app;
GRANT USAGE, SELECT                   ON ALL SEQUENCES IN SCHEMA public TO kookio_app;

GRANT ALL PRIVILEGES ON DATABASE kookio_test TO kookio_migrate;
GRANT ALL PRIVILEGES ON SCHEMA   public      TO kookio_migrate;

ALTER DEFAULT PRIVILEGES FOR ROLE kookio_migrate IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES    TO kookio_app;
ALTER DEFAULT PRIVILEGES FOR ROLE kookio_migrate IN SCHEMA public
  GRANT USAGE, SELECT                   ON SEQUENCES TO kookio_app;

---------------------------
-- PROD
---------------------------

REVOKE ALL ON DATABASE kookio_prod FROM public;
REVOKE ALL ON SCHEMA  public       FROM public;

GRANT CONNECT ON DATABASE kookio_prod TO kookio_app;
GRANT USAGE   ON SCHEMA  public      TO kookio_app;
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES    IN SCHEMA public TO kookio_app;
GRANT USAGE, SELECT                   ON ALL SEQUENCES IN SCHEMA public TO kookio_app;

GRANT ALL PRIVILEGES ON DATABASE kookio_prod TO kookio_migrate;
GRANT ALL PRIVILEGES ON SCHEMA   public      TO kookio_migrate;

ALTER DEFAULT PRIVILEGES FOR ROLE kookio_migrate IN SCHEMA public
  GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES    TO kookio_app;
ALTER DEFAULT PRIVILEGES FOR ROLE kookio_migrate IN SCHEMA public
  GRANT USAGE, SELECT                   ON SEQUENCES TO kookio_app;

---------------------------
-- Cleanup Default DBs
---------------------------

DROP DATABASE IF EXISTS defaultdb CASCADE;
DROP DATABASE IF EXISTS postgres CASCADE;

---------------------------
-- End of Script
---------------------------