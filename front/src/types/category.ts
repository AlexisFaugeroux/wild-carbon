import { ItemType } from "./item"

export interface CategoryType {
    id: string,
    name: string
    items: ItemType[]
}

export interface CategoryItemType {
    items: ItemType[]
}