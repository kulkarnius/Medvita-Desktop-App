/**
 * Displays a list of doctors that the use can pick from
 */
// Initialize GCP
const db = firebase.firestore();
const auth = firebase.auth();

const gotTime = localStorage.getItem('gotTime');

/**
 * Displays all of the available doctors
 * Note: Add feature that puts recently chosen doctors on the list
 * and figure out a way to best filter doctors (eg prioritize by
 * availability within the next month)
 */
function init() {
  var firstDoc = true;
  // Displays the doctor profiles
  function displayDoctorProfile(doc) {
    if (firstDoc) {
      $('.DocShow')
      .append('<tr>')
      .append('<th>Doctor</th>')
      .append('<th>Specialization</th>')
      .append('<th></th>')
      .append('</tr>')
      .append('<tr>')
      .append('<td><img class="resize" src="sexyaditya.jpg">' + doc.data().fname + ' ' + doc.data().lname + '</td>')
      .append('<td>Paleontology</td>')
      .append('<td><button class="btn btn-primary" type="button" id="button"> Select</button></td>')
      .append('</tr>');
      firstDoc = false;
    } else {
      $('.DocShow')
      .append('<tr>')
      .append('<td><img class="resize" src="sexyaditya.jpg">' + doc.data().fname + ' ' + doc.data().lname + '</td>')
      .append('<td>Paleontology</td>')
      .append('<td><button class="btn btn-primary" type="button" id="button"> Select</button></td>')
      .append('</tr>');
    }
  }

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
