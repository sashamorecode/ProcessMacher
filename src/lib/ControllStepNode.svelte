<script lang="ts">
    import { Handle, Position, type NodeProps } from "@xyflow/svelte";
    let { data }: NodeProps = $props();
    import { stepEditor } from "./processState.svelte";
    import EditButton from "./UIComponents/editButton.svelte";
    import ProcessStepEditor from "./processStepEditor.svelte";
    const onClickEdit = ({ event }) => {
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
    <div>
        {data.condition}
    </div>
    <EditButton classProp="nodrag" onclick={onClickEdit}></EditButton>
</div>
<Handle
    id="pos"
    type="source"
    class="!bg-green-500"
    position={Position.Right}
/>
<Handle id="neg" type="source" class="!bg-red-500" position={Position.Bottom} />
