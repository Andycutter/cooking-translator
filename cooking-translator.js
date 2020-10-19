const units = [
'cup','cups','c', 
'ounce', 'ounces', 'oz',
'pint', 'pints', 'pt',
'quart', 'quarts', 'qt',
'gallon', 'gallons', 'gal',
'pound', 'pounds', 'lb', '#',
'fahrenheit'
]

const cupToDl = 2.36588237;
const ounceToGram = 28.34952;
const usPintToLiter = 0.473176473;
const usLiquidQuartToLiter = 0.9463530;
const gallonToLiter = 3.78541178;
const poundToGram = 453.59237;

function translateRecipe() {
    document.getElementById('output-text').innerHTML = '';
    let input = document.getElementById('input-text').value;
    input = cleanUp(input);
    let output = convertUnits(input);
    output = output.join(' ');
    let outputElement = document.getElementById('output-text');
    outputElement.innerHTML += '<p>' + output + '</p>';
}

function convertUnits(recipe) {
    let i = -1;
    units.forEach(function(unit) {
        while ((i = recipe.indexOf(unit, i+1)) != -1) {
            switch(unit.toLocaleLowerCase()) {
                case 'cup':
                case 'cups':
                case 'c':
                    recipe[i] = 'dl';
                    recipe[i-1] = (eval(recipe[i-1]) * cupToDl).toFixed(2);
                    break;
                case 'ounce':
                case 'ounces':
                case 'oz':
                    recipe[i] = 'gram';
                    recipe[i-1] = (eval(recipe[i-1]) * ounceToGram).toFixed(2);
                    break;
                case 'pint':
                case 'pints':
                case 'pt':
                    recipe[i] = 'liter';
                    recipe[i-1] = (eval(recipe[i-1]) * usPintToLiter).toFixed(2);
                    break;
                case 'quart':
                case 'quarts':
                case 'qt':
                    recipe[i] = 'liter';
                    recipe[i-1] = (eval(recipe[i-1]) * usLiquidQuartToLiter).toFixed(2);
                    break;                 
                case 'gallon':
                case 'gallons':
                case 'gal':
                    recipe[i] = 'liter';
                    recipe[i-1] = (eval(recipe[i-1]) * gallonToLiter).toFixed(2);
                    break;
                case 'pound':
                case 'pounds':
                case 'ls':
                case '#':
                    recipe[i] = 'gram';
                    recipe[i-1] = (eval(recipe[i-1]) * poundToGram).toFixed(2);
                    break;
                case 'fahrenheit':
                    recipe[i] = 'celcius';
                    recipe[i-1] = ((eval(recipe[i-1]) - 32) / 1.8).toFixed(2);
                    break;
                default:
                    return 'Ukendt enhed';
            }
        }
    })
    return recipe;
}

function cleanUp(array) {
    array = array.replace(/\n/g, " ");
    array = array.toLocaleLowerCase();
    array = array.split(' ');
    let i = 0;
    while (i < array.length) {
        if(array[i] === '') array.splice(i, 1);
        else i++;
    }
    return array;
}