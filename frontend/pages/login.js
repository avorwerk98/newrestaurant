import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { gql, useMutation } from "@apollo/client";
import Cookie from "js-cookie";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
const provider = new GoogleAuthProvider();

import Form from "@/components/Form";
import Loader from "@/components/Loader";

const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        email
      }
    }
  }
`;

export default function LoginRoute() {
  const { setUser } = useAppContext();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loginMutation, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    // Your email/password login logic
  };

  const handleGoogleSignIn = async () => {
    // Google Sign-In Logic
    const auth = getAuth();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  if (loading) return <Loader />;

  return (
    <>
      <Form
        title="Login"
        buttonText="Login"
        formData={formData}
        setFormData={setFormData}
        callback={handleLogin}
        error={error}
      />
      {/* Google Sign-In Button */}
      <div>
        <button
          onClick={handleGoogleSignIn} 
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white font-semibold py-w px-4 rounded"
        >
          Sign in with Google
        </button>
      </div>
    </>
  );
}
