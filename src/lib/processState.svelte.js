export const agentList = $state([
        { role: "user", status: "active" },
        { role: "admin", status: "active" },
    ]);
export const stepEditor = $state({
        active: false,
        currentStepID: null,
    });
export const stepState = $state([
        {id: 0,label: "Start", agent: "system", type: "start", condition: "never"},
        {id: 1,label: "end", agent: "system", type: "end"},
        {id: 2, label: "Start", agent: "system", type: "start"},
]);
