import pairsVisc from './js/bdPairVisc.js';
import numbersVisc from './js/bdNumberVisc.js';


var buttonEvapor = document.getElementById('buttonEvapor');

function onButtonEvaporClick() {
    var inputCrucible = document.getElementById('crucible');
    var inputSample = document.getElementById('sample');
    var inputSampleEvapor = document.getElementById('sampleEvapor');


    var crucible = parseFloat(inputCrucible.value);
    var sample = parseFloat(inputSample.value);
    var sampleEvapor = parseFloat(inputSampleEvapor.value);

    var crucibleSample = crucible + sample;
    var result = (crucibleSample - sampleEvapor) / sample * 100;

    result = result.toFixed(1);

    document.getElementById('result').value = result;
};

buttonEvapor.addEventListener('click', onButtonEvaporClick)

// расчет вязкости
var buttonViscosity = document.getElementById('buttonViscosity');

var inputTime100 = document.getElementById('time100');
var inputTime40 = document.getElementById('time40');
var inputConst100 = document.getElementById('const100');
var inputConst40 = document.getElementById('const40');


function getTime100() {
    return Number(inputTime100.value);
};

function getTime40() {
    return Number(inputTime40.value);
};

function getConst100() {
    return Number(inputConst100.value);
};

function getConst40() {
    return Number(inputConst40.value);
};

//получение значение константы
function getValueConst(valueRadioBtn) {
    switch (valueRadioBtn) {
        case 1:
            var valuePair = calcViscosityPair()
            var const100 = valuePair[0];
            var const40 = valuePair[1];

            return [const100, const40];  
            break;
        case 2:
            var const100 = calcViscosityNumberVisc100();
            var const40 = calcViscosityNumberVisc40();
            
            return [const100, const40];  
            break;
        case 3:
            var const100 = getConst100();
            var const40 = getConst40();
    
            return [const100, const40];
            break;
        default:
            alert("Error");
    }  
};

function onButtonViscosityClick(valueRadioBtn) {

    console.log(valueRadioBtn);

    var valueConst = getValueConst(valueRadioBtn);
        
    var const100 = valueConst[0];
    var const40 = valueConst[1];


    var time100 = getTime100();
    var time40 = getTime40();

    var result100 = time100 * const100;
    var result40 = time40 * const40;

    var valueFixed100 = 3-Math.floor(Math.log10(result100));
    var valueFixed40 = 3-Math.floor(Math.log10(result40));
    var result100 = +result100.toFixed(valueFixed100);
    var result40 = +result40.toFixed(valueFixed40);

    document.getElementById('resultViscosity100').value = result100;
    document.getElementById('resultViscosity40').value = result40;
};

//получение значение пары вискозиметров
var selectPair = document.getElementById('pair');

function getValuePair() {
    let a = (selectPair.value);
    console.log(a);
    return a;   
};

function calcViscosityPair() {
    let valuePair = getValuePair();
    let const100 = pairsVisc[valuePair][100];
    let const40 = pairsVisc[valuePair][40];
    return [const100, const40];
};

selectPair.addEventListener('change', calcViscosityPair)

//получение номера вискозиметра на 100 и 40
var selectNumbersVisc100 = document.getElementById('number100');
var selectNumbersVisc40 = document.getElementById('number40');

function getValueNumberVisc100() {
    let numberVisc100 = (selectNumbersVisc100.value);
    return numberVisc100;  
};

function getValueNumberVisc40() {
    let numberVisc40 = (selectNumbersVisc40.value); 
    return numberVisc40;  
};

function calcViscosityNumberVisc100() {
    let numberVisc100 = getValueNumberVisc100();
    let const100 = numbersVisc[numberVisc100];
    console.log(const100);
    return const100;  
};

function calcViscosityNumberVisc40() {
    let numberVisc40 = getValueNumberVisc40();
    let const40 = numbersVisc[numberVisc40];
    console.log(const40);
    return const40;  
};

selectNumbersVisc100.addEventListener('change', calcViscosityNumberVisc100)
selectNumbersVisc40.addEventListener('change', calcViscosityNumberVisc40)

// переключение блоков по радиокнопке
$('input[name="radio"]').click(function () {
    var target = $('#block-' + $(this).val());

    $('.input-block_hide').not(target).hide(0);
    target.fadeIn(500);
});

//получение значение радиокнопки    

var radioBtns = document.querySelectorAll('input[name="radio"]');            

function onRadioBtnViscosityClick() {
    let selected = document.querySelector('input[name="radio"]:checked').value;
    let valueRadioBtn = Number(selected);
    buttonViscosity.addEventListener('click', () => onButtonViscosityClick(valueRadioBtn));

};

radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener("change", onRadioBtnViscosityClick);
});
