import { atom } from "recoil";
export const currency = atom({
    key: "currency",
    default: "USD"
})
export const id = atom({
    key: "id",
    default: "Bitcoin"
})