import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, storage } from "../config/FireBase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";

import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

const AuthContext = createContext();

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);

  async function signUp(email, password, username, profilePicUrl, age, gender) {
    try {
      // Create user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Update user profile with display name and photo URL
      const displayName = username;
      const storageRef = ref(storage, `images/${displayName}`);
      const uploadTask = uploadBytesResumable(storageRef, profilePicUrl);
      const uploadSnapshot = await uploadTask;
      const downloadURL = await getDownloadURL(uploadSnapshot.ref);
      await updateProfile(userCredential?.user, {
        displayName: displayName,
        photoURL: downloadURL,
      });

      // Save user data to Firestore
      await setDoc(doc(db, "users", email), {
        uid: userCredential?.user.uid,
        username,
        email,
        profilePicUrl: downloadURL,
        age,
        gender,
        savedShows: [],
      });

      // Return user credential or any other necessary data
      return userCredential;
    } catch (error) {
      // Handle errors
      console.error("Error signing up:", error);
      throw error;
    }
  }

  const googlelogIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      console.log("User signed up successfully!");
      return userCredential.user;
    } catch (error) {
      alert("Error", error.message);
    }
  };

  async function gglsignIn() {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);

      let age = "";
      let gender = "";

      if (
        userCredential.additionalUserInfo &&
        userCredential.additionalUserInfo.profile
      ) {
        const userProfile = userCredential.additionalUserInfo.profile;
        age = userProfile.age || "";
        gender = userProfile.gender || "";
      }

      await setDoc(doc(db, "users", userCredential?.user.email), {
        uid: userCredential?.user?.uid,
        displayName: userCredential?.user?.displayName,
        email: userCredential?.user?.email,
        photoURL: userCredential?.user?.photoURL,
        age: age,
        gender: gender,
        savedShows: [],
      });

      console.log("User signed up successfully!");
      return userCredential.user;
    } catch (error) {
      console.error("Error signing in with Google:", error.message);
      throw error;
    }
  }

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ signUp, logIn, logOut, user, googlelogIn, gglsignIn }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function UserAuth() {
  return useContext(AuthContext);
}
