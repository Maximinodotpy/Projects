import { writable } from 'svelte/store';
import { derived } from 'svelte/store';

const VERSION = '100';


export const title = createPersistentStore(`title_v${VERSION}`, 'My message');
export const url = createPersistentStore(`url_v${VERSION}`, 'https://example.com');
export const encode_urls = createPersistentStore(`encode_urls_v${VERSION}`, true);
export const add_url_to_title_text = createPersistentStore(`add_url_to_title_text_v${VERSION}`, false);

interface IShareLink {
    enabled?: boolean,
    name: string,
    url: string,
    composed_url?: string,
    color?: string,
    logo?: string,
}

export const share_links = writable<IShareLink[]>([
    {
        name: 'Threema',
        url: 'https://threema.id/compose?text={title}',
        composed_url: '',
        color: '#05A63F',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Threema.png',
        enabled: true,
    },
    {
        name: 'Facebook',
        url: 'https://www.facebook.com/sharer.php?u={url}',
        composed_url: '',
        color: '#0266FF',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/b/b9/2023_Facebook_icon.svg',
        enabled: true,
    },
    {
        name: 'Telegram',
        url: 'https://t.me/share/url?url={url}&text={title}',
        composed_url: '',
        color: '#0088cc',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
        enabled: true,
    },
    {
        name: 'WhatsApp',
        url: 'https://api.whatsapp.com/send?text={title}',
        composed_url: '',
        color: '#25D366',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg',
        enabled: true,
    },
    {
        name: 'Twitter',
        url: 'https://twitter.com/intent/tweet?text={title}',
        composed_url: '',
        color: '#1DA1F2',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/6/6f/Logo_of_Twitter.svg',
        enabled: true,
    },
    {
        name: 'LinkedIn',
        url: 'https://www.linkedin.com/shareArticle?mini=true&url={url}',
        composed_url: '',
        color: '#0A66C2',
        logo: 'https://upload.wikimedia.org/wikipedia/commons/c/ca/LinkedIn_logo_initials.png',
        enabled: true,
    },
    {
        name: 'Pinterest',
        url: 'https://pinterest.com/pin/create/button/?url={url}&description={title}',
        composed_url: '',
        color: '#E60023',
        logo: 'https://cdn-icons-png.flaticon.com/512/220/220214.png',
        enabled: true,
    },
    {
        name: 'Reddit',
        url: 'https://www.reddit.com/submit?url={url}&title={title}',
        composed_url: '',
        color: '#FF4500',
        logo: 'https://upload.wikimedia.org/wikipedia/en/thumb/b/bd/Reddit_Logo_Icon.svg/330px-Reddit_Logo_Icon.svg.png',
        enabled: true,
    },
    {
        name: 'Viber',
        url: 'viber://forward?text={title}',
        composed_url: '',
        color: '#665CAC',
        logo: 'https://cdn-icons-png.flaticon.com/512/3670/3670059.png',
        enabled: true,
    },
    {
        name: 'Email',
        url: 'mailto:?subject={subject}&body={title}',
        composed_url: '',
        logo: 'https://cdn-icons-png.flaticon.com/512/3178/3178158.png',
        enabled: true,
    },
])

export const custom_share_links = createPersistentStore<IShareLink[]>(`custom_share_link_V${VERSION}`, []);

export const custom_share_link_values = createPersistentStore<{
    [key: string]: string,
}>(`custom_share_link_values_V${VERSION}`, {});

// Create derived shore which combines the default and custom share links
export const all_share_links = derived([
    share_links,
    custom_share_links,
    title,
    url,
    encode_urls,
    add_url_to_title_text,
    custom_share_link_values,
], ([
    $share_links,
    $custom_share_links,
    $title,
    $url,
    $encode_urls,
    $add_url_to_title_text,
    $custom_share_link_values,
]) => {
    let combined_share_links = [...$share_links, ...$custom_share_links];

    // Loop through all share links and compose the url
    combined_share_links.forEach((SoMe) => {
        SoMe.composed_url = SoMe.url;

        let used_title = $encode_urls ? encodeURIComponent($title) : $title;
        let used_url = $encode_urls ? encodeURIComponent($url) : $url;

        function replaceBuiltInPlaceholders(str: string) {
            if ($add_url_to_title_text && !str.includes('{url}')) {
                str = str.replace('{title}', `${used_title}: ${used_url}`);
            } else {
                str = str.replace('{title}', used_title);
            }
    
            str = str.replace('{url}', used_url);

            return str;
        }

        SoMe.composed_url = replaceBuiltInPlaceholders(SoMe.composed_url);

        // Check if there is some string like this {some text} in the composed url
        // If so add whats in side this as a custom_share_link_values
        let matches = SoMe.composed_url.match(/\{(.*?)\}/g);

        if (matches) {
            matches.forEach((match) => {
                if (['title', 'url'].includes(match)) return;
                
                let name = match.replace('{', '').replace('}', '') as string;
                
                console.log('Custom value placeholder recognized:', name);

                if (name in $custom_share_link_values) {
                    let custom_share_link_value = $encode_urls ? encodeURIComponent($custom_share_link_values[name]) : $custom_share_link_values[name];

                    SoMe.composed_url = SoMe.composed_url.replace(match, custom_share_link_value);
                } else {
                    $custom_share_link_values[name] = '';
                    custom_share_link_values.set($custom_share_link_values);
                }
            });
        }

        // do it again to replace the custom values
        SoMe.composed_url = replaceBuiltInPlaceholders(SoMe.composed_url);
    })

    // Remove disabled share links
    combined_share_links = combined_share_links.filter((SoMe) => SoMe.enabled);

    return combined_share_links;
});

// Subscribe to the share_links store and update the all_share_links store


export function createPersistentStore<T>(key: string, initialValue: T) {
    const storedValue = localStorage.getItem(key);
    const data = storedValue ? JSON.parse(storedValue) : initialValue;
    const store = writable<T>(data);

    store.subscribe($data => {
        localStorage.setItem(key, JSON.stringify($data));
    });

    return store;
}