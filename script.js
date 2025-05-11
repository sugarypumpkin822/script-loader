// Sample scripts data (you can replace this with your own scripts)
const scripts = [
    {
        title: "Basic Player Movement",
        description: "Simple script for player movement controls",
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
    }
];

// DOM Elements
const scriptList = document.getElementById('scriptList');
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const modal = document.getElementById('scriptModal');
const modalTitle = document.getElementById('modalTitle');
const modalCode = document.getElementById('modalCode');
const closeButton = document.querySelector('.close-button');
const copyButton = document.getElementById('copyButton');

// Display scripts
function displayScripts(scriptsToShow = scripts) {
    scriptList.innerHTML = '';
    scriptsToShow.forEach(script => {
        const scriptCard = document.createElement('div');
        scriptCard.className = 'script-card';
        scriptCard.innerHTML = `
            <h3>${script.title}</h3>
            <p>${script.description}</p>
        `;
        scriptCard.addEventListener('click', () => showScript(script));
        scriptList.appendChild(scriptCard);
    });
}

// Show script in modal
function showScript(script) {
    modalTitle.textContent = script.title;
    modalCode.textContent = script.code;
    modal.style.display = 'block';
}

// Search functionality
function searchScripts() {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredScripts = scripts.filter(script => 
        script.title.toLowerCase().includes(searchTerm) ||
        script.description.toLowerCase().includes(searchTerm)
    );
    displayScripts(filteredScripts);
}

// Copy script to clipboard
function copyToClipboard() {
    const code = modalCode.textContent;
    navigator.clipboard.writeText(code).then(() => {
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = originalText;
        }, 2000);
    });
}

// Event Listeners
searchButton.addEventListener('click', searchScripts);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchScripts();
    }
});

closeButton.addEventListener('click', () => {
    modal.style.display = 'none';
});

copyButton.addEventListener('click', copyToClipboard);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// Initial display
displayScripts(); 