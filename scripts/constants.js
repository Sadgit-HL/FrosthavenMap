var MAPVERSION = "1.1.0";
var MAPGAME = "FrostHaven";

var mapWidth = 40;
var mapHeight = 50;

var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

var HCellSize = 90;
var VCellSize = 78;
var cellType = "HEX"; // SQUARE - HEX

var defaultConfig = 'e30=';

var ImagePathRoot = "images/";

//Custom Inputs
var MAX_CustomInputs = 5
var CustomInput_SetTexts = [MAX_CustomInputs - 1];
CustomInput_SetTexts[0] = 'Set HP';
CustomInput_SetTexts[1] = 'Set Init';
CustomInput_SetTexts[2] = 'Set Seq nb';	//BEWARE :  2 & 3 should be exclusive here as they are on the same space !
CustomInput_SetTexts[3] = 'Set Coins';
CustomInput_SetTexts[4] = 'Set XP';

function listsort(a, b) {
	if (a[0] < b[0]) return -1;
	if (a[0] > b[0]) return 1;
	return 0;
}

function SortLIST(UnsortedObjectArray) {
	var SortedList = {};

	Object.keys(UnsortedObjectArray).sort().forEach(function (key) {
		SortedList[key] = UnsortedObjectArray[key];
	});

	return SortedList;
}

function FromRAWToLIST(RAWArray) {
	var LISTArray = {};
	for (var i = 0; i < RAWArray.length; i++) {
		var innerObject = {};
		innerObject.id = RAWArray[i][0];
		innerObject.title = RAWArray[i][1];
		innerObject.width = RAWArray[i][2];
		innerObject.height = RAWArray[i][3];
		innerObject.left = RAWArray[i][4];
		innerObject.top = RAWArray[i][5];
		innerObject.expansion = RAWArray[i][6];
		LISTArray[RAWArray[i][0]] = innerObject;
	}
	return LISTArray;
}

// opacity class = "CSS"
// or ' opened' / ' closed'suffix = "OC"
var OpenedClosedType = "OC"

//expansions short name
var bg = 'Base Game', jotl = 'Jaws of the Lion', fh = 'Frosthaven';

var EXPANSIONS = [
	[bg, 'Big', 'bg'],
	[jotl, 'Big', 'jotl'],
	[fh, 'Big', 'fh']];

var selectedExpansions = {};
var EXPANSION_GROUPS = {};
var EXPANSION_PATHS = {};
for (var i = 0; i < EXPANSIONS.length; i++) {
	selectedExpansions[folderize(EXPANSIONS[i][0])] = folderize(EXPANSIONS[i][0]);

	if (EXPANSION_GROUPS[EXPANSIONS[i][1]] == undefined) {
		EXPANSION_GROUPS[EXPANSIONS[i][1]] = [];
	}
	EXPANSION_GROUPS[EXPANSIONS[i][1]].push(EXPANSIONS[i][0]);
	EXPANSION_PATHS[EXPANSIONS[i][0]] = 'expansion/' + EXPANSIONS[i][2] + '/';
}

var ImagePathLevelImage = "common/level_cards/";
var ImagePathLevelFigureToken = "common/level_cards/";

var CurrentLevel = 0; // values 0 to 7
var ALL_LEVELS = 'Lvl0 Lvl1 Lvl2 Lvl3 Lvl4 Lvl5 Lvl6 Lvl7'
var ImagePathLevel = "";

// ------------------------------------------------------

