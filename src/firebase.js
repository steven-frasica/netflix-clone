import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBbvbovabwqpeA17SKMT-2YrRnrFVYLbF8",
  authDomain: "netflix-clone-a1d30.firebaseapp.com",
  projectId: "netflix-clone-a1d30",
  storageBucket: "netflix-clone-a1d30.firebasestorage.app",
  messagingSenderId: "490160863385",
  appId: "1:490160863385:web:b1c368355a590c51602008",
};

// authentication and database
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, "user"), {
      uid: user.uid,
      name,
      authProvider: "local",
      email,
    });
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
    toast.error(error.code.split('/')[1].split('-').join(' '));
  }
};

const logout = async () => {
  signOut(auth);
};

export {auth, db, login, signup, logout};
