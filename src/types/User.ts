export interface User {
    id: number;
    name: string;
    role: "ADMIN" | "STAFF";
    createdAt: Date;
    updatedAt: Date;
}