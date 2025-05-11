const GAME_SCRIPTS_25 = {
    adventure: {
        questAutomation: [
            {
                title: "Advanced Quest Optimizer",
                description: "Advanced quest system with smart pathfinding and reward optimization",
                game: "Adventure Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")
local PathfindingService = game:GetService("PathfindingService")

local function calculateQuestValue(quest)
    local reward = quest:GetAttribute("Reward") or 0
    local timeRequired = quest:GetAttribute("TimeRequired") or 0
    local difficulty = quest:GetAttribute("Difficulty") or 1
    local distance = (player.Character.HumanoidRootPart.Position - quest.Target.Position).Magnitude
    
    return {
        value = (reward * difficulty) / (timeRequired * distance),
        reward = reward,
        timeRequired = timeRequired,
        difficulty = difficulty,
        distance = distance
    }
end

local function findOptimalQuest()
    local quests = {}
    for _, quest in pairs(workspace.Quests:GetChildren()) do
        if quest:IsA("Model") then
            local stats = calculateQuestValue(quest)
            table.insert(quests, {
                quest = quest,
                stats = stats
            })
        end
    end
    
    table.sort(quests, function(a, b)
        return a.stats.value > b.stats.value
    end)
    
    return quests[1]
end

local function optimizePath(target)
    local path = PathfindingService:CreatePath({
        AgentRadius = 2,
        AgentHeight = 5,
        AgentCanJump = true
    })
    
    local success, errorMessage = pcall(function()
        path:ComputeAsync(player.Character.HumanoidRootPart.Position, target.Position)
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
    local quest = findOptimalQuest()
    if quest then
        optimizePath(quest.quest.Target)
        if (player.Character.HumanoidRootPart.Position - quest.quest.Target.Position).Magnitude < 10 then
            fireclickdetector(quest.quest.Target.ClickDetector)
        end
    end
end`
            }
        ],
        lootCollection: [
            {
                title: "Advanced Loot Optimizer",
                description: "Advanced loot collection system with value optimization and path finding",
                game: "Adventure Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")
local PathfindingService = game:GetService("PathfindingService")

local function calculateLootValue(loot)
    local rarity = loot:GetAttribute("Rarity") or 1
    local value = loot:GetAttribute("Value") or 0
    local distance = (player.Character.HumanoidRootPart.Position - loot.Position).Magnitude
    
    return {
        value = (value * rarity) / distance,
        rarity = rarity,
        value = value,
        distance = distance
    }
end

local function findOptimalLoot()
    local loots = {}
    for _, loot in pairs(workspace.Loot:GetChildren()) do
        if loot:IsA("BasePart") then
            local stats = calculateLootValue(loot)
            table.insert(loots, {
                loot = loot,
                stats = stats
            })
        end
    end
    
    table.sort(loots, function(a, b)
        return a.stats.value > b.stats.value
    end)
    
    return loots[1]
end

local function optimizePath(target)
    local path = PathfindingService:CreatePath({
        AgentRadius = 2,
        AgentHeight = 5,
        AgentCanJump = true
    })
    
    local success, errorMessage = pcall(function()
        path:ComputeAsync(player.Character.HumanoidRootPart.Position, target.Position)
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
    local loot = findOptimalLoot()
    if loot then
        optimizePath(loot.loot)
        if (player.Character.HumanoidRootPart.Position - loot.loot.Position).Magnitude < 10 then
            fireclickdetector(loot.loot.ClickDetector)
        end
    end
end`
            }
        ]
    }
};

window.GAME_SCRIPTS_25 = GAME_SCRIPTS_25; 