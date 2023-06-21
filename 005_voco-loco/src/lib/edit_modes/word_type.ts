export interface Word {
    type: string;
    description: string;
    tags: string[];
    created: number;
    uuid: string;
    translations: {
        [key: string]: string;
    };
}

export interface VociFile {
    file_handle: FileSystemHandle | null;
    addWord: () => void;
    removeWord: (id: number) => void;
    openFile: () => void;
    words: Word[];
    languages: string[];
    recompileLangauges: () => void;
}