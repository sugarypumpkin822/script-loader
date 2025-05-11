// Sample scripts data
const scripts = [
    {
        title: "Basic Player Movement",
        description: "Simple script for player movement controls",
        game: "Any Roblox Game",
        executors: allExecutors,
        code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()

local function setupMovement()
    local humanoid = character:WaitForChild("Humanoid")
    local speed = 16
    
    humanoid.WalkSpeed = speed
end

setupMovement()`
    },
    {
        title: "Click to Teleport",
        description: "Teleport player to clicked location",
        game: "Any Roblox Game",
        executors: allExecutors.filter(executor => 
            !["JIT", "Elysian", "Nexus", "Calamari"].includes(executor)
        ),
        code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local mouse = player:GetMouse()

mouse.Button1Down:Connect(function()
    local character = player.Character
    if character then
        character:MoveTo(mouse.Hit.Position)
    end
end)`
    },
    {
        title: "Simple Health System",
        description: "Basic health system with damage handling",
        game: "Any Roblox Game",
        executors: allExecutors,
        code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()

local function setupHealth()
    local humanoid = character:WaitForChild("Humanoid")
    local maxHealth = 100
    
    humanoid.MaxHealth = maxHealth
    humanoid.Health = maxHealth
    
    humanoid.Died:Connect(function()
        print("Player died!")
    end)
end

setupHealth()`
    },
    {
        title: "ESP Script",
        description: "See players through walls",
        game: "Any Roblox Game",
        executors: allExecutors.filter(executor => 
            ["Synapse X", "KRNL", "Script-Ware", "Comet", "Fluxus", "Electron", "Sentinel", "Xeno", "Oxygen U", "Delta", "Hydrogen", "Vega X", "Calm", "Aero", "Arceus X"].includes(executor)
        ),
        code: `local Players = game:GetService("Players")
local RunService = game:GetService("RunService")

local function createESP(player)
    local esp = Drawing.new("Text")
    esp.Text = player.Name
    esp.Size = 14
    esp.Center = true
    esp.Outline = true
    esp.Color = Color3.new(1, 0, 0)
    
    RunService.RenderStepped:Connect(function()
        if player.Character and player.Character:FindFirstChild("Head") then
            local head = player.Character.Head
            local vector, onScreen = workspace.CurrentCamera:WorldToViewportPoint(head.Position)
            if onScreen then
                esp.Position = Vector2.new(vector.X, vector.Y)
                esp.Visible = true
            else
                esp.Visible = false
            end
        else
            esp.Visible = false
        end
    end)
end

for _, player in ipairs(Players:GetPlayers()) do
    if player ~= Players.LocalPlayer then
        createESP(player)
    end
end`
    },
    {
        title: "Speed Hack",
        description: "Increase player movement speed",
        game: "Any Roblox Game",
        executors: allExecutors,
        code: `local Players = game:GetService("Players")
local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()

local function setSpeed()
    local humanoid = character:WaitForChild("Humanoid")
    humanoid.WalkSpeed = 50
end

setSpeed()`
    },
    {
        title: "Infinite Jump",
        description: "Jump multiple times in the air",
        game: "Any Roblox Game",
        executors: allExecutors.filter(executor => 
            !["JIT", "Elysian", "Nexus", "Calamari", "Zeus", "Atlas", "Phantom"].includes(executor)
        ),
        code: `local Players = game:GetService("Players")
local UserInputService = game:GetService("UserInputService")
local player = Players.LocalPlayer
local character = player.Character or player.CharacterAdded:Wait()

local function setupInfiniteJump()
    local humanoid = character:WaitForChild("Humanoid")
    
    UserInputService.InputBegan:Connect(function(input, gameProcessed)
        if input.KeyCode == Enum.KeyCode.Space and not gameProcessed then
            humanoid:ChangeState(Enum.HumanoidStateType.Jumping)
        end
    end)
end

setupInfiniteJump()`
    }
];

const SCRIPTBLOX_API = {
    baseUrl: 'https://scriptblox.com/api/script/search',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
};

class ScriptManager {
    constructor() {
        this.scripts = [];
        this.currentPage = 1;
        this.isLoading = false;
        this.hasMore = true;
        this.categories = ['all', 'popular', 'new', 'verified', 'tycoon', 'simulator', 'fighting', 'adventure'];
        this.currentCategory = 'all';
        this.favorites = new Set();
        this.recentlyViewed = [];
        this.maxRecentlyViewed = 10;
    }

    async fetchScripts(page = 1, category = this.currentCategory) {
        if (this.isLoading || !this.hasMore) return;

        this.isLoading = true;
        try {
            const response = await fetch(`${SCRIPTBLOX_API.baseUrl}?page=${page}&category=${category}`, {
                method: 'GET',
                headers: SCRIPTBLOX_API.headers
            });

            if (!response.ok) throw new Error('Failed to fetch scripts');

            const data = await response.json();
            const newScripts = this.processScripts(data.scripts);
            
            this.scripts = [...this.scripts, ...newScripts];
            this.currentPage = page;
            this.hasMore = data.hasMore;
            
            return newScripts;
        } catch (error) {
            console.error('Error fetching scripts:', error);
            return [];
        } finally {
            this.isLoading = false;
        }
    }

    processScripts(scripts) {
        return scripts.map(script => ({
            id: script._id,
            title: script.title,
            description: script.description,
            game: script.game,
            executors: script.executors || ['Synapse X', 'KRNL'],
            code: script.script,
            author: script.author,
            likes: script.likes || 0,
            views: script.views || 0,
            createdAt: new Date(script.createdAt),
            updatedAt: new Date(script.updatedAt),
            verified: script.verified || false,
            category: script.category || 'other',
            tags: script.tags || [],
            comments: script.comments || [],
            rating: script.rating || 0,
            downloads: script.downloads || 0,
            isPremium: script.isPremium || false,
            isPatched: script.isPatched || false,
            lastTested: script.lastTested || null
        }));
    }

    toggleFavorite(scriptId) {
        if (this.favorites.has(scriptId)) {
            this.favorites.delete(scriptId);
        } else {
            this.favorites.add(scriptId);
        }
        this.saveFavorites();
    }

    isFavorite(scriptId) {
        return this.favorites.has(scriptId);
    }

    getFavorites() {
        return this.scripts.filter(script => this.favorites.has(script.id));
    }

    addToRecentlyViewed(script) {
        this.recentlyViewed = [
            script,
            ...this.recentlyViewed.filter(s => s.id !== script.id)
        ].slice(0, this.maxRecentlyViewed);
        this.saveRecentlyViewed();
    }

    getRecentlyViewed() {
        return this.recentlyViewed;
    }

    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify([...this.favorites]));
    }

    loadFavorites() {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            this.favorites = new Set(JSON.parse(saved));
        }
    }

    saveRecentlyViewed() {
        localStorage.setItem('recentlyViewed', JSON.stringify(this.recentlyViewed));
    }

    loadRecentlyViewed() {
        const saved = localStorage.getItem('recentlyViewed');
        if (saved) {
            this.recentlyViewed = JSON.parse(saved);
        }
    }

    async loadMoreScripts() {
        if (this.isLoading || !this.hasMore) return;
        return await this.fetchScripts(this.currentPage + 1, this.currentCategory);
    }

    searchScripts(query) {
        return this.scripts.filter(script => 
            script.title.toLowerCase().includes(query.toLowerCase()) ||
            script.description.toLowerCase().includes(query.toLowerCase()) ||
            script.game.toLowerCase().includes(query.toLowerCase()) ||
            script.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
        );
    }

    filterScripts(filters) {
        return this.scripts.filter(script => {
            if (filters.game && script.game !== filters.game) return false;
            if (filters.executor && !script.executors.includes(filters.executor)) return false;
            if (filters.category && script.category !== filters.category) return false;
            if (filters.verified && !script.verified) return false;
            if (filters.premium && !script.isPremium) return false;
            if (filters.patched && !script.isPatched) return false;
            if (filters.minRating && script.rating < filters.minRating) return false;
            return true;
        });
    }

    sortScripts(sortBy) {
        const sortedScripts = [...this.scripts];
        switch (sortBy) {
            case 'popular':
                return sortedScripts.sort((a, b) => b.likes - a.likes);
            case 'newest':
                return sortedScripts.sort((a, b) => b.createdAt - a.createdAt);
            case 'updated':
                return sortedScripts.sort((a, b) => b.updatedAt - a.updatedAt);
            case 'downloads':
                return sortedScripts.sort((a, b) => b.downloads - a.downloads);
            case 'rating':
                return sortedScripts.sort((a, b) => b.rating - a.rating);
            default:
                return sortedScripts;
        }
    }

    getScriptStats() {
        return {
            totalScripts: this.scripts.length,
            verifiedScripts: this.scripts.filter(s => s.verified).length,
            premiumScripts: this.scripts.filter(s => s.isPremium).length,
            totalDownloads: this.scripts.reduce((sum, s) => sum + s.downloads, 0),
            totalLikes: this.scripts.reduce((sum, s) => sum + s.likes, 0),
            averageRating: this.scripts.reduce((sum, s) => sum + s.rating, 0) / this.scripts.length
        };
    }
}

// Initialize script manager
const scriptManager = new ScriptManager();

// Load saved data
scriptManager.loadFavorites();
scriptManager.loadRecentlyViewed();

// Export for use in other files
window.scriptManager = scriptManager; 