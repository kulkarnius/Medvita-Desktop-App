import React from 'react';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import '../styles/waitingRoom.css';
import '';

class WaitingRoom extends React.Component {
  constructor(props) {
    super(props);
    firebase.auth().onAuthStateChanged((user) => {
      const dateConcat = localStorage.getItem('dateConcat');
      firebase.firestore()
      .collection('patients').doc(`${user.uid}`)
      .collection('schedule').doc(`${dateConcat}`)
      .onSnapshot((doc) => {
        if (doc.data().webrtckey !== '') {
          alert('Sending patient to video call');
          //window.location = 'videoCall.html';
        }
      });
    });
  }
  render() {
    return(
      <>
      <h1 id="Display">Please wait, the Doctor will let you in shortly</h1>
      <h3>
        <div class="spinner-border text-infor" role="status"/>
        <span class="sr-only">Loading...</span>
      </h3>
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

export default WaitingRoom;
