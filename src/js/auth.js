
function gLogin(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

function eLogin(){
  emailLogin("lbthomte@yahoo.com", "password");
}

function emailLogin(email, password){
  if(!email || ! password){
    // email and password needed
    console.log("Please provide email and password to login.");
    return false;
  }
  firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
}

function logout() {
  firebase.auth().signOut();
}

//Checking user authentication status.
(function checkAuthStatus(){
  //using onAuthStateChanged
  firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      //console.log('user is signed in,', user);
      document.getElementById("logout-btn").className = "btn-controls visible";
      let loginBtns = document.getElementsByClassName("login-btn");
      for(let i=0, j=loginBtns.length; i<j; i++){
        loginBtns[i].className = 'login-btn btn-controls hidden';
      }
      document.getElementById("signup-btn").className = "btn-controls hidden";
    } else {
      // No user is signed in.
      //console.log("user is not authenticated", user);
      document.getElementById("logout-btn").className = "btn-controls hidden";
      document.getElementById("signup-btn").className = "btn-controls visible";
      let loginBtns = document.getElementsByClassName("login-btn");
      for(let i=0, j=loginBtns.length; i<j; i++){
        loginBtns[i].className = 'login-btn btn-controls visible';
      }
    }
    //To get the current user details
    //console.log("firebase.currentUser is:", firebase.auth().currentUser);
  });
})();


(function handleRedirect(firebase){
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
      /*console.log("authentication redirect result object:", result);
      firebase.database().ref('users/hello-user').set({
        username: 'hello',
        email: 'hello@email.com',
        profile_picture : 'no-link'
      });*/
      //localStorage.setItem('accessToken', token);
    }
    // The signed-in user info.
    var user = result.user;
  }).catch(function(error) {
    // Handle Errors here.
    console.log("redirect error:", error);
    var errorCode = error.code;
    var errorMessage = error.message;
    // The email of the user's account used.
    var email = error.email;
    // The firebase.auth.AuthCredential type that was used.
    var credential = error.credential;
    // ...
  });
})(firebase);