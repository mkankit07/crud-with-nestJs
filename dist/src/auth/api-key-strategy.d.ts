import { AuthService } from './auth.service';
declare const ApiKeyStrategy_base: new (...args: any[]) => any;
export declare class ApiKeyStrategy extends ApiKeyStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(apiKey: string): Promise<import("../user/user.entity").User>;
}
export {};
