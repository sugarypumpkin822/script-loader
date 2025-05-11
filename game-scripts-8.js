const GAME_SCRIPTS_8 = {
    // Tycoon Games (2000 scripts)
    tycoon: {
        // Money Collection Scripts (400)
        moneyCollection: [
            {
                title: "Money Collector",
                description: "Basic money collection script",
                game: "Restaurant Tycoon",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

while wait() do
    for _, money in pairs(workspace.Money:GetChildren()) do
        if money:IsA("Part") then
            firetouchinterest(player.Character.HumanoidRootPart, money, 0)
            wait(0.1)
            firetouchinterest(player.Character.HumanoidRootPart, money, 1)
        end
    end
end`
            }
        ],

        // Upgrade Automation Scripts (400)
        upgradeAutomation: [
            {
                title: "Restaurant Upgrade Manager",
                description: "Advanced upgrade system for Restaurant Tycoon",
                game: "Restaurant Tycoon",
                executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
                code: `-- Restaurant Upgrade Manager
local Players = game:GetService("Players")
local player = Players.LocalPlayer

local function calculateUpgradeValue(upgrade)
    local cost = upgrade.Cost.Value
    local income = upgrade.Income.Value
    local timeToPayback = cost / income
    
    return {
        roi = income / cost,
        timeToPayback = timeToPayback,
        priority = 1 / timeToPayback
    }
end

local function optimizeUpgrades()
    local upgrades = {}
    for _, upgrade in pairs(player.PlayerGui.Upgrades:GetChildren()) do
        if upgrade:IsA("TextButton") then
            local stats = calculateUpgradeValue(upgrade)
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
        ],

        // Worker Management Scripts (400)
        workerManagement: [
            {
                title: "Restaurant Worker Manager",
                description: "Advanced worker management for Restaurant Tycoon",
                game: "Restaurant Tycoon",
                executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
                code: `-- Restaurant Worker Manager
local Players = game:GetService("Players")
local player = Players.LocalPlayer

local function calculateWorkerEfficiency(worker)
    local cost = worker.Cost.Value
    local production = worker.Production.Value
    local speed = worker.Speed.Value
    
    return {
        efficiency = (production * speed) / cost,
        cost = cost,
        production = production,
        speed = speed
    }
end

local function optimizeWorkers()
    local workers = {}
    for _, worker in pairs(player.PlayerGui.Workers:GetChildren()) do
        if worker:IsA("TextButton") then
            local stats = calculateWorkerEfficiency(worker)
            table.insert(workers, {
                button = worker,
                stats = stats
            })
        end
    end
    
    table.sort(workers, function(a, b)
        return a.stats.efficiency > b.stats.efficiency
    end)
    
    for _, worker in ipairs(workers) do
        if player.leaderstats.Money.Value >= worker.button.Cost.Value then
            fireclickdetector(worker.button.ClickDetector)
            wait(0.1)
        end
    end
end

while wait() do
    optimizeWorkers()
end`
            }
        ]
    }
};

// Export the scripts
window.GAME_SCRIPTS_8 = GAME_SCRIPTS_8; 