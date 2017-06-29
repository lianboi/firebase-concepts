# firebase-concepts

# Firebase
Firebase is a mobile and web application development platform.
For more details, please check https://firebase.google.com/

# Getting Started
To get started with Firebase, sign in to https://console.firebase.google.com/
Click on "Add project", and enter project name in the dialog window and then click "create project" button.

# Adding Firebase to your web app
From your project overview window in the Firebase console, click the "Add Firebase to your web app" to get
the code snippets to add to your web app.
The code snippet will look like:
````
<script src="https://www.gstatic.com/firebasejs/4.1.3/firebase.js"></script>
<script>
  // Initialize Firebase
  var config = {
    apiKey: "FIREBASE_PROJECT_API_KEY",
    authDomain: "AUTH_DOMAIN",
    databaseURL: "DATABASE_URL",
    projectId: "PROJECT_ID",
    storageBucket: "STORAGE_BUCKET",
    messagingSenderId: "MESSAGING_SENDER_ID"
  };
  firebase.initializeApp(config);
</script>
````
# Authentication
You can authenticate and manage users from a variety of providers without server-side code.
To do that, set up sign-in method in the Firebase project. To set up, navigate to "Authentication" tab in the Firebase app and set up the sign-in methods
according to your choice.
Granted Google sign-in is enabled, you can do the following to authenticate users:

*html:*
````
<button id="login-btn" class="btn-controls visible" onclick="gLogin()">Login</button>
<button id="login-btn" class="btn-controls hidden" onclick="logout()">Logout</button>

````
*js:*
````
//login
function gLogin(){
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider);
}

//logout
function logout(){
    firebase.auth().signOut();
}

//handling redirect
firebase.auth().getRedirectResult().then(function(result) {
    if (result.credential) {
      // This gives you a Google Access Token. You can use it to access the Google API.
      var token = result.credential.accessToken;
      // ...
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
  
//Checking authentication status
firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      // User is signed in.
      console.log('user is signed in,', user);
    } else {
      // No user is signed in.
      console.log("user is not authenticated", user);
    }
  });
  
````
# Signing up using email and password
Enable Email/Password sign-in:
In the Firebase console, open the Auth section.
On the Sign in method tab, enable the Email/password sign-in method and click Save.

Create a new account by passing the new user's email address and password to 
**createUserWithEmailAndPassword**:
````
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});
````

# Login using email and password
To login using email and password, use **signInWithEmailAndPassword**:
````
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // ...
  });
````

# Realtime database
**Read and Write data**
To read and write data to the database, you need a reference to the database. To get a reference to the database service, use **firebase.database()**.

````
var db = firebase.database();
````

*Write operation*
````
//firebase.database().ref("PATH/TO/THE/KEY_OR_FIELD").set(JSON_OBJECT)
//e.g
firebase.database().ref('users/'+user_id).set({ name:'Elbie', age: 101});
````
N.B: The set() method replace the existing data in the referenced path(if any).
