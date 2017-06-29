function signUp(email, password){
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
    //user data
  }).catch(function(error){
    //error
  });
}

function createAcount(){
  signUp("lbthomte@yahoo.com", "password");
}