const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const PLAYER_HEAL_VALUE = 20;

let chosenMaxLife =  100;

let currentMonsterHealth =  chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;

adjustHealthBars(chosenMaxLife);

function endRound() {
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!!');
        resetGame(chosenMaxLife);
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!!');
        resetGame(chosenMaxLife);
    }else  if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        alert('You have a draw!!');
        resetGame(chosenMaxLife);
    }
}

function attackMonster(mode) {
    let maxDamage;
    if (mode === 'ATTACK') {
        maxDamage = ATTACK_VALUE;
    }else if (mode === 'STRONG_ATTACK') {
        maxDamage = STRONG_ATTACK_VALUE;
    }
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    endRound();
}

function attackHandler() {
    attackMonster('ATTACK');
}

function strongAttackHandler() {
    attackMonster('STRONG_ATTACK');
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - PLAYER_HEAL_VALUE) {
        alert("You can't heal to more than your max initial health");
        healValue  = chosenMaxLife - currentPlayerHealth;
    }else {
        healValue = PLAYER_HEAL_VALUE;
    }
    increasePlayerHealth(PLAYER_HEAL_VALUE);
    currentPlayerHealth += PLAYER_HEAL_VALUE;
    endRound();    
}
attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
