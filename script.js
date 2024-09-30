// Define possible materials, rarities, damage types, and attributes
const materials = [/*"Copper", "Silver", "Gold", "Bone", "Iron", "Steel", "Fine Steel",*/ "Aleacion de acero"];
const rarities = [/*"Common", "Special", */"Magico", "Epico"];
const qualities = [/*"Defective", "Common", "Enhanced",*/ "Superior", "Gran", "Maestre"];
const physicalDamageTypes = ["punzante", "aplastante", "cortante"];
const magicalDamageTypes = ["de fuego", "de hielo", "electrico"];
const attributes = ["Fuerza", "Concentracion", /*"Dexterity" */];

// Initialize counter
let counter = 0;

document.getElementById("frasecajas").innerHTML =  `
    <h1> compraste ${counter} cajas hasta que te toco algo que te convence</h1>
    `


// Function to generate a random item
function generateRandomItem() {
    const item = {};
    item.material = materials[Math.floor(Math.random() * materials.length)];
    item.rarity = rarities[Math.floor(Math.random() * rarities.length)];
    item.quality = qualities[Math.floor(Math.random() * qualities.length)];
    
    // Generate bonuses based on rarity
    item.damage = {};
    item.attribute = null;
    switch (item.rarity) {
        case "Special":
            addBonus(item, 1);
            break;
        case "Magico":
            addBonus(item, 2);
            break;
        case "Epico":
            addBonus(item, 3);
            break;
    }

    // Apply special conditions for Aleacion de acero
    if (item.material === "Aleacion de acero" && item.rarity === "Epico") {
        if (item.quality === "Maestre") {
            item.specialValue = 49;
        }  if (item.quality === "Gran") {
            item.specialValue = 44;
        }  if (item.quality === "Superior") {
            item.specialValue = 42;
        }
    }

    if (item.material === "Aleacion de acero" && item.rarity === "Magico") {
        if (item.quality === "Maestre") {
            item.specialValue = 45;
        }  if (item.quality === "Gran") {
            item.specialValue = 40;
        }  if (item.quality === "Superior") {
            item.specialValue = 38;
        }
    }
    
    return item;
}

// Function to add bonuses to the item
function addBonus(item, bonusCount) {
    const addedDamageTypes = new Set();
    for (let i = 0; i < bonusCount; i++) {
        if (i < 2) { // Add up to 2 damage types
            let damageType;
            if (i === 0) {
                damageType = physicalDamageTypes[Math.floor(Math.random() * physicalDamageTypes.length)];
            } else {
                damageType = magicalDamageTypes[Math.floor(Math.random() * magicalDamageTypes.length)];
            }
            if (!addedDamageTypes.has(damageType)) {
                item.damage[damageType] = Math.floor(Math.random() * 16) + 5;  // Values between 5 and 20
                addedDamageTypes.add(damageType);
            }
        } else { // Add attribute
            const attribute = attributes[Math.floor(Math.random() * attributes.length)];
            item.attribute = { type: attribute, value: Math.floor(Math.random() * 5) + 1 };  // Value between 1 and 5
        }
    }
}

// Function to display the item
function displayItem(item) {
    document.getElementById("itemLabel").innerHTML = `
    <div id="item${item.id}" class="item-card">
                   <div id="box-top">
                           <div id="text-box"> 
                               <p id="drop-name" class="${item.rarity}">Item</p>
                               <p id="drop-material" class="${item.rarity}">${item.material} (${item.quality})</p>
                           </div>
                       <img src="" alt="" id="drop-x">
               </div>
               <div id="box-bottom">
                   <div id="drop-card">
                       <p id="drop-info-armor" class="yellow-text">Damage: (+${item.specialValue})</p>

                       <div id="bonus">
                       </bonus>
                    
                   </div>
               </div>
               `

    const itemBonuses = document.getElementById("bonus");

    if (item.rarity !== "Common") {

        for (const damageType in item.damage) {
            itemBonuses.innerHTML += `<p id="drop-info-secondary class="bonus-text" style="color: #5CC0FF;"> Daño ${damageType} +${item.damage[damageType]} `;
        }
        if (item.attribute) {
            itemBonuses.innerHTML += `<p id="drop-info-secondary class="bonus-text" style="color: #5CC0FF;">   ${item.attribute.type} +${item.attribute.value}</p>`;
        }
    } 

    itemBonuses.innerHTML += `<p id="drop-info-secondary" class="${item.rarity}">${item.rarity}</p>`;
}

// Button press event to generate and display a random item
document.getElementById("randomizeButton").addEventListener("click", () => {
    counter++;
    const item = generateRandomItem();
    displayItem(item);

    document.getElementById("frasecajas").innerHTML =  `
    <h1> compraste ${counter} cajas hasta que te toco algo que te convence</h1>
    `
    
});
