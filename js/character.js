// LISTENER ********************************************************************
let current_race_name = 'human_m'


var radios = document.querySelectorAll('input[type=radio][name="race"]');
radios.forEach(radio => radio.addEventListener('change', () => showRace(radio.value)));

class Build
{
    constructor(name,strength,toughness,agility,movement,weight,weight_mod){
        this.name = name
        this.strength = strength
        this.toughness = toughness
        this.agility = agility
        this.movement = movement
        this.weight = weight    // number of d10 to add to weight
        this.weight_mod = weight_mod // mod to roll on weight table
    }
}

const builds = [
    new Build('slight',-5,  -5, 10,   1, -2, -20),
    new Build('lean',  -5,   0,  5,   0, -1, -10),
    new Build('medium', 0,   0,  0,   0,  0,   0),
    new Build('brawny', 5,   0, -5,   0,  1,  10),
    new Build('rotund', 5,  10,-10,  -1,  2,  20)
]

const build_human = [
    'slight',
    'slight',
    'lean',
    'lean',
    'medium',
    'medium',
    'medium',
    'brawny',
    'brawny',
    'rotund',
    'rotund'
]

const build_dwarf = [
    'slight',
    'lean',
    'lean',
    'medium',
    'medium',
    'medium',
    'brawny',
    'brawny',
    'rotund',
    'rotund',
    'rotund'
]

const build_elf = [
    'slight',
    'slight',
    'lean',
    'lean',
    'lean',
    'medium',
    'medium',
    'medium',
    'brawny',
    'brawny',
    'rotund'
]

const build_halfling = [
    'slight',
    'lean',
    'medium',
    'medium',
    'medium',
    'brawny',
    'brawny',
    'brawny',
    'rotund',
    'rotund',
    'rotund'
]

const build_gnome = [
    'slight',
    'slight',
    'lean',
    'lean',
    'lean',
    'medium',
    'medium',
    'medium',
    'medium',
    'brawny',
    'rotund'
]

const build_roll = [
    1,
    5,
    15,
    25,
    40,
    55,
    70,
    85,
    95,
    99,
    100
]

const build = {
    high_elf_m: build_elf,
    high_elf_f: build_elf,
    wood_elf_m: build_elf,
    wood_elf_f: build_elf,
    halfling_m: build_halfling,
    halfling_f: build_halfling,
    human_m: build_human,
    human_f: build_human,
    gnome_m: build_gnome,
    gnome_f: build_gnome,
    dwarf_m: build_dwarf,
    dwarf_f: build_dwarf
}

const buildByName = {
    slight: builds[0],
    lean: builds[1],
    medium: builds[2],
    brawny: builds[3],
    rotund: builds[4]
}

let current_build = builds[2]

// WEIGHT ***********************************************************
const weight_roll = [
    1,
    3,
    5,
    8,
    12,
    17,
    22,
    29,
    37,
    49,
    64,
    71,
    78,
    83,
    88,
    92,
    95,
    97,
    99,
    100
]

const weight_human = [
    105,
    110,
    115,
    120,
    125,
    130,
    135,
    140,
    145,
    150,
    155,
    160,
    165,
    170,
    175,
    180,
    190,
    200,
    210,
    220
]

const weight_dwarf = [
    90,
    95,
    100,
    105,
    110,
    115,
    120,
    125,
    130,
    135,
    140,
    145,
    150,
    155,
    160,
    165,
    170,
    175,
    180,
    185
]

const weight_elf = [
    80,
    85,
    90,
    95,
    100,
    100,
    105,
    110,
    115,
    120,
    120,
    125,
    130,
    135,
    140,
    140,
    145,
    150,
    155,
    160
]

const weight_halfling = [
    75,
    75,
    80,
    80,
    85,
    85,
    90,
    90,
    95,
    100,
    100,
    105,
    110,
    115,
    120,
    125,
    130,
    135,
    140,
    145
]

const weight_gnome = [
    75,
    75,
    80,
    80,
    85,
    85,
    90,
    90,
    95,
    100,
    100,
    105,
    110,
    115,
    120,
    125,
    130,
    135,
    140,
    145
]

const weightByRace = {
    high_elf_m: weight_elf,
    high_elf_f: weight_elf,
    wood_elf_m: weight_elf,
    wood_elf_f: weight_elf,
    halfling_m: weight_halfling,
    halfling_f: weight_halfling,
    human_m: weight_human,
    human_f: weight_human,
    gnome_m: weight_gnome,
    gnome_f: weight_gnome,
    dwarf_m: weight_dwarf,
    dwarf_f: weight_dwarf
}

// HEIGHT ********************************************************************
const weight_mod_by_height_range = [
    39,
    42,
    45,
    48,
    51,
    54,
    57,
    63,
    66,
    68,
    71,
    74,
    77,
    78
]

