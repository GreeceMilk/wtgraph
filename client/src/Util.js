import "chartjs-adapter-date-fns";


const modes = ['ab', 'rb', 'sb'];
const brRanges = ['0', '1', 'all'];
const outputListNation = [
    "win_rate",
    "battles_sum",
    "battles_mean",
    "ground_frags_per_battle", 
    "ground_frags_per_death",
    "air_frags_per_battle",
    "air_frags_per_death"];

function convertSnakeToSpace(str) {
    return str.replaceAll('_', ' ');
}

function convertSpaceToSnake(str) {
    return str.replaceAll(' ', '_');
}

function currentColorMode(mode, prefersDarkMode) {
    if (mode === 'system') {
        if (prefersDarkMode) {
            return 'dark';
        } else {
            return 'light';
        }
    } else if (mode === 'light') {
        return 'light';
    } else {
        return 'dark';
    }
}

export { modes, brRanges, outputListNation, convertSnakeToSpace, convertSpaceToSnake, currentColorMode};
