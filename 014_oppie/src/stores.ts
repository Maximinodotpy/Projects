import { writable } from "svelte/store";

export function createPersistentStore(key: string, initialValue: any) {
  const storedValue = localStorage.getItem(key);
  const store = writable(storedValue ? JSON.parse(storedValue) : initialValue);

  store.subscribe((value) => {
    localStorage.setItem(key, JSON.stringify(value));
  });

  return store;
}


export const scrollProgress = writable<{ progress: number; stuck: boolean }>({
    progress: 0,
    stuck: false
});

function updateScrollProgress() {
    const scrollY = window.scrollY;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
  
    const progress = scrollY / (scrollHeight - clientHeight);
    const stuck = scrollY > 0;
    scrollProgress.set({ progress, stuck });
}

window.addEventListener('scroll', updateScrollProgress);

updateScrollProgress();

/* export function createScrollProgressStore(element: string) {
    const { subscribe, set } = writable<{ progress: number; stuck: boolean }>({
        progress: 0,
        stuck: false
    });
    
    const updateScrollProgress = () => {
        if (!document.querySelector(element)) return;

        // @ts-ignore
        const scrollY = document.querySelector(element).scrollTop;
        // @ts-ignore
        const scrollHeight = document.querySelector(element).scrollHeight;
        // @ts-ignore
        const clientHeight = document.querySelector(element).clientHeight;
    
        const progress = scrollY / (scrollHeight - clientHeight);

        const stuck = scrollY > 0;
        set({ progress, stuck });
    };
    
    document.addEventListener('DOMContentLoaded', () => {
        document.querySelector(element)?.addEventListener("scroll", updateScrollProgress);
    })

    
    updateScrollProgress();
    
    return {
        subscribe
    };
} */