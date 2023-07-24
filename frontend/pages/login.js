import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { gql, useMutation } from "@apollo/client";
import Cookie from "js-cookie";
import firebase from "./firebase";

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
    const { email, password } = formData;
    const { data } = await loginMutation({
      variables: { identifier: email, password },
    });
    if (data?.login.user) {
      setUser(data.login.user);
      Cookie.set("token", data.login.jwt);
      router.push("/");
    }
  const handleGoogleSignIn = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      await firebase.auth().signInWithPopup(provider);

      const user = firebase.auth().currentUser;
      if (user) {
        setUser({
          username: user.displayName,
          email: user.email,
        })
        router.push("/")
      }
    } catch (error) {
      console.error("Error signing in with Google:", error);
    }
  }
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
      {/* Google Sign-In Button*/}
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