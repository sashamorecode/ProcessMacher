<script>
    import { agentList } from "$lib/processState.svelte.js";
    let formVisable = $state(false);
    let role = $state("");
    function openForm() {
        console.log("open");
        formVisable = true;
    }
    function submitForm() {
        let agentAlreadyInList = false;
        agentList.map((a) => {
            if (a.role === role) {
                agentAlreadyInList = true;
                a.status = "active";
            }
            return a;
        });
        if (!agentAlreadyInList) {
            agentList.push({ role: role, status: "active" });
        }
        formVisable = false;
        role = "";
        console.log(agentList, role);
    }
    function cancelForm() {
        formVisable = false;
    }
    function removeAgent(index) {
        agentList[$state.snapshot(index).i].status = "deleted";
    }
</script>

<div class="p-6 mx-5 bg-slate-300 rounded-lg shadow-md space-y-4 opacity-[98%]">
    <h2 class="text-xl font-semibold text-gray-800">agentList</h2>

    <div class="grid grid-cols-1 gap-4">
        {#each agentList as a, i}
            {#if a.status !== "deleted"}
                <div
                    class="flex items-center justify-between bg-gray-50 p-3 rounded-md shadow-sm border border-gray-200"
                >
                    <span class="text-gray-700 font-medium mr-5">{a.role}</span>
                    <button
                        class="text-white bg-red-400 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center transition"
                        onclick={() => removeAgent({ i })}
                        aria-label="Remove Agent"
                    >
                        −
                    </button>
                </div>
            {/if}
        {/each}
    </div>

    <!-- Add Agent Button -->
    <button
        onclick={openForm}
        class="mt-4 text-white bg-slate-600 hover:bg-blue-700 px-4 py-2 rounded-md transition font-medium"
    >
        + Add Agent
    </button>

    {#if formVisable}
        <div
            id="new-agent-form"
            class="space-y-3 mt-4 bg-gray-50 p-4 rounded-md border border-gray-200"
        >
            <input
                type="text"
                bind:value={role}
                onkeydown={(event) => {
                    if (event.key === "Enter") {
                        submitForm();
                    }
                }}
                placeholder="Enter new role"
                class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <div class="flex justify-evenly space-x-2">
                <button
                    onclick={submitForm}
                    class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                >
                    Submit
                </button>
                <button
                    onclick={cancelForm}
                    class="bg-gray-300 hover:bg-gray-400 text-gray-800 px-4 py-2 rounded-md transition"
                >
                    Cancel
                </button>
            </div>
        </div>
    {/if}
</div>
