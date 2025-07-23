export const agentList = $state([
        { role: "user", status: "active" },
        { role: "admin", status: "active" },
    ]);
export const stepEditor = $state({
        active: false,
        currentStepID: null,
        data: null,
    });