const height = {
    high_elf_m: 66,
    high_elf_f: 64,
    wood_elf_m: 66,
    wood_elf_f: 64,
    halfling_m: 40,
    halfling_f: 38,
    human_m: 64,
    human_f: 60,
    gnome_m: 44,
    gnome_f: 42,
    dwarf_m: 48,
    dwarf_f: 46
}

let current_height = height[current_race_name] + 5

/**
 * ROLL SIZE
 * @param {boolean} random if false, generate a mdium value instead of a random one
 */
function rollSize(random = 0){
    let roll = rollDice(10)
    if(random == 0){
        roll = 5
    }
    
    // special roll for human (roll)
    const words = current_race_name.split("_")
    if(words[0] === 'human'){
        if (roll == 10) roll += rollDice(10)
    }

    current_height = height[current_race_name] + roll
    showSize(current_height)
}

/**
 * SHOW SIZE
 * @param {number} size height in inches
 */
function showSize(size){
    //size range
    let min = height[current_race_name] + 1
    let max = height[current_race_name] + 10
    const size_roll = document.getElementById('size_roll')
    const words = current_race_name.split("_")
    let human_size_case = ''
    if(words[0] === 'human'){
        human_size_case = ' (if 10, add 1d10 more)'
        max = height[current_race_name] + 20
    }
    size_roll.innerHTML = `${inchesToFeet(height[current_race_name])} (${inchesToMeter(height[current_race_name])} m) + 1d10 inches ${human_size_case}`
    const size_range = document.getElementById('size_range')
    size_range.innerHTML = `min = ${inchesToFeet(min)} (${inchesToMeter(min)} m) / max = ${inchesToFeet(max)} (${inchesToMeter(max)} m)`
    
    // size result
    let imperial = `${inchesToFeet(size)}`
    let standard = `${inchesToMeter(size)} m`
    const size_result = document.getElementById('size_result')
    size_result.innerHTML = `${imperial} = ${standard}`

    displayHeight()
}

// FEATURES  *************************************************************
class Feature{
    constructor(name,effects,rank){
        this.name = name
        this.effects = effects
        this.rank = rank
    }
}

const feature_roll = [
    30,
    55,
    70,
    85,
    95,
    00
]

const feature_human = [
    0,
    1,
    2,
    2,
    3,
    4
]

const feature_dwarf = [
    0,
    1,
    2,
    3,
    3,
    4
]

const feature_elf = [
    0,
    0,
    1,
    1,
    2,
    3
]

const feature_halfling = [
    0,
    1,
    1,
    2,
    2,
    3
]

const feature_gnome = [
    0,
    1,
    2,
    2,
    2,
    3
]

const feature_arms = [
    new Feature('Big Hands','+5 Dex',2),
    new Feature('Long Nails','',1),
    new Feature('Missing Nails','',1),
    new Feature('Missing Finger','',3),
    new Feature('Rough Hands','-5 Dex',2),
    new Feature('Single Arm','Amputated Arm, +2 Fate',1),
    new Feature('Small Hands','-5 Dex',2),
    new Feature('Strong Grip','+5 Dex',2)
]

const feature_bodily = [
    new Feature('Birthmark','',3),
    new Feature('Pleasant Scent','+5 Fel',1),
    new Feature('Scarred Skin','-5 Fel, +10 Intimidate Skill',2),
    new Feature('Tatoo','',3),
    new Feature('Unpleasant Odour','-5 Fel',2)
]

const feature_body = [
    new Feature('Barrel-Chested','+5 S, +5 T, -5 Ag',4),
    new Feature('Bigger Belly','+40 on Build Table',2),
    new Feature('Limp','-1 M',2),
    new Feature('Stooping Back','-1 Standing before your betters',1),
    new Feature('Straight Back','+1 Standing before your betters',1),
    new Feature('Very Short','-1d10" shorter than min, +5 Ag',1),
    new Feature('Very Tall','+1d10 to size roll, +5 Fel',1)
]

const feature_facial = [
    new Feature('Bad Breath','-5 Fel',3),
    new Feature('Big Ears','',2),
    new Feature('Missing Ear','',1),
    new Feature('Haughty Expression','-5 Fel, +1 Standing',1),
    new Feature('Sneer','-5 Fel, +5 Initmidate Skill',2),
    new Feature('Charismatic Eyes','+5 Fel',1),
    new Feature('Lazy Eye','',1),
    new Feature('Single Eye or Patch','-10 BS, +20 Intimidate Skill',1),
    new Feature('Attractive Features','gain Attractive Talent',2),
    new Feature('Pox Marks','+1 Corruption, +1 Fate',1),
    new Feature('Ruddy Face','',1),
    new Feature('Scarred Face','-5 Fel, +10 Intimidate Skill',1),
    new Feature('Broken Nose','',1),
    new Feature('Flat Nose','',1),
    new Feature('Hawk Nose','',1),
    new Feature('Hook Nose','',1),
    new Feature('Large Nose','',1),
    new Feature('Nose Ring','',1),
    new Feature('Strange Teeth','',1),
    new Feature('Very White Teeth','+5 Fel',1)
]

