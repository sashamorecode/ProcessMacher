<script>
    import { applyAction } from "$app/forms";
    import { stepEditor, stepState } from "./processState.svelte";
</script>

{#if stepEditor.active}
    <div class="p-6 bg-rose-200 rounded-lg h-[95%]">
        <div class="font-bold text-4xl text-center">
            {stepState[stepEditor.currentStepID].label}
        </div>
        <button onclick={() => {stepState[stepEditor.currentStepID].label="Fuck"}}>,,afspksf</button>
    </div>
{/if}
