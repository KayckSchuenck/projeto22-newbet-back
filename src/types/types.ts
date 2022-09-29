import { User } from "@prisma/client";

export type CreateUsersData = Omit<User, 'id'|'createdAt'|'active'>;
