import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdateUserTabeToken1764921980195 implements MigrationInterface {
    name = 'UpdateUserTabeToken1764921980195'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."user" ADD "googleAccessToken" character varying(512)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "core"."user" DROP COLUMN "googleAccessToken"`);
    }

}
