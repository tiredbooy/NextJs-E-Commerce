"use server";

import { redirect } from "next/navigation";
import { toast } from "sonner";
import {
  loginUser,
  loginUserWithOAuth,
  logoutUser,
  signupUser,
} from "../services/authService";
import { getStringFromForm } from "../utils/utils";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function signup(
  prevState: { success: boolean; message?: string } | null,
  formData: FormData
): Promise<{ success: boolean; message?: string }> {
  const first_name = getStringFromForm(formData, "first_name");
  const last_name = getStringFromForm(formData, "last_name");
  const email = getStringFromForm(formData, "email");
  const password = getStringFromForm(formData, "password");
  const confirmPassword = getStringFromForm(formData, "confirmPassword");
  const oauth_provider = getStringFromForm(formData, "oauth_provider");
  const oauth_id = getStringFromForm(formData, "oauth_id");
  const image = getStringFromForm(formData, "image");
  const terms = formData.get("terms") === "accepted";
  const isEmailValid = email && emailRegex.test(email);

  // Validation
  if (!first_name || !last_name || !email || !password) {
    return { success: false, message: "Missing required fields." };
  }

  if (password !== confirmPassword) {
    return { success: false, message: "Passwords do not match." };
  }

  if (!terms) {
    return {
      success: false,
      message: "You must accept the terms.",
    };
  }

  if (!isEmailValid) {
    return { success: false, message: "Invalid email address." };
  }

  const userObj = {
    first_name,
    last_name,
    email,
    password,
    image: image ? image : "",
    oauth_provider: oauth_provider || null, // Changed
    oauth_id: oauth_id || null, // Changed
  };
  let signupSuccess = false;
  let isOAuth = oauth_id === "" && oauth_provider === ""
  console.log('isOAuth:', isOAuth);

  try {
    await signupUser(userObj);
    signupSuccess = true;
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Signup failed. Please try again.",
    };
  }

  if (signupSuccess && !isOAuth) {
    redirect(`/auth/login?signup=success&email=${encodeURIComponent(email)}`);
  } else if(isOAuth) {
    redirect(`/auth/callback?success=true`)
  }
    else {
    toast("Signup failed, Try again later.");
    return {
      success: false,
      message: "Signup failed. Please try again.",
    };
  }
}

export async function login(
  prevState: { message: string } | undefined,
  formData: FormData
): Promise<{ message: string }> {
  const email = getStringFromForm(formData, "email");
  const password = getStringFromForm(formData, "password");

  if (!email || !password) {
    return { message: "Email and password are required." };
  }

  try {
    await loginUser({ email, password });
  } catch (err: any) {
    return { message: err.message || "Invalid credentials" };
  }

  redirect("/");
}

export async function oauthLogin(
  prevState: { message: string } | undefined,
  formData: FormData
): Promise<{ success?: boolean, message: string }> {
  const email = getStringFromForm(formData, "email");
  const oauth_provider = getStringFromForm(formData, "oauth_provider");
  const oauth_id = getStringFromForm(formData, "oauth_id");

  console.log("action----- oauth_provider:", oauth_provider);

  console.log("action----- oauth_id:", oauth_id);

  if (!email || !oauth_provider || !oauth_id) {
    return { message: "Failed to Validate Credentials" };
  }

  try {
    await loginUserWithOAuth({ email, oauth_provider, oauth_id });
    return {success: true, message: "Logged In Successfully!"}
  } catch (err: any) {
    return { success: false, message: err.message || "Invalid Credentials" };
  }
}

export async function logout() {
  try {
    await logoutUser();
    return { success: true, message: "Logout Successfully." };
  } catch (e: any) {
    return { success: false, message: "Failed to Logout" };
  }
}
