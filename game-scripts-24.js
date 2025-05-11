const GAME_SCRIPTS_24 = {
    fighting: {
        combatAutomation: [
            {
                title: "Advanced Combat Optimizer",
                description: "Advanced combat system with combo optimization and health-based strategy",
                game: "Fighting Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")

local comboPatterns = {
    {
        keys = {"q", "w", "e", "r"},
        delays = {0.1, 0.2, 0.1, 0.3},
        damage = 100,
        priority = 1,
        cooldown = 5
    },
    {
        keys = {"w", "e", "q", "r"},
        delays = {0.2, 0.1, 0.1, 0.3},
        damage = 80,
        priority = 2,
        cooldown = 4
    },
    {
        keys = {"e", "q", "w", "r"},
        delays = {0.1, 0.1, 0.2, 0.3},
        damage = 60,
        priority = 3,
        cooldown = 3
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
    local enemyHealth = 0
    local enemyMaxHealth = 0
    
    local nearestEnemy = nil
    local shortestDistance = math.huge
    
    for _, enemy in pairs(workspace.Enemies:GetChildren()) do
        if enemy:IsA("Model") then
            local distance = (player.Character.HumanoidRootPart.Position - enemy.HumanoidRootPart.Position).Magnitude
            if distance < shortestDistance then
                shortestDistance = distance
                nearestEnemy = enemy
                enemyHealth = enemy.Humanoid.Health
                enemyMaxHealth = enemy.Humanoid.MaxHealth
            end
        end
    end
    
    if health > 75 then
        return comboPatterns[1]
    elseif health > 50 then
        return comboPatterns[2]
    else
        return comboPatterns[3]
    end
end

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
    local dodgePatterns = {
        {direction = Vector3.new(10, 0, 0)},
        {direction = Vector3.new(-10, 0, 0)},
        {direction = Vector3.new(0, 0, 10)},
        {direction = Vector3.new(0, 0, -10)}
    }
    
    local pattern = dodgePatterns[math.random(1, #dodgePatterns)]
    player.Character.Humanoid:MoveTo(player.Character.HumanoidRootPart.Position + pattern.direction)
    wait(0.5)
end

while wait() do
    if shouldDodge() then
        performDodge()
    else
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
    end
end`
            }
        ],
        farmAutomation: [
            {
                title: "Advanced Farm Optimizer",
                description: "Advanced farming system with target prioritization and path optimization",
                game: "Fighting Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")
local PathfindingService = game:GetService("PathfindingService")

local function calculateTargetValue(target)
    local health = target.Humanoid.Health
    local maxHealth = target.Humanoid.MaxHealth
    local distance = (player.Character.HumanoidRootPart.Position - target.HumanoidRootPart.Position).Magnitude
    local reward = target:GetAttribute("Reward") or 1
    local respawnTime = target:GetAttribute("RespawnTime") or 0
    
    return {
        value = (reward * (maxHealth - health)) / (distance * respawnTime),
        health = health,
        maxHealth = maxHealth,
        distance = distance,
        reward = reward,
        respawnTime = respawnTime
    }
end

local function findOptimalTarget()
    local targets = {}
    for _, target in pairs(workspace.Enemies:GetChildren()) do
        if target:IsA("Model") then
            local stats = calculateTargetValue(target)
            table.insert(targets, {
                enemy = target,
                stats = stats
            })
        end
    end
    
    table.sort(targets, function(a, b)
        return a.stats.value > b.stats.value
    end)
    
    return targets[1]
end

local function moveToTarget(target)
    local path = PathfindingService:CreatePath({
        AgentRadius = 2,
        AgentHeight = 5,
        AgentCanJump = true
    })
    
    local success, errorMessage = pcall(function()
        path:ComputeAsync(player.Character.HumanoidRootPart.Position, target.HumanoidRootPart.Position)
    end)
    
    if success then
        local waypoints = path:GetWaypoints()
        for _, waypoint in ipairs(waypoints) do
            player.Character.Humanoid:MoveTo(waypoint.Position)
            wait(0.1)
        end
    end
end

while wait() do
    local target = findOptimalTarget()
    if target then
        moveToTarget(target.enemy)
        if target.stats.distance < 10 then
            keypress("q")
            wait(0.1)
            keypress("w")
            wait(0.1)
            keypress("e")
            wait(0.1)
            keypress("r")
        end
    end
end`
            }
        ]
    }
};

window.GAME_SCRIPTS_24 = GAME_SCRIPTS_24; 