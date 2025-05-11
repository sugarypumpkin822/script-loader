const GAME_SCRIPTS_11 = {
    adventure: {
        questAutomation: [
            {
                title: "Quest Auto-Completer",
                description: "Basic quest automation script",
                game: "Adventure Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

while wait() do
    for _, quest in pairs(player.PlayerGui.Quests:GetChildren()) do
        if quest:IsA("TextButton") then
            fireclickdetector(quest.ClickDetector)
            wait(0.1)
        end
    end
end`
            }
        ],
        lootCollection: [
            {
                title: "Loot Collector",
                description: "Basic loot collection script",
                game: "Adventure Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

local function getNearestLoot()
    local nearest = nil
    local shortestDistance = math.huge
    
    for _, loot in pairs(workspace.Loot:GetChildren()) do
        if loot:IsA("Part") then
            local distance = (player.Character.HumanoidRootPart.Position - loot.Position).Magnitude
            if distance < shortestDistance then
                shortestDistance = distance
                nearest = loot
            end
        end
    end
    return nearest
end

while wait() do
    local nearestLoot = getNearestLoot()
    if nearestLoot then
        player.Character.Humanoid:MoveTo(nearestLoot.Position)
        wait(0.5)
        firetouchinterest(player.Character.HumanoidRootPart, nearestLoot, 0)
        wait(0.1)
        firetouchinterest(player.Character.HumanoidRootPart, nearestLoot, 1)
    end
end`
            }
        ]
    }
};

window.GAME_SCRIPTS_11 = GAME_SCRIPTS_11; 