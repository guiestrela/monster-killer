const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 14;
const PLAYER_HEAL_VALUE = 20;

const MODE_ATTACK = 'ATTACK';
const MODE_STRONG_ATTACK = 'STRONG_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER';

const enteredValue = parseInt(prompt('Please enter with maximum life for you abd the monster: '));

let chosenMaxLife =  enteredValue;
let battleLog = [];

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth =  chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth
    };        
    if (event === LOG_EVENT_PLAYER_ATTACK){
        logEntry.target = 'MONSTER';
    }else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry.target = 'MONSTER';       
    }else if (event === LOG_EVENT_MONSTER_ATTACK) {
        logEntry.target = 'PLAYER';      
    }else if (event === LOG_EVENT_PLAYER_HEAL) {
        logEntry.target = 'PLAYER';     
    }else if (event === LOG_EVENT_GAME_OVER) {
        logEntry;       
    }
    battleLog.push(logEntry)
}

function reset() {
    currentMonsterHealth =  chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK, 
        playerDamage, 
        currentMonsterHealth, 
        currentPlayerHealth
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you!');
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You won!!');
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'PAYER WON', 
            currentMonsterHealth, 
            currentPlayerHealth
        );        
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You lost!!');  
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'MONSTER WON', 
            currentMonsterHealth, 
            currentPlayerHealth
        );              
    }else  if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0){
        alert('You have a draw!!'); 
        writeToLog(
            LOG_EVENT_GAME_OVER, 
            'A DRAW', 
            currentMonsterHealth, 
            currentPlayerHealth
        );               
    }

    if (currentMonsterHealth <= 0 || currentPlayerHealth <= 0) {
        reset();
    }
}

function attackMonster(mode) {
    const maxDamage = 
    mode === MODE_ATTACK 
    ? ATTACK_VALUE 
    : STRONG_ATTACK_VALUE;
    const logEvent = 
    mode === MODE_ATTACK 
    ? LOG_EVENT_PLAYER_ATTACK 
    : LOG_EVENT_PLAYER_ATTACK;

    // if (mode === MODE_ATTACK) {
    //     maxDamage = ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_ATTACK;
    // }else if (mode === MODE_STRONG_ATTACK) {
    //     maxDamage = STRONG_ATTACK_VALUE;
    //     logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    // }
    
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent, 
        damage, 
        currentMonsterHealth, 
        currentPlayerHealth
    );        
    endRound();
}

function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
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
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL, 
        healValue, 
        currentMonsterHealth, 
        currentPlayerHealth
    );        
    endRound();    
}

function printLogHandler() {
    for (let i = 0; i < 3; i++) {
        console.log('-----');
    }
    // let j = 0;
    // while (j < 3) {
    //     console.log('-----');
    //     j++;
    // }
    // for (let i = 10; i < 0;){
    //     i++;
    //     console.log(battleLog[1])
    // }
    // for (let i = 0; i < battleLog.length; i++) {
    //     confirm(battleLog[1]);
    // }
    let i = 0;
    for (const logEntry in battleLog) {
        console.log(`#${i}`);
        for (const key in logEntry) {
            console.log(`${key} => ${logEntry[key]}`);
        }    
        i++;
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
