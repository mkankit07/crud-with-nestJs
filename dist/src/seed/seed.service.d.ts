import { DataSource } from 'typeorm';
export declare class SeedService {
    private readonly connection;
    constructor(connection: DataSource);
    seed(): Promise<void>;
}
