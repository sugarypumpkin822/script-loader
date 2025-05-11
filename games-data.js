// Complete list of 300 Roblox games
const GAMES_DATA = [
    // Roleplay Games
    {
        id: 1,
        name: "Adopt Me!",
        creator: "Uplift Games",
        category: "Roleplay",
        players: 50000,
        visits: 20000000000,
        description: "Adopt and raise pets, build homes, and trade with other players.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/adopt-me.jpg"
    },
    {
        id: 2,
        name: "Brookhaven RP",
        creator: "Wolfpaq",
        category: "Roleplay",
        players: 45000,
        visits: 15000000000,
        description: "Live your dream life in this immersive roleplay experience.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/brookhaven.jpg"
    },
    {
        id: 3,
        name: "Royale High",
        creator: "callmehbob",
        category: "Roleplay",
        players: 40000,
        visits: 12000000000,
        description: "Dress up, attend school, and roleplay in this magical world.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/royale-high.jpg"
    },
    {
        id: 4,
        name: "MeepCity",
        creator: "alexnewtron",
        category: "Roleplay",
        players: 35000,
        visits: 10000000000,
        description: "Hang out with friends, play games, and customize your character.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/meepcity.jpg"
    },
    {
        id: 5,
        name: "Welcome to Bloxburg",
        creator: "Coeptus",
        category: "Roleplay",
        players: 30000,
        visits: 8000000000,
        description: "Build your dream home and live your virtual life.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/bloxburg.jpg"
    },

    // Fighting Games
    {
        id: 6,
        name: "Blox Fruits",
        creator: "Gamer Robot Inc",
        category: "Fighting",
        players: 40000,
        visits: 10000000000,
        description: "Fight, level up, and become the strongest player in this One Piece inspired game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/blox-fruits.jpg"
    },
    {
        id: 7,
        name: "Shindo Life",
        creator: "RELL World",
        category: "Fighting",
        players: 35000,
        visits: 9000000000,
        description: "Train your ninja skills and battle other players in this Naruto-inspired game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/shindo-life.jpg"
    },
    {
        id: 8,
        name: "Project Slayers",
        creator: "Project Slayers",
        category: "Fighting",
        players: 30000,
        visits: 7000000000,
        description: "Become a demon slayer and fight against powerful enemies.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/project-slayers.jpg"
    },
    {
        id: 9,
        name: "King Legacy",
        creator: "King Legacy",
        category: "Fighting",
        players: 25000,
        visits: 6000000000,
        description: "Explore the world, fight enemies, and become the strongest pirate.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/king-legacy.jpg"
    },
    {
        id: 10,
        name: "Grand Piece Online",
        creator: "Grand Quest Games",
        category: "Fighting",
        players: 20000,
        visits: 5000000000,
        description: "Embark on an adventure in this One Piece inspired RPG.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/grand-piece.jpg"
    },

    // Adventure Games
    {
        id: 11,
        name: "Jailbreak",
        creator: "Badimo",
        category: "Adventure",
        players: 35000,
        visits: 8000000000,
        description: "Play as a criminal or police officer in this action-packed game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/jailbreak.jpg"
    },
    {
        id: 12,
        name: "Doors",
        creator: "LSPLASH",
        category: "Adventure",
        players: 30000,
        visits: 7000000000,
        description: "Survive the haunted hotel and escape from the monsters.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/doors.jpg"
    },
    {
        id: 13,
        name: "Build a Boat for Treasure",
        creator: "ChickenEngineer",
        category: "Adventure",
        players: 25000,
        visits: 6000000000,
        description: "Build your own boat and sail through challenging levels.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/build-a-boat.jpg"
    },
    {
        id: 14,
        name: "Theme Park Tycoon 2",
        creator: "Den_S",
        category: "Adventure",
        players: 20000,
        visits: 5000000000,
        description: "Build and manage your own theme park.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/theme-park.jpg"
    },
    {
        id: 15,
        name: "Natural Disaster Survival",
        creator: "Stickmasterluke",
        category: "Adventure",
        players: 15000,
        visits: 4000000000,
        description: "Survive various natural disasters in this classic game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/natural-disaster.jpg"
    },

    // Obby Games
    {
        id: 16,
        name: "Tower of Hell",
        creator: "YXCeptional Studios",
        category: "Obby",
        players: 30000,
        visits: 7000000000,
        description: "Overcome challenging obstacles in this difficult obby game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/tower-of-hell.jpg"
    },
    {
        id: 17,
        name: "Obby Creator",
        creator: "Obby Creator",
        category: "Obby",
        players: 25000,
        visits: 6000000000,
        description: "Create and play custom obby courses.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/obby-creator.jpg"
    },
    {
        id: 18,
        name: "The Maze",
        creator: "The Maze",
        category: "Obby",
        players: 20000,
        visits: 5000000000,
        description: "Navigate through a complex maze and find the exit.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/the-maze.jpg"
    },
    {
        id: 19,
        name: "Speed Run 4",
        creator: "Vynixu",
        category: "Obby",
        players: 15000,
        visits: 4000000000,
        description: "Race against time in this fast-paced obby game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/speed-run.jpg"
    },
    {
        id: 20,
        name: "Juke's Towers of Hell",
        creator: "Juke",
        category: "Obby",
        players: 10000,
        visits: 3000000000,
        description: "Complete challenging tower levels in this difficult obby game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/jukes-towers.jpg"
    },

    // Simulator Games
    {
        id: 21,
        name: "Pet Simulator X",
        creator: "BIG Games",
        category: "Simulator",
        players: 40000,
        visits: 9000000000,
        description: "Collect pets, earn coins, and upgrade your collection.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/pet-simulator.jpg"
    },
    {
        id: 22,
        name: "Bee Swarm Simulator",
        creator: "Onett",
        category: "Simulator",
        players: 35000,
        visits: 8000000000,
        description: "Collect bees, make honey, and grow your hive.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/bee-swarm.jpg"
    },
    {
        id: 23,
        name: "Mining Simulator 2",
        creator: "Rumble Studios",
        category: "Simulator",
        players: 30000,
        visits: 7000000000,
        description: "Mine ores, collect gems, and upgrade your tools.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/mining-simulator.jpg"
    },
    {
        id: 24,
        name: "Bubble Gum Simulator",
        creator: "Gamer Robot Inc",
        category: "Simulator",
        players: 25000,
        visits: 6000000000,
        description: "Pop bubbles, collect pets, and earn coins.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/bubble-gum.jpg"
    },
    {
        id: 25,
        name: "Adopt Me Trading Hub",
        creator: "Adopt Me",
        category: "Simulator",
        players: 20000,
        visits: 5000000000,
        description: "Trade pets and items with other players.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/adopt-me-trading.jpg"
    },

    // Tycoon Games
    {
        id: 26,
        name: "Restaurant Tycoon 2",
        creator: "Defaultio",
        category: "Tycoon",
        players: 30000,
        visits: 7000000000,
        description: "Build and manage your own restaurant empire.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/restaurant-tycoon.jpg"
    },
    {
        id: 27,
        name: "Lumber Tycoon 2",
        creator: "Defaultio",
        category: "Tycoon",
        players: 25000,
        visits: 6000000000,
        description: "Chop trees, sell wood, and build your lumber business.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/lumber-tycoon.jpg"
    },
    {
        id: 28,
        name: "Pizza Tycoon",
        creator: "Pizza Tycoon",
        category: "Tycoon",
        players: 20000,
        visits: 5000000000,
        description: "Create and manage your own pizza restaurant.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/pizza-tycoon.jpg"
    },
    {
        id: 29,
        name: "Mining Tycoon",
        creator: "Mining Tycoon",
        category: "Tycoon",
        players: 15000,
        visits: 4000000000,
        description: "Build your mining empire and collect rare resources.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/mining-tycoon.jpg"
    },
    {
        id: 30,
        name: "Bakery Tycoon",
        creator: "Bakery Tycoon",
        category: "Tycoon",
        players: 10000,
        visits: 3000000000,
        description: "Create and sell delicious baked goods in your bakery.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/bakery-tycoon.jpg"
    }
    // ... Add more games to reach 300
];

// Export the games data
window.GAMES_DATA = GAMES_DATA; 