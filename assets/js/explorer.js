/*
sats-tracker
Developed @ Matrix Network International

*
* 
 */

const search =()=>{
  return new Promise ((resolve,reject)=>{
    try{
      const OUR_EMAIL = 'info@sats.cc';
      const NODE_URL = 'https://192.168.122.1:7000';
      const INPUT = document.getElementById('bitinput').value;
      const IS_VALID_64af  =/^[0-9a-f]{64}$/;
      const IS_TXID = /^[A-Za-z]/
      const IS_INT = /^\d+$/;

      if(IS_VALID_64af.test(INPUT)){
        if(IS_TXID.test(INPUT)){
          getTxid(INPUT).then((result)=>{
            console.log(result);
            resolve(result);
          })
          .catch((e)=>{
            console.error(e);
            reject(e);
          });
        }
        else{
          //is block hash
          getBlockFromHash(INPUT).then((result)=>{
            console.log(result);
            resolve(result);
          })
          .catch((e)=>{
            console.error(e);
            reject(e);
          });
        }
      }
      else{
        if(IS_INT.test(INPUT)){
          getBlock(INPUT).then((result)=>{
            console.log(result);
            resolve(result);
          })
          .catch((e)=>{
            console.error(e);
            reject(e);
          });
        }
        else{
          alert('Invalid blockheight/hash/txid format. Try again.');
          console.error('Bad inputs: ', TXID);
          reject("Bad inputs");
        }
      }

    }
    catch(e){
      console.error(e);
      alert(`an error occurred. please refresh. if the error persists, please email is at ${OUR_EMAIL}.`);
      reject("Errored at search() outskirts.");
    }
  });
}


const getBlock = (height)=>{
    return new Promise((resolve, reject)=>{
      try{

        const OUR_EMAIL = 'info@sats.cc';
        const NODE_URL = 'https://192.168.122.1:7000';
        const URI= `${NODE_URL}/get_block_from_height`;

        const options = {
          method: 'POST',
          headers:
          {
          "Content-Type": 'application/json'
          },
          body: {
              'height': height,
          },
          json: true
        };

        console.log(options);
        console.log(URI);

        fetch(URI, options)
        .then((response)=>{
          console.log(response)
      		if(response.status!==200){
      		    send_sound("error");
      		    alert('Got error from the server. Your details are either incorrect or did not reach our server. Please refresh your page and try again');
      		    console.log(response);
          }

          else{
      		    response.json()
              .then(function (data){
                if(data.status){
                  console.log(data);
                }
                else{
                  console.log(data);
                }
              })
              .catch((e)=>{
                console.error(e);
              });
          }
        })
        .catch( (err)=>{
          console.log('Caught at the outskirts');
          console.log(err);
          alert(`an error occurred. please refresh. if the error persists, please email is at ${OUR_EMAIL}.`);

        });
        
      }

      catch(e){
        console.error(e);
        alert(`an error occurred. please refresh. if the error persists, please email is at ${OUR_EMAIL}.`);
        reject("Errored at search() outskirts.");
      }
      
    
    });
  }
// ------------------ '(◣_◢)' ------------------

function getBlockFromHash(hash){
  return new Promise((resolve, reject)=>{
    try{

      const OUR_EMAIL = 'info@sats.cc';
      const NODE_URL = 'https://192.168.122.1:7000';
      const URI = `${NODE_URL}/get_block_from_hash`;

      const options = {
        method: 'POST',
        headers:
        {
        "Content-Type": 'application/json'
        },
        body: {
            'hash': hash,
        },
        json: true
      };
      
      fetch(URI, options)
      .then((response)=>{
        console.log(response.status)
        if(response.status!==200){
            send_sound("error");
            alert('Got error from the server. Your details are either incorrect or did not reach our server. Please refresh your page and try again');
            console.log(response);
        }

        else{
            response.json()
            .then(function (data){
              if(data.status){
                console.log(data);
              }
            })
            .catch((e)=>{
              console.error(e);
            });
        }
      })
      .catch( (err)=>{
        console.log('Caught at the outskirts');
        console.log(err);
        alert(`an error occurred. please refresh. if the error persists, please email is at ${OUR_EMAIL}.`);

      });
      
    }

    catch(e){
      console.error(e);
      alert(`an error occurred. please refresh. if the error persists, please email is at ${OUR_EMAIL}.`);
      reject("Errored at search() outskirts.");
    }
    
  });
}
// ------------------ '(◣_◢)' ------------------
function getTx(txid){
    return new Promise((resolve, reject)=>{
      try{

        const OUR_EMAIL = 'info@sats.cc';
        const NODE_URL = 'https://192.168.122.1:7000';
        const URI = `${NODE_URL}/tx_detail_global_1`;

        const options = {
          method: 'POST',
          headers:
          {
          "Content-Type": 'application/json'
          },
          body: {
              'txid': txid,
          },
          json: true
        };
        
        
        fetch(URI, options)
        .then((response)=>{
          console.log(response.status)
      		if(response.status!==200){
      		    send_sound("error");
              alert('Got error from the server. Your details are either incorrect or did not reach our server. Please refresh your page and try again');
      		    console.log(response);
          }

          else{
      		    response.json()
              .then(function (data){
                if(data.status){
                  console.log(data);
                }
              })
              .catch((e)=>{
                console.error(e);
              });
          }
        })
        .catch( (err)=>{
          console.log('Caught at the outskirts');
          console.log(err);
          alert(`an error occurred. please refresh. if the error persists, please email is at ${OUR_EMAIL}.`);

        });
        
      }

      catch(e){
        console.error(e);
        alert(`an error occurred. please refresh. if the error persists, please email is at ${OUR_EMAIL}.`);
        reject("Errored at search() outskirts.");
      }
      
    });
  }
// ------------------ '(◣_◢)' ------------------


