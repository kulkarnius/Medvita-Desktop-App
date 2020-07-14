// mdc.ripple.MDCRipple.attachTo(document.querySelector('.mdc-button'));

// const configuration = {
//   iceServers: [
//     {
//       urls: [
//         'stun:stun1.l.google.com:19302',
//         'stun:stun2.l.google.com:19302',
//       ],
//     },
//   ],
//   iceCandidatePoolSize: 10,
// };

// let peerConnection = null;
// let localStream = null;
// let remoteStream = null;
// let roomDialog = null;
// let roomId = null;

// /**
//  * Add event listeners to each of the buttons
//  */
// function init() {
//   document.querySelector('#cameraBtn').addEventListener('click', openUserMedia);
//   document.querySelector('#hangupBtn').addEventListener('click', hangUp);
//   document.querySelector('#createBtn').addEventListener('click', createRoom);
//   document.querySelector('#joinBtn').addEventListener('click', attemptJoinRoom);
//   roomDialog = new mdc.dialog.MDCDialog(document.querySelector('#room-dialog'));
// }

// // This will soon be deleted, as patient cannot be a host (causes errors if removed right now)
// async function createRoom() {
//   document.querySelector('#createBtn').disabled = true;
//   document.querySelector('#joinBtn').disabled = true;
//   const db = firebase.firestore();
//   const roomRef = await db.collection('rooms').doc();

//   console.log('Create PeerConnection with configuration: ', configuration);
//   peerConnection = new RTCPeerConnection(configuration);

//   registerPeerConnectionListeners();

//   localStream.getTracks().forEach(track => {
//     peerConnection.addTrack(track, localStream);
//   });

//   // Code for collecting ICE candidates below
//   const callerCandidatesCollection = roomRef.collection('callerCandidates');

//   peerConnection.addEventListener('icecandidate', event => {
//     if (!event.candidate) {
//       console.log('Got final candidate!');
//       return;
//     }
//     console.log('Got candidate: ', event.candidate);
//     callerCandidatesCollection.add(event.candidate.toJSON());
//   });
//   // Code for collecting ICE candidates above

//   // Code for creating a room below
//   const offer = await peerConnection.createOffer();
//   await peerConnection.setLocalDescription(offer);
//   console.log('Created offer:', offer);

//   const roomWithOffer = {
//     'offer': {
//       type: offer.type,
//       sdp: offer.sdp,
//     },
//   };
//   await roomRef.set(roomWithOffer);
//   roomId = roomRef.id;
//   console.log(`New room created with SDP offer. Room ID: ${roomRef.id}`);
//   document.querySelector(
//     '#currentRoom').innerText = `Current room is ${roomRef.id} - You are the caller!`;
//   // Code for creating a room above

//   peerConnection.addEventListener('track', event => {
//     console.log('Got remote track:', event.streams[0]);
//     event.streams[0].getTracks().forEach(track => {
//       console.log('Add a track to the remoteStream:', track);
//       remoteStream.addTrack(track);
//     });
//   });

//   // Listening for remote session description below
//   roomRef.onSnapshot(async snapshot => {
//     const data = snapshot.data();
//     if (!peerConnection.currentRemoteDescription && data && data.answer) {
//       console.log('Got remote description: ', data.answer);
//       const rtcSessionDescription = new RTCSessionDescription(data.answer);
//       await peerConnection.setRemoteDescription(rtcSessionDescription);
//     }
//   });
//   // Listening for remote session description above

//   // Listen for remote ICE candidates below
//   roomRef.collection('calleeCandidates').onSnapshot(snapshot => {
//     snapshot.docChanges().forEach(async change => {
//       if (change.type === 'added') {
//         let data = change.doc.data();
//         console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
//         await peerConnection.addIceCandidate(new RTCIceCandidate(data));
//       }
//     });
//   });
//   // Listen for remote ICE candidates above
// }

// // This will be deleted, since the user will join the room by an id
// function joinRoom() {
//   document.querySelector('#createBtn').disabled = true;
//   document.querySelector('#joinBtn').disabled = true;

//   document.querySelector('#confirmJoinBtn').
//     addEventListener('click', async () => {
//       roomId = document.querySelector('#room-id').value;
//       console.log('Join room: ', roomId);
//       document.querySelector(
//         '#currentRoom').innerText = `Current room is ${roomId} - You are the callee!`;
//       await joinRoomById(roomId);
//     }, { once: true });
//   roomDialog.open();
// }

