function signUp(email, password){
  console.log("arguments", email, password);
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
    //user data
  }).catch(function(error){
    //error
    console.log("signup error:", error);
  });
}

function createAcount(){
  signUp(document.getElementById('username').value, document.getElementById('password').value);
}