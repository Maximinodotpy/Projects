import type { Word } from "$lib/edit_modes/word_type";
import { writable } from "svelte/store";

export const option_values = writable<{
    word_pool : Word[],
    allowed_tags: string[],
    target_language: string,
    origin_language: string,
}>({
    word_pool: [],
    allowed_tags: [],
    target_language: '',
    origin_language: '',
})