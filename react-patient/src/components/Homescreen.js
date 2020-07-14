import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class Homescreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: firebase.auth(),
      db: firebase.firestore(),
      patientUid: '',
      doctorUidArray: []
    }
    this.auth.onAuthStateChanged((user) => {
      this.setState({patientUid: user.uid});
    });
  }

  getSchedule = () => {
    this.db.collection('doctors').doc(`${this.patientUid}`).collection('schedule')
    .orderBy('dateconcat').limit(5).get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {

      });
    });




    console.log('Retrieving schedule');
        $('.AppShow').html("");
        count = 0;
    
        // Detects Firebase Auth user
        auth.onAuthStateChanged(function (user) {
            if (user) {
                patientUid = user.uid;
                console.log('Patient uid: ', patientUid);
                // Get the schedule for the current user
                db.collection('patients').doc(`${patientUid}`).collection('schedule')
                    .orderBy('dateConcat').limit(5).get()
                    .then(function (querySnapshot) {
                        console.log('Displaying each meeting');
                        console.log(querySnapshot);
    
                        // Goes through the closest meetings
                        querySnapshot.forEach(function (doc) {
                            console.log("Schedule data for meeting ", count, " : ", doc.data());
                            displayApp(doc);
                            doctorUidArray[count] = doc.data().doctoruid;
                            dateArray[count] = doc.data().dateConcat;
                            count++;
                        });
                    })
                    .catch(function (error) {
                        console.log('Error: ', error);
                    });
            } else {
                console.log('No user detected');
            }
        });

  }


  displayApp = (doc) => {
        $('.AppShow').append(doc.data().doctor).
    append("&nbsp;").
    <button class='btn btn-outline-light' onClick='attemptJoinMeeting(" + count + ")'>Begin Appointment</button>").
    {doc.data().month}/{doc.data().day}
    append("&nbsp;@&nbsp;").
    append(doc.data().time).
    append("<br>").
    append("<br>");
  }


  render() {
    return(
      <>
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark">
          {/* style="background: linear-gradient(to left, #12c2e9, #c471ed, #f64f59); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */}
          {/* <a class="navbar-brand" href="#">Medvita - Patient</a> */}
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item active">
                <a class="nav-link" href="homescreen.html">Book Appointment (outdated)</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="videoCall.html">Doctor Consultation<span class="sr-only">(current)</span></a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="scheduler/appointment.html">Book Appointment<span class="sr-only">(current)</span></a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              {/* <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search"> --> */}
              {/* <!-- <button class="btn btn-outline-primary my-2 my-sm-0" type="button">Logout</button> --> */}
              <a class="btn btn-outline-light" href="login.html" role="button">Logout</a>
            </form>
          </div>
        </nav>
      </div>
      <div id="appointment">
        <div class="container">
          <div class="row">
            {/* <div class="col-md-6">
              <h1 class="Display">Create an Appointment</h1>
              <form class="needs-validation" novalidate>
                <div class="form-row">
                  <div class="col-md-6 mb-3">
                    <label for="validationCustom01">First name</label>
                    <input type="text" class="form-control" id="FName" value="" required/>
                    <div class="valid-feedback">
                      Looks good!
                    </div>
                  </div>
                  <div class="col-md-6 mb-3">
                    <label for="validationCustom02">Last name</label>
                    <input type="text" class="form-control" id="LName" value="" required/>
                    <div class="valid-feedback">
                      Looks good!
                    </div>
                  </div>
                </div>
                <div id="birthday">
                  <h5>Please select an appointment time:</h5>
                  <div class="form-row">
                    <div class="col-md-3 mb-3">
                      <label for="validationCustom04">Month</label>
                      <select class="custom-select" id="Month" required>
                        <option selected disabled value="">Choose...</option>
                        <option>01</option><option>02</option><option>03</option>
                        <option>04</option><option>05</option><option>06</option>
                        <option>07</option><option>08</option><option>09</option>
                        <option>10</option><option>11</option><option>12</option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid month.
                      </div>
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="validationCustom04">Day</label>
                      <select class="custom-select" id="Day" required>
                        <option selected disabled value="">Choose...</option>
                        <option>01</option><option>02</option><option>03</option>
                        <option>04</option><option>05</option><option>06</option>
                        <option>07</option><option>08</option><option>09</option>
                        <option>10</option><option>11</option><option>12</option>
                        <option>13</option><option>14</option><option>15</option>
                        <option>16</option><option>17</option><option>18</option>
                        <option>19</option><option>20</option><option>21</option>
                        <option>22</option><option>23</option><option>24</option>
                        <option>25</option><option>26</option><option>27</option>
                        <option>28</option><option>29</option><option>30</option>
                        <option>31</option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid day.
                      </div>
                    </div>
                    <div class="col-md-3 mb-3">
                      <label for="validationCustom04">Year</label>
                      <select class="custom-select" id="Year" required>
                        <option selected disabled value="">Choose...</option>
                        <option>2020</option><option>2021</option><option>2022</option>
                        <option>2023</option><option>2024</option><option>2025</option>
                        <option>2026</option><option>2027</option><option>2028</option>
                        <option>2029</option><option>2030</option>
                      </select>
                      <div class="invalid-feedback">
                        Please select a valid year.
                      </div>
                    </div>
                    <div class="col-md-3 mb-3">
                      <div class="md-form md-outline">
                        <label for="default-picker">Time</label>
                        <input type="time" id="Time" class="form-control" placeholder="Select time"/>
                        <div class="valid-feedback">
                          You have created an Appointment!
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="form-row">
                  <div class="col-md-12 mb-3">
                    <label for="validationCustom03">Email Address</label>
                    <input type="email" class="form-control" id="Email" required/>
                    <div class="invalid-feedback">
                      Please provide a valid email address.
                    </div>
                  </div>
                </div>
                <div class="form-group">
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                    <label class="form-check-label" for="invalidCheck">
                      <a href="terms.html">Agree to terms and conditions</a> 
                    </label>
                    <div class="invalid-feedback">
                      You must agree before submitting.
                    </div>
                  </div>
                </div>
                <button class="btn btn-primary" type="button" id="button" onclick="addApp()">
                  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
                  Create Appointment
                </button>
              </form>
              <div class="alert alert-success alert-dismissible hidden fade" id="appAlert" role="alert">
                <strong>Your appointment has been created</strong>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <script>
                // Example starter JavaScript for disabling form submissions if there are invalid fields
                (function () {
                  'use strict';
                  window.addEventListener('load', function () {
                    // Fetch all the forms we want to apply custom Bootstrap validation styles to
                    var forms = document.getElementsByClassName('needs-validation');
                    // Loop over them and prevent submission
                    var validation = Array.prototype.filter.call(forms, function (form) {
                      form.addEventListener('submit', function (event) {
                        if (form.checkValidity() === false) {
                          event.preventDefault();
                          event.stopPropagation();
                        }
                        form.classList.add('was-validated');
                      }, false);
                    });
                  }, false);
                })();
              </script>
              <script src="https://code.jquery.com/jquery-3.5.1.js"
                integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc="
                crossorigin="anonymous"/>
              <script type="text/javascript">
                $(document).ready(function () {
                  $("#button").click(function () {
                    $('#appAlert').addClass('show');
                  });
                });
              </script>
            </div> */}
            <div class="col-md-6">
              <div id="nopadding">
                <div class="AppBox">
                  <h1 class='Patient'>Upcoming Appointments</h1>
                  <div class="content">
                    <div id="patientBox">
                      <h3 class='Patient'>Your upcoming appointment: </h3>
                      <div class='AppShow'></div>
                    </div>
                  </div>
                  {/* <div style="text-align: center;">
                    <button onClick="window.location.reload();", class="button">Obtain Updated Temperature</button>
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
        integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
        crossorigin="anonymous"/>
      <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
        integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
        crossorigin="anonymous"/>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
        integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
        crossorigin="anonymous"/>
      </>
    );
  }
}

export default Homescreen;





// // Create Firebase objects
// const db = firebase.firestore();
// const auth = firebase.auth();

// // Stores basic user info
// var doctorUidArray = new Array(5);
// var dateArray = new Array(5);
// var patient = '';
// var patientUid = '';
// var count = 0;




// /**
//  * Schedules and appointment
//  * Patient can choose a doctor or a time
//  */
// function scheduleApp() {
//   // Choose doctor or time
//   var doctor = true;
//   if(doctor) {
//     // Choose by doctor
    
//   } else {
//     // Choose by time
    
//   }

//   localStorage.setItem('gotDoctor', false);
//   localStorage.setItem('gotTime', false);
// }














// /**
//  * Add an apointment
//  * User clicks button, verifies that the doctor exists,
//  * then adds that appointment in both the patient's and
//  * the doctor's schedule.
//  * TODO: Add an email confirmation of the appointment
//  */
// function addApp() {
//     // Get data from page
//     var FName = document.getElementById('FName').value;
//     var LName = document.getElementById('LName').value;
//     var doctor = FName + ' ' + LName;
//     var Month = document.getElementById('Month').value;
//     var Day = document.getElementById('Day').value;
//     var Year = document.getElementById('Year').value;
//     var Time = document.getElementById('Time').value;
//     var Email = document.getElementById('Email').value;
//     var DateConcat = Year + Month + Day + Time.replace(':', '');

//     // Checks that the user is valid and grabs their UID
//     var doctorUid = '';
//     var doctorRef = db.collection("doctors");
//     doctorRef.where("email", "==", Email)
//         .get()
//         .then(function (querySnapshot) {
//             querySnapshot.forEach(function (doc) {
//                 // Checks that first name and last name match
//                 let data = doc.data();
//                 if (data.fname == FName && data.lname == LName) {
//                     doctorUid = data.uid;
//                     console.log(doctorUid);
//                 } else {
//                     alert('No matching doctor found');
//                     console.log('Names do not match');
//                 }
//                 console.log(doc.id, " => ", data);
//             });

//             // Sends data to database
//             auth.onAuthStateChanged(function (user) {
//                 console.log('user: ', user, ' doctor id: ', doctorUid);
//                 if (user && doctorUid != '') {
//                     // Put meeting in doctor database
//                     const patientUid = user.uid;
//                     let patientRef = db.collection('patients').doc(`${patientUid}`);
//                     let getPatient = patientRef.get()
//                         .then(function (doc) {
//                             patient = doc.data().fname + ' ' + doc.data().lname;
//                             console.log(doc.id, '=>', doc.data());


//                             console.log('Patient name: ', patient);

//                             let data = {
//                                 patient: patient,
//                                 doctor: doctor,
//                                 month: Month,
//                                 day: Day,
//                                 year: Year,
//                                 time: Time,
//                                 //email: Email,
//                                 dateConcat: DateConcat,
//                                 patientuid: patientUid,
//                                 doctoruid: doctorUid,
//                                 notes: '',
//                                 webrtckey: '',
//                                 temperature: 29,
//                                 tempdata: 98,
//                                 confirmed: false
//                             };
//                             console.log(data);

//                             let docSchedRef = db.collection('doctors').doc(`${doctorUid}`)
//                                 .collection('schedule').doc(`${DateConcat}`);
//                             const setDocSched = docSchedRef.set(data)
//                                 .then(function () {
//                                     console.log("Document written with ID: ", DateConcat);
//                                 })
//                                 .catch(function (error) {
//                                     console.error("Error adding document: ", error);
//                                 });

//                             // Put meeting in patient database
//                             let patSchedRef = db.collection('patients').doc(`${patientUid}`)
//                                 .collection('schedule').doc(`${DateConcat}`);
//                             const setPatSched = patSchedRef.set(data)
//                                 .then(function () {
//                                     console.log("Document written with ID: ", DateConcat);
//                                 })
//                                 .catch(function (error) {
//                                     console.error("Error adding document: ", error);
//                                 });
//                         });
//                 } else {
//                     console.log('No user found');
//                 }
//             })
//         })
//         .catch(function (error) {
//             alert('No matching doctor found');
//             console.log("Error getting documents: ", error);
//         });
// }

// /**
//  * Join the meeting
//  * When the user clicks on one of the buttons
//  * in the schedule, they will attempt to join
//  * a video meeting with the doctor. If the doctor
//  * has not initiated a meeting, then they will
//  * be placed in a waiting room until the doctor
//  * starts the meeting.
//  */
// function attemptJoinMeeting(num) {
//     console.log('Joining meeting on ', dateArray[num]);
//     db.collection('patients').doc(`${patientUid}`)
//         .collection('schedule').doc(`${dateArray[num]}`)  // Patient's meeting data
//         .get()
//         .then(function (doc) {
//             console.log("Patient's user data: ", doc.data());    // Save meeting date and doc uid
//             localStorage.setItem("dateConcat", dateArray[num]);
//             localStorage.setItem("doctorUid", doc.data().doctoruid);
//             if (doc.data().webrtckey != '') {
//                 console.log('WebRTC key found');          // Key has been found
//                 window.location = "videoCall.html";
//             } else {
//                 console.log('Going to waiting-room');     // Key has not been updated
//                 window.location = "waitingRoom.html";
//             }
//         });
// }

// /**
//  * Displays each appointment on the screen
//  * Takes in a document in the 'schedule' collection
//  * of the patient and outputs its data to the screen.
//  */
// function displayApp(doc) {
//     $('.AppShow').append(doc.data().doctor).
//     append("&nbsp;").
//     append("<button class='btn btn-outline-light' onClick='attemptJoinMeeting(" + count + ")'>Begin Appointment</button>").
//     append('&nbsp;').
//     append(doc.data().month).
//     append("/").
//     append(doc.data().day).
//     append("&nbsp;@&nbsp;").
//     append(doc.data().time).
//     append("<br>").
//     append("<br>");
// }

// /**
//  * Get's an up-to-date schedule from the database
//  */
// function getSchedule() {
//     console.log('Retrieving schedule');
//     $('.AppShow').html("");
//     count = 0;

//     // Detects Firebase Auth user
//     auth.onAuthStateChanged(function (user) {
//         if (user) {
//             patientUid = user.uid;
//             console.log('Patient uid: ', patientUid);
//             // Get the schedule for the current user
//             db.collection('patients').doc(`${patientUid}`).collection('schedule')
//                 .orderBy('dateConcat').limit(5).get()
//                 .then(function (querySnapshot) {
//                     console.log('Displaying each meeting');
//                     console.log(querySnapshot);

//                     // Goes through the closest meetings
//                     querySnapshot.forEach(function (doc) {
//                         console.log("Schedule data for meeting ", count, " : ", doc.data());
//                         displayApp(doc);
//                         doctorUidArray[count] = doc.data().doctoruid;
//                         dateArray[count] = doc.data().dateConcat;
//                         count++;
//                     });
//                 })
//                 .catch(function (error) {
//                     console.log('Error: ', error);
//                 });
//         } else {
//             console.log('No user detected');
//         }
//     });
// }

// /**
//   * Loads the schedule to the screen, and sets a listener
//   * that allows for real-time of the schedule
//   */
// getSchedule();
// auth.onAuthStateChanged(function (user) {
//     if (user) {
//         db.collection('patients').doc(`${user.uid}`).collection('schedule')
//             .onSnapshot(function (querySnapshot) {
//                 getSchedule();
//             });
//     }
// });





// <!DOCTYPE html>
// <html>

// <head>
//   <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js"></script>
//   <link rel="icon" href="MedVitaLogo.jpg">

//   <title>Welcome to Medvita</title>
//   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
//     integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
//   <link rel="stylesheet" href="homescreen.css">

//   <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-auth.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-firestore.js"></script>
//   <script src="init-firebase-auth.js"></script>


// </head>

// <body>

//   <div>
//     <nav class="navbar navbar-expand-lg navbar-dark "
//       style="background: linear-gradient(to left, #12c2e9, #c471ed, #f64f59); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */">
//       <a class="navbar-brand" href="#">Medvita - Patient</a>
//       <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
//         aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
//         <span class="navbar-toggler-icon"></span>
//       </button>

//       <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
//         <ul class="navbar-nav mr-auto mt-2 mt-lg-0">

//           <li class="nav-item active">
//             <a class="nav-link" href="homescreen.html">Book Appointment (outdated)</a>
//           </li>


//           <li class="nav-item">
//             <a class="nav-link" href="videoCall.html">Doctor Consultation<span class="sr-only">(current)</span></a>
//           </li>

//           <li class="nav-item">
//             <a class="nav-link" href="scheduler/appointment.html">Book Appointment<span class="sr-only">(current)</span></a>
//           </li>
//         </ul>
//         <form class="form-inline my-2 my-lg-0">
//           <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search"> -->
//           <!-- <button class="btn btn-outline-primary my-2 my-sm-0" type="button">Logout</button> -->
//           <a class="btn btn-outline-light" href="login.html" role="button">Logout</a>
//         </form>
//       </div>
//     </nav>

//   </div>

//   <div id="appointment">
//     <div class="container">

//       <div class="row">

//         <div class="col-md-6">

//           <h1 class="Display">Create an Appointment</h1>

//           <form class="needs-validation" novalidate>
//             <div class="form-row">
//               <div class="col-md-6 mb-3">
//                 <label for="validationCustom01">First name</label>
//                 <input type="text" class="form-control" id="FName" value="" required>
//                 <div class="valid-feedback">
//                   Looks good!
//                 </div>
//               </div>
//               <div class="col-md-6 mb-3">
//                 <label for="validationCustom02">Last name</label>
//                 <input type="text" class="form-control" id="LName" value="" required>
//                 <div class="valid-feedback">
//                   Looks good!
//                 </div>
//               </div>
//             </div>

//             <div id=birthday>
//               <h5>Please select an appointment time:</h1>
//                 <div class="form-row">


//                   <div class="col-md-3 mb-3">
//                     <label for="validationCustom04">Month</label>
//                     <select class="custom-select" id="Month" required>
//                       <option selected disabled value="">Choose...</option>
//                       <option>01</option>
//                       <option>02</option>
//                       <option>03</option>
//                       <option>04</option>
//                       <option>05</option>
//                       <option>06</option>
//                       <option>07</option>
//                       <option>08</option>
//                       <option>09</option>
//                       <option>10</option>
//                       <option>11</option>
//                       <option>12</option>
//                     </select>
//                     <div class="invalid-feedback">
//                       Please select a valid month.
//                     </div>
//                   </div>
//                   <div class="col-md-3 mb-3">
//                     <label for="validationCustom04">Day</label>
//                     <select class="custom-select" id="Day" required>
//                       <option selected disabled value="">Choose...</option>
//                       <option>01</option>
//                       <option>02</option>
//                       <option>03</option>
//                       <option>04</option>
//                       <option>05</option>
//                       <option>06</option>
//                       <option>07</option>
//                       <option>08</option>
//                       <option>09</option>
//                       <option>10</option>
//                       <option>11</option>
//                       <option>12</option>
//                       <option>13</option>
//                       <option>14</option>
//                       <option>15</option>
//                       <option>16</option>
//                       <option>17</option>
//                       <option>18</option>
//                       <option>19</option>
//                       <option>20</option>
//                       <option>21</option>
//                       <option>22</option>
//                       <option>23</option>
//                       <option>24</option>
//                       <option>25</option>
//                       <option>26</option>
//                       <option>27</option>
//                       <option>28</option>
//                       <option>29</option>
//                       <option>30</option>
//                       <option>31</option>
//                     </select>
//                     <div class="invalid-feedback">
//                       Please select a valid day.
//                     </div>
//                   </div>
//                   <div class="col-md-3 mb-3">
//                     <label for="validationCustom04">Year</label>
//                     <select class="custom-select" id="Year" required>
//                       <option selected disabled value="">Choose...</option>
//                       <option>2020</option>
//                       <option>2021</option>
//                       <option>2022</option>
//                       <option>2023</option>
//                       <option>2024</option>
//                       <option>2025</option>
//                       <option>2026</option>
//                       <option>2027</option>
//                       <option>2028</option>
//                       <option>2029</option>
//                       <option>2030</option>
//                     </select>
//                     <div class="invalid-feedback">
//                       Please select a valid year.
//                     </div>
//                   </div>
//                   <div class="col-md-3 mb-3">
//                     <div class="md-form md-outline">

//                       <label for="default-picker">Time</label>
//                       <input type="time" id="Time" class="form-control" placeholder="Select time">
//                       <div class="valid-feedback">
//                         You have created an Appointment!
//                       </div>
//                     </div>
//                   </div>


//                 </div>
//             </div>

//             <div class="form-row">

//               <div class="col-md-12 mb-3">
//                 <label for="validationCustom03">Email Address</label>
//                 <input type="email" class="form-control" id="Email" required>
//                 <div class="invalid-feedback">
//                   Please provide a valid email address.
//                 </div>
//               </div>

//             </div>
//             <!-- <div class="form-group">
//               <div class="form-check">
//                 <input class="form-check-input" type="checkbox" value="" id="invalidCheck" required>
//                 <label class="form-check-label" for="invalidCheck">
//                   <a href="terms.html">Agree to terms and conditions</a> 
//                 </label>
//                 <div class="invalid-feedback">
//                   You must agree before submitting.
//                 </div>
//               </div>
              
//             </div> -->
//             <button class="btn btn-primary" type="button" id="button" onclick="addApp()"><span
//                 class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span> Create
//               Appointment</button>
//           </form>


//           <div class="alert alert-success alert-dismissible hidden fade" id="appAlert" role="alert">
//             <strong>Your appointment has been created</strong>
//             <button type="button" class="close" data-dismiss="alert" aria-label="Close">
//               <span aria-hidden="true">&times;</span>
//             </button>

//           </div>

//           <script>
//             // Example starter JavaScript for disabling form submissions if there are invalid fields
//             (function () {
//               'use strict';
//               window.addEventListener('load', function () {
//                 // Fetch all the forms we want to apply custom Bootstrap validation styles to
//                 var forms = document.getElementsByClassName('needs-validation');
//                 // Loop over them and prevent submission
//                 var validation = Array.prototype.filter.call(forms, function (form) {
//                   form.addEventListener('submit', function (event) {
//                     if (form.checkValidity() === false) {
//                       event.preventDefault();
//                       event.stopPropagation();
//                     }
//                     form.classList.add('was-validated');
//                   }, false);
//                 });
//               }, false);
//             })();
//           </script>

//           <script src="https://code.jquery.com/jquery-3.5.1.js"
//             integrity="sha256-QWo7LDvxbWT2tbbQ97B53yJnYU3WhH/C8ycbRAkjPDc=" crossorigin="anonymous">
//             </script>
//           <script type="text/javascript">
//             $(document).ready(function () {

//               $("#button").click(function () {
//                 $('#appAlert').addClass('show');
//               });

//             });
//           </script>

//         </div>

//         <div class="col-md-6">
//           <div id="nopadding">

//             <div class="AppBox">
//               <h1 class='Patient'>Upcoming Appointments</h1>

//               <div class="content">
//                 <div id="patientBox">
//                   <h3 class='Patient'>Your upcoming appointment: </h3>

//                   <div class='AppShow'></div>

//                 </div>

//               </div>

//               <!-- <div style="text-align: center;">
//                     <button onClick="window.location.reload();", class="button">Obtain Updated Temperature</button>
                    
//                 </div> -->


//             </div>

//           </div>

//         </div>

//       </div>

//     </div>



//   </div>

//   </div>

//   <script src="homescreen.js"></script>
//   <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
//     integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
//     crossorigin="anonymous"></script>
//   <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
//     integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
//     crossorigin="anonymous"></script>
//   <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
//     integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
//     crossorigin="anonymous"></script>
// </body>

// </html>

