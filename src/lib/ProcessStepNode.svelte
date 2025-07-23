<script lang="ts">
    import { Handle, Position, type NodeEventWithPointer, type NodeProps } from "@xyflow/svelte";
    import {stepEditor} from "./processState.svelte"
    import ProcessStepEditor from "./processStepEditor.svelte";
    let { data}: NodeProps = $props();
    const onclickEdit = (({event}) => {
        stepEditor.currentStepID = data.id
        stepEditor.active = true
    })
</script>

<Handle type="target" position={Position.Left} />
<div class="maxw-[5vw] px-3 text-center">
    <div>
        {data.agent}
    </div>
    <div>
        {data.label}
    </div>
    <button class="nodrag" on:click={onclickEdit}>
        <svg
            width="15px"
            height="15px"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <g id="Complete">
                <g id="edit">
                    <g>
                        <path
                            d="M20,16v4a2,2,0,0,1-2,2H4a2,2,0,0,1-2-2V6A2,2,0,0,1,4,4H8"
                            fill="none"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                        />

                        <polygon
                            fill="none"
                            points="12.5 15.8 22 6.2 17.8 2 8.3 11.5 8 16 12.5 15.8"
                            stroke="#000000"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                        />
                    </g>
                </g>
            </g>
        </svg>
    </button>
</div>
<Handle type="source" position={Position.Right} />