const feature_facial_hair = [
    new Feature('Bushy Eyebrows','',1),
    new Feature('Goatee','',3),
    new Feature('Missing Eyebrows','',1),
    new Feature('Monobrow','',2),
    new Feature('Moustache','',8),
    new Feature('Mutton Chops','',3)
]

const feature_hair = [
    new Feature('Bald (or balding)','',2),
    new Feature('Curly Hair','',2),
    new Feature('Excessive Hair','',2),
    new Feature('Very Long Hair','',2),
    new Feature('Very Short Hair','',2)
]

const feature_leg = [
    new Feature('Distinctive Gait','',1),
    new Feature('Long Legs','+5 Fel, +1 M',1),
    new Feature('Short Legs','-1 M',1),
    new Feature('Silly Walk','',1),
    new Feature('Strong Legs','gain Strong Legs Talent',1)
]

const feature_voice = [
    new Feature('Lisp','-5 Fel',1),
    new Feature('Loud Voice','-5 Fel, +10 Leadership Skill',1),
    new Feature('Strong Accent','-1 SL on failed Language Tests',1),
    new Feature('Stutter','-10 penalty to all Language Tests',1),
    new Feature('Very Clear Voice','+1 SL on passed Language Tests',1)
]

const numberOfFeaturesByRace = {
    high_elf_m: feature_elf,
    high_elf_f: feature_elf,
    wood_elf_m: feature_elf,
    wood_elf_f: feature_elf,
    halfling_m: feature_halfling,
    halfling_f: feature_halfling,
    human_m: feature_human,
    human_f: feature_human,
    gnome_m: feature_gnome,
    gnome_f: feature_gnome,
    dwarf_m: feature_dwarf,
    dwarf_f: feature_dwarf
}

const features = [
    feature_arms,
    feature_bodily,
    feature_body,
    feature_facial,
    feature_facial_hair,
    feature_hair,
    feature_leg,
    feature_voice
]


// HANDEDNESS *************************************************************
const handedness = [
    'left-handed + 1 level of the Ambidextrous talent',
    'left-handed',
    'right-handed',
    'right-handed + 1 level of the Ambidextrous talent',
    'gain both levels in the Ambidextrous talent'
]

const handedness_roll = [
    1,
    20,
    95,
    99,
    100
]

let current_handedness = handedness[2]

/**
 * 
 * @param {boolean} random 
 */
function rollHandedness(random = 0){
    let roll = rollDice(100)
    if(random == 0){
        roll = 50
    }
    current_handedness = handedness[getIndex(roll,handedness_roll)]
    showTable('table_handedness',handedness_roll,handedness)
    showResult(roll,'table_handedness',handedness_roll)
    displayHandedness()
}

/**
 * 
 * @param {number} roll number rolled (between 1 and 100 (included))
 * @param {*} effect string describing the effect
 * @param {*} table table where the line is added
 */
function addHandednessLine(roll,effect,table){
    var row = table.insertRow(-1)

    // roll
    var col1 = row.insertCell(0)
    col1.setAttribute('data-label','roll')
    col1.innerHTML += roll

    // effects
    var col2 = row.insertCell(1)
    col2.setAttribute('data-label','effects')
    col2.innerHTML += effect
}

/**
 * 
 * @param {string} table_name id of the html table
 * @param {array} roll_array 
 * @param {array} property_array 
 * TODO: pass addHandednessLine as parameter 
 */
function showTable(table_name,roll_array,property_array){
    const table = document.getElementById(table_name)
    if(roll_array.length == property_array.length){
        const ranges = getRollRange(roll_array)
        clearTable(table)
        for(let i = 0;i < roll_array.length;i++){
            addHandednessLine(ranges[i],property_array[i],table)
        }
    }
}



// UTILS ********************************************************************
/**
 * INCHES TO METER
 * @param {number} size length in inches
 * @returns value of size in meters
 */
function inchesToMeter(size){
    return (size*0.0254).toFixed(2)
}

/**
 * INCHES TO FEET
 * @param {number} size a length in inches
 * @returns string corresponding to the same length in feet
 */
function inchesToFeet(size){
    return `${Math.floor(size / 12)}' ${size % 12}"`
}

/**
 * POUNDS TO KILOS
 * @param {number} weight a weight in lbs
 * @returns value of wieght in kilogramms
 */
function poundsToKilos(weight){
    return (weight / 2.2046).toFixed(1)
}

/**
 * ROLL d100
 * @returns a number between 1 and 100 (included)
 */
function rollD100(){    
    return Math.floor(1+ Math.random() * 100)
}

/**
 * IS INT
 * @param {*} value value to evaluate
 * @returns true if value is a number
 */
function isInt(value){
    if (isNaN(value)) {
        return false;
    }
    var x = parseFloat(value);
    return (x | 0) === x;
}

/**
 * ROOL DICE
 * @param {number} maxValue maximum value possible
 * @returns a number between 1 and maxValue (included)
 */
