<script>
    import { applyAction } from "$app/forms";
    import { stepEditor } from "./processState.svelte";
    let data = $derived(stepEditor.data);
</script>

{#if stepEditor.active}
    <div class="p-6 bg-rose-200 rounded-lg h-[95%]">
        <div class="font-bold text-4xl text-center">
            {data.label}
        </div>
        <button onclick={()=>{data.label = "fffff"}}>  .... </button>
    </div>
{/if}