//name,cols width, row height, width delta, height delta, expansion
MAP_TILES_RAW = [
[2, '01-B', 2, 5, 68, 39, bg],
[3, '01-C', 2, 5, 68, 39, bg],
[4, '01-D', 2, 5, 68, 39, bg],
[5, '01-E', 2, 5, 68, 39, bg],
[6, '01-F', 2, 5, 68, 39, bg],
[7, '01-G', 2, 5, 68, 39, bg],
[8, '01-H', 2, 5, 68, 39, bg],
[9, '02-A', 2, 5, 68, 39, bg],
[10, '02-B', 2, 5, 68, 39, bg],
[11, '02-C', 2, 5, 68, 39, bg],
[12, '02-D', 2, 5, 68, 39, bg],
[13, '02-E', 2, 5, 68, 39, bg],
[14, '02-F', 2, 5, 68, 39, bg],
[15, '02-G', 2, 5, 68, 39, bg],
[16, '02-H', 2, 5, 68, 39, bg],
[17, '02-I', 2, 5, 68, 39, bg],
[18, '02-J', 2, 5, 68, 39, bg],
[19, '02-K', 2, 5, 68, 39, bg],
[20, '02-L', 2, 5, 68, 39, bg],
[21, '03-A', 2, 5, 68, 120, bg],
[22, '03-B', 2, 5, 68, 120, bg],
[23, '03-C', 2, 5, 68, 120, bg],
[24, '03-D', 2, 5, 68, 120, bg],
[25, '04-A', 2, 5, 68, 77, bg],
[26, '04-B', 2, 5, 68, 77, bg],
[27, '04-C', 2, 5, 68, 77, bg],
[28, '04-D', 2, 5, 68, 77, bg],
[29, '05-A', 2, 5, 65, 77, bg],
[30, '05-B', 2, 5, 65, 77, bg],
[31, '06-A', 2, 5, 65, 39, bg],
[32, '06-B', 2, 5, 65, 39, bg],
[33, '07-A', 2, 5, 68, 39, bg],
[34, '07-B', 2, 5, 68, 39, bg],
[35, '07-C', 2, 5, 68, 39, bg],
[36, '07-D', 2, 5, 68, 39, bg],
[37, '07-E', 2, 5, 68, 39, bg],
[38, '07-F', 2, 5, 68, 39, bg],
[39, '07-G', 2, 5, 68, 39, bg],
[40, '07-H', 2, 5, 68, 39, bg],
[41, '08-A', 2, 5, 68, 77, bg],
[42, '08-B', 2, 5, 68, 77, bg],
[43, '09-A', 2, 5, 68, 77, bg],
[44, '09-B', 2, 5, 68, 77, bg],
[45, '09-C', 2, 5, 68, 77, bg],
[46, '09-D', 2, 5, 68, 77, bg],
[47, '10-A', 2, 5, 68, 39, bg],
[48, '10-B', 2, 5, 68, 39, bg],
[49, '10-C', 2, 5, 68, 39, bg],
[50, '10-D', 2, 5, 68, 39, bg],
[51, '11-A', 2, 5, 68, 39, bg],
[52, '11-B', 2, 5, 68, 39, bg],
[53, '11-C', 2, 5, 68, 39, bg],
[54, '11-D', 2, 5, 68, 39, bg],
[55, '11-E', 2, 5, 68, 39, bg],
[56, '11-F', 2, 5, 68, 39, bg],
[57, '12-A', 2, 5, 68, 77, bg],
[58, '12-B', 2, 5, 68, 77, bg],
[59, '12-C', 2, 5, 68, 77, bg],
[60, '12-D', 2, 5, 68, 77, bg],
[61, '13-A', 2, 5, 68, 39, bg],
[62, '13-B', 2, 5, 68, 39, bg],
[63, '13-C', 2, 5, 68, 39, bg],
[64, '13-D', 2, 5, 68, 39, bg],
[65, '13-E', 2, 5, 68, 39, bg],
[66, '13-F', 2, 5, 68, 39, bg],
[67, '14-A', 2, 5, 68, 77, bg],
[68, '14-B', 2, 5, 68, 77, bg],
[69, '15-A', 2, 5, 68, 35, bg],
[70, '15-B', 2, 5, 68, 35, bg],
[71, '15-C', 2, 5, 68, 35, bg],
[72, '15-D', 2, 5, 68, 35, bg],
[73, '16-A', 2, 5, 68, 39, bg],
[74, '16-B', 2, 5, 68, 39, bg],
[75, '16-C', 2, 5, 68, 39, bg],
[76, '16-D', 2, 5, 68, 39, bg],
[1, '01-A', 2, 5, 68, 39, bg],

];
MAP_TILES_LIST = FromRAWToLIST(MAP_TILES_RAW);

ANGLES_LIST = [
	[0],
	[60],
	[120],
	[180],
	[240],
	[300]
];


OVERLAYTILES_RAW = [
	[2, 'co bookshelf 2', 1, 1, 46, 39, bg],
	[3, 'co cave', 1, 1, 46, 39, bg],
	[4, 'co cave 2', 1, 1, 46, 39, bg],
	[5, 'co dungeon', 1, 1, 46, 39, bg],
	[6, 'co dungeon 2', 1, 1, 46, 39, bg],
	[7, 'co glowing orb', 1, 1, 46, 39, bg],
	[8, 'co metal', 1, 1, 46, 39, bg],
	[9, 'co metal 2', 1, 1, 46, 39, bg],
	[10, 'co pressure plate', 1, 1, 46, 39, bg],
	[11, 'co snow', 1, 1, 46, 39, bg],
	[12, 'co snow 2', 1, 1, 46, 39, bg],
	[13, 'co stairs', 1, 1, 46, 39, bg],
	[14, 'co supply shelf 2', 1, 1, 46, 39, bg],
	[15, 'wa debris 2', 1, 1, 46, 39, bg],
	[16, 'wa snow rock', 1, 1, 46, 39, bg],
	[17, 'wa snow rock 2', 1, 1, 46, 39, bg],
	[18, 'wa stalagmites', 1, 1, 46, 39, bg],
	[19, 'ic ice', 1, 1, 46, 39, bg],
	[20, 'ic ice 2', 1, 1, 46, 39, bg],
	[21, 'ha ice spikes', 1, 1, 46, 39, bg],
	[22, 'ha lava', 1, 1, 46, 39, bg],
	[23, 'di log 2', 1, 1, 46, 39, bg],
	[24, 'di power conduit 2', 1, 1, 46, 39, bg],
	[25, 'di rubble', 1, 1, 46, 39, bg],
	[26, 'di sarcophagus 2', 1, 1, 46, 39, bg],
	[27, 'di snow drift', 1, 1, 46, 39, bg],
	[28, 'di stairs', 1, 1, 46, 39, bg],
	[29, 'di water', 1, 1, 46, 39, bg],
	[30, 'di water 2', 1, 1, 46, 39, bg],
	[31, 'di water 3', 1, 1, 46, 39, bg],
	[1, 'co barrel', 1, 1, 46, 39, bg],

];
OVERLAYTILES_LIST = FromRAWToLIST(OVERLAYTILES_RAW);