function rollDice(maxValue){
    if(isInt(maxValue)){
        return Math.floor(1+ Math.random() * maxValue)
    }
    return rollD100()
}

/**
 * MERGE ARRAYS
 * @param {array} group array of arrays
 * @returns an array obtained by merging all the array of group
 */
function mergeArrays(group){
    let joinedArray = []
    for(const list of group){
        joinedArray.push(...list)
    }
    return joinedArray
}

/**
 * APPLY MODIFIER
 * @param {number} score original roll value
 * @param {number} mod modifier to apply
 * @returns modified score (min 1, max 100)
 */
function applyModifier(score,mod){
    let result = score + mod
    if(result < 1) result = 1
    if(result > 100) result = 100
    return result
}

/**
 * GET INDEX
 * @param {number} score 
 * @param {array} arrayRoll 
 * @returns index of the element of the arrayRoll where (arrayRoll[i-1] < score <= arrayRoll[i]) | default = 0
 */
function getIndex(score,arrayRoll){
    let index = 0
    if(arrayRoll != null){
        for(let i = 1;i < arrayRoll.length;i++){
            if(score > arrayRoll[i-1] && score <= arrayRoll[i]){
                index = i 
            }               
        }
    }    
    return index
}

/**
 * GET ROLL RANGE
 * @param {array} arrayRoll array of upper values of range
 * @returns array of formatted string matching the input
 */
 function getRollRange(arrayRoll){
    let ranges = []
    for(let i = 0; i < arrayRoll.length; i++){
        let range = ''
        if(arrayRoll[0] == 1) range = '1'
        if(arrayRoll[0] > 1) range = `1 - ${arrayRoll[0]}`
        if(i > 0){
            if(arrayRoll[i] == (arrayRoll[i-1]+1)){
                range = arrayRoll[i]
            }else{
                range = `${arrayRoll[i-1]+1} - ${arrayRoll[i]}`
            }            
        }
        ranges.push(range)
    }
    return ranges
}

/**
 * ADD PLUS STRING
 * @param {string} numberString 
 * @returns string return '+' if numberString represent a positive number, '' else
 */
function addPlusString(numberString){
    let plus_string = ''
    if(isInt(numberString) && numberString > 0) plus_string = '+'
    return plus_string
}

/**
 * SHOW RESULT
 * @param {number} roll number rolled
 * @param {string} table_name name of the table where the result are shown
 * @param {array} array_roll range of rolls
 */
 function showResult(roll,table_name,array_roll){
    const table = document.getElementById(table_name)
    const rows = table.rows
    // clear previous result
    for(const row of rows){
        row.classList.remove('active')
    }
    // display last result
    rows[getIndex(roll,array_roll)+1].classList.add('active')
}

/**
 * TOGGLE VISIBILITY
 * @param {string} id id of the element to toggle the visibility
 */
 function toggle_visibility(id) 
 {
     var e = document.getElementById(id);
     if ( e.style.display === 'block' )
         e.style.display = 'none';
     else
         e.style.display = 'block';
 }

// RACE ********************************************************************
class Race{
    constructor(name,rank){
        this.name = name
        this.rank = rank
    }
}

const races = [
    new Race('human',89),
    new Race('halfling',4),
    new Race('dwarf',4),
    new Race('gnome',1),
    new Race('high_elf',1),
    new Race('wood_elf',1)
]

/**
 * GET GROUP ROLL
 * @param {array} arrayWithRank array of object with a property 'rank' (number)
 * @returns array
 */
function getGroupRoll(arrayWithRank){
    let total = 0
    let group_roll = []
    arrayWithRank.forEach(element => {
        total += element.rank
        group_roll.push(total)
    })
    return group_roll
}

/**
 * SHOW RACE
 * @param {string} name gendered race name
 */
function showRace(name){
    current_race_name = name
    
    rollSize(false)
    rollBuild(false)
    rollWeight(false)
    rollHandedness(false)
    rollEyes(false)
    rollHair(false)
    rollFeatures(false)
    displayRace()
    showTableNumberFeature('table_number_feature',feature_roll,numberOfFeaturesByRace[current_race_name])
}

/**
 * ROLL NPC (of the current race)
 */
function rollNPC(){
    rollSize(true)
    rollBuild(true)
    rollWeight(true)
    rollHandedness(true)
    rollEyes(true)
    rollHair(true)
    rollFeatures(true)
    displayRace()
    showTableNumberFeature('table_number_feature',feature_roll,numberOfFeaturesByRace[current_race_name])
}

/**
 * ROLL RACE
 * @param {boolean} random 
 */
function rollRace(random = 0){
    let roll = rollDice(100)
    if(random == 0){
        roll = 50
    }
    let race_name = races[getIndex(roll,getGroupRoll(races))].name
    let gender_suffix = '_m'
    if(roll % 2 > 0) gender_suffix = '_f'
    current_race_name = `${race_name}${gender_suffix}`
    showRace(current_race_name)
}

/**
 * DISPLAY RACE
 */
