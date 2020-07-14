import React from 'react';
import '../styles/appointment.css';

class Appointment extends React.Component {
  render() {
    return(
      <>
      <div>
        <nav class="navbar navbar-expand-lg navbar-dark"
          // style="background: linear-gradient(to left, #12c2e9, #c471ed, #f64f59);/* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */"
        >
          {/* <a class="navbar-brand" href="#">Medvita - Patient</a> */}
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"/>
          </button>
          <div class="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
              <li class="nav-item">
                <a class="nav-link" href="../homescreen.html">
                  Book Appointment (outdated)
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="../videoCall.html">
                  Doctor Consultation
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item active">
                <a class="nav-link" href="./appointment.html">Book Appointment</a>
              </li>
            </ul>
            <form class="form-inline my-2 my-lg-0">
              {/* <!-- <input class="form-control mr-sm-2" type="search" placeholder="Search"> -->
              <!-- <button class="btn btn-outline-primary my-2 my-sm-0" type="button">Logout</button> --> */}
              <a class="btn btn-outline-light" href="../login.html" role="button">Logout</a>
            </form>
          </div>
        </nav>
      </div>
      <div class="display-2 text-center text-light" id="message">
        How do you want to schedule?
      </div>
      <div class="container">
        <div class="text-center">
          <a class="btn btn-outline-light mr-5 mt-5" id="btn1" href="./doctorSelect.html">Select a Doctor</a>
          <a class="btn btn-outline-light ml-5 mt-5" id="btn2" href="./timeSelect.html">Select a Time</a>
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

export default Appointment;