DOORS_RAW = [

	[2, 'do dungeon door', 1, 1, 46, 39, bg],
	[3, 'do metal door', 1, 1, 46, 39, bg],
	[4, 'do snow door', 1, 1, 46, 39, bg],
	[1, 'do cave door', 1, 1, 46, 39, bg],

];
DOORS_LIST = FromRAWToLIST(DOORS_RAW);

// -----------------------------------------------

MOVABLE_TOKENS1_RAW = [
];
TMP_LIST1 = FromRAWToLIST(MOVABLE_TOKENS1_RAW);
var TempObject = {};
TempObject.id = 3;
TempObject.title = "$SEPARATOR$";
TMP_LIST1[TempObject.id] = TempObject;

MOVABLE_TOKENS2_RAW = [

	[2, 'tr poison trap', 1, 1, 46, 39, bg],
	[3, 'tr spike pit trap', 1, 1, 46, 39, bg],
	[4, 'pp pressure plate', 1, 1, 46, 39, bg],
	[5, 'ob altar', 1, 1, 46, 39, bg],
	[6, 'ob barrel', 1, 1, 46, 39, bg],
	[7, 'ob barricade 2', 1, 1, 46, 39, bg],
	[8, 'ob bookshelf 2', 1, 1, 46, 39, bg],
	[9, 'ob cave rock 2', 1, 1, 46, 39, bg],
	[10, 'ob control console 2', 1, 1, 46, 39, bg],
	[11, 'ob crate', 1, 1, 46, 39, bg],
	[12, 'ob debris', 1, 1, 46, 39, bg],
	[13, 'ob debris 2', 1, 1, 46, 39, bg],
	[14, 'ob glowing orb', 1, 1, 46, 39, bg],
	[28, 'ob ice crystal 3', 1, 1, 46, 39, bg],
	[15, 'ob ice pillar', 1, 1, 46, 39, bg],
	[16, 'ob mast', 1, 1, 46, 39, bg],
	[17, 'ob metal cabinet', 1, 1, 46, 39, bg],
	[18, 'ob nest', 1, 1, 46, 39, bg],
	[19, 'ob power conduit 2', 1, 1, 46, 39, bg],
	[20, 'ob sarcophagus 2', 1, 1, 46, 39, bg],
	[21, 'ob snow rock', 1, 1, 46, 39, bg],
	[22, 'ob snow rock 2', 1, 1, 46, 39, bg],
	[23, 'ob stalagmites', 1, 1, 46, 39, bg],
	[24, 'ob supply shelf 2', 1, 1, 46, 39, bg],
	[25, 'ob tree 3', 1, 1, 46, 39, bg],
	[26, 'loot', 1, 1, 30, 30, bg],
	[27, 'shadow', 1, 1, 30, 30, bg],
	[1, 'tr bear trap', 1, 1, 46, 39, bg],
	
];
TMP_LIST2 = FromRAWToLIST(MOVABLE_TOKENS2_RAW);
MOVABLE_TOKENS_LIST = Object.assign(TMP_LIST1, TMP_LIST2);

// -----------------------------------------------

var ImagePathConditionImage = "common/conditions_tokens/";
var ImagePathConditionFigureToken = "common/conditions_tokens/";
CONDITIONS_INITIAL = [

	[2, 'Brittle', true, false],
	[3, 'Disarm', true, false],
	[4, 'Immobilize', true, false],
	[5, 'Impair', true, false],
	[6, 'Invisible', true, false],
	[7, 'Muddle', true, false],
	[8, 'Poison', true, false],
	[9, 'Regenerate', true, false],
	[10, 'Strengthen', true, false],
	[11, 'Stun', true, false],
	[12, 'Wound', true, false],
  	[13, 'Ward', true, false],
	[14, 'Red Guard', true, false],
	[15, 'Hatchet', true, false],
  	[16, 'Doomstalker', true, false],
  	[17, 'Geminate Melee', true, false],  	
	[18, 'Geminate Range', true, false],
	[19, 'Deathwalker', true, false],
	[1, 'Bane', true, false],
];

var CONDITIONS = {};
var CONDITIONS_LIST = [];

for (var i = 0; i < CONDITIONS_INITIAL.length; i++) {
	CONDITIONS_LIST.push(CONDITIONS_INITIAL[i][1]);
	CONDITIONS[CONDITIONS_INITIAL[i][1]] = { 'hasConditionCard': CONDITIONS_INITIAL[i][2], 'canApplyMultipleTimes': CONDITIONS_INITIAL[i][3] };
}

// -----------------------------------------------

var MasterSuffix = ' elite' //' master';
var MinionSuffix = ' normal' //' minion';

var dummy = 'dummy';

