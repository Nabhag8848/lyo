import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1764660324317 implements MigrationInterface {
    name = 'CreateUserTable1764660324317'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "core"."user_provider_enum" AS ENUM('google', 'local')`);
        await queryRunner.query(`CREATE TABLE "core"."user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "email" character varying(255) NOT NULL, "firstName" character varying(255), "lastName" character varying(255), "picture" character varying(512), "provider" "core"."user_provider_enum" NOT NULL DEFAULT 'local', "providerId" character varying(255), "isActive" boolean NOT NULL DEFAULT true, "lastLoginAt" TIMESTAMP, CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_0ad4792ebd254550ad4fdb55d6" ON "core"."user" ("providerId") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "core"."IDX_0ad4792ebd254550ad4fdb55d6"`);
        await queryRunner.query(`DROP TABLE "core"."user"`);
        await queryRunner.query(`DROP TYPE "core"."user_provider_enum"`);
    }

}
