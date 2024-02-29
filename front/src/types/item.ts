import { CategoryType } from "./category";

export interface ItemType {
    // items: ItemType[];
    id: string,
    label: string,
    emissionFactor: number,
    unit: string,
    // createAt: Date,
    // updateAt: Date,
    category: CategoryType
}