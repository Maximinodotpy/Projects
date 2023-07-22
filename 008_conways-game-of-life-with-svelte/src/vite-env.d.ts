/// <reference types="svelte" />
/// <reference types="vite/client" />

interface ICell {
    x: number;
    y: number;
}

interface SavedGrid {
    name: string;
    created: number;
    grid: ICell[];
}