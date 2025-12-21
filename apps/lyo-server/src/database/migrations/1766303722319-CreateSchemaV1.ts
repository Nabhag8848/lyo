import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSchemaV11766303722319 implements MigrationInterface {
    name = 'CreateSchemaV11766303722319'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "core"."garment" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "garmentUrl" character varying(2048) NOT NULL, "sourceUrl" character varying(2048) NOT NULL, "brandName" character varying(100), "garmentName" character varying(255), "garmentDescription" text, "userId" uuid NOT NULL, CONSTRAINT "UQ_810f65c2b5770788722c6e788b0" UNIQUE ("userId", "garmentUrl", "sourceUrl"), CONSTRAINT "PK_9a36c35a6a4c8c0b2897743038b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "core"."generation_status_enum" AS ENUM('starting', 'in_queue', 'processing', 'completed', 'failed')`);
        await queryRunner.query(`CREATE TABLE "core"."generation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "jobId" uuid NOT NULL, "key" character varying(1024), "bucketName" character varying(63), "contentType" character varying(255), "status" "core"."generation_status_enum" NOT NULL DEFAULT 'starting', "garmentId" uuid NOT NULL, "avatarId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "UQ_7a2364428d236180ea5cf2d9e39" UNIQUE ("jobId"), CONSTRAINT "PK_58db1b8155c99c2604394ffef2a" PRIMARY KEY ("id")); COMMENT ON COLUMN "core"."generation"."jobId" IS 'External provider reference'`);
        await queryRunner.query(`CREATE TABLE "core"."avatar" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying(1024) NOT NULL, "bucketName" character varying(63) NOT NULL, "contentType" character varying(255) NOT NULL, "isSelected" boolean NOT NULL DEFAULT false, "referencePhotoId" uuid NOT NULL, "userId" uuid NOT NULL, CONSTRAINT "PK_50e36da9d45349941038eaf149d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "core"."referencePhoto" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "key" character varying(1024) NOT NULL, "bucketName" character varying(63) NOT NULL, "contentType" character varying(255) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "userId" uuid NOT NULL, CONSTRAINT "PK_2fb4d65fcfb7bfff5baea13308b" PRIMARY KEY ("id")); COMMENT ON COLUMN "core"."referencePhoto"."key" IS 'S3 Object Key'`);
        await queryRunner.query(`ALTER TABLE "core"."garment" ADD CONSTRAINT "FK_e46aa5854ced7ffc8d7c670fd20" FOREIGN KEY ("userId") REFERENCES "core"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."generation" ADD CONSTRAINT "FK_ee6315f92917c9ae919a4773848" FOREIGN KEY ("garmentId") REFERENCES "core"."garment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."generation" ADD CONSTRAINT "FK_b02228cb22e0206e3b370a515c2" FOREIGN KEY ("avatarId") REFERENCES "core"."avatar"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."generation" ADD CONSTRAINT "FK_c11c05957f7c82339e2a31a1d98" FOREIGN KEY ("userId") REFERENCES "core"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."avatar" ADD CONSTRAINT "FK_e933756966571f7cb4dba6fd4c7" FOREIGN KEY ("referencePhotoId") REFERENCES "core"."referencePhoto"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."avatar" ADD CONSTRAINT "FK_b6abb9e4579bb7fca4d823a5e66" FOREIGN KEY ("userId") REFERENCES "core"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "core"."referencePhoto" ADD CONSTRAINT "FK_8bf22b63e97b3087ac3f7235299" FOREIGN KEY ("userId") REFERENCES "core"."user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."referencePhoto" DROP CONSTRAINT "FK_8bf22b63e97b3087ac3f7235299"`);
        await queryRunner.query(`ALTER TABLE "core"."avatar" DROP CONSTRAINT "FK_b6abb9e4579bb7fca4d823a5e66"`);
        await queryRunner.query(`ALTER TABLE "core"."avatar" DROP CONSTRAINT "FK_e933756966571f7cb4dba6fd4c7"`);
        await queryRunner.query(`ALTER TABLE "core"."generation" DROP CONSTRAINT "FK_c11c05957f7c82339e2a31a1d98"`);
        await queryRunner.query(`ALTER TABLE "core"."generation" DROP CONSTRAINT "FK_b02228cb22e0206e3b370a515c2"`);
        await queryRunner.query(`ALTER TABLE "core"."generation" DROP CONSTRAINT "FK_ee6315f92917c9ae919a4773848"`);
        await queryRunner.query(`ALTER TABLE "core"."garment" DROP CONSTRAINT "FK_e46aa5854ced7ffc8d7c670fd20"`);
        await queryRunner.query(`DROP TABLE "core"."referencePhoto"`);
        await queryRunner.query(`DROP TABLE "core"."avatar"`);
        await queryRunner.query(`DROP TABLE "core"."generation"`);
        await queryRunner.query(`DROP TYPE "core"."generation_status_enum"`);
        await queryRunner.query(`DROP TABLE "core"."garment"`);
    }

}
