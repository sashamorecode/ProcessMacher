<script>
    import Agents from "$lib/agents.svelte";
    import Process from "$lib/process.svelte";
    import ProcessStepEditor from "$lib/processStepEditor.svelte";
    import Save from "$lib/Save.svelte";
    import { SvelteFlow, SvelteFlowProvider } from "@xyflow/svelte";
    import "../app.css";
    export const prerender = true;
</script>

<SvelteFlowProvider>
    <Save></Save>
    <div class="absolute z-10 opacity-95 mt-5">
        <Agents></Agents>
    </div>
    <ProcessStepEditor></ProcessStepEditor>

    <Process></Process>
</SvelteFlowProvider>
