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

// получение значение константы
function getValueConst() {
    // var const100 = getConst100();
    // var const40 = getConst40();
    
    // return [const100, const40];

    switch (3) {
        case 1:
            selectPair.addEventListener('change', calcViscosityPair)   
            break;
        case 2:
            selectNumbersVisc100.addEventListener('change', calcViscosityNumberVisc100)
            selectNumbersVisc40.addEventListener('change', calcViscosityNumberVisc40)
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


function onButtonViscosityClick(a) {
    console.log(a);

    var valueConst = getValueConst();
        
    var const100 = valueConst[0];
    var const40 = valueConst[1];


    var time100 = getTime100();
    var time40 = getTime40();

    var result100 = time100 * const100;
    var result40 = time40 * const40;
    
    document.getElementById('resultViscosity100').value = result100;
    document.getElementById('resultViscosity40').value = result40;
};

//buttonViscosity.addEventListener('click', getValueConst);
//buttonViscosity.addEventListener('click', onButtonViscosityClick);

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
    console.log(const100);
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
};

function calcViscosityNumberVisc40() {
    let numberVisc40 = getValueNumberVisc40();
    let const40 = numbersVisc[numberVisc40];
    console.log(const40);
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
    //console.log(selected);
    //calcViscosity(Number(selected));
    let valueRadioBtn = Number(selected);
    buttonViscosity.addEventListener('click', () => onButtonViscosityClick(valueRadioBtn));

};

radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener("change", onRadioBtnViscosityClick);
});



//выполнение расчета вязкости по значению радиокнопки


// function calcViscosity(valueRadioBtn) {
//     console.log(valueRadioBtn);


//     switch (valueRadioBtn) {
//         case 1:
//             alert(1111);
//             buttonViscosity.addEventListener('click', onButtonViscosityClick);
//             break;
//         case 2:
//             alert(2222);
//             break;
//         case 3:
//             alert(3333);
//             //getValueConst();
//             buttonViscosity.addEventListener('click', () => onButtonViscosityClick(valueRadioBtn));
//             break;
//         default:
//             alert("Error");
//     }  
// };

//calcViscosity(3);