import React from "react";
import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      vpassword: '',
      fname: '',
      lname: '',
      month: '',
      day: '',
      year: '',
      address: '',
      city: '',
      province: '',
      postalcode: ''
    };
  }

  signup = () => {
    // Checks that entries were filled
    if (Email == '' || password == '' || vpassword == '' || Fname == '' || Lname == '' || Month == ''
        || Day == '' || Year == '' || Address == '' || City == '' || Province == '' || Postalcode == '') {
        document.getElementById('password').value = "";
        document.getElementById('vpassword').value = "";
        return;
    }

    // Incorrect password
    if (password != vpassword) {
        document.getElementById('password').value = "";
        document.getElementById('vpassword').value = "";
        window.PassNoMatchError();
        return;
    }

    // Signs up the user
    firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)
    .then((result) => {
        const patientUid = result.user.uid;

        // Stores rest of data to database
        let data = {
          info: {
            fname: Fname,
            lname: Lname,
            email: Email,
            deviceserial: '',
            //healthcareid: healthcareid,
            uid: patientUid
          },                
          birthday: {
            month: Month,
            day: Day,
            year: Year
          },
          location: {
            address: Address,
            city: City,
            province: Province,
            postalcode: Postalcode
          },
          appointmentblocks: new Array()
        };

        const db = firebase.firestore();

        const uinfo_ref = db.collection('patients').doc(`${userid}`).set(data)
            .then(function () {
                // Got to vitals page
                console.log(data);
                window.location = "homescreen.html";
            }).catch(function (error) {
                // Couldn't put data in database
                window.DatabaseError();
                console.log('Error: ', error);
            });

    }).catch(function (error) {
        // Error handling
        console.log('Error: ', error);
        window.AccountCreationError();
    });
  }

  render() {
    return(
      <>
      <div id="main">
        <h1 className="display-3 text-center m-5">Welcome to Medvita!</h1>
        <div className="container">
          <form className="needs-validation" novalidate>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="fname">First name</label>
                <input type="text" className="form-control" id="fname" value="" required/>
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="lname">Last name</label>
                <input type="text" className="form-control" id="lname" value="" required/>
                <div className="valid-feedback">
                  Looks good!
                </div>
              </div>
            </div>
            <div id="birthday">
              <h5>Please set your birthday:</h5>
              <div className="form-row">
                <div className="col-md-4 mb-3">
                  <label htmlFor="month">Month</label>
                  <select className="custom-select" id="month" required>
                    <option selected disabled value="">Choose...</option>
                    <option>January</option><option>February</option><option>March</option>
                    <option>April</option><option>May</option><option>June</option>
                    <option>July</option><option>August</option><option>September</option>
                    <option>October</option><option>November</option><option>December</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid month.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="day">Day</label>
                  <select className="custom-select" id="day" required>
                    <option selected disabled value="">Choose...</option>
                    <option>1</option><option>2</option><option>3</option><option>4</option>
                    <option>5</option><option>6</option><option>7</option><option>8</option>
                    <option>9</option><option>10</option><option>11</option><option>12</option>
                    <option>13</option><option>14</option><option>15</option><option>16</option>
                    <option>17</option><option>18</option><option>19</option><option>20</option>
                    <option>21</option><option>22</option><option>23</option><option>24</option>
                    <option>25</option><option>26</option><option>27</option><option>28</option>
                    <option>29</option><option>30</option><option>31</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid day.
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <label htmlFor="year">Year</label>
                  <select className="custom-select" id="year" required>
                    <option selected disabled value="">Choose...</option>
                    <option>2020</option><option>2019</option><option>2018</option>
                    <option>2017</option><option>2016</option><option>2015</option>
                    <option>2014</option><option>2013</option><option>2012</option>
                    <option>2011</option><option>2010</option><option>2009</option>
                    <option>2008</option><option>2007</option><option>2006</option>
                    <option>2005</option><option>2004</option><option>2003</option>
                    <option>2002</option><option>2001</option><option>2000</option>
                    <option>1999</option><option>1998</option><option>1997</option>
                    <option>1996</option><option>1995</option><option>1994</option>
                    <option>1993</option><option>1992</option><option>1991</option>
                    <option>1990</option><option>1989</option><option>1988</option>
                    <option>1987</option><option>1986</option><option>1985</option>
                    <option>1984</option><option>1983</option><option>1982</option>
                    <option>1981</option><option>1980</option><option>1979</option>
                    <option>1978</option><option>1977</option><option>1976</option>
                    <option>1975</option><option>1974</option><option>1973</option>
                    <option>1972</option><option>1971</option><option>1970</option>
                    <option>1969</option><option>1968</option><option>1967</option>
                    <option>1966</option><option>1965</option><option>1964</option>
                    <option>1963</option><option>1962</option><option>1961</option>
                    <option>1960</option><option>1959</option><option>1958</option>
                    <option>1957</option><option>1956</option><option>1955</option>
                    <option>1954</option><option>1953</option><option>1952</option>
                    <option>1951</option><option>1950</option><option>1949</option>
                    <option>1948</option><option>1947</option><option>1946</option>
                    <option>1945</option><option>1944</option><option>1943</option>
                    <option>1942</option><option>1941</option><option>1940</option>
                    <option>1939</option><option>1938</option><option>1937</option>
                    <option>1936</option><option>1935</option><option>1934</option>
                    <option>1933</option><option>1932</option><option>1931</option>
                    <option>1930</option><option>1929</option><option>1928</option>
                    <option>1927</option><option>1926</option><option>1925</option>
                    <option>1924</option><option>1923</option><option>1922</option>
                    <option>1921</option><option>1920</option><option>1919</option>
                    <option>1918</option><option>1917</option><option>1916</option>
                    <option>1915</option><option>1914</option><option>1913</option>
                    <option>1912</option><option>1911</option><option>1910</option>
                    <option>1909</option><option>1908</option><option>1907</option>
                    <option>1906</option><option>1905</option><option>1904</option>
                    <option>1903</option><option>1902</option><option>1901</option>
                    <option>1900</option>
                  </select>
                  <div className="invalid-feedback">
                    Please select a valid year.
                  </div>
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label htmlFor="address">Address</label>
                <input type="text" className="form-control" id="address" required/>
                <div className="invalid-feedback">
                  Please provide a valid address.
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-6 mb-3">
                <label htmlFor="city">City</label>
                <input type="text" className="form-control" id="city" required/>
                <div className="invalid-feedback">
                  Please provide a valid city.
              </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="province">Province</label>
                <select className="custom-select" id="province" required>
                  <option selected disabled value="">Choose...</option>
                  <option>Alberta</option><option>British Columbia</option>
                  <option>Manitoba</option><option>New Brunswick</option>
                  <option>Newfoundland and Labrador</option><option>Nova Scotia</option>
                  <option>Nunavut</option><option>Ontario</option>
                  <option>Prince Edward Island</option><option>Quebec</option>
                  <option>Saskatchewan</option>
                </select>
                <div className="invalid-feedback">
                  Please select a valid province.
                </div>
              </div>
              <div className="col-md-3 mb-3">
                <label htmlFor="pcode">Postal Code</label>
                <input type="text" className="form-control" id="pcode" required/>
                <div className="invalid-feedback">
                  Please provide a valid postal code.
                </div>
              </div>
            </div>
            <div className="form-row">
              <div className="col-md-12 mb-3">
                <label htmlFor="email">Email Address</label>
                <input type="email" className="form-control" id="email" required/>
                <div className="invalid-feedback">
                  Please provide a valid email address.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="password">Password</label>
                <input type="password" className="form-control" id="password" required/>
                <div className="invalid-feedback">
                  Please provide a valid password.
                </div>
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="valid-password">Confirm Password</label>
                <input type="password" className="form-control" id="vpassword" required/>
                <div className="invalid-feedback">
                  Please provide a valid password.
                </div>
              </div>
            </div> 
            <div className="form-group">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" value="" id="invalidCheck" required/>
                <label className="form-check-label" htmlFor="invalidCheck">
                  <a href="terms.html">Agree to terms and conditions</a>
                </label>
                <div className="invalid-feedback">
                  You must agree before submitting.
                </div>
              </div>
            </div>
            <button className="btn btn-primary" type="button" id="button" onClick="signup()">
              <span className="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"/>
              Get Notified
            </button>
          </form>
          {/* <script>
            // Example starter JavaScript for disabling form submissions if there are invalid fields
            (function () {
              'use strict';
              window.addEventListener('load', function () {
                // Fetch all the forms we want to apply custom Bootstrap validation styles to
                var forms = document.getElementsByclassName('needs-validation');
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
          </script> */}
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

export default Signup;
