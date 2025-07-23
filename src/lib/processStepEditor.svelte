<script lang="ts">
    import { stepEditor, stepState } from "./processState.svelte";
    let itemTypes = [
        "output-text",
        "input-text",
        "input-document",
        "input-image",
    ];
    type FormItem = {
        type: string;
        name: string;
        label: string;
        isBeingEdited: boolean;
        data?: any;
    };
    let formItems: FormItem[] = $state([]);
    const onAddItemMenu = ({ event, idx }) => {
        event.preventDefault();
        formItems.splice(idx + 1, 0, {
            type: "output",
            name: "Set Name",
            label: "Set Text",
            isBeingEdited: true,
        });
    };
    const onClickEdit = ({ event, idx }) => {
        event.preventDefault();
        formItems[idx].isBeingEdited = true;
    };
    const onSaveItem = ({ event, idx }) => {
        event.preventDefault();
        formItems[idx].isBeingEdited = false;
    };
    const onCloseWindow = ({ event }) => {
        event.preventDefault();
        stepEditor.active = false;
    };
</script>

{#if stepEditor.active}
    <div class="p-6 bg-rose-200 rounded-lg h-[95%] overflow-y-scroll">
        <button
            class="text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition"
            onclick={(event) => {
                onCloseWindow({ event });
            }}>-</button
        >
        <div class="font-bold text-4xl text-center">
            {stepState[stepEditor.currentStepID].label}
        </div>
        <div class="pt-5 flex flex-col">
            <div class="text-5xl text-center">
                <button
                    onclick={(event) => {
                        onAddItemMenu({ event });
                    }}
                    class="text-blue-800 hover:text-red-600">+</button
                >
            </div>

            {#each formItems as formItem, idx}
                {#if formItem.isBeingEdited}
                    <div
                        class="text-xl border-3 rounded-lg flex flex-col space-y-5"
                    >
                        <div class="flex flex-row space-x-4">
                            <div class="rounded-md bg-red-400 shrink px-2">
                                <button
                                    onclick={() => onSaveItem({ event, idx })}
                                >
                                    SAVE
                                </button>
                            </div>
                        </div>

                        <div class="flex flex-row space-x-4">
                            <div>Type:</div>
                            <select bind:value={formItem.type}>
                                {#each itemTypes as t}
                                    <option value={t}>{t}</option>
                                {/each}
                            </select>
                        </div>
                        {#if formItem.type === "output-text"}
                            <div class="flex flex-row space-x-4">
                                <div>Enter Label:</div>
                                <div>
                                    <input
                                        bind:value={formItem.label}
                                        type="text"
                                        class=""
                                    />
                                </div>
                            </div>
                        {/if}
                        {#if formItem.type === "input-text"}
                            <div class="flex flex-row space-x-4">
                                <div>Enter Variable Name:</div>
                                <div>
                                    <input
                                        bind:value={formItem.name}
                                        type="text"
                                    />
                                </div>
                            </div>
                            <div class="flex flex-row space-x-4">
                                <div>Enter Label Text:</div>
                                <div>
                                    <input
                                        bind:value={formItem.label}
                                        type="text"
                                    />
                                </div>
                            </div>
                        {/if}
                        {#if formItem.type == "input-image" || formItem.type === "input-document"}
                            <div class="flex flex-row space-x-4">
                                <div>name:</div>
                                <div>
                                    <input
                                        bind:value={formItem.name}
                                        type="text"
                                    />
                                </div>
                            </div>
                        {/if}
                    </div>
                {:else}
                    <div class="border-3 m-3 rounded-lg flex-row space-x-4">
                        <button onclick={() => onClickEdit({ event, idx })}>
                            <div
                                class="rounded-md text-center px-1 py-0.5 bg-red-400 shrink"
                            >
                                EDIT
                            </div>
                        </button>
                        <div class="text-xl p-1 text-center">
                            {formItem.label}
                        </div>
                    </div>
                    <div class="text-5xl text-center">
                        <button
                            onclick={(event) => {
                                onAddItemMenu({ event, idx });
                            }}
                            class="text-blue-800 hover:text-red-600">+</button
                        >
                    </div>
                {/if}
            {/each}
        </div>
    </div>
{/if}
