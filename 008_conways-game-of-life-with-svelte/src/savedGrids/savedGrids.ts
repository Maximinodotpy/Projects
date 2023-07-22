import { writable } from "svelte/store";

const KEY = "store";

localStorage.getItem(KEY) || localStorage.setItem(KEY, JSON.stringify([]));

const store = writable<SavedGrid[]>(JSON.parse(localStorage.getItem(KEY)));

store.subscribe(val => localStorage.setItem(KEY, JSON.stringify(val)));

export default store;