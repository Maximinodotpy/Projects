import { writable, type Writable } from "svelte/store";

export function createSynchronizedStoreList<T>(key: string, initial_value: T): Writable<{[key: string]: T}> {
  // This store will be used to keep the state in sync with the BroadcastChannel
    const { set, subscribe, update } = writable<{[key: string]: T}>({});

    const id = crypto.randomUUID();

    let current_content = JSON.parse(localStorage.getItem(key) || "{}");

    // This is the channel that will be used to broadcast the state
    const channel_add = new BroadcastChannel(`${key}-add`);
    const channel_rem = new BroadcastChannel(`${key}-remove`);
    const channel_general = new BroadcastChannel(`${key}-general`);

    channel_add.onmessage = (event) => {
        if (event.data.id !== id) {
            current_content[event.data.id] = event.data.value;
            set(current_content);
        }
    };

    channel_rem.onmessage = (event) => {
        if (event.data.id !== id) {
            delete current_content[event.data.id];
            set(current_content);
        }
    };

    channel_general.onmessage = (event) => {
        if (event.data.id !== id) {

            console.log("General message received", event.data.id, event.data.value);

            // Check if there are changes in the state
            let isDifferent = JSON.stringify(current_content) != JSON.stringify(event.data.value);

            console.log("Is different", isDifferent);

            if (isDifferent) {
                current_content = event.data.value;
                /* set(current_content); */
            }
        }
    };


    subscribe((value) => {
        localStorage.setItem(key, JSON.stringify(value));
        current_content = value;
        channel_general.postMessage({id, value});
    });


    // This is the function that will be used to update the state
    current_content[id] = initial_value;
    set(current_content);
    channel_add.postMessage({id, key, value: initial_value});

    // when the window is closed remove the value from the state
    window.addEventListener('beforeunload', () => {
        delete current_content[id];
        localStorage.setItem(key, JSON.stringify(current_content));
        channel_rem.postMessage({id, key});
    });

    return {
        subscribe,
        set,
        update,
        id,
    } as Writable<{[key: string]: T}>;
}