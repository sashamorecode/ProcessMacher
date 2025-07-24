<script>
    import Agents from "$lib/agents.svelte";
    import Process from "$lib/process.svelte";
    import ProcessStepEditor from "$lib/processStepEditor.svelte";
    import '../app.css';
    export const prerender = true
</script>

<div class="absolute z-10 opacity-95 mt-5">
    <Agents></Agents>
</div>
<div class="absolute z-10 opacity-95 mt-5 w-[30%] ml-[70%] h-[100%]">
    <ProcessStepEditor></ProcessStepEditor>
</div>
<Process></Process>

