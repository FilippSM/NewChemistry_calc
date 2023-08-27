import arrPair from './js/bd.js';


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

function onButtonViscosityClick() {
    var time100 = getTime100();
    var time40 = getTime40();

    var const100 = getConst100();
    var const40 = getConst40();    


    var result100 = time100 * const100;
    var result40 = time40 * const40;
    
    document.getElementById('resultViscosity100').value = result100;
    document.getElementById('resultViscosity40').value = result40;
};

buttonViscosity.addEventListener('click', onButtonViscosityClick);

//получение значение пары вискозиметров
var selectPair = document.getElementById('pair');
var pair = document.getElementById('pair');

function getValuePair() {
    //let a = this.value;
    let a = (pair.value);
    console.log(a);
    return a;   
};

function calcViscosityPair() {
    let valuePair = getValuePair();
    //console.log(a);  
    let const100 = arrPair[valuePair][100];
    console.log(const100);
};

selectPair.addEventListener('change', getValuePair)
selectPair.addEventListener('change', calcViscosityPair)

// let const100 = arrPair[valuePair][100];   
// console.log(const100);



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
    console.log(selected);
    // calcExample(selected);
}



radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener("change", onRadioBtnViscosityClick);
});



//выполнение расчета вязкости по значению радиокнопки

let qwerty = 1; 

switch (qwerty) {
    case 1:
        alert(1111);
        break;
    case 2:
        alert(2222);
        break;
    case 3:
        alert(3333);
        break;
    default:
        alert("Error");
}

function calcViscosity() {
    viscosity100 = const100 * 


      
}
   