import { userType } from "./user"

export interface ArticleType {
    id: string,
    title: string
    description: string
    url: string
    createdAt: string
    updatedAt: string
    user: userType
}