// /**
//  * Goes into the meeting info and checks for a valid WebRTC key,
//  * patient is redirected to the video call if a key is found
//  * and goes to a waiting room if the doctor has not started
//  * a video call yet
//  */
// function attemptJoinRoom() {
//   firebase.auth().onAuthStateChanged(function (user) {
//     const patientUid = user.uid;
//     const dateConcat = localStorage.getItem('dateConcat');
//     console.log('Patient Uid: ', patientUid);
//     const db = firebase.firestore();
//     db.collection('patients').doc(`${patientUid}`)
//       .collection('schedule').doc(`${dateConcat}`)
//       .get()
//       .then(function (doc) {
//         if (doc.data().webrtckey == '') {
//           alert('Could not join room, please wait for doctor to host and try again');
//           return;
//         }
//         console.log("WebRTC key: ", doc.data().webrtckey);
//         joinRoomById(doc.data().webrtckey);
//       });
//   });
// }

// /**
//  * Takes the WebRTC key and attempts to join a room with it. It is
//  * possible that the room key is expired.
//  */
// async function joinRoomById(roomId) {
//   const db = firebase.firestore();
//   const roomRef = db.collection('rooms').doc(`${roomId}`);
//   const roomSnapshot = await roomRef.get();
//   console.log('Got room:', roomSnapshot.exists);

//   if (roomSnapshot.exists) {
//     console.log('Create PeerConnection with configuration: ', configuration);
//     peerConnection = new RTCPeerConnection(configuration);
//     registerPeerConnectionListeners();
//     localStream.getTracks().forEach(track => {
//       peerConnection.addTrack(track, localStream);
//     });

//     // Code for collecting ICE candidates below
//     const calleeCandidatesCollection = roomRef.collection('calleeCandidates');
//     peerConnection.addEventListener('icecandidate', event => {
//       if (!event.candidate) {
//         console.log('Got final candidate!');
//         return;
//       }
//       console.log('Got candidate: ', event.candidate);
//       calleeCandidatesCollection.add(event.candidate.toJSON());
//     });
//     // Code for collecting ICE candidates above

//     peerConnection.addEventListener('track', event => {
//       console.log('Got remote track:', event.streams[0]);
//       event.streams[0].getTracks().forEach(track => {
//         console.log('Add a track to the remoteStream:', track);
//         remoteStream.addTrack(track);
//       });
//     });

//     // Code for creating SDP answer below
//     const offer = roomSnapshot.data().offer;
//     console.log('Got offer:', offer);
//     await peerConnection.setRemoteDescription(new RTCSessionDescription(offer));
//     const answer = await peerConnection.createAnswer();
//     console.log('Created answer:', answer);
//     await peerConnection.setLocalDescription(answer);

//     const roomWithAnswer = {
//       answer: {
//         type: answer.type,
//         sdp: answer.sdp,
//       },
//     };
//     await roomRef.update(roomWithAnswer);
//     // Code for creating SDP answer above

//     // Listening for remote ICE candidates below
//     roomRef.collection('callerCandidates').onSnapshot(snapshot => {
//       snapshot.docChanges().forEach(async change => {
//         if (change.type === 'added') {
//           let data = change.doc.data();
//           console.log(`Got new remote ICE candidate: ${JSON.stringify(data)}`);
//           await peerConnection.addIceCandidate(new RTCIceCandidate(data));
//         }
//       });
//     });
//     // Listening for remote ICE candidates above
//   }
// }

// /**
//  * Activates the patient's camera and microphone
//  */
// async function openUserMedia(e) {
//   const stream = await navigator.mediaDevices.getUserMedia(
//     { video: true, audio: true });
//   document.querySelector('#localVideo').srcObject = stream;
//   localStream = stream;
//   remoteStream = new MediaStream();
//   document.querySelector('#remoteVideo').srcObject = remoteStream;

//   console.log('Stream:', document.querySelector('#localVideo').srcObject);
//   document.querySelector('#cameraBtn').disabled = true;
//   document.querySelector('#joinBtn').disabled = false;
//   document.querySelector('#createBtn').disabled = false;
//   document.querySelector('#hangupBtn').disabled = false;
// }

// /**
//  * Leaves the call and closes the camera / microphone. Patient
//  * can rejoin call if they click to open media and then
//  * click join call.
//  */
// async function hangUp(e) {
//   const tracks = document.querySelector('#localVideo').srcObject.getTracks();
//   tracks.forEach(track => {
//     track.stop();
//   });

