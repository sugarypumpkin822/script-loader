const GAME_SCRIPTS_21 = {
    adventure: {
        questAutomation: [
            {
                title: "Advanced Quest Manager",
                description: "Advanced quest automation with smart pathfinding and reward optimization",
                game: "Adventure Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local PathfindingService = game:GetService("PathfindingService")

local function calculateQuestValue(quest)
    local reward = quest.Reward.Value
    local time = quest.TimeRequired.Value
    local difficulty = quest.Difficulty.Value
    local distance = 0
    
    local target = workspace:FindFirstChild(quest.TargetName.Value)
    if target then
        distance = (player.Character.HumanoidRootPart.Position - target.Position).Magnitude
    end
    
    return {
        value = reward / (time * difficulty * distance),
        reward = reward,
        time = time,
        difficulty = difficulty,
        distance = distance
    }
end

local function optimizeQuestPath(target)
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

local function processQuests()
    local quests = {}
    for _, quest in pairs(player.PlayerGui.Quests:GetChildren()) do
        if quest:IsA("TextButton") then
            local stats = calculateQuestValue(quest)
            table.insert(quests, {
                button = quest,
                stats = stats
            })
        end
    end
    
    table.sort(quests, function(a, b)
        return a.stats.value > b.stats.value
    end)
    
    for _, quest in ipairs(quests) do
        fireclickdetector(quest.button.ClickDetector)
        wait(0.1)
        
        local target = workspace:FindFirstChild(quest.button.TargetName.Value)
        if target then
            optimizeQuestPath(target)
        end
    end
end

while wait() do
    processQuests()
end`
            }
        ],
        lootCollection: [
            {
                title: "Advanced Loot Manager",
                description: "Advanced loot collection with value optimization and pathfinding",
                game: "Adventure Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local PathfindingService = game:GetService("PathfindingService")

local function calculateLootValue(loot)
    local rarity = loot:GetAttribute("Rarity") or 1
    local baseValue = loot:GetAttribute("Value") or 1
    local distance = (player.Character.HumanoidRootPart.Position - loot.Position).Magnitude
    local timeToCollect = distance / 16 -- Assuming 16 studs per second movement speed
    
    return {
        value = (baseValue * rarity) / (distance * timeToCollect),
        rarity = rarity,
        baseValue = baseValue,
        distance = distance,
        timeToCollect = timeToCollect
    }
end

local function optimizeLootPath(target)
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

local function collectLoot()
    local lootItems = {}
    for _, loot in pairs(workspace.Loot:GetChildren()) do
        if loot:IsA("Part") then
            local stats = calculateLootValue(loot)
            table.insert(lootItems, {
                item = loot,
                stats = stats
            })
        end
    end
    
    table.sort(lootItems, function(a, b)
        return a.stats.value > b.stats.value
    end)
    
    for _, loot in ipairs(lootItems) do
        if loot.stats.distance < 50 then
            optimizeLootPath(loot.item)
            firetouchinterest(player.Character.HumanoidRootPart, loot.item, 0)
            wait(0.1)
            firetouchinterest(player.Character.HumanoidRootPart, loot.item, 1)
        end
    end
end

while wait() do
    collectLoot()
end`
            }
        ]
    }
};

window.GAME_SCRIPTS_21 = GAME_SCRIPTS_21; 