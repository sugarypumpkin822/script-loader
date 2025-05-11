const GAME_SCRIPTS_12 = {
    tycoon: {
        upgradeAutomation: [
            {
                title: "Smart Upgrade System",
                description: "Advanced upgrade system with ROI calculation",
                game: "Pizza Tycoon",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer

local function calculateROI(upgrade)
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
            local stats = calculateROI(upgrade)
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
        workerManagement: [
            {
                title: "Worker Optimizer",
                description: "Advanced worker management system",
                game: "Pizza Tycoon",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
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

window.GAME_SCRIPTS_12 = GAME_SCRIPTS_12; 