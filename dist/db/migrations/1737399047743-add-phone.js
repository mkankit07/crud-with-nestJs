"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AddPhone1737399047743 = void 0;
class AddPhone1737399047743 {
    constructor() {
        this.name = 'AddPhone1737399047743';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }
}
exports.AddPhone1737399047743 = AddPhone1737399047743;
//# sourceMappingURL=1737399047743-add-phone.js.map