const GAME_SCRIPTS_15 = {
    tycoon: {
        automation: [
            {
                title: "Advanced Tycoon Automation",
                description: "Advanced automation system with smart resource management",
                game: "Restaurant Tycoon",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")

local function calculateResourceEfficiency(resource)
    local cost = resource.Cost.Value
    local production = resource.Production.Value
    local timeToProduce = resource.TimeToProduce.Value
    
    return {
        efficiency = production / (cost * timeToProduce),
        cost = cost,
        production = production,
        timeToProduce = timeToProduce
    }
end

local function optimizeResources()
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
    
    for _, resource in ipairs(resources) do
        if player.leaderstats.Money.Value >= resource.button.Cost.Value then
            fireclickdetector(resource.button.ClickDetector)
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
    optimizeResources()
    collectMoney()
end`
            }
        ],
        upgradeAutomation: [
            {
                title: "Smart Upgrade System",
                description: "Advanced upgrade system with efficiency calculation",
                game: "Restaurant Tycoon",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

local function calculateUpgradeEfficiency(upgrade)
    local cost = upgrade.Cost.Value
    local income = upgrade.Income.Value
    local timeToPayback = cost / income
    
    return {
        efficiency = income / cost,
        timeToPayback = timeToPayback,
        priority = 1 / timeToPayback
    }
end

local function optimizeUpgrades()
    local upgrades = {}
    for _, upgrade in pairs(player.PlayerGui.Upgrades:GetChildren()) do
        if upgrade:IsA("TextButton") then
            local stats = calculateUpgradeEfficiency(upgrade)
            table.insert(upgrades, {
                button = upgrade,
                stats = stats
            })
        end
    end
    
    table.sort(upgrades, function(a, b)
        return a.stats.priority > b.stats.priority
    end)
    
    for _, upgrade in ipairs(upgrades) do
        if player.leaderstats.Money.Value >= upgrade.button.Cost.Value then
            fireclickdetector(upgrade.button.ClickDetector)
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

window.GAME_SCRIPTS_15 = GAME_SCRIPTS_15; 