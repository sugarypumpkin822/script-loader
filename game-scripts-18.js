const GAME_SCRIPTS_18 = {
    tycoon: {
        automation: [
            {
                title: "Advanced Tycoon Manager",
                description: "Advanced tycoon management with smart resource allocation",
                game: "Restaurant Tycoon",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")

local function calculateResourceEfficiency(resource)
    local cost = resource.Cost.Value
    local production = resource.Production.Value
    local timeToProduce = resource.TimeToProduce.Value
    local maintenance = resource.Maintenance.Value
    
    return {
        efficiency = production / (cost * timeToProduce * maintenance),
        cost = cost,
        production = production,
        timeToProduce = timeToProduce,
        maintenance = maintenance
    }
end

local function optimizeResourceAllocation()
    local resources = {}
    for _, resource in pairs(player.PlayerGui.Resources:GetChildren()) do
        if resource:IsA("TextButton") then
            local stats = calculateResourceEfficiency(resource)
            table.insert(resources, {
                button = resource,
                stats = stats
            })
        end
    end
    
    table.sort(resources, function(a, b)
        return a.stats.efficiency > b.stats.efficiency
    end)
    
    local totalMoney = player.leaderstats.Money.Value
    local allocatedMoney = 0
    
    for _, resource in ipairs(resources) do
        if allocatedMoney + resource.stats.cost <= totalMoney then
            fireclickdetector(resource.button.ClickDetector)
            allocatedMoney = allocatedMoney + resource.stats.cost
            wait(0.1)
        end
    end
end

local function collectMoney()
    for _, money in pairs(workspace.Money:GetChildren()) do
        if money:IsA("Part") then
            firetouchinterest(player.Character.HumanoidRootPart, money, 0)
            wait(0.1)
            firetouchinterest(player.Character.HumanoidRootPart, money, 1)
        end
    end
end

while wait() do
    optimizeResourceAllocation()
    collectMoney()
end`
            }
        ],
        upgradeAutomation: [
            {
                title: "Smart Upgrade Manager",
                description: "Advanced upgrade system with ROI optimization",
                game: "Restaurant Tycoon",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

local function calculateUpgradeROI(upgrade)
    local cost = upgrade.Cost.Value
    local income = upgrade.Income.Value
    local timeToPayback = cost / income
    local maintenance = upgrade.Maintenance.Value
    
    return {
        roi = income / (cost * maintenance),
        timeToPayback = timeToPayback,
        priority = 1 / (timeToPayback * maintenance)
    }
end

local function optimizeUpgrades()
    local upgrades = {}
    for _, upgrade in pairs(player.PlayerGui.Upgrades:GetChildren()) do
        if upgrade:IsA("TextButton") then
            local stats = calculateUpgradeROI(upgrade)
            table.insert(upgrades, {
                button = upgrade,
                stats = stats
            })
        end
    end
    
    table.sort(upgrades, function(a, b)
        return a.stats.priority > b.stats.priority
    end)
    
    local totalMoney = player.leaderstats.Money.Value
    local allocatedMoney = 0
    
    for _, upgrade in ipairs(upgrades) do
        if allocatedMoney + upgrade.button.Cost.Value <= totalMoney then
            fireclickdetector(upgrade.button.ClickDetector)
            allocatedMoney = allocatedMoney + upgrade.button.Cost.Value
            wait(0.1)
        end
    end
end

while wait() do
    optimizeUpgrades()
end`
            }
        ]
    }
};

window.GAME_SCRIPTS_18 = GAME_SCRIPTS_18; 