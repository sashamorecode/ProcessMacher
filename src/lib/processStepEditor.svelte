<script lang="ts">
    import { applyAction } from "$app/forms";
    import { stepEditor, stepState } from "./processState.svelte";
    type FormItem = {
        type: string;
        name: string;
        label: string;
        data?: any;
    };
    let formItems: FormItem[] = $state([
        {
            type: "output",
            name: "Test",
            label: "Please Enter your personal information",
            data: 2,
        },
        {
            type: "output",
            name: "241",
            label: "yaiaopiajfaipwjiour personal information",
            data: 2,
        },
    ]);
</script>

{#if stepEditor.active}
    <div class="p-6 bg-rose-200 rounded-lg h-[95%] overflow-y-scroll">
        <div class="font-bold text-4xl text-center">
            {stepState[stepEditor.currentStepID].label}
        </div>
        <div class="pt-5">
            {#each formItems as formItem}
                {#if formItem.type === "output"}
                    <div class="text-xl p-1 text-center">
                        {formItem.label}
                    </div>
                    <div class="text-5xl text-center">
                        <div class=" text-blue-800 hover:text-red-600">+</div>
                    </div>
                {/if}
            {/each}
        </div>
    </div>
{/if}
