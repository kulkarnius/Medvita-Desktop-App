/**
 * Displays a list of doctors that the use can pick from
 */
// Initialize GCP
const db = firebase.firestore();
const auth = firebase.auth();

const gotTime = localStorage.getItem('gotTime');

var doctorUidArray = new Array();

/**
 * Displays all of the available doctors
 * Note: Add feature that puts recently chosen doctors on the list
 * and figure out a way to best filter doctors (eg prioritize by
 * availability within the next month)
 */
function init() {
  var firstDoc = true;
  var count = 0;

  // Displays the doctor profiles
  function displayDoctorProfile(doc) {
    var htmlStr = '';
    if (firstDoc) {
      htmlStr += '<tr>';
      htmlStr += '<th>Doctor</th>';
      htmlStr += '<th>Specialization</th>';
      htmlStr += '<th></th>';
      htmlStr += '</tr>';
      htmlStr += '<tr>';
      htmlStr += '<td><img class="resize" src="sexyaditya.jpg">' + doc.data().fname + ' ' + doc.data().lname + '</td>';
      htmlStr += '<td>Paleontology</td>';
      htmlStr += '<td><button class="btn btn-primary" type="button" id="button" onClick="pickDoctor(' + count + ')"> Select</button></td>';
      htmlStr += '</tr>';
      firstDoc = false;
    } else {
      htmlStr += '<tr>';
      htmlStr += '<td><img class="resize" src="sexyaditya.jpg">' + doc.data().fname + ' ' + doc.data().lname + '</td>';
      htmlStr += '<td>Paleontology</td>';
      htmlStr += '<td><button class="btn btn-primary" type="button" id="button" onClick="pickDoctor(' + count + ')"> Select</button></td>';
      htmlStr += '</tr>';
    }
    $('.DocShow').append(htmlStr);
  }

  // // If the user has chosen a time, will get doctors that are
  // // available during that time
  // if (gotTime) {
  //   db.collection('doctors').where("availability", "array-contains", `${dateConcat}`)
  //   .limit(10).get()
  //   .then(function (querySnapshot) {
  //     querySnapshot.forEach(function(doc) {
  //       displayDoctorProfile(doc)
  //       doctorUidArray.push(doc.data().uid);
  //       count++;
  //     });
  //   })
  // } 

  // // If the user has not chosen a time, then will pull from recently used
  // // doctors, fill the rest up with random ones
  // else {
    db.collection('doctors').limit(10)
    .get()
    .then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        displayDoctorProfile(doc);
        doctorUidArray.push(doc.data().uid);
        count++;
      });
    })
    .catch(function(error) {
      console.log('Error => ', error);
      alert("Could not retrieve doctors");
    });
  }
// }

/**
 * Determines which doctor is selected by the patient
 * and either:
 * 1) Puts the new schedule in the database and emails
 *    the doctor for confirmation
 * 2) The patient selects a time
 */
function pickDoctor(num) {

  // Adds schedule to database and emails doctor
  if (gotTime == true) {

    // Retrieves doctor info
    var doctorUid = doctorUidArray[num];
    var doctorName = '';
    var doctorEmail = '';
    db.collection('doctors').doc(`${doctorUid}`)
    .get()
    .then(function(doc) {
      doctorName = doc.data().fname + ' ' + doc.data().lname;
      doctorEmail = doc.data().email;
    });

    // Retrieves patient info
    var patientUid = '';
    var patientName = '';
    var patientEmail = '';
    auth.onAuthStateChanged(function(user) {
      patientUid = user.uid;
      db.collection('patients').doc(`${patientUid}`)
      .get()
      .then(function(doc) {
        patientName = doc.data().fname + ' ' + doc.data().lname;
        patientEmail = doc.data().email;
      });
    });

    const year = localStorage.getItem('year');
    const month = localStorage.getItem('month');
    const day = localStorage.getItem('day');
    const time = localStorage.getItem('time');
    const dateConcat = year + month + day + time;

    // Create appointment object
    const appointment = {
      doctor: {
        uid: doctorUid,
        name: doctorName,
        email: doctorEmail,
      },
      patient: {
        uid: patientUid,
        name: patientName,
        email: patientEmail,
      },
      when: {
        year: year,
        month: month,
        day: day,
        time: time
      },
      info: {
        dateconcat: dateConcat,
        notes: '',
        webrtckey: '',
        confirmed: false
      },
      sensors: {
        temperature: 0.0,
        tempdata: 0.0
      }
    };
    console.log('appointment => ', appointment);

    // Put new appointment in doctor's database
    db.collection('doctors').doc(`${doctorUid}`)
    .collection('schedule').doc(`${dateConcat}`)
    .set(appointment);

    // Emails the doctor for confirmation
    
  }
  
  // Sends user to time select page
  else {
    localStorage.setItem('doctorUid', doctorUidArray[num]);
    localStorage.setItem('gotDoctor', true);
    window.location = "timeSelect.html";
  }
}

init();
