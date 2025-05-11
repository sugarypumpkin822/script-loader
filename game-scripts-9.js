const GAME_SCRIPTS_9 = {
    simulator: {
        clickAutomation: [
            {
                title: "Auto Clicker",
                description: "Basic auto clicking script",
                game: "Click Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

while wait() do
    mouse1click()
end`
            }
        ],
        collectionAutomation: [
            {
                title: "Item Collector",
                description: "Basic item collection script",
                game: "Click Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

while wait() do
    for _, item in pairs(workspace.Items:GetChildren()) do
        if item:IsA("Part") then
            firetouchinterest(player.Character.HumanoidRootPart, item, 0)
            wait(0.1)
            firetouchinterest(player.Character.HumanoidRootPart, item, 1)
        end
    end
end`
            }
        ]
    }
};

window.GAME_SCRIPTS_9 = GAME_SCRIPTS_9; 