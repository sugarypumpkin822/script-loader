// Additional Roblox games (Part 16) - Shooting and Combat Games
const GAMES_DATA_16 = [
    // First-Person Shooters
    {
        id: 301,
        name: "Phantom Forces",
        creator: "StyLiS Studios",
        category: "FPS",
        players: 45000,
        visits: 12000000000,
        description: "Tactical first-person shooter with realistic gun mechanics and various game modes.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/phantom-forces.jpg"
    },
    {
        id: 302,
        name: "Arsenal",
        creator: "ROBLOX",
        category: "FPS",
        players: 40000,
        visits: 11000000000,
        description: "Fast-paced gun game with various weapons and maps.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/arsenal.jpg"
    },
    {
        id: 303,
        name: "Frontlines",
        creator: "Frontlines",
        category: "FPS",
        players: 35000,
        visits: 9000000000,
        description: "Team-based tactical shooter with modern warfare elements.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/frontlines.jpg"
    },
    {
        id: 304,
        name: "Bad Business",
        creator: "Bad Business",
        category: "FPS",
        players: 30000,
        visits: 8000000000,
        description: "Fast-paced FPS with unique abilities and weapons.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/bad-business.jpg"
    },
    {
        id: 305,
        name: "Counter Blox",
        creator: "Counter Blox",
        category: "FPS",
        players: 25000,
        visits: 7000000000,
        description: "CS:GO inspired tactical shooter game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/counter-blox.jpg"
    },

    // Combat Games
    {
        id: 306,
        name: "Energy Assault",
        creator: "Energy Assault",
        category: "Combat",
        players: 20000,
        visits: 6000000000,
        description: "Futuristic combat game with energy-based weapons.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/energy-assault.jpg"
    },
    {
        id: 307,
        name: "Aimblox",
        creator: "Aimblox",
        category: "Combat",
        players: 18000,
        visits: 5000000000,
        description: "Aim training and combat game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/aimblox.jpg"
    },
    {
        id: 308,
        name: "Blackhawk Rescue Mission 5",
        creator: "Blackhawk",
        category: "Combat",
        players: 15000,
        visits: 4000000000,
        description: "Tactical military combat simulator.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/blackhawk.jpg"
    },
    {
        id: 309,
        name: "Michael's Zombies",
        creator: "Michael",
        category: "Combat",
        players: 12000,
        visits: 3000000000,
        description: "Zombie survival combat game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/michaels-zombies.jpg"
    },
    {
        id: 310,
        name: "Shoot Out!",
        creator: "Shoot Out",
        category: "Combat",
        players: 10000,
        visits: 2500000000,
        description: "Fast-paced shooting game with various modes.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/shoot-out.jpg"
    },

    // Military Games
    {
        id: 311,
        name: "Rolling Thunder",
        creator: "Rolling Thunder",
        category: "Military",
        players: 22000,
        visits: 5500000000,
        description: "Military combat game with vehicles and weapons.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/rolling-thunder.jpg"
    },
    {
        id: 312,
        name: "KAT (Knife Ability Test)",
        creator: "KAT",
        category: "Military",
        players: 19000,
        visits: 4500000000,
        description: "Knife combat and training game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/kat.jpg"
    },
    {
        id: 313,
        name: "BIG Paintball!",
        creator: "BIG Games",
        category: "Military",
        players: 16000,
        visits: 3500000000,
        description: "Paintball combat game with various maps and modes.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/big-paintball.jpg"
    },
    {
        id: 314,
        name: "Entry Point",
        creator: "Entry Point",
        category: "Military",
        players: 13000,
        visits: 2800000000,
        description: "Stealth and combat game with heist missions.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/entry-point.jpg"
    },
    {
        id: 315,
        name: "Polybattle",
        creator: "Polybattle",
        category: "Military",
        players: 11000,
        visits: 2200000000,
        description: "Low-poly military combat game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/polybattle.jpg"
    },

    // Arcade Shooters
    {
        id: 316,
        name: "No-Scope Arcade",
        creator: "No-Scope",
        category: "Arcade",
        players: 25000,
        visits: 6500000000,
        description: "Fast-paced no-scope shooting game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/no-scope.jpg"
    },
    {
        id: 317,
        name: "Hood Modded",
        creator: "Hood",
        category: "Arcade",
        players: 21000,
        visits: 5200000000,
        description: "Modified combat game with various weapons.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/hood-modded.jpg"
    },
    {
        id: 318,
        name: "Apocalypse Rising 2",
        creator: "Apocalypse",
        category: "Arcade",
        players: 17000,
        visits: 3800000000,
        description: "Zombie survival shooter game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/apocalypse-rising.jpg"
    },
    {
        id: 319,
        name: "S.W.A.T Simulator",
        creator: "S.W.A.T",
        category: "Arcade",
        players: 14000,
        visits: 3200000000,
        description: "SWAT team combat simulator.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/swat-simulator.jpg"
    },
    {
        id: 320,
        name: "Contact: A-888",
        creator: "Contact",
        category: "Arcade",
        players: 12000,
        visits: 2600000000,
        description: "Sci-fi combat game with unique weapons.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/contact.jpg"
    },

    // Prison Games
    {
        id: 321,
        name: "Prison Life",
        creator: "Prison Life",
        category: "Prison",
        players: 28000,
        visits: 7200000000,
        description: "Prison escape and combat game.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/prison-life.jpg"
    },
    {
        id: 322,
        name: "Zombie Attack",
        creator: "Zombie Attack",
        category: "Prison",
        players: 23000,
        visits: 5800000000,
        description: "Zombie survival in a prison setting.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/zombie-attack.jpg"
    },
    {
        id: 323,
        name: "Zombie Uprising",
        creator: "Zombie Uprising",
        category: "Prison",
        players: 19000,
        visits: 4600000000,
        description: "Zombie combat game with various weapons.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/zombie-uprising.jpg"
    },
    {
        id: 324,
        name: "Armed Forces",
        creator: "Armed Forces",
        category: "Prison",
        players: 15000,
        visits: 3400000000,
        description: "Military combat game with prison elements.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/armed-forces.jpg"
    },
    {
        id: 325,
        name: "Unit: Classified",
        creator: "Unit",
        category: "Prison",
        players: 13000,
        visits: 2900000000,
        description: "Tactical combat game with classified missions.",
        thumbnail: "https://tr.rbxcdn.com/thumbnails/unit-classified.jpg"
    }
    // ... Continue with more games
];

// Export the additional games data
window.GAMES_DATA_16 = GAMES_DATA_16; 