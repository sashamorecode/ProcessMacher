<script lang="ts">
    import type { EventHandler } from "svelte/elements";

    type Props = {
        onclick: EventHandler;
        classProp?: string;
    };
    let { onclick, classProp } = $props();
</script>

<button {onclick} class={classProp} aria-label="Edit Button">
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
