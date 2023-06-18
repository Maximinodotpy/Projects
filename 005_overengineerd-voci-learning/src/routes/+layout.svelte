<script>
    import '../app.css';

    import  { base } from '$app/paths';

    import { page } from '$app/stores'
</script>

<div class="border-b-[1.5px] px-4 py-2">
    <a class="inline-block mr-3 font-mono font-semibold" href={`${base}/`}>OverVocoLe</a>

    |

    <a class={`inline-block p-2 italic ${$page.route.id == '/edit' ? 'underline': '' }`} href={`${base}/edit`}>Chart Editor</a>
    or
    <a class={`inline-block p-2 italic ${$page.route.id == '/learn' ? 'underline': '' }`} href={`${base}/learn`}>Learn</a>
</div>

<slot></slot>