//JS programmed for UCAR 2020 by Gary Pacheco
var openCredits = document.getElementById('credits-btn');
var closeCredits = document.getElementById('close-btn');
var credits = document.getElementById('credits');

function toggleCreditsModal (action) {
    if (action === 'open') {
        credits.style.display = 'block';
    } else {
        credits.style.display = 'none';
    }
    
}
