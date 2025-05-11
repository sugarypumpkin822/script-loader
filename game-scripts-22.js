const GAME_SCRIPTS_22 = {
    tycoon: {
        automation: [
            {
                title: "Advanced Tycoon Optimizer",
                description: "Advanced tycoon optimization with smart resource management and ROI calculation",
                game: "Restaurant Tycoon",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")

local function calculateResourceROI(resource)
    local cost = resource.Cost.Value
    local production = resource.Production.Value
    local timeToProduce = resource.TimeToProduce.Value
    local maintenance = resource.Maintenance.Value
    local space = resource.Space.Value
    
    return {
        roi = production / (cost * timeToProduce * maintenance * space),
        cost = cost,
        production = production,
        timeToProduce = timeToProduce,
        maintenance = maintenance,
        space = space
    }
end

local function optimizeResourceAllocation()
    local resources = {}
    for _, resource in pairs(player.PlayerGui.Resources:GetChildren()) do
        if resource:IsA("TextButton") then
            local stats = calculateResourceROI(resource)
            table.insert(resources, {
                button = resource,
                stats = stats
            })
        end
    end
    
    table.sort(resources, function(a, b)
        return a.stats.roi > b.stats.roi
    end)
    
    local totalMoney = player.leaderstats.Money.Value
    local allocatedMoney = 0
    local totalSpace = player.leaderstats.Space.Value
    local usedSpace = 0
    
    for _, resource in ipairs(resources) do
        if allocatedMoney + resource.stats.cost <= totalMoney and usedSpace + resource.stats.space <= totalSpace then
            fireclickdetector(resource.button.ClickDetector)
            allocatedMoney = allocatedMoney + resource.stats.cost
            usedSpace = usedSpace + resource.stats.space
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
                title: "Advanced Upgrade Optimizer",
                description: "Advanced upgrade system with ROI optimization and space management",
                game: "Restaurant Tycoon",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

local function calculateUpgradeROI(upgrade)
    local cost = upgrade.Cost.Value
    local income = upgrade.Income.Value
    local timeToPayback = cost / income
    local maintenance = upgrade.Maintenance.Value
    local space = upgrade.Space.Value
    
    return {
        roi = income / (cost * maintenance * space),
        timeToPayback = timeToPayback,
        priority = 1 / (timeToPayback * maintenance * space)
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
    local totalSpace = player.leaderstats.Space.Value
    local usedSpace = 0
    
    for _, upgrade in ipairs(upgrades) do
        if allocatedMoney + upgrade.button.Cost.Value <= totalMoney and usedSpace + upgrade.button.Space.Value <= totalSpace then
            fireclickdetector(upgrade.button.ClickDetector)
            allocatedMoney = allocatedMoney + upgrade.button.Cost.Value
            usedSpace = usedSpace + upgrade.button.Space.Value
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

window.GAME_SCRIPTS_22 = GAME_SCRIPTS_22; 