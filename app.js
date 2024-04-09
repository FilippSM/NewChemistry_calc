import pairsVisc from './js/bdPairVisc.js';
import numbersVisc from './js/bdNumberVisc.js';
import numbersIV from './js/bdNumberIV.js';
import valuesDensity from './js/bdValueDensity.js';

//calc Evaporation by the Noack Method
const buttonEvapor = document.getElementById('buttonEvapor');

function onButtonEvaporClick(event) {
    let weigtCrucible = parseFloat(document.getElementById('crucible').value);
    let weigtSample = parseFloat(document.getElementById('sample').value);
    let weigtSampleEvapor = parseFloat(document.getElementById('sampleEvapor').value);

    let  weigtCrucibleSample =  weigtCrucible + weigtSample;
    let result = (weigtCrucibleSample - weigtSampleEvapor) / weigtSample * 100;

    result = result.toFixed(1);
    document.getElementById('result').value = result;
};

buttonEvapor.addEventListener('click', onButtonEvaporClick)

//calc Viscosity
let buttonDensity = document.getElementById('buttonDensity');

function onButtonDensityClick(event) {
    let inputDensity= document.getElementById('density');
    let inputTemperature = document.getElementById('temperature');
    let valueDensity = parseFloat(inputDensity.value)/1000;
    let valueTemperature = parseFloat(inputTemperature.value.replace(',','.'));
    let inputCorrection = document.getElementById('hydrometer');
    let valueCorrection = parseFloat(inputCorrection.value);

    let densityTable = valuesDensity[valueDensity][valueTemperature];


    //Math.floor(densityTable*1000)/1000) - оуруглене до 4-го знака после запятой
    let density = (densityTable - Math.floor(densityTable*1000)/1000) + densityTable + valueCorrection;
    
    density = density * 1000;
    density = density.toFixed(1);




    document.getElementById('resultDensity').value = density;
}


buttonDensity.addEventListener('click', onButtonDensityClick)

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

    //округление до четырех значащих цифр
    var valueFixed100 = 3-Math.floor(Math.log10(result100));
    var valueFixed40 = 3-Math.floor(Math.log10(result40));
    var result100 = +result100.toFixed(valueFixed100);
    var result40 = +result40.toFixed(valueFixed40);

    document.getElementById('resultViscosity100').value = result100;
    document.getElementById('resultViscosity40').value = result40;

    let valueIV = onButtonIVClick(result100, result40);
    document.getElementById('resultIVOne').value = valueIV;    

};

//получение значение пары вискозиметров
var selectPair = document.getElementById('pair');

function getValuePair() {
    let a = (selectPair.value);
    console.log(a);
    return a;   
};

