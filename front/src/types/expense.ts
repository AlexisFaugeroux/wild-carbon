import { ItemType } from "./item"

export interface ExpenseType {
    id: string
    title: string,
    quantity: number
    expenseDate?: string,
    emissionTotal?: number
    createdAt?: string,
    itemId: string 
    item: ItemType
}
