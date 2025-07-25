<script lang="ts">
    import {
        BaseEdge,
        getBezierPath,
        useEdges,
        EdgeLabel,
        type EdgeProps,
        getSmoothStepPath,
    } from "@xyflow/svelte";
    import { derived } from "svelte/store";
    let { sourceHandleId, id, sourceX, sourceY, targetX, targetY, style } =
        $props();
    let [path] = $derived(
        getSmoothStepPath({ sourceX, sourceY, targetX, targetY }),
    );
    style =
        sourceHandleId === "pos"
            ? "stroke: green;"
            : sourceHandleId === "neg"
              ? "stroke: red;"
              : "stroke: black;";
    let animated = "true";
</script>

<BaseEdge {id} {style} {path}></BaseEdge>
