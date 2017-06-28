
function gLogin(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

function logout() {
  firebase.auth().signOut();
}

(function handleRedirect(firebase){
  firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
      console.log("authentication redirect result object:", result);
      firebase.database().ref('users/hello-user').set({
        username: 'hello',
        email: 'hello@email.com',
        profile_picture : 'no-link'
      });
      document.getElementById("logout-btn").className = "btn-controls visible";
      document.getElementById("login-btn").className = "btn-controls hidden";
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