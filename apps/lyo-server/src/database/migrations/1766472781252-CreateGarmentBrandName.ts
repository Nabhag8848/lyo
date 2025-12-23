import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGarmentBrandName1766472781252 implements MigrationInterface {
    name = 'CreateGarmentBrandName1766472781252'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."garment" ADD "garmentBrandName" character varying(100)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."garment" DROP COLUMN "garmentBrandName"`);
    }

}
