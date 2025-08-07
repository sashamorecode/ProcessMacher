<script lang="ts">
    import { useNodes, useEdges, useViewport } from "@xyflow/svelte";
    import { agentList } from "./processState.svelte";
    import Agents from "./agents.svelte";
    import type { EventHandler } from "svelte/elements";

    const CentralProcessServerBaseURL = "127.0.0.1:9999/";
    let props = $props();
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
        fetch(CentralProcessServerBaseURL + "processModel", {
            method: "POST",
            body: stringState,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => console.log(response.statusText));

        console.log(stringState);
    }
</script>

<button class="text-2xl bg-red-400 {props.class}" onclick={saveState}>Save</button>