function displayRace(){
    const current_race = document.getElementById('current_race')
    current_race.classList.add('capitalize')
    current_race.innerHTML = getRaceString(current_race_name)
}

/**
 * DISPLAY BUILD
 */
function displayBuild(){
    const result_build = document.getElementById('result_build')
    result_build.innerHTML = current_build.name
}

/**
 * DISPLAY HEIGHT
 */
function displayHeight(){
    const result_height = document.getElementById('result_height')
    result_height.innerHTML = `${inchesToFeet(current_height)} = ${inchesToMeter(current_height)} m`
}

/**
 * DISPLAY WEIGHT
 */
function displayWeight(){
    const result_weight = document.getElementById('result_weight')
    result_weight.innerHTML = `${current_weight} lbs = ${poundsToKilos(current_weight)} kg`
}

/**
 * DISPLAY HANDEDNESS
 */
function displayHandedness(){
    const result_handedness = document.getElementById('result_handedness')
    result_handedness.innerHTML = `${current_handedness}`
}

/**
 * DISPLAY EYE COLOR
 */
function displayEyeColor(){
    const result_eye = document.getElementById('result_eye')
    result_eye.innerHTML = `${current_eye}`
}

/**
 * DISPLAY HAIR COLOR
 */
function displayHairColor(){
    const result_hair = document.getElementById('result_hair')
    result_hair.innerHTML = `${current_eye}`
}

/**
 * DISPLAY FEATURES
 */
function displayFeatures(){
    const result_features = document.getElementById('result_features')
    let feature_string = ''
    current_features.forEach(element => {
        feature_string += `${element.name}, `
    })
    result_features.innerHTML = `${feature_string.substring(0,feature_string.length - 2)}`
}

/**
 * GET RACE STRING
 * @param {string} name gendered race name
 * @returns formatted string with spaces instead of _
 */
function getRaceString(name){
    let raceString = ''
    const words = name.split("_")

    for(let i=0;i<words.length-1;i++){
        raceString += `${words[i]} `
    }

    let gender_prefix = ''
    if(words[words.length-1] === 'f') gender_prefix = 'fe'
    raceString += `(${gender_prefix}male)`
    return raceString
}

// BUILD ********************************************************************
/**
 * ROLL BUILD
 * @param {boolean} random 
 */
function rollBuild(random = 0){
    let roll = rollDice(100)
    if(random == 0){
        roll = 51
    }
    showBuild(build[current_race_name][getIndex(roll,build_roll)])
    //showTable('table_racial_build',build_roll,build[current_race_name])
    showTableRacialBuild()
    showResult(roll,'table_racial_build',build_roll)
    rollWeight(false)
}

/**
 * SHOW BUILD
 * @param {string} build_name 
 */
function showBuild(build_name){
    // get build
    builds.forEach(element => {
        if(element.name == build_name) current_build = element
    })

    // display result
    const build_result = document.getElementById('build_result')
    build_result.innerHTML = `${current_build.name.toUpperCase()}`

    const build_effect = document.getElementById('build_effect')
    build_effect.innerHTML = getBuildEffects(current_build)
    displayBuild()
}

/**
 * GET BUILD EFFECTS
 * @param {Build} build selected build
 * @returns string list of modifier for the selected build
 */
function getBuildEffects(build){
    let effects_string = ''
    const separator = ', '
    if(build.strength != 0) effects_string += `S ${addPlusString(build.strength)}${build.strength}${separator}`
    if(build.toughness != 0) effects_string += `T ${addPlusString(build.toughness)}${build.toughness}${separator}`
    if(build.agility != 0) effects_string += `Ag ${addPlusString(build.agility)}${build.agility}${separator}`
    if(build.movement != 0) effects_string += `W ${addPlusString(build.movement)}${build.movement}${separator}`
    if(build.weight != 0) effects_string += `Weight ${addPlusString(build.weight)}${build.weight}d10 lbs${separator}`
    if(build.weight_mod != 0) effects_string += `${addPlusString(build.weight_mod)}${build.weight_mod} weight roll${separator}`
    return effects_string.substring(0,effects_string.length - separator.length)
}

/**
 * SHOW TABLE BUILD
 */
function showTableBuild(){
    const table_build = document.getElementById('table_build')
    builds.forEach(build => {
        addBuildLine(build,table_build)
    })
}

/**
 * ADD BUILD LINE
 * @param {build} build 
 * @param {htmlTable} table 
 */
