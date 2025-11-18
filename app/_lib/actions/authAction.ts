"use server";

import { redirect } from "next/navigation";
import { loginUser, signupUser } from "../services/auth";
import { getStringFromForm } from "../utils/utils";
import { toast } from "sonner";

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

  const userObj = { first_name, last_name, email, password, image: "" };
  let signupSuccess = false;

  try {
    await signupUser(userObj);
    signupSuccess = true;
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Signup failed. Please try again.",
    };
  }

  if (signupSuccess) {
    redirect(`/auth/login?signup=success&email=${encodeURIComponent(email)}`);
  } else {
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
