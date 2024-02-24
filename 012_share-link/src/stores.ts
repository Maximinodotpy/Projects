import { writable } from 'svelte/store';

interface IShareLink {
    name: string,
    url: string,
    composed_url: string,
    color?: string
}

export const share_links = writable<IShareLink[]>([
    /* {
        name: 'Facebook',
        url: 'https://threema.id/compose?text={title}',
        composed_url: '',
        color: '#1877F2',
    }, */
    {
        name: 'Threema',
        url: 'https://t.me/share/url?url={url}&text={title}',
        composed_url: '',
        color: '#05A63F',
    },
    {
        name: 'WhatsApp',
        url: 'https://api.whatsapp.com/send?text={title}',
        composed_url: '',
        color: '#25D366',
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/intent/tweet?text={title}&url={url}',
        composed_url: '',
        color: '#1DA1F2',
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}',
        composed_url: '',
        color: '#0A66C2',
    },
    {
        name: 'Pinterest',
        url: 'https://pinterest.com/pin/create/button/?url={url}&description={title}',
        composed_url: '',
        color: '#E60023',
    },
    {
        name: 'Reddit',
        url: 'https://www.reddit.com/submit?url={url}&title={title}',
        composed_url: '',
        color: '#FF4500',
    },
    {
        name: 'Viber',
        url: 'viber://forward?text={title}',
        composed_url: '',
        color: '#665CAC',
    },
    {
        name: 'Email',
        url: 'mailto:?subject={title}&body={url}',
        composed_url: '',
    },
])


export function createPersistentStore<T>(key: string, initialValue: T) {
    const storedValue = localStorage.getItem(key);
    const data = storedValue ? JSON.parse(storedValue) : initialValue;
    const store = writable<T>(data);

    store.subscribe($data => {
        localStorage.setItem(key, JSON.stringify($data));
    });

    return store;
}