function addBuildLine(build,table){
    var row = table.insertRow(-1)

    // name
    var col1 = row.insertCell(0)
    col1.setAttribute('data-label','name')
    col1.innerHTML += build.name

    // Strength
    var col2 = row.insertCell(1)
    col2.setAttribute('data-label','strength')
    col2.innerHTML += `${addPlusString(build.strength)}${build.strength}`

    // Toughness
    var col3 = row.insertCell(2)
    col3.setAttribute('data-label','toughness')
    col3.innerHTML += `${addPlusString(build.toughness)}${build.toughness}`

    // Agility
    var col4 = row.insertCell(3)
    col4.setAttribute('data-label','agility')
    col4.innerHTML += `${addPlusString(build.agility)}${build.agility}`

    // Movement
    var col5 = row.insertCell(4)
    col5.setAttribute('data-label','movement')
    col5.innerHTML += `${addPlusString(build.movement)}${build.movement}`

    // weight
    var col6 = row.insertCell(5)
    col6.setAttribute('data-label','weight')
    let dice_string = ''
    if(build.weight != 0) dice_string = 'd10 lbs'
    col6.innerHTML += `${addPlusString(build.weight)}${build.weight}${dice_string}`

    // weight roll modifier
    var col7 = row.insertCell(6)
    col7.setAttribute('data-label','weight roll modifier')
    col7.innerHTML += `${addPlusString(build.weight_mod)}${build.weight_mod}`
}

/**
 * SHOW TABLE RACIAL BUILD
 */
function showTableRacialBuild(){
    const table = document.getElementById('table_racial_build')
    if(build_roll.length == build[current_race_name].length){
        const ranges = getRollRange(build_roll)
        clearTable(table)
        for(let i = 0;i < build_roll.length;i++){
            addRaceBuildLine(ranges[i],build[current_race_name][i],table)
        }
    }
}

/**
 * CLEAR TABLE
 * @param {htmlTable} table 
 */
function clearTable(table){
    while(table.rows.length > 1){
        table.deleteRow(1)
    }
}

/**
 * ADD RACE BUILD LINE
 * @param {number} roll 
 * @param {string} name 
 * @param {htmlTable} table 
 */
function addRaceBuildLine(roll,name,table){
    var row = table.insertRow(-1)

    // roll
    var col1 = row.insertCell(0)
    col1.setAttribute('data-label','roll')
    col1.innerHTML += roll

    // name
    var col2 = row.insertCell(1)
    col2.setAttribute('data-label','name')
    col2.innerHTML += name

    // effects
    var col3 = row.insertCell(2)
    col3.setAttribute('data-label','effects')
    col3.innerHTML += getBuildEffects(buildByName[name])
}

showTableBuild()

// WEIGHT ********************************************************************
let current_weight = weightByRace[current_race_name][getWeightIndex(50)] + current_build.weight * 5

/**
 * ROLL WEIGHT
 * @param {boolean} random 
 */
function rollWeight(random = 0){
    let roll = applyModifier(rollDice(60)+20,current_build.weight_mod)
    if(random == 0){
        roll = applyModifier(51,current_build.weight_mod)
    }
    if(weight_roll.length == weightByRace[current_race_name].length){
        let build_modifier = current_build.weight * rollDice(10)
        current_weight = weightByRace[current_race_name][getWeightIndex(roll)] + build_modifier
        showWeight(current_weight)
    }
}

/**
 * GET WEIGHT INDEX
 * @param {number} score 
 * @returns 
 */
function getWeightIndex(score){
    let weight_index = 0
    for(let i = 1;i < weight_roll.length;i++){
        if(score > weight_roll[i-1] && score <= weight_roll[i]){
            weight_index = i 
        }               
    }
    return weight_index
}

/**
 * SHOW WEIGHT
 * @param {number} weight in lbs
 */
function showWeight(weight){
    // range
    const weight_range = document.getElementById('weight_range')
    let min = weightByRace[current_race_name][getWeightIndex(20+current_build.weight_mod)] + current_build.weight * 10
    let max = weightByRace[current_race_name][getWeightIndex(80+current_build.weight_mod)] + current_build.weight * 10
    weight_range.innerHTML = `min = ${min} lbs (${poundsToKilos(min)} kg) / max = ${max} lbs (${poundsToKilos(max)} kg)`

    // result
    let imperial = `${weight} lbs`
    let standard = `${poundsToKilos(weight)} kg`
    const weight_result = document.getElementById('weight_result')
    weight_result.innerHTML = `${imperial} = ${standard}`

    displayWeight()
}

// FEATURES ********************************************************************
let distinguishing_feature =  mergeArrays(features)
let number_of_features = getNumberOfFeatures(50)
let current_features = getFeatures(number_of_features,feature_roll)

/**
 * SHOW TABLE NUMBER FEATURE
 * @param {string} table_name 
 * @param {array} roll_array 
 * @param {*} property_array 
 */
 function showTableNumberFeature(table_name,roll_array,property_array){
    const table = document.getElementById(table_name)
    if(roll_array.length == property_array.length){
        const ranges = getRollRange(roll_array)
        clearTable(table)
        for(let i = 0;i < roll_array.length;i++){
            addFeatureNumberLine(ranges[i],property_array[i],table)
        }
    }
}

/**
 * ADD FEATURE LINE
 * @param {number} roll 
 * @param {*} feature 
 * @param {htmlTable} table 
 */
