/*
*
*
/*
sats.cc auth
Developed @ Matrix Network International
BUGS: Logout button hide/show

*
* 
*/
// ------------------ '(◣ ◢)' ---------------------

$('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
 });

 $('#tfa-form').hide();

 $('#sepa-payment').hide();

 $('#satlearner').hide();

 $('#satspender').hide();

 
$('#leprofile').hide();

// $('#logout').hide();

$('#satstacker_pay').hide();
// ------------------ '(◣ ◢)' ---------------------

const auth = firebase.auth();

let storageService = firebase.storage();
let storageRef = storageService.ref();

let db = firebase.firestore();
// ------------------ '(◣ ◢)' ---------------------

const calcForm = document.querySelector('#calc-form');

calcForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    $('#satstacker_pay').show();
    $('#satstacker_calc').hide();

});

// ------------------ '(◣ ◢)' ---------------------

const registerForm = document.querySelector('#register-form');
registerForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    console.log(e);
    console.log('heard the event')
    //get user info

    const email = registerForm['register-email'].value;
    const pass = registerForm['register-pass'].value;
    const pass_re = registerForm['register-pass-re'].value;

    if(pass===pass_re){

        auth.createUserWithEmailAndPassword(email,pass)
        .then((cred)=>{
            console.log(cred);
            $('#logout').show();


            //Take him to his profile page
            registerForm.reset();
            $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
            document.getElementById('sub-head').innerHTML='Welcome';

            $('#full-landing').hide();

            $('#leprofile').show();

            $('#profile').show();

        })
        .catch((e)=>{   
            console.error(e);
            registerForm.reset();
        });

    }
    else{
        alert("passwords do not match.");
        registerForm.reset();

    }
    
});
// ------------------ '(◣ ◢)' ---------------------

const loginForm = document.querySelector('#login-form');

loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    
    console.log(e);
    console.log('heard the event')
    //get user info

    const email = loginForm['login-email'].value;
    const pass = loginForm['login-pass'].value;


    auth.signInWithEmailAndPassword(email,pass)
    .then((cred)=>{
        
        $('#login-form').fadeOut(200);
        loginForm.reset();

        console.log("CRED",cred);


        db.collection('profiles').doc(auth.currentUser.uid).get()
        .then((doc)=>{
            if(doc.exists){

                // alert(doc);
                // console.log(JSON.stringify(doc));
                // alert("User is in kyc db");
                console.log("Document data:", doc.data());
             
                if(doc.data().has2FAKey){
                    document.getElementById('profile-2fa-check').setAttribute('src', 'assets/images/check.svg');
                    document.getElementById('g2fa-modal-button').innerHTML="<b>Review</b>";
                    $('#tfa-form').show();
                    $('#tfa-form').fadeIn(400);
        
                }
            }

            else{
                $('#logout').show();

                $('#entrycard').fadeOut(200);
        
                $('#leprofile').fadeIn(400);
        
        
                $('#full-landing').hide();
        
                $('#profile').show();
                document.getElementById('sub-head').innerHTML='Welcome';
        
            }
        //Take him to his profile page
        })
        .catch((e)=>{
            console.error(e);
            loginForm.reset();
        })

        })
        .catch((e)=>{   
            console.error(e);
            loginForm.reset();
        });

});
// ------------------ '(◣ ◢)' ---------------------

const logout = document.querySelector('#logout');

logout.addEventListener('click', (e)=>{

    e.preventDefault();

    auth.signOut().then(()=>{
        console.log("user signed out");
        $('#logout').hide()

        $('#leprofile').fadeOut(200);

        $('#entrycard').fadeIn(400);

        $('#tfa-form').hide();
        $('#login-form').fadeIn(200);


        $('#full-landing').show();

        // $('#profile').hide()

    })

})
// ------------------ '(◣ ◢)' ---------------------

const glogin = document.querySelector('#glogin');

glogin.addEventListener('click', (e)=>{
    e.preventDefault();
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
    .then((result)=>{
      const user = result.user;
      $('#logout').show()
      // document.write(`Hello ${user.displayName}`);
      console.log(user);
      document.getElementById('sub-head').innerHTML='Welcome';

      $('#leprofile').show();

      $('#full-landing').hide();


    })
    .catch((e)=>{
      console.error(`GoogleAuth Login error ${e}`);
      alert("Google Login Error: Register using email/password for now.");
    });
});


// ------------------ '(◣ ◢)' ---------------------


const sendVerificationEmail = ()=>{
    console.log(auth.currentUser.email);
    auth.currentUser.sendEmailVerification()
    .then((result)=>{
        console.log("initiated email verification");
        console.log(result);
        document.getElementById('send-e-verification').innerHTML="<p class='subp'>We have sent a verification link to your email.</p>";
    })
    .catch((e)=>{
        console.error("error initiating email verification");
        console.error(e);
    })
}

