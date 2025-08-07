<script>
    import Agents from "$lib/agents.svelte";
    import Process from "$lib/process.svelte";
    import ProcessStepEditor from "$lib/processStepEditor.svelte";
    import Save from "$lib/Save.svelte";
    import { SvelteFlowProvider } from "@xyflow/svelte";
    import "../app.css";
    export const prerender = true;
</script>

<SvelteFlowProvider>
    <nav class="bg-white border-gray-200 py-2.5 dark:bg-gray-900 h-[6vh]">
        <div class="flex flex-wrap">
            <Save class="rounded-lg px-1 py-0.5 ml-auto mr-2 hover:bg-red-500"></Save>
        </div>
    </nav>
    <div class="absolute z-10 opacity-95 mt-5">
        <Agents></Agents>
    </div>
    <ProcessStepEditor></ProcessStepEditor>

    <Process class="w-full h-[94vh]"></Process>
</SvelteFlowProvider>
