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
    

    //Set outputs to selected values
    function setValues() {
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
    });


//setup range selector
//$('#agt').value(baseline).data('temp');

    //Change sensitivity value
    $('input[name=sensitivity]').on('change', function(e){
       climateSensitivity = e.target.value;
    });

    //Set and update CO2 concentration
    $('.range-slider-value').text(co2Concentration);

    $('#ppmv-range').on('input', function(e){
        $('.range-slider-value').text(e.target.value);
    });
});
