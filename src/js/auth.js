
function gLogin(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
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
      console.log('user is signed in,', user);
      document.getElementById("logout-btn").className = "btn-controls visible";
      document.getElementById("login-btn").className = "btn-controls hidden";
    } else {
      // No user is signed in.
      console.log("user is not authenticated", user);
      document.getElementById("logout-btn").className = "btn-controls hidden";
      document.getElementById("login-btn").className = "btn-controls visible";
    }
  });
})();


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
      localStorage.setItem('accessToken', token);
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