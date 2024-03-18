import { syncedStore, getYjsValue } from "@syncedstore/core";
import { svelteSyncedStore } from "@syncedstore/svelte";
import { getYjsDoc } from "@syncedstore/core";
import { WebrtcProvider } from "y-webrtc";

// Create your SyncedStore store
const todoStore = syncedStore<{ obj: { [key: string]: {
    text: string;
    w: {
        width: number;
        height: number;
        screen_x: number;
        screen_y: number;
    },
    color: string;
} } }>({ obj: {} });

// Create Svelte Store for use in your components.
// You can treat this like any other store, including `bind`.
export const store = svelteSyncedStore(todoStore);

// Get the Yjs document and sync automatically using y-webrtc
const doc = getYjsDoc(todoStore);
const webrtcProvider = new WebrtcProvider("my-document-id", doc);