var MONSTERS_RAW = [

	[2, 'abael scout', 1, 1, 41, 35, bg, false, [dummy], false],
	[3, 'algox archer', 1, 1, 41, 35, bg, false, [dummy], false],
	[4, 'algox guard', 1, 1, 41, 35, bg, false, [dummy], false],
	[5, 'algox icespeaker', 1, 1, 41, 35, bg, false, [dummy], false],
	[6, 'algox priest', 1, 1, 41, 35, bg, false, [dummy], false],
	[7, 'algox scout', 1, 1, 41, 35, bg, false, [dummy], false],
	[8, 'algox snowspeaker', 1, 1, 41, 35, bg, false, [dummy], false],
	[9, 'ancient artillery', 1, 1, 41, 35, bg, false, [dummy], false],
	[10, 'black imp', 1, 1, 41, 35, bg, false, [dummy], false],
	[11, 'burrowing blade', 1, 1, 41, 35, bg, false, [dummy], false],
	[12, 'chaos demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[13, 'city guard', 1, 1, 41, 35, bg, false, [dummy], false],
	[14, 'deep terror', 1, 1, 41, 35, bg, false, [dummy], false],
	[15, 'earth demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[16, 'flame demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[17, 'flaming bladespinner', 1, 1, 41, 35, bg, false, [dummy], false],
	[18, 'forest imp', 1, 1, 41, 35, bg, false, [dummy], false],
	[19, 'frost demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[20, 'frozen corpse', 1, 1, 41, 35, bg, false, [dummy], false],
	[21, 'harrower infester', 1, 1, 41, 35, bg, false, [dummy], false],
	[22, 'hound', 1, 1, 41, 35, bg, false, [dummy], false],
	[23, 'ice wraith', 1, 1, 41, 35, bg, false, [dummy], false],
	[24, 'lightning eel', 1, 1, 41, 35, bg, false, [dummy], false],
	[25, 'living bones', 1, 1, 41, 35, bg, false, [dummy], false],
	[26, 'living doom', 1, 1, 41, 35, bg, false, [dummy], false],
	[27, 'living spirit', 1, 1, 41, 35, bg, false, [dummy], false],
	[28, 'lurker clawcrusher', 1, 1, 41, 35, bg, false, [dummy], false],
	[29, 'lurker mindsnipper', 1, 1, 41, 35, bg, false, [dummy], false],
	[30, 'lurker soldier', 1, 1, 41, 35, bg, false, [dummy], false],
	[31, 'lurker wavethrower', 1, 1, 41, 35, bg, false, [dummy], false],
	[32, 'night demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[33, 'ooze', 1, 1, 41, 35, bg, false, [dummy], false],
	[34, 'pirnaha pig', 1, 1, 41, 35, bg, false, [dummy], false],
	[35, 'polar bear', 1, 1, 41, 35, bg, false, [dummy], false],
	[36, 'rending drake', 1, 1, 41, 35, bg, false, [dummy], false],
	[37, 'robotic boltshooter', 1, 1, 41, 35, bg, false, [dummy], false],
	[38, 'ruined machine', 1, 1, 41, 35, bg, false, [dummy], false],
	[39, 'savvas icestorm', 1, 1, 41, 35, bg, false, [dummy], false],
	[40, 'savvas lavaflow', 1, 1, 41, 35, bg, false, [dummy], false],
	[41, 'shrike fiend', 1, 1, 41, 35, bg, false, [dummy], false],
	[42, 'snow imp', 1, 1, 41, 35, bg, false, [dummy], false],
	[43, 'spitting drake', 1, 1, 41, 35, bg, false, [dummy], false],
	[44, 'steel automaton', 1, 1, 41, 35, bg, false, [dummy], false],
	[45, 'sun demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[46, 'vermling priest', 1, 1, 41, 35, bg, false, [dummy], false],
	[47, 'vermling scout', 1, 1, 41, 35, bg, false, [dummy], false],
	[48, 'wind demon', 1, 1, 41, 35, bg, false, [dummy], false],
	[1, 'abael herder', 1, 1, 41, 35, bg, false, [dummy], false],
];

function getMonsterTraits(i) {
	var traitsArray = MONSTERS_RAW[i][8];
	var result = [];
	for (var j = 0; j < traitsArray.length; j++) {
		result.push(urlize(traitsArray[j]));
	}
	return result;
}

MONSTERS_LIST = FromRAWToLIST(MONSTERS_RAW);
//add missing specific fields
for (var i = 0; i < MONSTERS_RAW.length; i++) {
	OneItem = MONSTERS_LIST[MONSTERS_RAW[i][0]];
	OneItem.ranged = MONSTERS_RAW[i][7];
	OneItem.traits = getMonsterTraits(i);
	OneItem.hasBack = MONSTERS_RAW[i][9];
}

//MONSTERS_LIST.sort(listsort);

var LIEUTENANTS_RAW = [
	
	[1, 'algox stormcaller', 1, 1, 41, 35, bg, false, [dummy], false],
	[2, 'elder ooze', 1, 1, 41, 35, bg, false, [dummy], false],
	[3, 'fish king', 1, 1, 41, 35, bg, false, [dummy], false],
	[4, 'fracture of the deep', 1, 1, 41, 35, bg, false, [dummy], false],
	[5, 'frozen fist', 1, 1, 41, 35, bg, false, [dummy], false],
	[6, 'harbinger of shadow', 1, 1, 41, 35, bg, false, [dummy], false],
	[7, 'lord of chaos', 1, 1, 41, 35, bg, false, [dummy], false],
	[8, 'prince of frost', 1, 1, 41, 35, bg, false, [dummy], false],
	[9, 'program director', 1, 1, 41, 35, bg, false, [dummy], false],
	[10, 'render', 1, 1, 41, 35, bg, false, [dummy], false],	
	[11, 'seeker of the abyss', 1, 1, 41, 35, bg, false, [dummy], false],
	[12, 'snowdancer', 1, 1, 41, 35, bg, false, [dummy], false],
	[13, 'the collector', 1, 1, 41, 35, bg, false, [dummy], false],
	[14, 'the orphan', 1, 1, 41, 35, bg, false, [dummy], false],
	[15, 'the relic', 1, 1, 41, 35, bg, false, [dummy], false],
	[16, 'vestige of the imprisoned god', 1, 1, 41, 35, bg, false, [dummy], false],
               
];

LIEUTENANTS_LIST = FromRAWToLIST(LIEUTENANTS_RAW);
//add missing specific fields
for (var i = 0; i < LIEUTENANTS_RAW.length; i++) {
	OneItem = LIEUTENANTS_LIST[LIEUTENANTS_RAW[i][0]];
	OneItem.hasBack = LIEUTENANTS_RAW[i][7];
}


// ------------------------------------------------------

var MAX_Heroes = 4

var HEROES_RAW = [
	[1, 'Beast Tyrant', 1, 1, 41, 35, bg, , , dummy],
	[2, 'Banner Spear', 1, 1, 41, 35, bg, , , dummy],
	[3, 'Berserker', 1, 1, 41, 35, bg, , , dummy],
	[4, 'Blinkblade', 1, 1, 41, 35, bg, , , dummy],
	[5, 'Boneshaper', 1, 1, 41, 35, bg, , , dummy],
	[6, 'Bladeswarm', 1, 1, 41, 35, bg, , , dummy],
	[7, 'Brute', 1, 1, 41, 35, bg, , , dummy],
	[8, 'Cragheart', 1, 1, 41, 35, bg, , , dummy],
	[9, 'Coral', 1, 1, 41, 35, bg, , , dummy],
	[10, 'Deathwalker', 1, 1, 41, 35, bg, , , dummy],
	[11, 'Kelp', 1, 1, 41, 35, bg, , , dummy],
	[12, 'Demolitionist', 1, 1, 41, 35, bg, , , dummy],
	[13, 'Diviner', 1, 1, 41, 35, bg, , , dummy],
	[14, 'Drifter', 1, 1, 41, 35, bg, , , dummy],
	[15, 'Doomstalker', 1, 1, 41, 35, bg, , , dummy],
	[16, 'Fist', 1, 1, 41, 35, bg, , , dummy],
	[17, 'Geminate', 1, 1, 41, 35, bg, , , dummy],
	[18, 'Elementalist', 1, 1, 41, 35, bg, , , dummy],
	[19, 'Prism', 1, 1, 41, 35, bg, , , dummy],
	[20, 'Astral', 1, 1, 41, 35, bg, , , dummy],
	[21, 'Hatchet', 1, 1, 41, 35, bg, , , dummy],
	[22, 'Drill', 1, 1, 41, 35, bg, , , dummy],
	[23, 'Mindthief', 1, 1, 41, 35, bg, , , dummy],
	[24, 'Nightshroud', 1, 1, 41, 35, bg, , , dummy],
	[25, 'Shackles', 1, 1, 41, 35, bg, , , dummy],
	[26, 'Meteor', 1, 1, 41, 35, bg, , , dummy],
	[27, 'Plaque Herald', 1, 1, 41, 35, bg, , , dummy],
	[28, 'Quartermaster', 1, 1, 41, 35, bg, , , dummy],
	[29, 'Red Guard', 1, 1, 41, 35, bg, , , dummy],
	[30, 'Shards', 1, 1, 41, 35, bg, , , dummy],
	[31, 'Snowflake', 1, 1, 41, 35, bg, , , dummy],
	[32, 'Sawbones', 1, 1, 41, 35, bg, , , dummy],
	[33, 'Scoundrel', 1, 1, 41, 35, bg, , , dummy],
	[34, 'Soothsinger', 1, 1, 41, 35, bg, , , dummy],
	[35, 'Spellweaver', 1, 1, 41, 35, bg, , , dummy],
	[36, 'Summoner', 1, 1, 41, 35, bg, , , dummy],
	[37, 'Trap', 1, 1, 41, 35, bg, , , dummy],
	[38, 'Sunkeeper', 1, 1, 41, 35, bg, , , dummy],
	[39, 'Tinkerer', 1, 1, 41, 35, bg, , , dummy],
	[40, 'Voidwarden', 1, 1, 41, 35, bg, , , dummy],
 ];

HEROES_LIST = FromRAWToLIST(HEROES_RAW);
//add missing specific fields
for (var i = 0; i < HEROES_RAW.length; i++) {
	OneItem = HEROES_LIST[HEROES_RAW[i][0]];
	OneItem.hp = HEROES_RAW[i][7];
	OneItem.stamina = HEROES_RAW[i][8];
	OneItem.archetype = HEROES_RAW[i][9];
}

HEROES_LIST = SortLIST(HEROES_LIST);

// ------------------------------------------------------

VILLAGERS_RAW = [
	[1, '2 white owls', 1, 1,   41, 35, bg, false],
	[2, 'animated claymore', 1, 1,   41, 35, bg, false],
	[3, 'arcing generator', 1, 1,   41, 35, bg, false],
	[4, 'armored tank', 1, 1,   41, 35, bg, false],
	[5, 'banner of courage', 1, 1,   41, 35, bg, false],
	[6, 'banner of doom', 1, 1,   41, 35, bg, false],
	[7, 'banner of hope', 1, 1,   41, 35, bg, false],
	[8, 'banner of strength', 1, 1,   41, 35, bg, false],
	[9, 'banner of valor', 1, 1,   41, 35, bg, false],
	[10, 'bombardier', 1, 1,   41, 35, bg, false],
	[11, 'bone horde', 1, 1,   41, 35, bg, false],
	[12, 'dampening unit', 1, 1,   41, 35, bg, false],
	[13, 'defense grid', 1, 1,   41, 35, bg, false],
	[14, 'flesh bomb', 1, 1,   41, 35, bg, false],
	[15, 'flesh fiend', 1, 1,   41, 35, bg, false],
	[16, 'jackal mech', 1, 1,   41, 35, bg, false],
	[17, 'leaper', 1, 1,   41, 35, bg, false],
	[18, 'lowbowman', 1, 1,   41, 35, bg, false],
	[19, 'machine bolter', 1, 1,   41, 35, bg, false],
	[20, 'polar cat', 1, 1,   41, 35, bg, false],
	[21, 'raging corpse', 1, 1,   41, 35, bg, false],
	[22, 'reinforcement', 1, 1,   41, 35, bg, false],
	[23, 'repair drone', 1, 1,   41, 35, bg, false],
	[24, 'shadow beast', 1, 1,   41, 35, bg, false],
	[25, 'shadow horror', 1, 1,   41, 35, bg, false],
	[26, 'shaggy lure', 1, 1,   41, 35, bg, false],
	[27, 'shambling skeleton', 1, 1,   41, 35, bg, false],
	[28, 'shield spider', 1, 1,   41, 35, bg, false],
	[29, 'skeleton sorcerer', 1, 1,   41, 35, bg, false],
	[30, 'sledge driver', 1, 1,   41, 35, bg, false],
	[31, 'sniper turrent', 1, 1,   41, 35, bg, false],
	[32, 'snow fox', 1, 1,   41, 35, bg, false],
	[33, 'spiritbound falchion', 1, 1,   41, 35, bg, false],
	[34, 'stiched atrosity', 1, 1,   41, 35, bg, false],
	[35, 'sword propeller', 1, 1,   41, 35, bg, false],
	[36, 'torch bearer', 1, 1,   41, 35, bg, false],
	[37, 'toxic distributor', 1, 1,   41, 35, bg, false],
	[38, 'trained falcon', 1, 1,   41, 35, bg, false],
	[39, 'trapping unit', 1, 1,   41, 35, bg, false],
	[40, 'wraith', 1, 1,   41, 35, bg, false],
	[41, 'angry wasps', 1, 1, 41, 35, bg, false],
	[42, 'battle boar', 1, 1, 41, 35, bg, false],
	[43, 'battle bot', 1, 1, 41, 35, bg, false],
	[44, 'bat swarm', 1, 1, 41, 35, bg, false],
	[45, 'bear', 1, 1, 41, 35, bg, false],
	[46, 'black unicorn', 1, 1, 41, 35, bg, false],
	[47, 'bloat maggots', 1, 1, 41, 35, bg, false],
	[48, 'burning avatar', 1, 1, 41, 35, bg, false],
	[49, 'creeping beetles', 1, 1, 41, 35, bg, false],
	[50, 'decoy', 1, 1, 41, 35, bg, false],
	[51, 'doppelganger', 1, 1, 41, 35, bg, false],
	[52, 'ghost falcon', 1, 1, 41, 35, bg, false],
	[53, 'giant toad', 1, 1, 41, 35, bg, false],
	[54, 'green adder', 1, 1, 41, 35, bg, false],
	[55, 'healing sprite', 1, 1, 41, 35, bg, false],
	[56, 'iron beast', 1, 1, 41, 35, bg, false],
	[57, 'kill bot', 1, 1, 41, 35, bg, false],
	[58, 'lava golem', 1, 1, 41, 35, bg, false],
	[59, 'lightning moth', 1, 1, 41, 35, bg, false],
	[60, 'living bomb', 1, 1, 41, 35, bg, false],
	[61, 'mana sphere', 1, 1, 41, 35, bg, false],
	[62, 'monolith', 1, 1, 41, 35, bg, false],
	[63, 'monstrous rat', 1, 1, 41, 35, bg, false],
	[64, 'mystic ally', 1, 1, 41, 35, bg, false],
	[65, 'nail spheres', 1, 1, 41, 35, bg, false],
	[66, 'rage hornets', 1, 1, 41, 35, bg, false],
	[67, 'rat king', 1, 1, 41, 35, bg, false],
	[68, 'rat swarm', 1, 1, 41, 35, bg, false],
	[69, 'red falcon', 1, 1, 41, 35, bg, false],
	[70, 'rock colossus', 1, 1, 41, 35, bg, false],
	[71, 'rust vermin', 1, 1, 41, 35, bg, false],
	[72, 'sand devil', 1, 1, 41, 35, bg, false],
	[73, 'shadow wolf', 1, 1, 41, 35, bg, false],
	[74, 'slime spirit', 1, 1, 41, 35, bg, false],
	[75, 'soul leeches', 1, 1, 41, 35, bg, false],
	[76, 'spirit banner', 1, 1, 41, 35, bg, false],
	[77, 'spitting cobra', 1, 1, 41, 35, bg, false],
	[78, 'steel scarabs', 1, 1, 41, 35, bg, false],
	[79, 'swamp alligator', 1, 1, 41, 35, bg, false],
	[80, 'tattered wolf', 1, 1, 41, 35, bg, false],
	[81, 'thorn shooter', 1, 1, 41, 35, bg, false],
	[82, 'twighlight archon', 1, 1, 41, 35, bg, false],
	[83, 'vicious jackal', 1, 1, 41, 35, bg, false],
	[84, 'void eater', 1, 1, 41, 35, bg, false],
	[85, 'war hawk', 1, 1, 41, 35, bg, false],
	[86, 'wind totem', 1, 1, 41, 35, bg, false],


];

VILLAGERS_LIST = FromRAWToLIST(VILLAGERS_RAW);
//add missing specific fields
for (var i = 0; i < VILLAGERS_RAW.length; i++) {
	OneItem = VILLAGERS_LIST[VILLAGERS_RAW[i][0]];
	OneItem.hasBack = VILLAGERS_RAW[i][7];
}

// ------------------------------------------------------

FAMILIARS_RAW = [
	[1, 'Air', 1, 1, 41, 35, bg, true],
	[2, 'Dark', 1, 1, 41, 35, bg, false],
	[3, 'Earth', 1, 1, 41, 35, bg, false],
	[4, 'Fire', 1, 1, 41, 35, bg, false],
	[5, 'Ice', 1, 1, 41, 35, bg, false],
	[6, 'Light', 1, 1, 41, 35, bg, false],
	[7, 'Scenario Aid', 1, 1, 30, 25, bg],	
	[8, 'oj altar', 1, 1, 46, 39, bg],
	[9, 'oj barrel', 1, 1, 46, 39, bg],
	[10, 'oj barricade 2', 1, 1, 46, 39, bg],
	[11, 'oj bookshelf 2', 1, 1, 46, 39, bg],
	[12, 'oj cave rock 2', 1, 1, 46, 39, bg],
	[13, 'oj crate', 1, 1, 46, 39, bg],
	[14, 'oj debris', 1, 1, 46, 39, bg],
	[15, 'oj debris 2', 1, 1, 46, 39, bg],
	[16, 'oj glowing orb', 1, 1, 46, 39, bg],
	[17, 'oj ice', 1, 1, 46, 39, bg],
	[18, 'oj ice pillar', 1, 1, 46, 39, bg],
	[19, 'Treasure', 1, 1, 46, 39, bg],
	[20, 'tr trap', 1, 1, 46, 39, bg],
	[21, 'ha lava', 1, 1, 46, 39, bg],
];

FAMILIARS_LIST = FromRAWToLIST(FAMILIARS_RAW);
//add missing specific fields
for (var i = 0; i < FAMILIARS_RAW.length; i++) {
	OneItem = FAMILIARS_LIST[FAMILIARS_RAW[i][0]];
	OneItem.hasBack = FAMILIARS_RAW[i][7];
}

// ------------------------------------------------------


var mapObjects = [];
var monsterList = [];


//Initialize Global Data (Mainly LineClass)
var tileLine = new LineClass('tile', 'tile', 'tiles', '');
tileLine.needSideList = true;
tileLine.needCoordinates = true;
tileLine.XYBase = '1x1';		//DefaultValue
tileLine.needAngleList = true;
tileLine.needRemoveButton = true;
tileLine.UsesExpansionPath = true;
tileLine.needExpantionFilter = true;
tileLine.MainCardsPath = "";
tileLine.MainMapTokensPath = "map_tiles";
tileLine.AllData = MAP_TILES_LIST;		//always formated the same way : name, width, height, left, top

var OverlayTileLine = new LineClass('Overlay Tile', 'OverlayTile', 'overlaytiles', '');
OverlayTileLine.needCoordinates = true;
OverlayTileLine.XYBase = '1x1';		//DefaultValue
OverlayTileLine.needAngleList = true;
OverlayTileLine.needRemoveButton = true;
OverlayTileLine.UsesExpansionPath = true;
OverlayTileLine.MainCardsPath = "";
OverlayTileLine.MainMapTokensPath = "overlay-tiles";
OverlayTileLine.AllData = OVERLAYTILES_LIST;

var doorLine = new LineClass('door', 'door', 'doors', '');
doorLine.needCoordinates = true;
doorLine.XYBase = '1x1';		//DefaultValue
doorLine.needAngleList = true;
doorLine.needOpenedCheckbox = true;
doorLine.needRemoveButton = true;
doorLine.UsesExpansionPath = true;
doorLine.MainCardsPath = "";
doorLine.MainMapTokensPath = "overlay-doors";
doorLine.AllData = DOORS_LIST;

var MovableMapTokenLine = new LineClass('Map Token', 'MapToken', 'maptokens', '');
MovableMapTokenLine.needCoordinates = true;
MovableMapTokenLine.XYBase = '1x1';		//DefaultValue
MovableMapTokenLine.needAngleList = true;
MovableMapTokenLine.needRemoveButton = true;
MovableMapTokenLine.UsesExpansionPath = true;
MovableMapTokenLine.MainCardsPath = "";
MovableMapTokenLine.MainMapTokensPath = "overlay-tokens";
MovableMapTokenLine.mapData.Layer = "figures";
MovableMapTokenLine.mapData.zIndex = 0;
MovableMapTokenLine.mapData.DisplayCI0 = true;
MovableMapTokenLine.AllData = MOVABLE_TOKENS_LIST;

var monsterLine = new LineClass('monster', 'monster', 'monsters', 'RemoveLine_Monster(this);');
monsterLine.needCoordinates = true;
monsterLine.XYBase = '1x1';		//DefaultValue
monsterLine.needCustomInput[0][0] = true;
monsterLine.needCustomInput[1][0] = true;
monsterLine.needCustomInput[2][0] = true;
monsterLine.needAddTokenButton = true;
//monsterLine.needAddRelicButton = true;
//monsterLine.needAddAuraButton = true;
monsterLine.needRemoveButton = true;
monsterLine.UsesExpansionPath = true;
monsterLine.MainCardsPath = "monster-stat-cards";
monsterLine.MainMapTokensPath = "monster-tokens";
monsterLine.mapData.Layer = "figures";
monsterLine.mapData.zIndex = 2;
monsterLine.mapData.DisplayCI0 = true;
monsterLine.mapData.DisplayCI1 = true;
monsterLine.mapData.DisplayCI2 = true;
monsterLine.AllData = MONSTERS_LIST;

var lieutenantLine = new LineClass('boss', 'lieutenant', 'lieutenants', 'RemoveLine_Lieutenant(this);');
lieutenantLine.needCoordinates = true;
lieutenantLine.XYBase = '1x1';		//DefaultValue
lieutenantLine.needCustomInput[0][0] = true;
lieutenantLine.needCustomInput[1][0] = true;
lieutenantLine.needAddTokenButton = true;
//lieutenantLine.needAddRelicButton = true;
//lieutenantLine.needAddAuraButton = true;
lieutenantLine.needRemoveButton = true;
lieutenantLine.UsesMainCommonImages = true;
lieutenantLine.UsesExpansionPath = true;
lieutenantLine.MainCardsPath = "monsterboss-stat-cards";
lieutenantLine.MainMapTokensPath = "monsterboss-tokens";
lieutenantLine.mapData.Layer = "figures";
lieutenantLine.mapData.zIndex = 2;
lieutenantLine.mapData.DisplayCI0 = true;
lieutenantLine.mapData.DisplayCI1 = true;
lieutenantLine.mapData.DisplayCI2 = true;
lieutenantLine.AllData = LIEUTENANTS_LIST;


var familiarLine = new LineClass('summon', 'summon', 'familiars', '');
familiarLine.needCoordinates = true;
familiarLine.XYBase = '1x1';		//DefaultValue
familiarLine.needCustomInput[0][0] = true;
familiarLine.needCustomInput[1][0] = true;
familiarLine.needCustomInput[2][0] = true;
familiarLine.needAddTokenButton = true;
familiarLine.needRemoveButton = true;
familiarLine.UsesExpansionPath = true;
familiarLine.MainCardsPath = "";
familiarLine.MainMapTokensPath = "familiars_tokens";
familiarLine.mapData.Layer = "figures";
familiarLine.mapData.zIndex = 1;
familiarLine.mapData.DisplayCI0 = true;
familiarLine.mapData.DisplayCI1 = true;
familiarLine.mapData.DisplayCI2 = true;
familiarLine.AllData = FAMILIARS_LIST;

var villagerLine = new LineClass('custom summon', 'custom summon', 'villagers', '');
villagerLine.needCoordinates = true;
villagerLine.XYBase = '1x1';		//DefaultValue
villagerLine.needCustomInput[0][0] = true;
villagerLine.needCustomInput[1][0] = true;
villagerLine.needCustomInput[2][0] = true;
villagerLine.needAddTokenButton = true;
villagerLine.needRemoveButton = true;
villagerLine.UsesExpansionPath = true;
villagerLine.MainCardsPath = "";
villagerLine.MainMapTokensPath = "familiars_tokens";
villagerLine.mapData.Layer = "figures";
villagerLine.mapData.zIndex = 1;
villagerLine.mapData.DisplayCI0 = true;
villagerLine.mapData.DisplayCI1 = true;
villagerLine.mapData.DisplayCI2 = true;
villagerLine.AllData = VILLAGERS_LIST;



var heroLine = new LineClass('hero', 'hero', 'heroes', 'RemoveLine_Hero(this);');
heroLine.needCoordinates = true;
heroLine.XYBase = '1x1';		//DefaultValue
heroLine.needCustomInput[0][0] = true;
heroLine.needCustomInput[1][0] = true;
heroLine.needCustomInput[3][0] = true;
heroLine.needCustomInput[4][0] = true;
heroLine.needAddTokenButton = true;
heroLine.needAddAuraButton = false;
heroLine.needRemoveButton = false;
heroLine.UsesExpansionPath = true;
heroLine.DisplayExpansionNameInSelect = true;
heroLine.MainCardsPath = "heroes_cards";
heroLine.MainMapTokensPath = "heroes_tokens";
heroLine.mapData.Layer = "figures";
heroLine.mapData.zIndex = 3;
heroLine.mapData.DisplayCI0 = true;
heroLine.mapData.SpecificClassZeroCI0 = 'secondary';
heroLine.mapData.DisplayCI1 = true;
heroLine.mapData.DisplayCI3 = true;
heroLine.mapData.DisplayCI4 = true;
heroLine.AllData = HEROES_LIST;

var SHOWING_CLASSES = [];
SHOWING_CLASSES[1] = 'showOneCell';
SHOWING_CLASSES[2] = 'showTwoCells';
SHOWING_CLASSES[3] = 'showThreeCells';

var conditionNumber = 1;
var auraNumber = 1;

var monsterNumber = 1;

var config = {};


var MAP_HASES_LIST = [
];




