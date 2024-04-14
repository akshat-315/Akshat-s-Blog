import { Button, Label, TextInput } from "flowbite-react";
import React from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen mt-60">
      <div className="flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5 ">
        {/* left */}
        <div className="flex-1">
          <Link to="/" className="font-bold dark:text-white text-4xl">
            <span className="px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">
              MERN Blog
            </span>
          </Link>
          <p className="text-sm mt-5 w-1/2">
            This is a demo project. You can sign up with your email and password
            or with Google.
          </p>
        </div>

        {/* right */}

        <div>
          <form className="b">
            <div>
              <Label value="Username" />
              <TextInput type="text" placeholder="Username" id="username" />
            </div>
            <div>
              <Label value="Email" />
              <TextInput
                type="email"
                placeholder="mernblog@gmail.com"
                id="email"
              />
            </div>
            <div>
              <Label value="Username" />
              <TextInput type="password" placeholder="Password" id="password" />
            </div>
            <Button
              gradientDuoTone="purpleToPink"
              type="submit"
              className="mt-3"
            >
              Sign In
            </Button>
            <div className="flex gap-2 text-sm mt-3">
              <span>Have an account?</span>
              <Link to="/sign-in" className="text-blue-500">
                Sign In
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
