const GAME_SCRIPTS_14 = {
    fighting: {
        combatAutomation: [
            {
                title: "Advanced Combat System",
                description: "Advanced combat system with combo optimization",
                game: "Fighting Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")

local comboPatterns = {
    {
        keys = {"q", "w", "e", "r"},
        delays = {0.1, 0.2, 0.1, 0.3}
    },
    {
        keys = {"w", "e", "q", "r"},
        delays = {0.2, 0.1, 0.1, 0.3}
    },
    {
        keys = {"e", "q", "w", "r"},
        delays = {0.1, 0.1, 0.2, 0.3}
    }
}

local function performCombo(pattern)
    for i, key in ipairs(pattern.keys) do
        keypress(key)
        wait(pattern.delays[i])
    end
end

local function getOptimalCombo()
    local health = player.Character.Humanoid.Health
    if health > 75 then
        return comboPatterns[1]
    elseif health > 50 then
        return comboPatterns[2]
    else
        return comboPatterns[3]
    end
end

while wait() do
    local nearestEnemy = nil
    local shortestDistance = math.huge
    
    for _, enemy in pairs(workspace.Enemies:GetChildren()) do
        if enemy:IsA("Model") then
            local distance = (player.Character.HumanoidRootPart.Position - enemy.HumanoidRootPart.Position).Magnitude
            if distance < shortestDistance then
                shortestDistance = distance
                nearestEnemy = enemy
            end
        end
    end
    
    if nearestEnemy and shortestDistance < 10 then
        local combo = getOptimalCombo()
        performCombo(combo)
    end
end`
            }
        ],
        dodgeAutomation: [
            {
                title: "Smart Dodge System",
                description: "Advanced dodge system with pattern recognition",
                game: "Fighting Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")

local dodgePatterns = {
    {direction = Vector3.new(10, 0, 0)},
    {direction = Vector3.new(-10, 0, 0)},
    {direction = Vector3.new(0, 0, 10)},
    {direction = Vector3.new(0, 0, -10)}
}

local function shouldDodge()
    local nearestEnemy = nil
    local shortestDistance = math.huge
    
    for _, enemy in pairs(workspace.Enemies:GetChildren()) do
        if enemy:IsA("Model") then
            local distance = (player.Character.HumanoidRootPart.Position - enemy.HumanoidRootPart.Position).Magnitude
            if distance < shortestDistance then
                shortestDistance = distance
                nearestEnemy = enemy
            end
        end
    end
    
    return nearestEnemy and shortestDistance < 5 and enemy:GetAttribute("IsAttacking")
end

local function performDodge()
    local pattern = dodgePatterns[math.random(1, #dodgePatterns)]
    player.Character.Humanoid:MoveTo(player.Character.HumanoidRootPart.Position + pattern.direction)
    wait(0.5)
end

while wait() do
    if shouldDodge() then
        performDodge()
    end
end`
            }
        ]
    }
};

window.GAME_SCRIPTS_14 = GAME_SCRIPTS_14; 