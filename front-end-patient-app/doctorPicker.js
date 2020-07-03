/**
 * Displays a list of doctors that the use can pick from
 */
// Initialize GCP
const db = firebase.firestore();
const auth = firebase.auth();

const gotTime = localStorage.getItem('gotTime');

if (gotTime) {
  // If the user has chosen a time, will get doctors that are
  // available during that time
  db.collection('doctors').where("availability", "array-contains", `${dateConcat}`)
  .limit(8).get()
  .then(function (querySnapshot) {

    // Display each doctor profile
    querySnapshot.forEach(function(doc) {
        console.log("Schedule data for meeting ", count, " : ", doc.data());
        displayApp(doc);
        doctorUidArray[count] = doc.data().doctoruid;
        dateArray[count] = doc.data().dateConcat;
        count++;
    });
  })

} else {
  /**
  * If the user has not chosen a time, then will pull from recently used
  * doctors, fill the rest up with random ones
  */

}