function calcViscosityPair(event) {
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

function calcViscosityNumberVisc100(event) {
    let numberVisc100 = getValueNumberVisc100();
    //let const100 = numbersVisc[numberVisc100];
    let const100 = numbersVisc[numberVisc100].constant;
    return const100;  
};

function calcViscosityNumberVisc40(event) {
    let numberVisc40 = getValueNumberVisc40();
    //let const40 = numbersVisc[numberVisc40];
    let const40 = numbersVisc[numberVisc40].constant;
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

function onRadioBtnViscosityClick(event) {
    let selected = document.querySelector('input[name="radio"]:checked').value;
    let valueRadioBtn = Number(selected);
    buttonViscosity.addEventListener('click', () => onButtonViscosityClick(valueRadioBtn));

};

radioBtns.forEach(radioBtn => {
    radioBtn.addEventListener("change", onRadioBtnViscosityClick);
});


//создание элементов в DOM
//let select = document.createElement('select');
//document.querySelector('.one').append(select);

//создание элементов в DOM, динамический массив
//создание option в select
const selectPairVisc = document.querySelector('#pair');

//перебор ассоциативного массива
for(var key in pairsVisc) {
    const option = document.createElement('option');
    option.value = key;
    option.text = key;
    
    selectPairVisc.append(option);
};

const selectVisc100 = document.querySelector('#number100');

for(var key in numbersVisc) {
    const option = document.createElement('option');
    option.value = key;
    option.text = key;
    
    selectVisc100.append(option);
};

const selectVisc40 = document.querySelector('#number40');

for(var key in numbersVisc) {
    const option = document.createElement('option');
    option.value = key;
    option.text = key;
    
    selectVisc40.append(option);
};

//расчет индекса вязкости
let buttonIV = document.getElementById('buttonIV');

//let valueU = 21.54
//let valueY = 4.3

//получение вязкости из инпута
//replace(',','.') - замена ',' на '.' 
function getValueViscosity100() {
    let valueY = document.getElementById('viscosity100').value.replace(',','.'); // вязкость при температуре 100
    return valueY;
}

function getValueViscosity40() {
    let valueU = document.getElementById('viscosity40').value.replace(',','.'); // вязкость при температуре 40
    return valueU;
}

function getValueViscosity(event) {
    let valueY = getValueViscosity100();
    let valueU = getValueViscosity40();

    let valueIV = onButtonIVClick(valueY, valueU);

    console.log(valueIV);

    document.getElementById('resultIVTwo').value = valueIV;
}

buttonIV.addEventListener('click', getValueViscosity);

//получение расчитанной вязкости

//buttonIV.addEventListener('click', getValueViscosity100);
//buttonIV.addEventListener('click', getValueViscosity40);

function onButtonIVClick(valueY, valueU) {

    console.log(valueY);
    console.log(valueU);
    //let valueY = getValueViscosity100();
    //let valueU = getValueViscosity40();
    

    if (valueY >= 2 && valueY <= 70) { //вязкость при т-ре 100 от 2 до 70   
        function getValue() {
            for(var key in numbersIV) {
                if (valueY == key) {//если значение вязкости есть в таблице
                    let valueL = numbersIV[valueY][0]; // вязкость при температуре 40 из табл.
                    let valueH = numbersIV[valueY][1]; // вязкость при температуре 100 из табл.
                    let valueIV = calculationIV(valueL, valueH, valueU);//расчет индекса вязкости
    
                    console.log(valueIV);

                    
                    if (valueIV < 100) {
                        //document.getElementById('resultIV').value = valueIV;
                        return valueIV;
                    }else if (valueIV >= 100) {
                        let valueH = numbersIV[valueY][1]; // вязкость при температуре 100 из табл.
                        let valueIV = calculationIVMore100(valueH, valueY, valueU);
                        console.log(1);
                        //document.getElementById('resultIV').value = valueIV;

                        console.log(valueIV);
                        return valueIV;
                    };
                    //return true; 
                }
            }
            return false; 
        };
        
        let valueIV = getValue();

        console.log(valueIV);
        
        if (valueIV == false) { // если значения нет в таблице
            //расчет интерполяцией
            const switchValueL = 0;
            const switchValueH = 1; 
            console.log(2);
            let valueL = calculationInterpolation(valueY , switchValueL);
            let valueH = calculationInterpolation(valueY , switchValueH);

            let valueIV = calculationIV(valueL, valueH, valueU);
            if (valueIV < 100) {
                //document.getElementById('resultIV').value = valueIV;
                return valueIV;          
            } else if (valueIV >= 100) {
                let valueIV = calculationIVMore100(valueH, valueY, valueU);
                //document.getElementById('resultIV').value = valueIV;
                return valueIV;           
            };      
        };

        return valueIV;     
    } else if (valueY > 70) { //вязкость при т-ре 100 > 70
        let valueL = 0.8353*Math.pow(valueY, 2) + 14.67*valueY - 216; //формула 2
        let valueH = 0.1684*Math.pow(valueY, 2) + 11.85*valueY - 97; //формула 3
        let valueIV = calculationIV(valueL, valueH, valueU);
        if (valueIV < 100) {
            //document.getElementById('resultIV').value = valueIV;
            return valueIV; 
        } else if (valueIV >= 100) {
            let valueH = 0.1684*Math.pow(valueY, 2) + 11.85*valueY - 97;
            let valueIV = calculationIVMore100(valueH, valueY, valueU);
            //document.getElementById('resultIV').value = valueIV;
            return valueIV; 
        };
    } else if (valueY < 2) { //вязкость при т-ре 100 < 2
        let valueL = valueY*(1.5215 + 0.7092*valueY); //формула 4
        let valueH = valueY*(1.35017 + 0.59482*valueY); //формула 5
        let valueIV = calculationIV(valueL, valueH, valueU);
        
        if (valueIV < 100) {
            //document.getElementById('resultIV').value = valueIV;
            return valueIV; 
        } else if (valueIV >= 100) {
            let valueH = valueY*(1.35017 + 0.59482*valueY);
            let valueIV = calculationIVMore100(valueH, valueY, valueU);
            //document.getElementById('resultIV').value = valueIV;
            return valueIV; 
        };   
    };

    //расчет индекса вязкости формула 1 по ГОСТ 25371
    function calculationIV(valueL, valueH, valueU) {
        let valueIV = ((valueL - valueU) / (valueL - valueH)) * 100;
        valueIV = roundIV(valueIV);

        return valueIV;
    };

    //расчет индекса вязкости формула 6 и 7 по ГОСТ 25371
    function calculationIVMore100(valueH, valueY, valueU) {
        let n = (Math.log10(valueH) - Math.log10(valueU)) / Math.log10(valueY);
        let valueIV = ((Math.pow(10, n) - 1) / 0.00715) + 100;
        valueIV = roundIV(valueIV);

        return valueIV;
    };

    //округление значения индекса вязкости
    function roundIV(valueIV) {
        valueIV = +valueIV.toFixed(1);
        valueIV = valueIV * 10;
        if (valueIV % 5 == 0) {//проверка на первую значащую цифру, равна ли она пяти
            //-округляем до целого четного числа
            valueIV = valueIV / 10;
            let valueIVFloor = Math.floor(valueIV);
            let valueIVCeil = Math.ceil(valueIV);
            if (valueIV % 2 == 0) {//проверка в какую сторону округлять, четное вниз
                return valueIVFloor;
            } else {//четное вверх
                return valueIVCeil;
            }
        } else {
            valueIV = valueIV / 10;
            valueIV = Math.round(valueIV);
            return valueIV;
        }
    };

    function getValueL() {
        let valueHF = roundViscosity();
        let valueLFloor = valueHF[0];
        let valueLCeil = valueHF[1];
        let valueOne = numbersIV[valueLFloor][0];
        let valueTwo = numbersIV[valueLCeil][0];
        return [valueLFloor, valueLCeil, valueOne, valueTwo];
    };

    function getValueH() {
        let valueHF = roundViscosity();
        let valueHFloor = valueHF[0];
        let valueHCeil = valueHF[1];
        let valueOne = numbersIV[valueHFloor][1];
        let valueTwo = numbersIV[valueHCeil][1];
        return [valueHFloor, valueHCeil, valueOne, valueTwo];

    };

    function roundViscosity() {
        if (valueY >= 2 && valueY <= 20) {
            let valueLFloor = (Math.floor(valueY * 10) / 10);
            let valueLcCeil = (Math.ceil(valueY * 10) / 10);
            return [valueLFloor, valueLcCeil]
        } else if (valueY >= 20 && valueY <= 30) {
            let valueLFloor = (Math.floor(valueY / 0.2) * 0.2);
            let valueLcCeil = (Math.ceil(valueY / 0.2) * 0.2);

            //округление от неточночсти возникающей при умножении 
            valueLFloor = +valueLFloor.toFixed(2)
            valueLcCeil = +valueLcCeil.toFixed(2)

            return [valueLFloor, valueLcCeil]
        } else if (valueY >= 30 && valueY <= 70) {
            let valueLFloor = (Math.floor(valueY * 2) / 2);
            let valueLcCeil = (Math.ceil(valueY * 2) / 2);

            //округление от неточночсти возникающей при умножении 
            valueLFloor = +valueLFloor.toFixed(2)
            valueLcCeil = +valueLcCeil.toFixed(2)

            return [valueLFloor, valueLcCeil]
        };
    };


    function calculationInterpolation(valueY , constanta) {
        const switchValue = constanta;

        function getValue() {
            if (switchValue == 0) {
                let valueL = getValueL();
                console.log(valueL); 
                return valueL;
            } else if (switchValue == 1) {
                let valueH = getValueH();
                return valueH;
            };
        };

        let valueHL = getValue();

        let valueOne = valueHL[0];
        let valueTwo = valueHL[1];
        let valueX = valueY;
        let valueXOne = valueHL[2];
        let valueXTwo = valueHL[3];

        let valueXX = valueXOne + (valueXTwo - valueXOne) * (valueX - valueOne) / (valueTwo - valueOne);

        return valueXX;
    };
    
};

//buttonIV.addEventListener('click', onButtonIVClick);


