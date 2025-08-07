<script lang="ts">
    import { derived } from "svelte/store";
    import { stepEditor, stepState, agentList } from "./processState.svelte";
    import EditButton from "./UIComponents/editButton.svelte";
    let itemTypes = [
        "Output Text",
        "Input  Text",
        "Input  Date",
        "Input  Document",
        "Input  Image",
        "Input  Number",
    ];
    let controllItemTypes = ["Output Variable", "Input Decision"];
    type FormItem = {
        type: string;
        name: string;
        label: string;
        isBeingEdited: boolean;
        data?: any;
    };
    let formItems: FormItem[] = $derived(
        stepState.at(stepEditor.currentStepID)?.formItems,
    );
    let isControllBlock = $derived(
        stepState.at(stepEditor.currentStepID)?.type === "control",
    );
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
    //styles
    let itemStyle = {
        default: "flex flex-row space-x-3",
        active: "flex flex-row space-x-4 py-0.5",
    };
</script>

{#if stepEditor.active}
    <div class="absolute z-10 opacity-[98.5%] mt-5 w-[30%] ml-[70%] h-auto max-h-[90vh] overflow-y-scroll">
        <div
            class="p-5 bg-gradient-to-br from-slate-700 to-slate-800 rounded-lg h-[95%] overflow-y-scroll m-3"
        >
            <button
                class="text-white bg-red-300 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition absolute translate-x-[-2vw] translate-y-[-3.5vh]"
                onclick={(event) => {
                    onCloseWindow({ event });
                }}>-</button
            >
            <div
                class="font-bold text-4xl text-center text-neutral-200 rounded-lg"
            >
                <input
                    type="text"
                    class="font-bold text-4xl text-center"
                    bind:value={stepState[stepEditor.currentStepID].label}
                />
            </div>
            <div
                class="font-bold text-2xl mt-5 mx- rounded-lg text-neutral-200 flex flex-row justify-center"
            >
                <label class="mr-2">Agent:</label>
                <select
                    bind:value={stepState[stepEditor.currentStepID].agent}
                    class="text-center"
                >
                    {#each agentList as agent}
                        {#if agent.status != "deleted"}
                            <option value={agent.role}>{agent.role}</option>
                        {/if}
                    {/each}
                </select>
            </div>
            <div class="mt-5 flex flex-col space-y-2">
                <div class="text-5xl text-center">
                    <button
                        onclick={(event) => {
                            onAddItemMenu({ event });
                        }}
                        class="text-blue-800 transition hover:text-red-600"
                        >+</button
                    >
                </div>

                {#each formItems as formItem, idx}
                    {#if formItem.isBeingEdited}
                        <div
                            class="text-2xl text-neutral-300 border-3 rounded-lg flex flex-col overflow-scroll border-red-300 p-2 mb-10 space-y-2"
                        >
                            <div class={itemStyle.active}>
                                <div>Type:</div>
                                <select bind:value={formItem.type}>
                                    {#if isControllBlock}
                                        {#each controllItemTypes as t}
                                            <option value={t}>{t}</option>
                                        {/each}
                                    {:else}
                                        {#each itemTypes as t}
                                            <option value={t}>{t}</option>
                                        {/each}
                                    {/if}
                                </select>
                                <div
                                    class="rounded-md bg-red-400 shrink px-2 justify-end ml-auto mr-1"
                                >
                                    <button
                                        onclick={() =>
                                            onSaveItem({ event, idx })}
                                    >
                                        SAVE
                                    </button>
                                </div>
                            </div>
                            <div class={itemStyle.active}>
                                <div>User Text:</div>
                                <div>
                                    <input
                                        bind:value={formItem.label}
                                        type="text"
                                        class=""
                                    />
                                </div>
                            </div>
                            {#if formItem.type === "Output Variable"}
                                <div>TODO</div>
                            {/if}
                            {#if formItem.type !== "Output Text" && !isControllBlock}
                                <div class={itemStyle.active}>
                                    <div>Variable Name:</div>
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
                        <div
                            class="text-xl flex flex-col space-y-2 mx-4 border-3 text-neutral-400 p-2 rounded-lg"
                        >
                            <div class="flex flex-row space-x-3">
                                <div class="">
                                    {formItem.type.toUpperCase()}
                                </div>
                                <div>|</div>
                                <div class="">
                                    {formItem.name}
                                </div>
                                <div class="scale-150 ml-auto mr-1">
                                    <EditButton
                                        classProp=""
                                        onclick={(event) => {
                                            onClickEdit({ event, idx });
                                        }}
                                    ></EditButton>
                                </div>
                            </div>
                            <div class="flex flex-row space-x-3">
                                <div>User Text:</div>
                                <div>
                                    {formItem.label}
                                </div>
                            </div>
                        </div>
                        <div class="text-5xl text-center">
                            <button
                                onclick={(event) => {
                                    onAddItemMenu({ event, idx });
                                }}
                                class="text-blue-800 hover:text-red-600"
                                >+</button
                            >
                        </div>
                    {/if}
                {/each}
            </div>
        </div>
    </div>
{/if}
