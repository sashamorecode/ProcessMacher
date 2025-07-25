<script lang="ts">
    import {
        Handle,
        Position,
        type NodeEventWithPointer,
        type NodeProps,
    } from "@xyflow/svelte";
    import EditButton from "./UIComponents/editButton.svelte";
    import { stepEditor } from "./processState.svelte";
    import ProcessStepEditor from "./processStepEditor.svelte";
    import ColoredEdge from "./coloredEdge.svelte";
    let { data }: NodeProps = $props();
    const onclickEdit = ({ event }) => {
        stepEditor.currentStepID = data.id;
        stepEditor.active = true;
    };
</script>

<Handle type="target" position={Position.Left} />
<div class="maxw-[5vw] px-3 text-center">
    <div>
        {data.agent}
    </div>
    <div>
        {data.label}
    </div>
    <EditButton classProp="nodrag" onclick={onclickEdit}></EditButton>
</div>
<Handle type="source" position={Position.Right} />
