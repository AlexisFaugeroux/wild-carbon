import { ItemType } from "./item"

export interface CategoryType {
    id: string,
    name: string
    items: ItemType[]
}