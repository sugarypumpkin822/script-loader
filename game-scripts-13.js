const GAME_SCRIPTS_13 = {
    simulator: {
        clickAutomation: [
            {
                title: "Advanced Click System",
                description: "Advanced clicking system with pattern optimization",
                game: "Click Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local RunService = game:GetService("RunService")

local clickPatterns = {
    {delay = 0.01, count = 10},
    {delay = 0.02, count = 5},
    {delay = 0.005, count = 20}
}

local function performPattern(pattern)
    for i = 1, pattern.count do
        mouse1click()
        wait(pattern.delay)
    end
end

local function getOptimalPattern()
    local fps = RunService:GetFPS()
    if fps > 60 then
        return clickPatterns[1]
    elseif fps > 30 then
        return clickPatterns[2]
    else
        return clickPatterns[3]
    end
end

while wait() do
    local pattern = getOptimalPattern()
    performPattern(pattern)
end`
            }
        ],
        collectionAutomation: [
            {
                title: "Smart Collector",
                description: "Advanced collection system with path optimization",
                game: "Click Simulator",
                executors: ["Synapse X", "KRNL"],
                code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local TweenService = game:GetService("TweenService")

local function getNearestCollectible()
    local nearest = nil
    local shortestDistance = math.huge
    
    for _, item in pairs(workspace.Collectibles:GetChildren()) do
        if item:IsA("Part") then
            local distance = (player.Character.HumanoidRootPart.Position - item.Position).Magnitude
            if distance < shortestDistance then
                shortestDistance = distance
                nearest = item
            end
        end
    end
    return nearest
end

local function collectNearest()
    local nearest = getNearestCollectible()
    if nearest then
        local tweenInfo = TweenInfo.new(0.5, Enum.EasingStyle.Linear)
        local tween = TweenService:Create(player.Character.HumanoidRootPart, tweenInfo, {
            Position = nearest.Position
        })
        tween:Play()
        tween.Completed:Wait()
        firetouchinterest(player.Character.HumanoidRootPart, nearest, 0)
        wait(0.1)
        firetouchinterest(player.Character.HumanoidRootPart, nearest, 1)
    end
end

while wait() do
    collectNearest()
end`
            }
        ]
    }
};

window.GAME_SCRIPTS_13 = GAME_SCRIPTS_13; 