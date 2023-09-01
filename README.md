1. Setup :-

   - Create Project in React as well as in Firebase.
   - Create UI of the project.
   - setup base config file of firebase in config/firebase.ts folder.
   - import {getAuth} from firebase/auth : for authantication
   - export const auth = gethAuth()

2. Registration :-
   - Initialize Email And Password Authantication from firebase (& Google if needed).
   - For registration with email and password, import createUserWithEmailAndPassword.
   - Its a function so pass it in handleSubmit, createUserWithEmailAndPassword(auth, email, password)
   - createUserWithEmailAndPassword has promise then and catch.
   - or you can store the response of the function :
     - const res = createUserWithEmailAndPassword(auth, email, password);
   - use try and catch method
   - upload Profile Picture :
     - initialize storage in firebase.
     - create a reference to upload the file : const storageRef = ref(storage, "fileName"');
     - const uploadTask = uploadBytesResumable(storageRef, file);
     - use uploadTask.on() to upload the file.
     -
