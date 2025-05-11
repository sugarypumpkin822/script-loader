const GAME_SCRIPTS_26 = {
    tycoon: {
        automation: [
            {
                title: "Advanced Tycoon Optimizer",
                description: "Advanced tycoon automation with smart resource management and ROI calculation",
                game: "Restaurant Tycoon",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")

local function calculateResourceROI(resource)
    local cost = resource:GetAttribute("Cost") or 0
    local production = resource:GetAttribute("Production") or 0
    local timeToProduce = resource:GetAttribute("TimeToProduce") or 0
    local maintenance = resource:GetAttribute("Maintenance") or 0
    local space = resource:GetAttribute("Space") or 0
    
    return {
        roi = (production - maintenance) / (cost * timeToProduce * space),
        cost = cost,
        production = production,
        timeToProduce = timeToProduce,
        maintenance = maintenance,
        space = space
    }
end

local function optimizeResourceAllocation()
    local resources = {}
    for _, resource in pairs(workspace.Resources:GetChildren()) do
        if resource:IsA("Model") then
            local stats = calculateResourceROI(resource)
            table.insert(resources, {
                resource = resource,
                stats = stats
            })
        end
    end
    
    table.sort(resources, function(a, b)
        return a.stats.roi > b.stats.roi
    end)
    
    return resources
end

local function collectMoney()
    for _, money in pairs(workspace.Money:GetChildren()) do
        if money:IsA("BasePart") then
            if (player.Character.HumanoidRootPart.Position - money.Position).Magnitude < 10 then
                fireclickdetector(money.ClickDetector)
            end
        end
    end
end

while wait() do
    local resources = optimizeResourceAllocation()
    for _, resource in ipairs(resources) do
        if player.Character:FindFirstChild("Money") and player.Character.Money.Value >= resource.stats.cost then
            fireclickdetector(resource.resource.ClickDetector)
        end
    end
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
local RunService = game:GetService("RunService")

local function calculateUpgradeROI(upgrade)
    local cost = upgrade:GetAttribute("Cost") or 0
    local production = upgrade:GetAttribute("Production") or 0
    local timeToProduce = upgrade:GetAttribute("TimeToProduce") or 0
    local maintenance = upgrade:GetAttribute("Maintenance") or 0
    local space = upgrade:GetAttribute("Space") or 0
    
    return {
        roi = (production - maintenance) / (cost * timeToProduce * space),
        cost = cost,
        production = production,
        timeToProduce = timeToProduce,
        maintenance = maintenance,
        space = space
    }
end

local function optimizeUpgrades()
    local upgrades = {}
    for _, upgrade in pairs(workspace.Upgrades:GetChildren()) do
        if upgrade:IsA("Model") then
            local stats = calculateUpgradeROI(upgrade)
            table.insert(upgrades, {
                upgrade = upgrade,
                stats = stats
            })
        end
    end
    
    table.sort(upgrades, function(a, b)
        return a.stats.roi > b.stats.roi
    end)
    
    return upgrades
end

while wait() do
    local upgrades = optimizeUpgrades()
    for _, upgrade in ipairs(upgrades) do
        if player.Character:FindFirstChild("Money") and player.Character.Money.Value >= upgrade.stats.cost then
            fireclickdetector(upgrade.upgrade.ClickDetector)
        end
    end
end`
            }
        ]
    }
};

window.GAME_SCRIPTS_26 = GAME_SCRIPTS_26; 