import React from "react";
//import Homescreen from "./components/Homescreen";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "../styles/login.css";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    }
  }

  login = () => {
    const auth = firebase.auth();
    auth.signInWithEmailAndPassword(this.state.email, this.state.password)
    .then((result) => {
      firebase.firestore()
      .collection('patients').doc(`${result.user.uid}`)
      .get()
      .then((doc) => {
        // Redirects to homescreen
        alert('Logged in ', doc.data().fname, ' ', doc.data().lname);
        //window.location = "homescreen.html";
      })
      .catch(function (error) {
        alert('Please use a patient account');
        auth.signOut();
        //window.UserPassError();
      });
    }).catch((error) => {
      alert('Incorrect username or password');
      //window.UserPassError();
    });
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render() {
    return(
      <>
      <div className="navBar">
        <ul className="nav justify-content-end">
          <li className="nav-item">
            <a className="nav-link" href="signup.html">Create Account</a>
          </li>
        </ul>
      </div>
      <div id="main"> 
        <h1 className="display-4 text-center m-5">Welcome to Medvita - Patient</h1>
        <div className="container">
          <form>
            <div className="form-group">
              <label htmlFor="exampleInputEmail1">
                Email Address
              </label>
              <input type="text" className="form-control" aria-describedby="emailHelp"
                name="email" onChange={this.myChangeHandler}/>
              <small id="emailHelp" className="form-text">Please enter your email address</small>
            </div>
            <div className="form-group">
              <label htmlFor="exampleInputPassword1">
                Password
              </label>
              <input type="password" className="form-control"
                name="password" onChange={this.myChangeHandler}/>
            </div>
            <button type="button" className="btn btn-primary" onClick={this.login}>
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
              Login
            </button>
            <button id="exitApp" type="button" className="cancelbtn">Exit Application</button>
            {/* <!--<span className="psw"><a href="forgotpsw.html">Forgot Password?</a></span>--> */}
          </form>
        </div>
      </div>
      <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous"/>
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

export default Login;

// function login() {
//   const db = firebase.firestore();
//   const auth = firebase.auth();

//   // Gets user info
//   var email = document.getElementById('username').value;
//   var password = document.getElementById('password').value;
//   console.log(email);
//   console.log(password);

//   // Signs in the patient
//   auth.signInWithEmailAndPassword(email, password)
//     .then(function (result) {
//       // Ensures that email is for doctor and not patient
//       console.log(result.user.uid);
//       db.collection('patients').doc(`${result.user.uid}`)
//         .get()
//         .then(function (doc) {
//           // Redirects to homescreen
//           console.log('Logged in ', doc.data().fname, ' ', doc.data().lname);
//           window.location = "homescreen.html";
//         })
//         .catch(function (error) {
//           console.log('User is not a patient');
//           auth.signOut();
//           window.UserPassError();
//         });
//     }).catch(function (error) {
//       // Error handling
//       console.log('Cannot sign in through Firebase Auth');
//       window.UserPassError();
//     });
// }





// <!DOCTYPE html>
// <html>

// <head>
//   <title>Medvita Login</title>

//   <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
//     integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
//   <script src="login.js"></script>
//   <link rel="stylesheet" href="login.css">
//   <!-- <link rel="stylesheet" href="theme.css"> -->
//   <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-app.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-auth.js"></script>
//   <script src="https://www.gstatic.com/firebasejs/7.14.5/firebase-firestore.js"></script>
//   <script src="init-firebase-auth.js"></script>

// </head>

// <body>


//   <div class="navBar">
//     <ul class="nav justify-content-end">
//       <!-- <li class="nav-item">
//           <a class="nav-link active" href="#">Login</a>
//         </li> -->
//       <li class="nav-item">
//         <a class="nav-link" href="signup.html">Create Account</a>

//     </ul>

//   </div>

//   <div id="main">


//     <h1 class="display-4 text-center m-5">Welcome to Medvita - Patient</h1>

//     <div class="container">

//       <form>
//         <div class="form-group">
//           <label for="exampleInputEmail1">Email Address</label>
//           <input type="text" class="form-control" id="username" aria-describedby="emailHelp">
//           <small id="emailHelp" class="form-text">Please enter your email address</small>
//         </div>
//         <div class="form-group">
//           <label for="exampleInputPassword1">Password</label>
//           <input type="password" class="form-control" id="password">
//         </div>
//         <button type="button" class="btn btn-primary" onclick="login()"> <span class="spinner-grow spinner-grow-sm"
//             role="status" aria-hidden="true"></span> Login</button>
//         <button id="exitApp" type="button" class="cancelbtn">Exit Application</button>
//         <!--<span class="psw"><a href="forgotpsw.html">Forgot Password?</a></span>-->
//       </form>

//     </div>

//   </div>

//   <script>
//     let exitApp = document.getElementById('exitApp')
//     exitApp.addEventListener('click', function() {
//       window.exitApp();
//     })
//   </script>
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



