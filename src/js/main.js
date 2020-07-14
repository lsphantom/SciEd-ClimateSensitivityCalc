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
    var baselineTemp = 0;
    var b1 = [390, 14.6];
    var b2 = [370, 14.3];
    var b3 = [280, 13.7];
    var b4 = [182, 5];


    //On load setup co2 concentration and AGT
    function checkSelectedValues(){
       switch ($('#baseline').val()) {
        case 'b1':
        climateSensitivity = b1[0];
        baselineTemp = b1[1];
        break;

        case 'b2':
        climateSensitivity = b2[0];
        baselineTemp = b2[1];
        break;

        case 'b3':
        climateSensitivity = b3[0];
        baselineTemp = b3[1];
        break;

        case 'b4':
        climateSensitivity = b4[0];
        baselineTemp = b4[1];
        break;

        default:
        break;
        } 
    }
    

    //Set outputs to selected values
    function setValues() {
       checkSelectedValues();
       $('#ppmv-range').val(climateSensitivity);
       $('#agt').text(baselineTemp); 
    }

    setValues();
    


    //Dropdown change
    $('#baseline').on('change', function(){
        setValues();
    });


//setup range selector
//$('#agt').value(baseline).data('temp');

    //Change sensitivity value
    $('input[name=sensitivity]').on('change', function(e){
       climateSensitivity = e.target.value;
    });


});