//   if (remoteStream) {
//     remoteStream.getTracks().forEach(track => track.stop());
//   }

//   if (peerConnection) {
//     peerConnection.close();
//   }

//   document.querySelector('#localVideo').srcObject = null;
//   document.querySelector('#remoteVideo').srcObject = null;
//   document.querySelector('#cameraBtn').disabled = false;
//   document.querySelector('#joinBtn').disabled = true;
//   document.querySelector('#createBtn').disabled = true;
//   document.querySelector('#hangupBtn').disabled = true;
//   document.querySelector('#currentRoom').innerText = '';

//   // Delete room on hangup
//   if (roomId) {
//     const db = firebase.firestore();
//     const roomRef = db.collection('rooms').doc(roomId);
//     const calleeCandidates = await roomRef.collection('calleeCandidates').get();
//     calleeCandidates.forEach(async candidate => {
//       await candidate.ref.delete();
//     });
//     const callerCandidates = await roomRef.collection('callerCandidates').get();
//     callerCandidates.forEach(async candidate => {
//       await candidate.ref.delete();
//     });
//     await roomRef.delete();
//   }

//   document.location.reload(true);
// }

// /**
//  * Registers the peer conection
//  */
// function registerPeerConnectionListeners() {
//   peerConnection.addEventListener('icegatheringstatechange', () => {
//     console.log(
//       `ICE gathering state changed: ${peerConnection.iceGatheringState}`);
//   });

//   peerConnection.addEventListener('connectionstatechange', () => {
//     console.log(`Connection state change: ${peerConnection.connectionState}`);
//   });

//   peerConnection.addEventListener('signalingstatechange', () => {
//     console.log(`Signaling state change: ${peerConnection.signalingState}`);
//   });

//   peerConnection.addEventListener('iceconnectionstatechange ', () => {
//     console.log(
//       `ICE connection state change: ${peerConnection.iceConnectionState}`);
//   });
// }

// init();

// // Code to input sensor data and place into database
// function updateSensorData() {
//   // Get new sensor data here
//   var temperature = 9;
//   var tempdata = 19;

//   const db = firebase.firestore();
//   const dateConcat = localStorage.getItem('dateConcat');
//   console.log('Date concatenation: ', dateConcat);

//   // Store data into patient's meeting info
//   firebase.auth().onAuthStateChanged(function (user) {
//     if (user) {
//       console.log('Patient Uid: ', user.uid);
//       db.collection('patients').doc(`${user.uid}`)
//         .collection('schedule').doc(`${dateConcat}`)
//         .update({
//           temperature: temperature,
//           tempdata: tempdata
//         });
//     }
//   });

//   // Store data into doctor's meeting info
//   const doctorUid = localStorage.getItem('doctorUid');
//   console.log('Doctor Uid', doctorUid);
//   db.collection('doctors').doc(`${doctorUid}`)
//     .collection('schedule').doc(`${dateConcat}`)
//     .update({
//       temperature: temperature,
//       tempdata: tempdata
//     });
// }




// <!DOCTYPE html>
// <html>

// <head>
//     <meta charset="utf-8">
//     <meta name="viewport" content="width=device-width, initial-scale=1">
//     <link rel="icon" href="MedVitaLogo.jpg">

//     <title>Patient Video Call</title>
//     <link href="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.css" rel="stylesheet">
//     <script src="https://unpkg.com/material-components-web@latest/dist/material-components-web.min.js"></script>
//     <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">
//     <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js"></script>
//     <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-auth.js"></script>
//     <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-firestore.js"></script>
//     <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap" rel="stylesheet">
//     <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@500&family=Source+Sans+Pro:wght@600&display=swap"
//         rel="stylesheet">
//     <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
//         integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
//     <script src="init-firebase-auth.js"></script>
//     <link rel="stylesheet" type="text/css" href="videoCall.css">
//     <script src="https://cdn.tiny.cloud/1/71onv8jg7xvdivy8l5icb1stu2vbc1pdt9m6oikgbybsmaib/tinymce/5/tinymce.min.js"
//         referrerpolicy="origin"></script>

//     <script>
//         tinymce.init({
//             selector: '#mytextarea'
//         });
//     </script>


// </head>

// <body>


