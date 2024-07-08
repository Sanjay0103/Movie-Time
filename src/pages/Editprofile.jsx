import React, { useEffect, useState } from "react";
import { UserAuth } from "../authRelated/Authcontext";
import { db, storage } from "../config/FireBase"; // Import storage
import { doc, onSnapshot, updateDoc, arrayUnion } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"; // Import storage functions
import { Avatar } from "@mui/material";
import { v4 as uuid } from "uuid";
import { updateProfile } from "firebase/auth";

const EditProfile = ({ onClose }) => {
  const { user } = UserAuth();

  const [username, setUsername] = useState(user?.username || "");
  const [age, setAge] = useState(user?.age || "");
  const [gender, setGender] = useState(user?.gender || "");
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [profilePicUrl, setProfilePicUrl] = useState(null);
  const [error, setError] = useState("");
  const [uploadProgress, setUploadProgress] = useState(0);

  // console.log(user);

  useEffect(() => {
    if (user && user.email) {
      const unsubscribe = onSnapshot(doc(db, "users", user.email), (doc) => {
        setUsername(doc.data()?.username);
        setAge(doc.data()?.age);
        setGender(doc.data()?.gender);
      });
      return unsubscribe;
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userData = {
        username: username || user?.username,
        age: age || user?.age,
        gender: gender || user?.gender,
        profilePicUrl: profilePicUrl || user?.photoURL,
      };

      if (profilePicFile) {
        try {
          const storageRef = ref(storage, uuid());
          const uploadTask = uploadBytesResumable(storageRef, profilePicFile);

          uploadTask.on(
            "state_changed",
            (snapshot) => {
              const progress = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              );
              setUploadProgress(progress);
            },
            (error) => {
              console.error(error);
              setError("Error uploading profile picture");
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(
                  uploadTask.snapshot.ref
                );
                // console.log("Download URL:", downloadURL);
                userData.profilePicUrl = downloadURL;
                setProfilePicUrl(downloadURL);

                // Update profile after getting the download URL
                await updateProfile(user, {
                  displayName: userData?.username,
                  photoURL: userData?.profilePicUrl || user?.photoURL,
                });

                await updateDoc(doc(db, "users", user?.email), userData);

                console.alert("Profile updated successfully");
                onClose();
              } catch (error) {
                console.error(error);
                setError("Error updating profile picture URL");
              } finally {
                setUploadProgress(0);
              }
            }
          );
        } catch (error) {
          console.error(error);
          setError("Error handling profile picture upload");
        }
      } else {
        // If there's no profile picture file to upload
        await updateProfile(user, {
          displayName: userData?.username,
          photoURL: userData?.profilePicUrl || user?.photoURL,
        });

        console.alert("Profile updated successfully");
        onClose();
      }
    } catch (error) {
      console.error(error);
      setError("Error updating profile");
    }
  };

  return (
    <div className="bg-black/50 fixed h-full top-0 left-0 w-screen flex justify-center z-[1000] backdrop-blur-lg">
      <div className="bg-black/50 z-[2000] backdrop-blur-3xl p-6 rounded-lg shadow-md border border-white my-2 max-w-2xl mx-auto h-fit mt-36 ">
        <h2 className="text-2xl font-bold mb-4">Edit Profile</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 gap-y-4 gap-x-2"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
            <div className="col flex flex-col items-center justify-center gap-2">
              <div className="flex flex-col items-center justify-center gap-2">
                <label
                  htmlFor="profilePic"
                  className="flex flex-col items-center justify-center text-center cursor-pointer gap-2"
                >
                  Click To change Image
                  <Avatar
                    alt={user?.email ? user?.email : "guest"}
                    sx={{ width: "200px", height: "200px" }}
                    src={
                      profilePicFile
                        ? URL.createObjectURL(profilePicFile)
                        : user?.photoURL ||
                          "https://banner2.cleanpng.com/20190730/shy/kisspng-photographic-film-movie-camera-cinema-website-and-mobile-application-development-service-5d3fc924ce3b33.8538265315644613488447.jpg"
                    }
                  />
                  <input
                    type="file"
                    id="profilePic"
                    onChange={(e) => setProfilePicFile(e.target.files[0])}
                    className="bg-transparent hidden border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
                  />
                </label>
              </div>
            </div>
            <div className="col flex flex-col gap-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
                />
              </div>
              <div>
                <input
                  type="number"
                  placeholder="Age"
                  value={age}
                  onChange={(e) => setAge(e.target.value)}
                  className="bg-transparent border rounded-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
                />
              </div>
              <div>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="bg-transparent border rounded-full w-full p-2 px-4 text-lg inputShadow border-none bg-gray-700 outline-none"
                >
                  <option className="bg-gray-700 text-white" value="">
                    Select Gender
                  </option>
                  <option className="bg-gray-700 text-white" value="male">
                    Male
                  </option>
                  <option className="bg-gray-700 text-white" value="female">
                    Female
                  </option>
                  <option className="bg-gray-700 text-white" value="other">
                    Other
                  </option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
