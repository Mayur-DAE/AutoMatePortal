// Kiosk Fullscreen Trigger
$("body").click(function () {
    if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
    }
});

// Token & Services
function showFirstModalCP() { $("#exampleModal5").modal('show'); }
function hideFirstModalCP() { $("#exampleModal5").modal('hide'); }

// TPA
function showTPAPopupModal() { $("#TPAPopupModal").modal('show'); }
function hideTPAPopupModal() { $("#TPAPopupModal").modal('hide'); }
function showQRModal() { $("#QRModal").modal("show"); }

// Feedback
function showFModalFb() { $("#exampleModalFB").modal('show'); }
function hideFModalFb() { $("#exampleModalFB").modal('hide'); }
function showSecondModalFb() { $("#exampleModalFB2").modal('show'); }
function hideSecondModalFb() { $("#exampleModalFB2").modal('hide'); }

// Hero Services
function showopenModalHeroServices() { $("#Heroservice").modal('show'); }
function hideModalHeroServices() { $("#Heroservice").modal('hide'); }

//Cas Deposit 
function showCashDepositModal() { $("#cashDepositModal").modal('show'); }
function hideCashDepositModal() { $("#cashDepositModal").modal('hide'); }