import Firebase from 'firebase';

//so username is global
let Username = '';

export default async function ReportPost(values, submitComplete) {
  //reads today's date in default Javascript
  const date = new Date();
  //current user ID
  const userKey = Firebase.auth().currentUser.uid;

  //creates unique identifier to be used for new post
  const key = Firebase.database()
    .ref('postReports')
    .push().key;

  //references firebase to grab current user username
  Firebase.database()
    .ref('users/' + userKey)
    .on('value', snapshot => {
      const user = snapshot.val();
      //if is needed to avoid errors when a user is deleted
      if (user) {
        Username = user.username;
      }
    });

  try {
    await Firebase.database()
      .ref('postReports/' + key)
      .set({
        //stores data in firebase
        postId: values.postId,
        reportDescription: values.reportDescription,
        reportId: key,
        reportTimeStamp: [date.getDate(), date.getMonth() + 1, date.getFullYear()].join('/') +
        ' ' +
        [
          date.getHours(),
          (date.getMinutes() < 10 ? '0' : '') + date.getMinutes(),
        ].join(':'),
        reportType: values.reportType,
        submittedBy: Username,
      })
      .then(console.log('POST REPORTED SUCCESSFULLY:', Date(Date.now())));
    const snapshot = undefined;
    values.Id = snapshot.Id;
    snapshot.set(values);
    return submitComplete(values);
  } catch (error) {
    return console.log(error);
  }
}
