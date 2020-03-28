const admin = require("firebase-admin");

var serviceAccount = require("../key/admin")
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://socialape-765b5.firebaseio.com",
    storageBucket:"socialape-765b5.appspot.com"
  });
  const db = admin.firestore();

  module.exports = {admin,db}