"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemovePhone1737480383230 = void 0;
class RemovePhone1737480383230 {
    constructor() {
        this.name = 'RemovePhone1737480383230';
    }
    async up(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }
    async down(queryRunner) {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }
}
exports.RemovePhone1737480383230 = RemovePhone1737480383230;
//# sourceMappingURL=1737480383230-remove-phone.js.map