//     <div>
//         <nav class="navbar navbar-expand-lg navbar-dark "
//             style="background: linear-gradient(to left, #12c2e9, #c471ed, #f64f59); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */">
//             <a class="navbar-brand" href="#">Medvita - Patient</a>
//             <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
//                 aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
//                 <span class="navbar-toggler-icon"></span>
//             </button>

//             <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
//                 <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
//                     <li class="nav-item">
//                         <a class="nav-link" href="homescreen.html">Book Appointment (outdated)<span class="sr-only">(current)</span></a>
//                     </li>
//                     <li class="nav-item active">
//                         <a class="nav-link" href="videoCall.html">Doctor Consultation</a>
//                     </li>
//                     <li class="nav-item">
//                         <a class="nav-link" href="appointment.html">Book Appointment<span class="sr-only">(current)</span></a>
//                 </ul>
//                 <form class="form-inline my-2 my-lg-0">
//                     <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search"> -->
//                     <!-- <button class="btn btn-outline-primary my-2 my-sm-0" type="button">Logout</button> -->
//                     <a class="btn btn-outline-light" href="login.html" role="button">Logout</a>
//                 </form>
//             </div>
//         </nav>

//     </div>



//     <div class="row" id="vid">
//         <div class="col-md-12">


//             <!-- id ="mainMessage (DOWN BELOW)" -->

//             <h1 class="display-4">MedVita Walk-In Clinic</h1>


//             <div id="buttons">
//                 <button class="mdc-button mdc-button--raised" id="cameraBtn">
//                     <i class="material-icons mdc-button__icon" aria-hidden="true">perm_camera_mic</i>
//                     <span class="mdc-button__label">Activate camera & microphone</span>
//                 </button>
//                 <button class="mdc-button mdc-button--raised" disabled id="createBtn">
//                     <i class="material-icons mdc-button__icon" aria-hidden="true">group_add</i>
//                     <span class="mdc-button__label">Begin Session</span>
//                 </button>
//                 <button class="mdc-button mdc-button--raised" disabled id="joinBtn">
//                     <i class="material-icons mdc-button__icon" aria-hidden="true">group</i>
//                     <span class="mdc-button__label">Join room</span>
//                 </button>
//                 <button class="mdc-button mdc-button--raised" disabled id="hangupBtn">
//                     <i class="material-icons mdc-button__icon" aria-hidden="true">close</i>
//                     <span class="mdc-button__label">End Session</span>
//                 </button>
//             </div>
//             <div>
//                 <span id="currentRoom"></span>
//             </div>
//             <!-- <div class = "container"> -->

//             <div id="videos">
//                 <video id="localVideo" muted autoplay playsinline></video>
//                 <video id="remoteVideo" autoplay playsinline></video>
//             </div>

//             <!-- </div> -->

//             <div class="mdc-dialog" id="room-dialog" role="alertdialog" aria-modal="true"
//                 aria-labelledby="my-dialog-title" aria-describedby="my-dialog-content">
//                 <div class="mdc-dialog__container">
//                     <div class="mdc-dialog__surface">
//                         <h2 class="mdc-dialog__title" id="my-dialog-title">Join room</h2>
//                         <div class="mdc-dialog__content" id="my-dialog-content">
//                             Enter ID for room to join:
//                             <div class="mdc-text-field">
//                                 <input type="text" id="room-id" class="mdc-text-field__input">
//                                 <label class="mdc-floating-label" for="my-text-field">Room ID</label>
//                                 <div class="mdc-line-ripple"></div>
//                             </div>
//                         </div>
//                         <footer class="mdc-dialog__actions">
//                             <button type="button" class="mdc-button mdc-dialog__button" data-mdc-dialog-action="no">
//                                 <span class="mdc-button__label">Cancel</span>
//                             </button>
//                             <button id="confirmJoinBtn" type="button" class="mdc-button mdc-dialog__button"
//                                 data-mdc-dialog-action="yes">
//                                 <span class="mdc-button__label">Join</span>
//                             </button>
//                         </footer>
//                     </div>
//                 </div>
//                 <div class="mdc-dialog__scrim"></div>
//             </div>

//         </div>


//     </div>

//     <script>
//         //firebase.initializeApp(firebaseConfig);
//         const db = firebase.firestore();

//     </script>

//     <script src="videoCall.js"></script>
//     <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"
//         integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj"
//         crossorigin="anonymous"></script>
//     <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
//         integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
//         crossorigin="anonymous"></script>
//     <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
//         integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
//         crossorigin="anonymous"></script>


// </body>

// </html>

