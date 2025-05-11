const GAME_SCRIPTS_2 = {
    // Tycoon Games (200 scripts)
    tycoon: [
        {
            title: "Auto Collect Money",
            description: "Automatically collects money from all money sources",
            game: "Pizza Tycoon",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `-- Auto Collect Money Script
local Players = game:GetService("Players")
local player = Players.LocalPlayer

while wait() do
    for _, money in pairs(workspace.Money:GetChildren()) do
        if money:IsA("Part") then
            firetouchinterest(player.Character.HumanoidRootPart, money, 0)
            wait(0.1)
            firetouchinterest(player.Character.HumanoidRootPart, money, 1)
        end
    end
end`
        },
        // ... Add 199 more tycoon scripts with similar structure
    ],

    // Simulator Games (200 scripts)
    simulator: [
        {
            title: "Auto Click",
            description: "Automatically clicks for you",
            game: "Click Simulator",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `-- Auto Click Script
local Players = game:GetService("Players")
local player = Players.LocalPlayer

while wait() do
    for _, button in pairs(workspace.Buttons:GetChildren()) do
        if button:IsA("Part") then
            fireclickdetector(button.ClickDetector)
        end
    end
end`
        },
        // ... Add 199 more simulator scripts with similar structure
    ],

    // Clicker Games (200 scripts)
    clicker: [
        {
            title: "Auto Upgrade",
            description: "Automatically upgrades all available upgrades",
            game: "Clicker Simulator",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `-- Auto Upgrade Script
local Players = game:GetService("Players")
local player = Players.LocalPlayer

while wait() do
    for _, upgrade in pairs(player.PlayerGui.Upgrades:GetChildren()) do
        if upgrade:IsA("TextButton") then
            fireclickdetector(upgrade.ClickDetector)
        end
    end
end`
        },
        // ... Add 199 more clicker scripts with similar structure
    ],

    // Fighting Games (200 scripts)
    fighting: [
        {
            title: "Auto Farm",
            description: "Automatically farms enemies for you",
            game: "Fighting Simulator",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `-- Auto Farm Script
local Players = game:GetService("Players")
local player = Players.LocalPlayer

while wait() do
    for _, enemy in pairs(workspace.Enemies:GetChildren()) do
        if enemy:IsA("Model") then
            player.Character.Humanoid:MoveTo(enemy.HumanoidRootPart.Position)
            wait(0.5)
            player.Character.Humanoid:EquipTool(player.Character.Tool)
            player.Character.Tool:Activate()
        end
    end
end`
        },
        // ... Add 199 more fighting scripts with similar structure
    ],

    // Adventure Games (200 scripts)
    adventure: [
        {
            title: "Auto Quest",
            description: "Automatically completes quests for you",
            game: "Adventure Simulator",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `-- Auto Quest Script
local Players = game:GetService("Players")
local player = Players.LocalPlayer

while wait() do
    for _, quest in pairs(player.PlayerGui.Quests:GetChildren()) do
        if quest:IsA("TextButton") then
            fireclickdetector(quest.ClickDetector)
        end
    end
end`
        },
        // ... Add 199 more adventure scripts with similar structure
    ]
};

// Export the scripts
window.GAME_SCRIPTS_2 = GAME_SCRIPTS_2; 