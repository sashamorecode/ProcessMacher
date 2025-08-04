<script lang="ts">
    import { useNodes, useEdges, useViewport } from "@xyflow/svelte";
    import { agentList } from "./processState.svelte";
    import Agents from "./agents.svelte";
    import type { EventHandler } from "svelte/elements";

    let nodes = useNodes();
    let edges = useEdges();
    let viewport = useViewport();
    function serializeState() {
        let mState = {
            name: "TODO",
            version: 0,
            nodes: nodes.current,
            edges: edges.current,
            agents: agentList,
            viewport: viewport.current,
        };
        return JSON.stringify(mState);
    }
    function restoreState(stringState: string) {
        let mState = JSON.parse(stringState);
        nodes.set(mState.nodes);
        edges.set(mState.edges);
        viewport.set(mState.viewport);
        while (agentList.length != 0) {
            agentList.pop();
        }
        for (const agent of mState.agents) {
            agentList.push(agent);
        }
    }

    function saveState(event: Event) {
        event.preventDefault();
        let stringState = serializeState();
        console.log(stringState);
    }
</script>

<div>
    <button class="text-2xl absolute w-[10vw] h-10 bg-red-400 z-10 translate-x-[90vw]" onclick={saveState}>Save</button>
</div>
