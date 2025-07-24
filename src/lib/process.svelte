<script lang="ts">
    import {
        SvelteFlow,
        Controls,
        Background,
        type Node,
        type Edge,
        type NodeEventWithPointer,
        Position,
    } from "@xyflow/svelte";
    import "@xyflow/svelte/dist/style.css";

    import { agentList, stepState } from "./processState.svelte.js";
    import ProcessStepNode from "./ProcessStepNode.svelte";
    import ControllStepNode from "./ControllStepNode.svelte";

    const nodeTypes = {
        processStep: ProcessStepNode,
        controllStep: ControllStepNode,
    };
    // Always have start and end nodes fixed
    const startNode: Node = {
        id: "start",
        type: "input",
        data: stepState[0],
        position: { x: 50, y: 200 },
        sourcePosition: Position.Right,
    };

    const endNode: Node = {
        id: "end",
        type: "output",
        data: stepState[1],
        position: { x: 650, y: 200 },
        targetPosition: Position.Left,
    };

    // State for nodes and edges
    let nodes: Node[] = [
        startNode,
        endNode,
        {
            id: "1",
            data: stepState[2],
            type: "processStep",
            position: { x: 400, y: 200 },
        },
    ];
    let edges: Edge[] = [];

    // Context menu state
    let contextMenuX = 0;
    let contextMenuY = 0;
    let contextMenuTargetNodeId: string | null = null;
    let showContextMenu = false;

    // Node creation modal state
    let showCreateNodeModal = false;
    let newNodeType: "input" | "control" = "input";
    let newNodeName = "";
    let newNodeAgent = "";
    let newNodeCondition = "";

    // Utility: Generate unique ID for new nodes
    function generateNodeId() {
        return "node_" + Math.random().toString(36).substr(2, 9);
    }

    // Right-click handler on graph area
    const onPaneContextMenu = ({ event }) => {
        event.preventDefault();
        showContextMenu = true;
        contextMenuTargetNodeId = null;
        contextMenuX = event.clientX;
        contextMenuY = event.clientY;
        console.log("click graph");
    };

    // Right-click handler on a node
    const onNodeContextMenu: NodeEventWithPointer = ({ event, node }) => {
        event.preventDefault();
        showContextMenu = true;
        contextMenuTargetNodeId = node.id;
        contextMenuX = event.clientX;
        contextMenuY = event.clientY;
        console.log("click node");
    };

    // Add node action opens creation modal
    function onAddActivityNode() {
        showCreateNodeModal = true;
        showContextMenu = false;
        newNodeName = "";
        newNodeAgent = "";
        newNodeCondition = "";
        newNodeType = "input";
    }

    function onAddControlNode() {
        showCreateNodeModal = true;
        showContextMenu = false;
        newNodeName = "";
        newNodeAgent = "";
        newNodeCondition = "";
        newNodeType = "control";
    }

    // Delete node action
    function onDeleteNode() {
        if (!contextMenuTargetNodeId) return;

        // Prevent deleting start/end nodes
        if (
            contextMenuTargetNodeId === "start" ||
            contextMenuTargetNodeId === "end"
        ) {
            alert("Cannot delete start or end nodes.");
            showContextMenu = false;
            return;
        }

        // Remove node and all connected edges
        nodes = nodes.filter((n) => n.id !== contextMenuTargetNodeId);
        edges = edges.filter(
            (e) =>
                e.source !== contextMenuTargetNodeId &&
                e.target !== contextMenuTargetNodeId,
        );
        showContextMenu = false;
    }

    // Confirm new node creation
    function createNode() {
        if (!newNodeName.trim() || !newNodeAgent.trim()) {
            alert("Name and Agent are required.");
            return;
        }
        const id = generateNodeId();
        let newNodeTypeName = "";
        if (newNodeType === "input") {
            newNodeTypeName = "processStep";
            stepState.push({
                id: stepState.length,
                label: newNodeName.trim(),
                agent: newNodeAgent.trim(),
                type: "input",
                formItems: [],
            });
        } else {
            newNodeTypeName = "controllStep";
            stepState.push({
                id: stepState.length,
                label: newNodeName.trim(),
                agent: newNodeAgent.trim(),
                condition: newNodeCondition.trim(),
                type: "control",
                formItems: [],
            });
        }

        // Determine position near last context menu
        const position = { x: contextMenuX - 400, y: contextMenuY - 300 };
        nodes = [
            ...nodes,
            {
                id:id,
                type: newNodeTypeName,
                data: stepState.at(-1),
                position,
                sourcePosition: Position.Right,
                targetPosition: Position.Left,
            },
        ];

        // Add an edge from right-clicked node if any and allowed (input node only one outgoing)
        if (contextMenuTargetNodeId) {
            // For input nodes: allow only one outgoing edge
            const fromNode = nodes.find(
                (n) => n.id === contextMenuTargetNodeId,
            );
            if (fromNode && fromNode.data.type === "input") {
                // Check if edge already exists from this node, remove if exists (only one allowed)
                edges = edges.filter((e) => !(e.source === fromNode.id));
            }
            // Add new edge connecting from source node (if any) to new node
            if (contextMenuTargetNodeId !== "end") {
                edges = [
                    ...edges,
                    {
                        id: `e_${contextMenuTargetNodeId}_${id}`,
                        source: contextMenuTargetNodeId,
                        target: id,
                    },
                ];
            }
        }

        showCreateNodeModal = false;
    }

    // Close context menu on click outside
    function closeContextMenu() {
        showContextMenu = false;
    }

    // Close node modal
    function closeCreateNodeModal() {
        showCreateNodeModal = false;
    }
