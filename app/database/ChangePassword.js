import Firebase from 'firebase';

function reauthenticate(currentPassword) {
  const user = Firebase.auth().currentUser;
  const cred = Firebase.auth.EmailAuthProvider.credential(
    user.email,
    currentPassword,
  );
  return user.reauthenticateWithCredential(cred);
}

export default async function ChangePassword(values) {
  reauthenticate(values.currentPassword)
    .then(() => {
      const user = Firebase.auth().currentUser;
      user
        .updatePassword(values.newPassword)
        .then(() => {
          console.log('PASSWORD CHANGED SUCCESSFULLY:', Date(Date.now()));
        })
        .catch(error => {
          Alert.alert(error.message);
        });
    })
    .catch(error => {
      Alert.alert(error.message);
    });
}
