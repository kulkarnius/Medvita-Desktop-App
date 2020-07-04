/**
 * Time Picker
 */

// Initialize GCP
const db = firebase.firestore();
const auth = firebase.auth();

document.getElementById("pick-time").addEventListener("click", pickTime);
const gotDoctor = localStorage.getItem('gotDoctor');
console.log('Got Doctor => ', gotDoctor);

var availability = new Array();
var appointments = new Array();
var doctor = '';
var patient = '';
var doctorUid = '';
var patientUid = '';
var doctorEmail = '';
var patientEmail = '';

function init() {
  // Gets patient info
  auth.onAuthStateChanged(function(user) {
    patientUid = user.uid;
    db.collections('patients').doc(`${patientUid}`)
    .get()
    .then(function(doc) {
      patient = doc.data().fname + ' ' + doc.data().lname;
      patientEmail = doc.data().email;
      availability = doc.data().availability;
    });
  });

  // Gets doctor info
  if (gotDoctor) {
    // Overlay doctor availability on the calendar
    const doctorUid = localStorage.getItem('doctorUid');
    db = firebase.firestore();
    db.collections('doctors').doc(`${doctorUid}`)
    .get()
    .then(function(doc) {

      // Colors in each box that the doctor is available during
      doctor = doc.data().fname + ' ' + doc.data().lname;
      doctorEmail = doc.data().email;
      availability = doc.data().availability;
      availability.forEach(function(time) {
        // Make the box for that specific time colored

      });

    });

    // Create back button
  }

  console.log("Doctor availability => ", availability);
  console.log("Patient appointments => ", appointments);
  console.log("Doctor", doctor, " UID => ", doctorUid, ", Email => ", doctorEmail);
  console.log("Patient", patient, " UID => ", patientUid, ", Email => ", patientEmail);
}

function pickTime(year, month, day, time) {
  const dateConcat = year + month + day + time;
  console.log("Date Concatenation => ", dateConcat);

  // Checks time against patient's schedule
  if (appointments.includes(dateConcat)) {
    alert("You already have an appointment set for this time");
    return;
  }

  // The patient has already chosen a doctor
  if (gotDoctor) {

    // Creates schedule and sends email confirmation to doctor
    if(availability.includes(dateConcat)) {

      let data = {
        patient: patient,
        doctor: doctor,
        doctoremail: doctorEmail,
        patientemail: patientEmail,
        month: month,
        day: day,
        year: year,
        time: time,
        dateConcat: DateConcat,
        patientuid: patientUid,
        doctoruid: doctorUid,
        notes: '',
        webrtckey: '',
        temperature: 29,
        tempdata: 98,
        confirmed: false
      };
      console.log("Schedule data => ", data);

      // Put appointment in doctor's database
      db.collections('doctors').doc(`${doctorUid}`).collections('schedule').doc(`${dateConcat}`)
      .set(data);

      // Put appointment in patient's database
      db.collections('patients').doc(`${patientUid}`)
      .set(
        { availability: [{ dateconcat: dateConcat, doctoruid: doctorUid }] },
        { merge: true }
      )

    // Doctor is booked at this time
    } else {
      alert("Please choose a time that the doctor is available");
      return;
    }

  // The patient still needs to choose a doctor
  } else {
    localStorage.setItem('gotTime', true);
    localStorage.setItem('dateConcat', dateConcat);
    window.location = "doctorPicker.html";
  }
}

init();
