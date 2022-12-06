class Level {
  constructor(ctx) {
    this.ctx = ctx;
    

    this.levels = {
      level0: {
        player: "Goldfish",
        playerImageSrc: "./images/L00_PLYR_goldfish.png",

        enemy: ["Clownfish", "Angelfish", "Cardinalfish"],
        enemyImageSrc: [
          "./images/L01_clown.png",
          "./images/L02_angelfish.png",
          "./images/L03_cardinal.png",
        ],

        lives: [
          { name: "shrimp", score: 1 },
          { name: "star", score: 1 },
          { name: "prawn", score: 1 },
        ],
        livesImageSrc: [
          "./images/L00_foodfish.png",
          "./images/L00_fruitfish.png",
          "./images/L00_shrimp.png",
        ],
      },

      level1: {
        player: "Clownfish",
        playerImageSrc: "./images/L00_PLYR_clown.png",

        enemy: ["Angelfish", "Cardinalfish", "Lionfish"],
        enemyImageSrc: [
          "./images/L02_angelfish.png",
          "./images/L03_cardinal.png",
          "./images/L04_lionfish.png",
        ],

        lives: [
          { name: "Goldfish", score: 2 },
          { name: "shrimp", score: 1 },
          { name: "sea snail", score: 2 },
          { name: "sea horse", score: 2 },
        ],

        livesImageSrc: [
          "./images/L00_goldfish.png",
          "./images/L00_shrimp.png",
          "./images/L01_nautilus.png",
          "./images/L01_seahorse.png",
        ],
      },

      level2: {
        player: "Angelfish",
        playerImageSrc: "./images/L02_PLYR_angelfish.png",
        enemy: ["Cardinalfish", "Lionfish", "Swellfish"],
        enemyImageSrc: [
          "./images/L03_cardinal.png",
          "./images/L04_lionfish.png",
          "./images/L05_swellfish.png",
        ],
           lives: [
          { name: "crab", score: 2 },
          { name: "Goldfish", score: 2 },
          { name: "Clownfish", score: 3 },
          { name: "sea horse", score: 2 },
        ],
        livesImageSrc: [
          "./images/L01_hermitcrab.png",
          "./images/L00_goldfish.png",
          "./images/L01_clown.png",
          "./images/L01_seahorse.png",
        ],
      
      },
    };
  }
}
