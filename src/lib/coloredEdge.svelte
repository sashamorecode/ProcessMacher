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
    let { sourceHandleId, id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition, style } =
        $props();
    let [path] = $derived(
        getSmoothStepPath({ sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition }),
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