function addFeatureNumberLine(roll,feature,table){
    var row = table.insertRow(-1)

    // roll
    var col1 = row.insertCell(0)
    col1.setAttribute('data-label','roll')
    col1.innerHTML += roll

    // name
    var col2 = row.insertCell(1)
    col2.setAttribute('data-label','name')
    col2.innerHTML += feature
}

/**
 * GET NUMBER OF FEATURES
 * @param {number} roll 
 * @returns number of features accroding to current race and roll
 */
function getNumberOfFeatures(roll){
    return numberOfFeaturesByRace[current_race_name][getIndex(roll,feature_roll)]
}

/**
 * ROLL FEATURES
 * @param {boolean} random 
 */
function rollFeatures(random = 0){
    let roll = rollDice(100)
    if(random == 0) {
        roll = 50
    }
    number_of_features = getNumberOfFeatures(roll)
    const features_roll = getGroupRoll(distinguishing_feature)    
    current_features = getFeatures(number_of_features,features_roll)
    showTableFeature('table_feature',features_roll,distinguishing_feature)
    showResults(current_features)
    displayFeatures()
}

/**
 * GET FEATURES
 * @param {number} numberOfFeature 
 * @param {array} features_roll 
 * @returns array[features]
 */
function getFeatures(numberOfFeature,features_roll){
    let features = []    
    for(let i = 0; i < numberOfFeature; i++){
        let roll = rollDice(100)
        features.push(distinguishing_feature[getIndex(roll,features_roll)])
    }
    return features
}

/**
 * GET INDEX BY NAME
 * @param {string} name 
 * @param {array} arrayWithName array of object with a property 'name'
 * @returns number index
 */
function getIndexByName(name,arrayWithName){
    let index = 0
    for(let i =1; i < arrayWithName.length;i++){
        if(name.localeCompare(arrayWithName[i].name) == 0){
            index = i
        }
    }
    return index
}

/**
 * SHOW TABLE FEATURE
 * @param {string} table_name 
 * @param {array} roll_array 
 * @param {*} property_array 
 */
function showTableFeature(table_name,roll_array,property_array){
    const table = document.getElementById(table_name)
    if(roll_array.length == property_array.length){
        const ranges = getRollRange(roll_array)
        clearTable(table)
        for(let i = 0;i < roll_array.length;i++){
            addFeatureLine(ranges[i],property_array[i],table)
        }
    }
}

/**
 * ADD FEATURE LINE
 * @param {number} roll 
 * @param {*} feature 
 * @param {htmlTable} table 
 */
function addFeatureLine(roll,feature,table){
    var row = table.insertRow(-1)

    // roll
    var col1 = row.insertCell(0)
    col1.setAttribute('data-label','roll')
    col1.innerHTML += roll

    // name
    var col2 = row.insertCell(1)
    col2.setAttribute('data-label','name')
    col2.innerHTML += feature.name

    // effects
    var col3 = row.insertCell(2)
    col3.setAttribute('data-label','effects')
    col3.innerHTML += feature.effects
}

/**
 * SHOW RESULTS
 * @param {array} featureArray 
 */
function showResults(featureArray){
    const table = document.getElementById('table_feature')
    const rows = table.rows
    // clear previous result
    for(const row of rows){
        row.classList.remove('active')
    }
    // display last result
    for(const element of featureArray){
        rows[getIndexByName(element.name,distinguishing_feature)+1].classList.add('active')
    }
}

// EYES ********************************************************************
const eyes_roll = [
    2,
    3,
    4,
    7,
    11,
    14,
    17,
    18,
    19,
    20
]

const eyes_human = [
    'choose one', 
    'green',
    'pale blue',
    'blue',
    'pale grey',
    'grey',
    'brown',
    'hazel',
    'dark brown',
    'black'
]

const eyes_dwarf = [
    'coal',
    'lead',
    'steel',
    'blue',
    'earth brown',
    'dark brown',
    'hazel',
    'green',
    'copper',
    'gold'
]

const eyes_halfling = [
    'light grey',
    'grey',
    'pale blue',
    'blue',
    'green',
    'hazel',
    'brown',
    'copper',
    'dark brown',
    'dark brown'
]

const eyes_high_elf = [
    'jet',
    'amethyst',
    'aquamarine',
    'sapphire',
    'turquoise',
    'emerald',
    'amber',
    'copper',
    'citrine',
    'gold'
]

const eyes_wood_elf = [
    'ivory',
    'charcoal',
    'ivy green',
    'mossy green',
    'chestnut',
    'chestnut',
    'dark brown',
    'tan',
    'sandy brown',
    'violet'
]

const eyes_gnome = [
    'pale blue',
    'blue',
    'deep blue',
    'turquoise',
    'pale green',
    'hazel',
    'pale brown',
    'brown',
    'dark brown',
    'violet'
]

const eyeByRace = {
    high_elf_m: eyes_high_elf,
    high_elf_f: eyes_high_elf,
    wood_elf_m: eyes_wood_elf,
    wood_elf_f: eyes_wood_elf,
    halfling_m: eyes_halfling,
    halfling_f: eyes_halfling,
    human_m: eyes_human,
    human_f: eyes_human,
    gnome_m: eyes_gnome,
    gnome_f: eyes_gnome,
    dwarf_m: eyes_dwarf,
    dwarf_f: eyes_dwarf
}