</script>

<div class="relative w-full h-screen">
    <SvelteFlow
        bind:nodes
        bind:edges
        {nodeTypes}
        fitView
        onnodecontextmenu={onNodeContextMenu}
        onpanecontextmenu={onPaneContextMenu}
        class="bg-gray-100"
        defaultEdgeOptions={{ animated: 'true' }}
    >
        <Background />
        <Controls />
    </SvelteFlow>

    {#if showContextMenu}
        <ul
            class="context-menu absolute bg-white border rounded shadow-md w-40 py-1"
            style="top: {contextMenuY}px; left: {contextMenuX}px;"
            on:click|stopPropagation
        >
            <li
                class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                on:click={onAddActivityNode}
            >
                Add Activity
            </li>
            <li
                class="px-4 py-2 hover:bg-gray-200 cursor-pointer"
                on:click={onAddControlNode}
            >
                Add Control
            </li>
            {#if contextMenuTargetNodeId && contextMenuTargetNodeId !== "start" && contextMenuTargetNodeId !== "end"}
                <li
                    class="px-4 py-2 hover:bg-red-500 hover:text-white cursor-pointer"
                    on:click={onDeleteNode}
                >
                    Delete Node
                </li>
            {/if}
        </ul>
        <div class="fixed inset-0" on:click={closeContextMenu}></div>
    {/if}

    {#if showCreateNodeModal}
        <div
            class="fixed inset-0 flex items-center justify-center modal-bg p-4"
        >
            <div class="bg-white rounded shadow-lg p-6 w-96 max-w-full">
                <h2 class="text-xl font-semibold mb-4">Create New Node</h2>
                <div class="mb-4">
                    <label class="block font-medium mb-1">Node Type:</label>
                    <select
                        bind:value={newNodeType}
                        class="w-full border rounded px-2 py-1"
                    >
                        <option value="input">Activity Node</option>
                        <option value="control">Control Node</option>
                    </select>
                </div>

                <div class="mb-4">
                    <label class="block font-medium mb-1">Name:</label>
                    <input
                        type="text"
                        bind:value={newNodeName}
                        class="w-full border rounded px-2 py-1"
                    />
                </div>

                <div class="mb-4">
                    <label class="block font-medium mb-1">Agent:</label>
                    <select
                        bind:value={newNodeAgent}
                        class="w-full border rounded px-2 py-1"
                    >
                        {#each agentList as agent}
                            {#if agent.status != "deleted"}
                                <option value={agent.role}>{agent.role}</option>
                            {/if}
                        {/each}
                    </select>
                </div>

                {#if newNodeType === "control"}
                    <div class="mb-4">
                        <label class="block font-medium mb-1">Condition:</label>
                        <input
                            type="text"
                            bind:value={newNodeCondition}
                            class="w-full border rounded px-2 py-1"
                        />
                    </div>
                {/if}

                <div class="flex justify-end space-x-3">
                    <button
                        class="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
                        on:click={closeCreateNodeModal}>Cancel</button
                    >
                    <button
                        class="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                        on:click={createNode}>Create</button
                    >
                </div>
            </div>
        </div>
    {/if}
</div>

<style>
    /* Fix contextmenu z-index */
    .context-menu {
        z-index: 1000;
    }

    .modal-bg {
        background-color: rgba(0, 0, 0, 0.4);
    }
</style>
