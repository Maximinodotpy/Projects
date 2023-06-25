// See https://kit.svelte.dev/docs/types#app
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface Platform {}
	}

	interface Word {
		description: string;
		tags: string[];
		created: number;
		uuid: string;
		translations: {
			[key: string]: string;
		};
	}
	
	interface VocabularyFile {
		file_handle: FileSystemHandle | null;
		removeWord: (id: number) => void;
		openFile: (ev?: Event) => void;
		addWord: () => void;
		words: Word[];
		languages: string[];
		recompileLangauges: () => void;
	}

	interface GameOptions {
		word_pool : Word[],
		allowed_tags: string[],
		target_language: string,
		origin_language: string,
	}
}

export {};
