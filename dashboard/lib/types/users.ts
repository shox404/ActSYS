export interface User {
    $id?: string;
    email: string;
    name: string;
    sub: string;
    dev?: string;
    $createdAt?: Date;
}