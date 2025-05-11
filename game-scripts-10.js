const GAME_SCRIPTS_10 = {
    fighting: {
        combatAutomation: [
            {
                title: "Auto Combat",
                description: "Basic combat automation script",
                game: "Fighting Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

while wait() do
    for _, enemy in pairs(workspace.Enemies:GetChildren()) do
        if enemy:IsA("Model") then
            player.Character.Humanoid:MoveTo(enemy.HumanoidRootPart.Position)
            wait(0.5)
            player.Character.Tool:Activate()
        end
    end
end`
            }
        ],
        farmAutomation: [
            {
                title: "Enemy Farm",
                description: "Basic enemy farming script",
                game: "Fighting Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

local function getNearestEnemy()
    local nearest = nil
    local shortestDistance = math.huge
    
    for _, enemy in pairs(workspace.Enemies:GetChildren()) do
        if enemy:IsA("Model") then
            local distance = (player.Character.HumanoidRootPart.Position - enemy.HumanoidRootPart.Position).Magnitude
            if distance < shortestDistance then
                shortestDistance = distance
                nearest = enemy
            end
        end
    end
    return nearest
end

while wait() do
    local nearestEnemy = getNearestEnemy()
    if nearestEnemy then
        player.Character.Humanoid:MoveTo(nearestEnemy.HumanoidRootPart.Position)
        wait(0.5)
        player.Character.Tool:Activate()
    end
end`
            }
        ]
    }
};

window.GAME_SCRIPTS_10 = GAME_SCRIPTS_10; 