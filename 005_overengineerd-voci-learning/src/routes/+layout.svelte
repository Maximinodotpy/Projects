<script>
    import '../app.css';

    import  { base } from '$app/paths';
</script>

<div class="bg-neutral-300">
    <a class="inline-block p-2" href={`${base}/edit`}>Edit a Vocabulary Chart</a>
    or
    <a class="inline-block p-2" href={`${base}/learn`}>Learn</a>

    | <a class="inline-block p-2" href={`${base}/`}>Home</a>
</div>

<slot></slot>