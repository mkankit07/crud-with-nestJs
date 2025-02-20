import { MigrationInterface, QueryRunner } from "typeorm";

export class AddPhone1737399047743 implements MigrationInterface {
    name = 'AddPhone1737399047743'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
