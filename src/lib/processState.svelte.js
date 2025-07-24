export const agentList = $state([
        { role: "user", status: "active" },
        { role: "admin", status: "active" },
    ]);
export const stepEditor = $state({
        active: false,
        currentStepID: 0,
    });
export const stepState = $state([
        {id: 0,label: "Start", agent: "system", type: "start", condition: "never",formItems:[] },
        {id: 1,label: "end", agent: "system", type: "end", formItems:[]},
        {id: 2, label: "Start", agent: "system", type: "start", formItems: []},
]);