let current_eye = eyeByRace[current_race_name][getIndex(11,eyes_roll)]

/**
 * ROLL EYES
 * @param {boolean} random 
 */
function rollEyes(random = 0){
    let roll = rollDice(10) + rollDice(10)
    if(random == 0){
        roll = 11
    }
    current_eye = eyeByRace[current_race_name][getIndex(roll,eyes_roll)]
    showTableEye('table_eyes',eyes_roll,eyeByRace[current_race_name])
    showResult(roll,'table_eyes',eyes_roll)
    displayEyeColor()
}

/**
 * SHOW TABLE EYE
 * @param {string} table_name 
 * @param {array} roll_array 
 * @param {*} property_array 
 */
function showTableEye(table_name,roll_array,property_array){
    const table = document.getElementById(table_name)
    if(roll_array.length == property_array.length){
        const ranges = getRollRange(roll_array)
        clearTable(table)
        for(let i = 0;i < roll_array.length;i++){
            addEyeLine(ranges[i],property_array[i],table)
        }
    }
}

/**
 * ADD EYE LINE
 * @param {number} roll 
 * @param {*} effect 
 * @param {htmlTable} table 
 */
function addEyeLine(roll,effect,table){
    var row = table.insertRow(-1)

    // roll
    var col1 = row.insertCell(0)
    col1.setAttribute('data-label','roll')
    col1.innerHTML += roll

    // color
    var col2 = row.insertCell(1)
    col2.setAttribute('data-label','color')
    col2.innerHTML += effect
}

// HAIR ********************************************************************
const hair_human = [
    'white blond',
    'golden blond',
    'red blond',
    'golden brown',
    'light brown',
    'dark brown',
    'black',
    'auburn',
    'red',
    'grey'
]

const hair_dwarf = [
    'white',
    'grey',
    'pale blond',
    'golden',
    'copper',
    'bronze',
    'brown',
    'dark brown',
    'reddish brown',
    'black'
]

const hair_halfling = [
    'grey',
    'flaxen',
    'russet',
    'honey',
    'chestnut',
    'ginger',
    'mustard',
    'almond',
    'chocolate',
    'liquorice'
]

const hair_high_elf = [
    'silver',
    'white',
    'pale blond',
    'blond',
    'yellow blond',
    'copper blond',
    'red blond',
    'auburn',
    'red',
    'black'
]

const hair_wood_elf = [
    'birch silver',
    'ash blond',
    'rose blond',
    'honey blond',
    'brown',
    'mahogany brown',
    'dark brown',
    'sienna',
    'ebony',
    'blue-black'
]

const hair_gnome = [
    'black',
    'dark brown',
    'auburn',
    'brown',
    'light brown',
    'ginger',
    'red blond',
    'golden blond',
    'white blond',
    'white'
]

const hairByRace = {
    high_elf_m: hair_high_elf,
    high_elf_f: hair_high_elf,
    wood_elf_m: hair_wood_elf,
    wood_elf_f: hair_wood_elf,
    halfling_m: hair_halfling,
    halfling_f: hair_halfling,
    human_m: hair_human,
    human_f: hair_human,
    gnome_m: hair_gnome,
    gnome_f: hair_gnome,
    dwarf_m: hair_dwarf,
    dwarf_f: hair_dwarf
}

let current_hair = hairByRace[current_race_name][getIndex(11,eyes_roll)]

/**
 * ROLL HAIR
 * @param {boolean} random 
 */
function rollHair(random = 0){
    let roll = rollDice(10) + rollDice(10)
    if(random == 0){
        roll = 11
    }
    current_eye = hairByRace[current_race_name][getIndex(roll,eyes_roll)]
    showTableHair('table_hair',eyes_roll,hairByRace[current_race_name])
    showResult(roll,'table_hair',eyes_roll)
    displayHairColor()
}

/**
 * SHOW TABLE HAIR
 * @param {string} table_name 
 * @param {array} roll_array 
 * @param {*} property_array 
 */
function showTableHair(table_name,roll_array,property_array){
    const table = document.getElementById(table_name)
    if(roll_array.length == property_array.length){
        const ranges = getRollRange(roll_array)
        clearTable(table)
        for(let i = 0;i < roll_array.length;i++){
            addHairLine(ranges[i],property_array[i],table)
        }
    }
}

/**
 * ADD HAIR LINE
 * @param {number} roll 
 * @param {*} effect 
 * @param {htmlTable} table 
 */
function addHairLine(roll,effect,table){
    var row = table.insertRow(-1)

    // roll
    var col1 = row.insertCell(0)
    col1.setAttribute('data-label','roll')
    col1.innerHTML += roll

    // color
    var col2 = row.insertCell(1)
    col2.setAttribute('data-label','color')
    col2.innerHTML += effect
}