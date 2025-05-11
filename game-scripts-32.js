const GAME_SCRIPTS_32 = {
    fighting: {
        combatAutomation: [
            {
                title: "Advanced Combat Optimizer",
                description: "Advanced combat system with combo optimization and hitbox analysis",
                game: "Fighting Game",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")

local combos = {
    {
        moves = {
            {key = "q", delay = 0.1},
            {key = "w", delay = 0.2},
            {key = "e", delay = 0.1},
            {key = "r", delay = 0.3}
        },
        damage = 100,
        priority = 1,
        cooldown = 5
    },
    {
        moves = {
            {key = "a", delay = 0.2},
            {key = "s", delay = 0.1},
            {key = "d", delay = 0.2},
            {key = "f", delay = 0.2}
        },
        damage = 80,
        priority = 2,
        cooldown = 3
    },
    {
        moves = {
            {key = "z", delay = 0.15},
            {key = "x", delay = 0.15},
            {key = "c", delay = 0.15},
            {key = "v", delay = 0.15}
        },
        damage = 60,
        priority = 3,
        cooldown = 2
    }
}

local function performCombo(combo)
    for _, move in ipairs(combo.moves) do
        keypress(move.key)
        wait(move.delay)
    end
end

local function getOptimalCombo()
    local health = player.Character:FindFirstChild("Humanoid").Health
    local stamina = player.Character:FindFirstChild("Stamina").Value
    
    if health < 50 and stamina > 80 then
        return combos[1]
    elseif health < 75 and stamina > 50 then
        return combos[2]
    else
        return combos[3]
    end
end

while wait() do
    local combo = getOptimalCombo()
    performCombo(combo)
end`
            }
        ],
        hitboxOptimization: [
            {
                title: "Advanced Hitbox Optimizer",
                description: "Advanced hitbox system with prediction and optimization",
                game: "Fighting Game",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")

local function calculateHitboxValue(hitbox)
    local damage = hitbox:GetAttribute("Damage") or 0
    local range = hitbox:GetAttribute("Range") or 0
    local cooldown = hitbox:GetAttribute("Cooldown") or 0
    local priority = hitbox:GetAttribute("Priority") or 1
    
    return {
        value = (damage * range * priority) / cooldown,
        damage = damage,
        range = range,
        cooldown = cooldown,
        priority = priority
    }
end

local function findOptimalHitbox()
    local hitboxes = {}
    for _, hitbox in pairs(workspace.Hitboxes:GetChildren()) do
        if hitbox:IsA("BasePart") then
            local stats = calculateHitboxValue(hitbox)
            table.insert(hitboxes, {
                hitbox = hitbox,
                stats = stats
            })
        end
    end
    
    table.sort(hitboxes, function(a, b)
        return a.stats.value > b.stats.value
    end)
    
    return hitboxes[1]
end

local function predictEnemyMovement(enemy)
    local velocity = enemy.Character.HumanoidRootPart.Velocity
    local position = enemy.Character.HumanoidRootPart.Position
    local prediction = position + (velocity * 0.5)
    
    return prediction
end

while wait() do
    local hitbox = findOptimalHitbox()
    if hitbox then
        local enemy = Players:GetPlayers()[2]
        if enemy then
            local prediction = predictEnemyMovement(enemy)
            if (player.Character.HumanoidRootPart.Position - prediction).Magnitude < hitbox.stats.range then
                fireclickdetector(hitbox.hitbox.ClickDetector)
            end
        end
    end
end`
            }
        ]
    }
};

window.GAME_SCRIPTS_32 = GAME_SCRIPTS_32; 