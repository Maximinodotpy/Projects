import { writable } from 'svelte/store';

interface IShareLink {
    enabled?: boolean,
    name: string,
    url: string,
    composed_url: string,
    color?: string,
    logo?: string,
}

export const share_links = writable<IShareLink[]>([
    {
        name: 'Threema',
        url: 'https://t.me/share/url?url={url}&text={title}',
        composed_url: '',
        color: '#05A63F',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Threema.png'
    },
    {
        name: 'WhatsApp',
        url: 'https://api.whatsapp.com/send?text={title}',
        composed_url: '',
        color: '#25D366',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg'
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/intent/tweet?text={title}&url={url}',
        composed_url: '',
        color: '#1DA1F2',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg'
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/shareArticle?mini=true&url={url}&title={title}',
        composed_url: '',
        color: '#0A66C2',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png'
    },
    {
        name: 'Pinterest',
        url: 'https://pinterest.com/pin/create/button/?url={url}&description={title}',
        composed_url: '',
        color: '#E60023',
        logo: 'https://cdn-icons-png.flaticon.com/512/220/220214.png'
    },
    {
        name: 'Reddit',
        url: 'https://www.reddit.com/submit?url={url}&title={title}',
        composed_url: '',
        color: '#FF4500',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/330px-Reddit_Logo_Icon.svg.png'
    },
    {
        name: 'Viber',
        url: 'viber://forward?text={title}',
        composed_url: '',
        color: '#665CAC',
        logo: 'https://cdn-icons-png.flaticon.com/512/3670/3670059.png'
    },
    {
        name: 'Email',
        url: 'mailto:?subject={title}&body={url}',
        composed_url: '',
        logo: 'https://cdn-icons-png.flaticon.com/512/3178/3178158.png'
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