// ------------------ '(◣ ◢)' ---------------------

const updateName = () =>{
    
}
// ------------------ '(◣ ◢)' ---------------------

function updatePhone(){
    console.log("AUTH auth.currentUser", auth.currentUser)
    db.collection('profiles').doc(auth.currentUser.uid).update({
        "phoneNumber": document.getElementById('profile-phone').value,
    })
    .then(()=>{
        console.log("Document successfully updated!");
        document.getElementById('phone-submit-button').setAttribute('src', 'assets/images/time-left.svg');
        document.getElementById('phone-submit-notice').innerHTML="<p class='centerme'><em>We have received your phone number. You will recieve a call from us in the next 0-48 hours to get you fully onboarded.</em></p>";

    })
    .catch((error)=>{
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    

};

let doc_ = "add";

document.querySelector('#add-proof-doc').addEventListener('change', (e)=>{
    doc_="add";
    handleFileUploadChange(e);
});
document.querySelector('#id-doc').addEventListener('change', (e)=>{
    doc_="id";
    handleFileUploadChange(e);
});

// document.querySelector('.file-submit').addEventListener('click', handleFileUploadSubmit);

let add_proof_doc;
let id_doc;
// ------------------ '(◣ ◢)' ---------------------

function handleFileUploadChange(e) {
    switch(doc_){
        case "add":
            add_proof_doc = e.target.files[0];
            break;
        default:
            id_doc = e.target.files[0];
            break;
    }
    alert('selected')

}
// ------------------ '(◣ ◢)' ---------------------

const collectKYC = () =>{

    const name = document.getElementById('kyc-name').value;
    const dob = document.getElementById('kyc-dob').value;
    const gender = document.getElementById('kyc-gender').value;
    const country = document.getElementById('kyc-country').value;
    const phone0 = document.getElementById('kyc-phone').value;
    const address0 = document.getElementById('kyc-address0').value;
    const address1 = document.getElementById('kyc-address1').value;
    const city = document.getElementById('kyc-city').value;
    const state = document.getElementById('kyc-state').value;
    const zip = document.getElementById('kyc-zip').value;

// const address_proof_doc = document.getElementById('').value;
// const id_doc = document.getElementById('').value;

    const kyc_details = {
        name,
        dob,
        gender,
        country,
        phone0,
        address0,
        address1,
        city,
        state,
        zip,
        add_proof_doc,
        id_doc,
    };

    console.log(kyc_details);

    console.log(id_doc,add_proof_doc);

    function handleFileUploadSubmit() { 
        alert('enteredSubmit')
    
        const uploadTask = storageRef.child(`images/${auth.currentUser.email}/${selectedFile.name}`).put(selectedFile);
        uploadTask.on('state_changed', (snapshot) => {
        }, (error) => {
            // Handle unsuccessful uploads
            console.log(`Errored uploading file: ${error}`);
            alert('Error uploading file.')

        }, () => {
            // Do something once upload is complete
            console.log('success');
            alert('successedit')

        });

    }
    document.getElementById("kyc-form-data").reset();

}
// ------------------ '(◣ ◢)' ---------------------

const collectCC = () =>{
    
    const refname = document.getElementById('cc-refname').value;
    const name = document.getElementById('cc-fullname').value;
    const number = document.getElementById('cc-number').value;
    const expiry = document.getElementById('cc-expiry').value;
    const cvv = document.getElementById('cc-cvv').value;
    
    const cc_details = {
        refname,
        name,
        number,
        expiry,
        cvv,
    };

    console.log(cc_details);

    document.getElementById("add-cc-form-data").reset();
   
}
// ------------------ '(◣ ◢)' ---------------------

const collectBaCC = () =>{

    const refname = document.getElementById('bacc-refname').value;
    const name = document.getElementById('bacc-fullname').value;
    const iban = document.getElementById('bacc-iban').value;
    const bic = document.getElementById('bacc-bic').value;
    const address = document.getElementById('bacc-address').value;
    
    const bacc_details = {
        refname,
        name,
        iban,
        bic,
        address,
    };

    console.log(bacc_details);

    document.getElementById("add-bacc-form-data").reset();
   
}

// ------------------ '(◣ ◢)' ---------------------

function create2FA(){
    return new Promise (function(resolve,reject){


        const url="https://localhost:2323/tfactor/new";

        const params = {
            uid: firebase.auth().currentUser.uid
        };

        const options = {
            method: "POST",
            headers:
            {
                "Allow":  'application/x-www-form-urlencoded',            
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "*/*",
                "Cache-Control": "no-cache",
                "Accept-Encoding": "gzip, deflate",
                "Content-Length": "10",
                "Connection": "keep-alive",

            },
            body: new URLSearchParams(params)

        };

        fetch(url,options)
        .then(function (response){

            if(response.status!==200){
                response.json()
                .then(function (data){
                   console.error(data)
                   if(data.code===11000){
                       alert(data.message);
                   }
                    //call another function that triggers rendering the status page
                })
                .catch((e)=>{
                    console.error(e);
                })
            }

            else{
                response.json()
                .then(function (data){
                    console.log(data);
                    if(data.status){
                        // let img = document.createElement("img");
                        // img.src = data.message.qr;

                        // console.log(img.src)
                        // document.getElementById("qrcode-2fa").appendChild(img);

                        console.log("IN HERE")
                        document.getElementById("qrcode-2fa").src=data.message.qr;
                        document.getElementById("key-2fa").innerHTML="<p><b>"+data.message.key+"</b></p>";


                        db.collection('profiles').doc(params.uid).get()
                        .then((doc)=>{
                        
                            db.collection("profiles").doc(params.uid).set({
                                has2FAKey: true
                            },{ merge: true });
                        
                        })
                        .catch((error)=> {
                            console.log("Error getting document:", error);
                            alert("Error getting your KYC. Attempt re-login.");

                        });

                        resolve(data.message);
                    }
                    else{
                        alert("error in generating 2fa")
                        reject(data.message);
                    }
                    //call another function that triggers rendering the status page
                })
                .catch((e)=>{
                    console.log(e);
                    alert(e.message);
                    reject(e.message);
                })
            }
            console.log("came back safe");

        })
        .catch(function (err){
            console.log(err);
            alert('Could not reach server');
            reject(err);
        })
    });
}

// ------------------ '(◣ ◢)' ---------------------

const tfa = document.querySelector('#tfa-form');

tfa.addEventListener('submit', (e)=>{

    e.preventDefault();

    const url="https://localhost:2323/tfactor/verify";

        const params = {
            uid: firebase.auth().currentUser.uid,
            token: document.getElementById('tfa-token').value
        };

        const options = {
            method: "POST",
            credentials: 'omit',
            rejectUnauthorized: false,
            headers:
            {
                "Allow":  'application/x-www-form-urlencoded',            
                "Content-Type": "application/x-www-form-urlencoded",
                "Accept": "*/*",
                "Cache-Control": "no-cache",
                "Accept-Encoding": "gzip, deflate",
                "Content-Length": "10",
                "Connection": "keep-alive",
                "Access-Control-Allow-Credentials": false,
            
            },

            body: new URLSearchParams(params)

        };

        fetch(url,options)
        .then(function (response){

            if(response.status!==200){
                response.json()
                .then(function (data){
                   console.error(data)
                   if(data.code===11000){
                       alert(data.message);
                   }
                    //call another function that triggers rendering the status page
                })
                .catch((e)=>{
                    console.error(e);
                })
            }

            else{
                response.json()
                .then(function (data){
                    console.log(data);
                    if(data.status){
                        // let img = document.createElement("img");
                        // img.src = data.message.qr;

                        // console.log(img.src)
                        // document.getElementById("qrcode-2fa").appendChild(img);

                        console.log("IN HERE")
                      
                        $('#logout').show();

                        $('#entrycard').fadeOut(200);
    
                        $('#leprofile').fadeIn(400);
    
    
                        $('#full-landing').hide();
    
                        $('#profile').show();
                    
                    }
                    else{
                        alert("error in generating 2fa")
                        return(data.message);
                    }
                    //call another function that triggers rendering the status page
                })
                .catch((e)=>{
                    console.log(e);
                    alert(e.message);
                    return(e.message);
                })
            }
            console.log("came back safe");

        })
        .catch(function (err){
            console.log(err);
            alert('Could not reach server');
            return(err);
        })

});
// ------------------ '(◣ ◢)' ---------------------


// ------------------ '(◣ ◢)' ---------------------
// ------------------ '(◣ ◢)' ---------------------


firebase.auth().onAuthStateChanged((user)=>{
    if (user) {
        // User is signed in.
        console.log("USER DETAILS: ",user);

        document.getElementById('sub-head').innerHTML='Welcome';

        // $('#landing').hide();

        // $('#profile').show();
        const displayName = user.displayName;
        const email = user.email;
        const emailVerified = user.emailVerified;
        const photoURL = user.photoURL;
        const isAnonymous = user.isAnonymous;
        const uid = user.uid;
        const providerData = user.providerData;
        let kyc = {};//update this with the kyc document from firestore
        console.log("email verified: ", emailVerified);
        db.collection('profiles').doc(uid).get()
        .then((doc)=>{
            if(doc.exists){

                // alert(doc);
                // console.log(JSON.stringify(doc));
                // alert("User is in kyc db");
                console.log("Document data:", doc.data());
                if(doc.data().isEmailVerified){
                    document.getElementById('profile-e-check').setAttribute('src', 'assets/images/check.svg');
                    
                }
                if(doc.data().has2FAKey){
                    document.getElementById('profile-2fa-check').setAttribute('src', 'assets/images/check.svg');
                    document.getElementById('g2fa-modal-button').innerHTML="<b>Review</b>";
        
                }
                else{
                    $('#logout').show();

                    $('#entrycard').fadeOut(200);

                    $('#leprofile').fadeIn(400);


                    $('#full-landing').hide();

                    $('#profile').show();
                }
                
            }else{
                alert("Creating a new kyc document for you!");



                $('#logout').show();

                $('#entrycard').fadeOut(200);
        
                $('#leprofile').fadeIn(400);
        
        
                $('#full-landing').hide();
        
                $('#profile').show();

                db.collection("profiles").doc(uid).set({
                    name: displayName || null,
                    email: email,
                    isEmailVerified: emailVerified,
                    has2FAKey: false,
                });

            }
        })
        .catch((error)=> {
            console.log("Error getting document:", error);
            alert("Error getting your KYC. Attempt re-login.");

        });

        
        document.getElementById('profile-email').value = email;
        document.getElementById('profile-email').setAttribute('readonly', 'readonly');

        console.log("\n\nDisplay Name\n\n",displayName);
        console.log(emailVerified)

        if(photoURL){
            document.getElementById('profile-pic').setAttribute('src', photoURL);
        }

        if(displayName){
            document.getElementById('profile-name').value = displayName;
            document.getElementById('profile-name-check').setAttribute('src', 'assets/images/check.svg');
        }

        if(emailVerified){
            $('#send-e-verification').empty();
            document.getElementById('profile-e-check').setAttribute('src', 'assets/images/check.svg');
            // document.getElementById('profile-e-verify').innerHTML="<p>We have sent a verification link to your email.</p>";
        }


        db.collection('profiles').doc(email)
        .onSnapshot(()=>{
            // alert('KYC UPDATED.');
            // console.log(JSON.stringify(snapshot,null,2))
        });

        // ...



    } else {
        // User is signed out.
        // ...
        // $('#logout').hide();

        $('#profile').hide()

        $('#logout').hide();

        $('#leprofile').fadeOut(200);

        $('#entrycard').fadeIn(400);



        $('#full-landing').show();



    }



});


// ------------------ '(◣ ◢)' ---------------------
// ------------------ '(◣ ◢)' ---------------------

function dec2hex (dec) {
    return ('0' + dec.toString(16)).substr(-2)
  }
  
  // generateId :: Integer -> String
  function generateId (len) {
    var arr = new Uint8Array((len || 40) / 2)
    window.crypto.getRandomValues(arr)
    return Array.from(arr, dec2hex).join('')
  }
// ------------------ '(◣ ◢)' ---------------------

//SEND JWT TO BACKEND FOR VALIDATION

// firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
// // Send token to your backend via HTTPS
// // ...
// }).catch(function(error) {
// // Handle error
// });


//GET THIS ON BACKEND FROM FIREBASE ADMIN
// idToken comes from the client app
// admin.auth().verifyIdToken(idToken)
//   .then(function(decodedToken) {
//     let uid = decodedToken.uid;
//     // ...
//   }).catch(function(error) {
//     // Handle error
//   });


function cc(){
    $('#cc-payment').show();
    $('#sepa-payment').hide();
    
 }
 function sepa(){
    $('#sepa-payment').show();
    $('#cc-payment').hide();
    
 }
 
 feather.replace();

 function helpMeStack(){
    console.log("helping user stack sats!")
 
    $('#satstacker').show();
    $('#satlearner').hide();
    $('#satspender').hide();
    $('#satstacker_pay').hide();
    $('#satstacker_calc').show();

 
    return;
 }
 
 function helpMeLearn(){
 
    console.log("here to help you learn");
 
    $('#satstacker').hide();
    $('#satlearner').show();
    $('#satspender').hide();
    $('#satstacker_pay').hide();

    $('#satstacker_calc').show();
    
    return;
 }
 
 function helpMeSpend(){
    console.log("here to help you spend");
 
    $('#satstacker').hide();
    $('#satlearner').hide();
    $('#satspender').show();  
    $('#satstacker_pay').hide();

    $('#satstacker_calc').show();

 
    return;
 }
 
 
 function stacksats(e){
    alert("paymwnt prov pls");
 
 }
 
 
 
 function payWithCC(){
    alert('cool');
 };




// const test  = '12Joias1433ee32r12';

// const qr = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=192x192&data=${test}">`

// document.getElementById("qrcode").innerHTML = qr;
   
