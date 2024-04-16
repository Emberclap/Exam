function solve(input) {
    const n = input.shift()
    const characters = [];
    for (let i = 0; i < n; i++) {
        const [name, healthPts, bullets] = input.shift().split(' ');
        characters.push({ name, healthPts: Number(healthPts), bullets: Number(bullets) })
    }

    while (input != 'Ride Off Into Sunset') {
        const tokens = input.shift().split(' - ');
        const action = tokens[0];
        const characterName = tokens[1];

        const character = characters.find(x => x.name === characterName)

        switch (action) {
            case 'FireShot':
                const target = tokens[2];
                if (character.bullets > 0) {
                    character.bullets--;
                    console.log(`${character.name} has successfully hit ${target} and now has ${character.bullets} bullets!`);
                } else {
                    console.log(`${character.name} doesn't have enough bullets to shoot at ${target}!`);
                }
                break;
            case 'TakeHit':
                const damage = Number(tokens[2]);
                const attacker = tokens[3];
                character.healthPts -= damage;
                if (character.healthPts > 0) {
                    console.log(`${character.name} took a hit for ${damage} HP from ${attacker} and now has ${character.healthPts} HP!`);
                } else {
                    characters.splice(characters.findIndex(x => x.name === characterName), 1)
                    console.log(`${character.name} was gunned down by ${attacker}!`);
                }
                break;
            case 'Reload':
                if (character.bullets < 6) {
                    console.log(`${character.name} reloaded ${6 - character.bullets} bullets!`);
                    character.bullets = 6;
                } else {
                    console.log(`${character.name}'s pistol is fully loaded!`);
                }
                break;
            case 'PatchUp':
                const amountHP = Number(tokens[2]);
                const currentCharHP = character.healthPts;
                if (currentCharHP < 100) {
                    if (currentCharHP + amountHP > 100) {
                        character.healthPts = 100;
                        console.log(`${character.name} patched up and recovered ${100 - currentCharHP} HP!`);
                    } else {
                        console.log(`${character.name} patched up and recovered ${amountHP} HP!`);
                        character.healthPts = currentCharHP + amountHP;
                    }
                } else {
                    console.log(`${character.name} is in full health!`);
                }
                break;
        }


    }
    characters.forEach(character => {
        console.log(character.name);
        console.log(` HP: ${character.healthPts}`);
        console.log(` Bullets: ${character.bullets}`);
    });

}
solve((["2",
    "Gus 100 0",
    "Walt 100 6",
    "FireShot - Gus - Bandit",
    "TakeHit - Gus - 100 - Bandit",
    "Reload - Walt",
    "Ride Off Into Sunset"]))
solve((["2",
    "Jesse 100 4",
    "Walt 100 5",
    "FireShot - Jesse - Bandit",
    "TakeHit - Walt - 30 - Bandit",
    "PatchUp - Walt - 20",
    "Reload - Jesse",
    "Ride Off Into Sunset"]))
solve((["2",
    "Gus 100 4",
    "Walt 100 5",
    "FireShot - Gus - Bandit",
    "TakeHit - Walt - 100 - Bandit",
    "Reload - Gus",
    "Ride Off Into Sunset"]))