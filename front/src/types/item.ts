export interface ItemType {
    id: string,
    label: string,
    emissionFactor: number,
    unit: string,
    items: ItemType[]
    // createAt: Date,
    // updateAt: Date,
    // categoryId: string
}