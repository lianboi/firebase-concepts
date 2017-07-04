
function writeUserData(userId, name, email, profile_img){
  let dbRef = firebase.database().ref('users/'+userId);
  dbRef.set({
    username: name,
    email: email,
    profile_img: profile_img
  }).then(function(data){
    //N.B.: data is not defined here. maybe the success callback doesn't take any arguments.
    console.log("successfully write data", data);
  }).catch(function(error){
    console.log("error.. writing data", error);
  });
}

firebase.auth().onAuthStateChanged(function (user) {
  user ? writeUserData(user.uid, "lianboi", "lbthomte@yahoo.com", '') : false;
});

//writeUserData("testss-user-id", "thomte", "thomte@email.com", '');

function listenDataRef(ref, eventType,handler){
  ref.on(eventType, handler);
}

function removeDataListener(ref, handler){
  removeDataListener.offssss(ref, handler);
}