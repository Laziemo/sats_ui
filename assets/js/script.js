/*
sats_buy.cc wild script
Developed @ Matrix Network International

*
* 
 */

let kraken;

let bitcoin_buy = document.getElementById('btc-value-buy');
let sats_buy = document.getElementById('sats-value-buy');
let euro_buy = document.getElementById('euro-value-buy');


let bitcoin_sell = document.getElementById('btc-value-sell');
let sats_sell = document.getElementById('sats-value-sell');
let euro_sell = document.getElementById('euro-value-sell');


const SATS100=parseInt(100000000);

bitcoin_buy.value = parseFloat(1.00000000);
sats_buy.value = addCommas(SATS100);


bitcoin_sell.value = parseFloat(1.00000000);
sats_sell.value = addCommas(SATS100);

console.log("inside script.js")

// euro.addEventListener('change', handleCalculatorChange('euro'));
// bitcoin_buy.addEventListener('change', handleCalculatorChange('bitcoin'));

bitcoin_buy.oninput =()=>{
    euro_buy.value =  addCommas((bitcoin_buy.value * kraken).toFixed(2));
    sats_buy.value = addCommas(parseInt((bitcoin_buy.value * SATS100)));

};

sats_buy.oninput =()=>{
    bitcoin_buy.value = addCommas((sats_buy.value / SATS100));
    euro_buy.value =  addCommas((bitcoin_buy.value * kraken).toFixed(2));

};

euro_buy.oninput =()=>{
    bitcoin_buy.value = addCommas((euro_buy.value / kraken).toFixed(8));
    sats_buy.value = addCommas(parseInt((bitcoin_buy.value * SATS100)))


};


bitcoin_sell.oninput =()=>{
    euro_sell.value =  addCommas((bitcoin_sell.value * (kraken*0.97)).toFixed(2));
    sats_sell.value = addCommas(parseInt((bitcoin_sell.value * SATS100)));

};

sats_sell.oninput =()=>{
    bitcoin_sell.value = addCommas((sats_sell.value / SATS100));
    euro_sell.value =  addCommas((bitcoin_sell.value * (kraken*0.97)).toFixed(2));

};

euro_sell.oninput =()=>{
    bitcoin_sell.value = addCommas((euro_sell.value / (kraken*0.97)).toFixed(8));
    sats_sell.value = addCommas(parseInt((bitcoin_sell.value * SATS100)))

};


const getPrice=()=>{
    return new Promise((resolve,reject)=>{
        console.log('requesting');
        const url = "https://api.kraken.com/0/public/Ticker?pair=xbteur"
          const options = {
            method: "GET",
            // headers:{
            //   "Allow":  'application/x-www-form-urlencoded',
            //   "Content-Type": 'application/x-www-form-urlencoded'
            // }
          };
          //console.log(options)
    
    
          fetch(url,options)
          .then(function (response){
          console.log(response.status)
              if(response.status!==200){
                  send_sound("error");
                  alert('Got error from the server. Your details are either incorrect or did not reach our server. Please refresh your page and start again. *Do not pay this address*');
                  console.log(response);
              }
    
              else{
                  response.json()
                .then(function (data){
                    if(data){
                        console.log("data from kraken", data.result.XXBTZEUR.c[0]);
                        // alert(';success;');
                        resolve(data.result.XXBTZEUR.c[0]);
                    }
                    else{
                    console.log("no data.");
                        reject('no data from kraken');
                    }
    
                })
                .catch(e=>{
                    console.error(e);
                    reject('errored')
                });
            }
        })
        .catch(e=>{
            console.error(e);
            reject('errored')

        })
    })
   
}

getPrice()
.then((result)=>{
    console.log('Resolved price');
    kraken=result;
    euro_buy.value = addCommas(parseFloat(kraken).toFixed(2));
    euro_sell.value = addCommas(parseFloat(kraken*0.97).toFixed(2));

})
.catch((e)=>{
    console.error(e);
});


var closeButtonClicked = false;

$('.really-close-the-modal').on('click', function () {
    closeButtonClicked = true;
});

$('#add-card-modal').on('hide.bs.modal', function (e) {
    if (!closeButtonClicked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    closeButtonClicked = false;
});
$('#g2fa-modal').on('hide.bs.modal', function (e) {
    if (!closeButtonClicked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    closeButtonClicked = false;
});
$('#kyc-modal').on('hide.bs.modal', function (e) {
    if (!closeButtonClicked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }
    closeButtonClicked = false;
});

// $('#add-card-modal').modal({
//     backdrop: 'static',
//     keyboard: false
// });



function addCommas(nStr){
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
     x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
   }
