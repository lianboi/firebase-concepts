function signUp(email, password){
  console.log("arguments", email, password);
  firebase.auth().createUserWithEmailAndPassword(email, password).then(function(user){
    //user data
    window.location.href="/";
  }).catch(function(error){
    //error
    alert("signup error:" + JSON.stringify(error));
    console.log("signup error:", error);
  });
}

function createAcount(){
  if(document.getElementById('password').value && (document.getElementById('password').value===document.getElementById('confirm-password').value)&& document.getElementById('username').value){
    signUp(document.getElementById('username').value, document.getElementById('password').value);
  } else {
    alert("Please, fill in the signup form properly.");
  }
}