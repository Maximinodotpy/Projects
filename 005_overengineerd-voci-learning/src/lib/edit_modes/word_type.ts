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