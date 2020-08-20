//JS programmed for UCAR 2020 by Gary Pacheco
//global vars
var openCredits = document.getElementById('credits-btn');
var closeCredits = document.getElementById('close-btn');
var credits = document.getElementById('credits');


//toggle credits
function toggleCreditsModal (action) {
    if (action === 'open') {
        credits.style.display = 'block';
    } else {
        credits.style.display = 'none';
    }
    
}


//JQUERY
$(document).ready(function(){
    var climateSensitivity = $('input[name="sensitivity"]:checked').val();
    var co2Concentration = $('#ppmv-range').val();
    var baselineTemp = 0;
    var b1 = [390, 14.6];
    var b2 = [370, 14.3];
    var b3 = [280, 13.7];
    var b4 = [182, 5];


    //On load setup co2 concentration and AGT
    function checkSelectedValues(){
       switch ($('#baseline').val()) {
        case 'b1':
        co2Concentration = b1[0];
        baselineTemp = b1[1];
        break;

        case 'b2':
        co2Concentration = b2[0];
        baselineTemp = b2[1];
        break;

        case 'b3':
        co2Concentration = b3[0];
        baselineTemp = b3[1];
        break;

        case 'b4':
        co2Concentration = b4[0];
        baselineTemp = b4[1];
        break;

        default:
        break;
        } 
    }

    //Add fixed baseline setup
    function checkFixedValues(){
        co2Concentration = $('#fixedbaseline').data('cc');
        baselineTemp = $('#fixedbaseline').data('temp');

        console.log(co2Concentration, baselineTemp);
    }
    

    //Set outputs to selected values
    function setValues() {
       checkFixedValues();
       checkSelectedValues();
       $('.range-slider-value').text(co2Concentration);
       $('#agt').text(baselineTemp); 
    }

    setValues();
    


    //Baseline Dropdown change
    $('#baseline').on('change', function(){
        setValues();
        $('.range-slider-value').text(co2Concentration);
        $('#ppmv-range').val(co2Concentration);
        updateParticles(co2Concentration);
        updateThermometer();
    });



    //setup range selector
    //$('#agt').value(baseline).data('temp');

    //Change sensitivity value
    $('input[name=sensitivity]').on('change', function(e){
        climateSensitivity = e.target.value;
        currentConcentration = $('#ppmv-range').val();
       calcNewTemp(climateSensitivity, currentConcentration);
    });

    //Set and update CO2 concentration
    $('.range-slider-value').text(co2Concentration);

    $('#ppmv-range').on('input', function(e){
        var rangeValue = e.target.value;
        $('.range-slider-value').text(rangeValue);
        calcNewTemp(climateSensitivity, rangeValue);
        updateParticles(rangeValue);
    });



    //Calculate new temperature
    function calcNewTemp(cs, cc) {
        //refactor
        var initConcentration = co2Concentration;
        var initTemperature = baselineTemp;
        var setClimateSensitivity = cs;
        var setCO2Concentration = cc;

        //find multiplier value based on concentration value
        var multiplierValue = setCO2Concentration / initConcentration;
        
        //find doubling rate based on concentration value
        /*var doublingRate;
        if (setCO2Concentration >= initConcentration) {
            doublingRate = setClimateSensitivity / 2;
        } else {
            doublingRate = setClimateSensitivity;
        }
        
        //find temperature difference
        var tempDifference = doublingRate * multiplierValue;*/

        //calculate new temp
        var newCalculatedTemp;
       /* if (tempDifference === doublingRate) {
            newCalculatedTemp = initTemperature;
        } else if (tempDifference > doublingRate){
            newCalculatedTemp = initTemperature + tempDifference;
        } else {
            newCalculatedTemp = initTemperature - tempDifference;  
        }*/

        newCalculatedTemp = initTemperature + setClimateSensitivity * (Math.log(setCO2Concentration/initConcentration)/Math.log(2));
        // log 2 (C/C0) = ln(C/C0) / ln(2)
        
         
        //post calculated temp
        $('#agt').text(newCalculatedTemp.toFixed(1));
        // THERMOMETER RANGE: 0 - 23deg
        //adjust thermometer to a close estimate percentage height
        var thermometerLevel = (newCalculatedTemp / 23) * 100;
        $('.stem-perct').css('height', '' + thermometerLevel.toFixed(2) + '%');
    }


    //Update particle system
    function updateParticles(ccValue) {
        //ccValue range 180 - 800  : particles.number.value ~ 20 - 200
        //calculate estimate particle value
        var estimatedParticleValue = (ccValue / 4);
        //console.log(estimatedParticleValue);
        pJSDom[0].pJS.particles.number.value = estimatedParticleValue;
        pJSDom[0].pJS.fn.particlesRefresh();

    }

    //Update thermometer (Independent Function)
    function updateThermometer(){
        var adjustedHeight = (baselineTemp/23)*100;
        $('.stem-perct').css('height', '' + adjustedHeight.toFixed(2) + '%');
    }

    updateParticles(co2Concentration);

    
});
