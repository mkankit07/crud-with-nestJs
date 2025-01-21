import { MigrationInterface, QueryRunner } from "typeorm";
export declare class RemovePhone1737480383230 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
