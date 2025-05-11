// Game-specific scripts
const GAME_SCRIPTS = {
    // Tycoon Games Scripts
    tycoon: [
        {
            title: "Auto Collect Money",
            description: "Automatically collects money from all money collectors",
            game: "Any Tycoon Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v.Name == "MoneyCollector" then
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 0)
            wait(0.1)
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 1)
        end
    end
end`
        },
        {
            title: "Auto Buy Upgrades",
            description: "Automatically purchases all available upgrades",
            game: "Any Tycoon Game",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v:IsA("ClickDetector") and v.Parent.Name:find("Upgrade") then
            fireclickdetector(v)
        end
    end
end`
        },
        {
            title: "Speed Boost",
            description: "Increases player movement speed",
            game: "Any Tycoon Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet", "Fluxus"],
            code: `game.Players.LocalPlayer.Character.Humanoid.WalkSpeed = 50`
        },
        {
            title: "Auto Rebirth",
            description: "Automatically rebirths when possible",
            game: "Any Tycoon Game",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v.Name == "RebirthButton" then
            fireclickdetector(v.ClickDetector)
        end
    end
end`
        },
        {
            title: "Collect All Dropped Money",
            description: "Collects all money dropped on the ground",
            game: "Any Tycoon Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v.Name == "MoneyDrop" then
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 0)
            wait(0.1)
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 1)
        end
    end
end`
        }
    ],

    // Simulator Games Scripts
    simulator: [
        {
            title: "Auto Click",
            description: "Automatically clicks for you",
            game: "Any Simulator Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
            code: `while wait() do
    mouse1click()
end`
        },
        {
            title: "Auto Collect",
            description: "Automatically collects all collectibles",
            game: "Any Simulator Game",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v:IsA("ClickDetector") then
            fireclickdetector(v)
        end
    end
end`
        },
        {
            title: "Teleport to Best Area",
            description: "Teleports to the best farming area",
            game: "Any Simulator Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet", "Fluxus"],
            code: `local bestArea = workspace:FindFirstChild("BestArea")
if bestArea then
    game.Players.LocalPlayer.Character:MoveTo(bestArea.Position)
end`
        },
        {
            title: "Auto Rebirth",
            description: "Automatically rebirths when possible",
            game: "Any Simulator Game",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v.Name == "RebirthButton" then
            fireclickdetector(v.ClickDetector)
        end
    end
end`
        },
        {
            title: "Collect All Orbs",
            description: "Collects all orbs in the game",
            game: "Any Simulator Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v.Name == "Orb" then
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 0)
            wait(0.1)
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 1)
        end
    end
end`
        }
    ],

    // Clicker Games Scripts
    clicker: [
        {
            title: "Auto Click",
            description: "Automatically clicks for you",
            game: "Any Clicker Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
            code: `while wait() do
    mouse1click()
end`
        },
        {
            title: "Auto Upgrade",
            description: "Automatically purchases all upgrades",
            game: "Any Clicker Game",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v:IsA("ClickDetector") and v.Parent.Name:find("Upgrade") then
            fireclickdetector(v)
        end
    end
end`
        },
        {
            title: "Collect All Currency",
            description: "Collects all currency drops",
            game: "Any Clicker Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet", "Fluxus"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v.Name == "CurrencyDrop" then
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 0)
            wait(0.1)
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 1)
        end
    end
end`
        },
        {
            title: "Auto Prestige",
            description: "Automatically prestiges when possible",
            game: "Any Clicker Game",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v.Name == "PrestigeButton" then
            fireclickdetector(v.ClickDetector)
        end
    end
end`
        },
        {
            title: "Collect All Gems",
            description: "Collects all gem drops",
            game: "Any Clicker Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v.Name == "GemDrop" then
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 0)
            wait(0.1)
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 1)
        end
    end
end`
        }
    ],

    // Fighting Games Scripts
    fighting: [
        {
            title: "Auto Farm",
            description: "Automatically farms enemies",
            game: "Any Fighting Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v:IsA("Model") and v:FindFirstChild("Humanoid") and v.Humanoid.Health > 0 then
            game.Players.LocalPlayer.Character:MoveTo(v.HumanoidRootPart.Position)
            wait(0.1)
            mouse1click()
        end
    end
end`
        },
        {
            title: "Infinite Stamina",
            description: "Gives infinite stamina",
            game: "Any Fighting Game",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `game.Players.LocalPlayer.Character.Humanoid.MaxStamina = math.huge
game.Players.LocalPlayer.Character.Humanoid.Stamina = math.huge`
        },
        {
            title: "Auto Block",
            description: "Automatically blocks incoming attacks",
            game: "Any Fighting Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet", "Fluxus"],
            code: `while wait() do
    if game.Players.LocalPlayer.Character:FindFirstChild("Block") then
        game.Players.LocalPlayer.Character.Block:FireServer()
    end
end`
        },
        {
            title: "Auto Dodge",
            description: "Automatically dodges attacks",
            game: "Any Fighting Game",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `while wait() do
    if game.Players.LocalPlayer.Character:FindFirstChild("Dodge") then
        game.Players.LocalPlayer.Character.Dodge:FireServer()
    end
end`
        },
        {
            title: "Auto Combo",
            description: "Automatically performs combos",
            game: "Any Fighting Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
            code: `while wait() do
    if game.Players.LocalPlayer.Character:FindFirstChild("Combo") then
        game.Players.LocalPlayer.Character.Combo:FireServer()
    end
end`
        }
    ],

    // Adventure Games Scripts
    adventure: [
        {
            title: "Auto Quest",
            description: "Automatically completes quests",
            game: "Any Adventure Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v:IsA("ClickDetector") and v.Parent.Name:find("Quest") then
            fireclickdetector(v)
        end
    end
end`
        },
        {
            title: "Auto Collect Loot",
            description: "Automatically collects all loot",
            game: "Any Adventure Game",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v.Name == "LootDrop" then
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 0)
            wait(0.1)
            firetouchinterest(game.Players.LocalPlayer.Character.HumanoidRootPart, v, 1)
        end
    end
end`
        },
        {
            title: "Auto Level Up",
            description: "Automatically levels up when possible",
            game: "Any Adventure Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet", "Fluxus"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v.Name == "LevelUpButton" then
            fireclickdetector(v.ClickDetector)
        end
    end
end`
        },
        {
            title: "Auto Equip Best Items",
            description: "Automatically equips the best items",
            game: "Any Adventure Game",
            executors: ["Synapse X", "KRNL", "Script-Ware"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v:IsA("ClickDetector") and v.Parent.Name:find("BestItem") then
            fireclickdetector(v)
        end
    end
end`
        },
        {
            title: "Auto Farm Bosses",
            description: "Automatically farms bosses",
            game: "Any Adventure Game",
            executors: ["Synapse X", "KRNL", "Script-Ware", "Comet"],
            code: `while wait() do
    for _, v in pairs(workspace:GetDescendants()) do
        if v:IsA("Model") and v:FindFirstChild("Boss") then
            game.Players.LocalPlayer.Character:MoveTo(v.HumanoidRootPart.Position)
            wait(0.1)
            mouse1click()
        end
    end
end`
        }
    ]
};

// Export the scripts
window.GAME_SCRIPTS = GAME_SCRIPTS; 