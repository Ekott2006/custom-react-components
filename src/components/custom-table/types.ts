import { Columns } from "./hooks/useCustomTable";

export type InferColumns<T> = T extends readonly Columns<infer U>[] ? [T, U] : never;
