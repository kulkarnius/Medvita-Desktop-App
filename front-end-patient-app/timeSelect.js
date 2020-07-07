/**
 * Time Picker
 */
const NUM_TIMES = 672;
// Initialize GCP
const db = firebase.firestore();
const auth = firebase.auth();

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

var firstTime = ''; // Is the Sunday at the beginning of that week

function init() {
  // Sets up the calendar
  const today = new Date();
  var thisYear = today.getFullYear();
  var thisMonth = today.getMonth()+1;
  var thisDay = today.getDate();
  const dayOfWeek = today.getDay();
  
  // Finds the date of this week's Sunday
  thisDay -= dayOfWeek;
  if (thisDay <= 0) {
    thisMonth--;

    // Previous year
    if (thisMonth <= 0) {
      thisMonth = 12
      thisYear--;
    }

    // Finds the date
    else if (thisMonth == 2 && thisYear%4 != 0)
      thisDay += 28;
    if (thisMonth == 2) // Leap year
      thisDay += 29;
    else if (thisMonth <= 7 && thisMonth%2 == 0
          || thisMonth >= 8 && thisMonth%2 == 1)
      thisDay += 30
    else
      thisDay += 31
  }

  const yearStr = thisYear.toString();
  var monthStr = thisMonth.toString();
  if (monthStr.length == 1){
    monthStr = '0' + monthStr;
  }
  var dayStr = thisDay.toString();
  if (dayStr.length == 1) {
    dayStr = '0' + dayStr;
  }

  firstTime = yearStr + monthStr + dayStr + '0000';
  loadCalendar();
  drawCalendar();

  // Gets patient info
  auth.onAuthStateChanged(function(user) {
    patientUid = user.uid;
    db.collection('patients').doc(`${patientUid}`)
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
    db.collection('doctors').doc(`${doctorUid}`)
    .get()
    .then(function(doc) {

      // Colors in each box that the doctor is available during
      doctor = doc.data().fname + ' ' + doc.data().lname;
      doctorEmail = doc.data().email;
      availability = doc.data().availability;
    });
  }

  console.log("Doctor availability => ", availability);
  console.log("Patient appointments => ", appointments);
  console.log("Doctor", doctor, " UID => ", doctorUid, ", Email => ", doctorEmail);
  console.log("Patient", patient, " UID => ", patientUid, ", Email => ", patientEmail);
}



var calendarTimeArray = new Array(NUM_TIMES);

function loadCalendar() {

  function nextTime(time) {
    var year = time.substring(0, 4);
    var month = time.substring(4, 6);
    var day = time.substring(6, 8);
    var hour = time.substring(8, 10);
    var minute = time.substring(10, 12);

    minute = (parseInt(minute)+15).toString
    // End of hour
    if (parseInt(minute) >= 60) {
      minute = '00';
      hour = (parseInt(hour)+1).toString();
      // End of day
      if (parseInt(hour) >= 24) {
        hour = '00';
        day = (parseInt(day)+1).toString();
        // End of month
        if (parseInt(day) > 31
        || (parseInt(day) > 30 && parseInt(month) <= 6 && parseInt(month)%2 == 0)
        || (parseInt(day) > 30 && parseInt(month) >= 9 && parseInt(month)%2 == 1)
        || (parseInt(day) > 29 && month == '2' && parseInt(year)%4 == 0)
        || (parseInt(day) > 28 && month == '2' && parseInt(year)%4 != 0)) {
          day = '00';
          month = (parseInt(month)+1).toString();
          // End of year
          if (parseInt(month) > 12) {
            month = '00';
            year = (parseInt(year)+1).toString();
          }
        }
      }





    }

    return year + month + day + hour + minute;
  }

  var currentTime = firstTime; 
  var i;
  for(i=0; i<NUM_TIMES; i++){
    calendarTimeArray[i] = currentTime;
    currentTime = nextTime(currentTime);
  }
}

function drawCalendar() {
  
  // Date header
  $('.CalShow')
  .append('<div class="grid-container">')
  .append('<div class="grid-item">')
  .append('</div>');
  var i;
  for (i=0; i<7; i++) {
    const dayConcat = calendarTimeArray[i*96];
    const dateStr = dayConcat.substring(4, 6) + '/' + dayConcat.substring(6, 8);
    $('.CalShow')
    .append('<div class="grid-item">')
    .append(dateStr)
    .append('</div>');
  }

  // Go through days and create buttons for each timeslot
  var c;
  for (c=0; c<NUM_TIMES/7; c++) {
    // Create label
    var label = '';
    if (c%2 == 0) {
      const dateConcat = calendarTimeArray[c];
      label = dateConcat.substring(8, 10) + ':' + dateConcat.substring(10, 12);
    }
    $('.CalShow')
    .append('<div class="grid-item">')
    .append(label)
    .append('</div>');

    // Fill in rows
    var r;
    for (r=0; r<7; r++) {
      $('.CalShow')
      .append('<button onclick="pickTime(')
      .append((r*96 + c).toString())
      .append(')"></button>');
    }
  }

  $('.CalShow').append('</div>');
}


function previousWeek() {

}

function nextWeek() {

}


function pickTime(btnNum) {
  // Get time info
  const dateConcat = calendarTimeArray(btnNum);
  const year = dateConcat.substring(0, 4);
  const month = dateConcat.substring(4, 6);
  const day = dateConcat.substring(6, 8);
  const hour = dateConcat.substring(8, 10);
  const minute = dateConcat.substring(10, 12);

  // Checks time against patient's schedule
  if (appointments.includes(dateConcat)) {
    alert("You already have an appointment set for this time");
    return;
  }

  // The patient has already chosen a doctor
  if (gotDoctor) {

    // Creates schedule and sends email confirmation to doctor
    if(availability.includes(dateConcat)) {

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

      const dateConcat = year + month + day + hour + minute;

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
          hour: hour,
          minute: minute
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

      // Put new appointment in patient's database
      db.collections('patients').doc(`${patientUid}`)
      .set(
        { availability: [{ dateconcat: dateConcat, doctoruid: doctorUid }] },
        { merge: true }
      )

      // Emails the doctor for confirmation


    // Doctor is booked at this time
    } else {
      alert("Please choose a time that the doctor is available");
      return;
    }

  // The patient still needs to choose a doctor
  } else {
    localStorage.setItem('gotTime', true);
    localStorage.setItem('year', year);
    localStorage.setItem('month', month);
    localStorage.setItem('day', day);
    localStorage.setItem('hour', hour);
    localStorage.setItem('minute', minute);
    localStorage.setItem('dateConcat', dateConcat);
    window.location = "./doctorPicker.html";
  }
}

init();
