import { Alert, Button, Label, TextInput } from "flowbite-react";
import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { CircularProgressbar } from "react-circular-progressbar";
import { signOutSuccess } from "../redux/user/userSlice";

const DashProfile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [imageFile, setImageFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [imageFileUploadProgress, setImageFileUploadProgress] = useState(0);
  const [imageFileUploadError, setImageFileUploadError] = useState(null);
  const [imageFileUploading, setImageFileUploading] = useState(false);
  const fileRef = useRef();
  const dispatch = useDispatch();

  const handleImageFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => {
    if (imageFile) {
      uploadFile();
    }
  }, [imageFile]);

  const uploadFile = async () => {
    setImageFileUploading(true);
    setImageFileUploadError(null);
    const storage = getStorage(app);
    const fileName = new Date().getTime() + imageFile.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setImageFileUploadProgress(progress.toFixed(0));
      },
      (error) => {
        setImageFileUploadError(
          "Could not upload image (File must be less than 2MB)"
        );
        setImageFileUploadProgress(0); // Reset progress
        setImageFile(null);
        setImageUrl(null);
        setImageFileUploading(false);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageUrl(downloadURL);
          setImageFileUploading(false);
          setImageFileUploadProgress(0);
        });
      }
    );
  };

  const handleSignOut = async () => {
    try {
      const res = await fetch("api/v1/user/sign-out", {
        method: "POST",
      });

      const data = res.json();

      if (!res.ok) {
        console.log(data.message);
      } else {
        dispatch(signOutSuccess());
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-3 w-full">
      <h1 className="my-7 text-center font-semibold text-2xl">Profile</h1>
      <form className="flex flex-col ">
        <input
          type="file"
          accept="image/*"
          onChange={handleImageFile}
          ref={fileRef}
          hidden
        />
        <div
          className="relative w-32 h-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full mb-8"
          onClick={() => fileRef.current.click()}
        >
          <div className="absolute inset-0">
            {imageFileUploading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <CircularProgressbar
                  value={imageFileUploadProgress || 0}
                  text={`${imageFileUploadProgress}%`}
                  strokeWidth={5}
                  styles={{
                    root: {
                      width: "100%",
                      height: "100%",
                      position: "absolute",
                      top: 0,
                      left: 0,
                    },
                    path: {
                      stroke: `rgba(62, 152, 199, ${
                        imageFileUploadProgress / 100
                      })`,
                    },
                  }}
                />
              </div>
            )}
          </div>
          <img
            src={imageUrl || currentUser.profilePicture}
            className={`rounded-full w-full h-full object-cover border-4 border-[lightgray] ${
              imageFileUploading ? "blur" : ""
            }`}
          />
        </div>
        {imageFileUploadError && (
          <Alert color="failure">{imageFileUploadError}</Alert>
        )}
        <div className="flex flex-col gap-4">
          <Label value="Username" className="-mb-2 mt-2" />
          <TextInput
            type="text"
            id="username"
            placeholder={currentUser.username}
          />
          <Label value="Email" className="-mb-2 mt-2" />
          <TextInput
            type="email"
            id="email"
            placeholder={currentUser.username}
            disabled
          />
          <Label value="Password" className="-mb-2 mt-2" />
          <TextInput type="password" id="password" placeholder="password" />
          <Button
            type="submit"
            gradientDuoTone="purpleToBlue"
            outline
            className="mt-2"
          >
            Update
          </Button>
        </div>
      </form>
      <div className="flex justify-between mt-5 text-red-500">
        <span>Delete Account</span>
        <span className="cursor-pointer" onClick={handleSignOut}>
          Sign Out
        </span>
      </div>
    </div>
  );
};

export default DashProfile;
