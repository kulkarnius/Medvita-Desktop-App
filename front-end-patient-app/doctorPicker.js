/**
 * Displays a list of doctors that the use can pick from
 */
// Initialize GCP
const db = firebase.firestore();
const auth = firebase.auth();

const gotTime = localStorage.getItem('gotTime');

function init() {

  // If the user has chosen a time, will get doctors that are
  // available during that time
  if (gotTime) {
    db.collection('doctors').where("availability", "array-contains", `${dateConcat}`)
    .limit(10).get()
    .then(function (querySnapshot) {
      querySnapshot.forEach(function(doc) {
        displayDoctorProfile(doc)
      });
    })
  } 

  // If the user has not chosen a time, then will pull from recently used
  // doctors, fill the rest up with random ones
  else {
    db.collection('doctors').limit(10)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        displayDoctorProfile(doc);
      });
    })
    .catch(function(error) {
      console.log('Error => ', error);
      alert("Could not retrieve doctors");
    });
  }
}

function displayDoctorProfile(doc) {
  
}

function pickDoctor(doctorUid) {
  // Adds schedule to database and emails doctor
  if (gotTime == true) {
    db.collection('doctors').doc(`$`)
  } 
  
  // Sends user to time picker page
  else {
    localStorage.setItem('doctorUid', doctorUid);
    localStorage.setItem('gotDoctor', true);
    window.location = "timePicker.html";
  }
}

init();
