"use client";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FiMail, FiMapPin, FiPhone, FiSave, FiUser, FiX } from "react-icons/fi";
import { IoCalendar } from "react-icons/io5";
import FormField from "./FormField";
import FormSection from "./FormSection";

// Main Profile Form Component
function UserProfileForm() {
    
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      firstName: "Mahdi",
      lastName: "Kazemi",
      email: "mahdykazemyo1i2@gmail.com",
      phone: "+98 912 345 6789",
      dateOfBirth: "1995-05-15",
      gender: "male",
      country: "Iran",
      city: "Tehran",
      address: "123 Main Street, District 1",
      postalCode: "1234567890",
      bio: "Software developer passionate about creating amazing user experiences.",
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    console.log("Form submitted:", data);
    setIsSubmitting(false);
    // Show success message (you can implement toast here)
  };

  const handleCancel = () => {
    reset();
  };

  return (
    <div className="space-y-8">
      {/* Personal Information Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl">Personal Information</CardTitle>
          <CardDescription>
            Update your personal details and information
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormSection icon={FiUser} title="Basic Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="First Name"
                error={errors.firstName?.message}
                required
              >
                <Input
                  {...register("firstName", {
                    required: "First name is required",
                    minLength: {
                      value: 2,
                      message: "Must be at least 2 characters",
                    },
                  })}
                  placeholder="Enter your first name"
                  className="bg-background border-input focus:border-primary"
                />
              </FormField>

              <FormField
                label="Last Name"
                error={errors.lastName?.message}
                required
              >
                <Input
                  {...register("lastName", {
                    required: "Last name is required",
                    minLength: {
                      value: 2,
                      message: "Must be at least 2 characters",
                    },
                  })}
                  placeholder="Enter your last name"
                  className="bg-background border-input focus:border-primary"
                />
              </FormField>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                label="Date of Birth"
                error={errors.dateOfBirth?.message}
              >
                <div className="relative">
                  <Input
                    type="date"
                    {...register("dateOfBirth")}
                    className="bg-background border-input focus:border-primary"
                  />
                  <IoCalendar className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                </div>
              </FormField>

              <FormField label="Gender" error={errors.gender?.message}>
                <Select
                  defaultValue={watch("gender")}
                  onValueChange={(value) => setValue("gender", value)}
                >
                  <SelectTrigger className="bg-background border-input focus:border-primary">
                    <SelectValue placeholder="Select gender" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">Male</SelectItem>
                    <SelectItem value="female">Female</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                    <SelectItem value="prefer-not-to-say">
                      Prefer not to say
                    </SelectItem>
                  </SelectContent>
                </Select>
              </FormField>
            </div>
          </FormSection>
        </CardContent>
      </Card>

      {/* Contact Information Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl">Contact Information</CardTitle>
          <CardDescription>
            Manage your contact details and preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormSection icon={FiMail} title="Email & Phone">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Email" error={errors.email?.message} required>
                <div className="relative">
                  <Input
                    type="email"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                    placeholder="your.email@example.com"
                    className="bg-background border-input focus:border-primary pl-10"
                  />
                  <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </FormField>

              <FormField label="Phone Number" error={errors.phone?.message}>
                <div className="relative">
                  <Input
                    type="tel"
                    {...register("phone", {
                      pattern: {
                        value: /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/,
                        message: "Invalid phone number",
                      },
                    })}
                    placeholder="+98 912 345 6789"
                    className="bg-background border-input focus:border-primary pl-10"
                  />
                  <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                </div>
              </FormField>
            </div>
          </FormSection>
        </CardContent>
      </Card>

      {/* Address Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl">Address</CardTitle>
          <CardDescription>Update your location and address</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <FormSection icon={FiMapPin} title="Location Details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField label="Country" error={errors.country?.message}>
                <Select
                  defaultValue={watch("country")}
                  onValueChange={(value) => setValue("country", value)}
                >
                  <SelectTrigger className="bg-background border-input focus:border-primary">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Iran">Iran</SelectItem>
                    <SelectItem value="USA">United States</SelectItem>
                    <SelectItem value="UK">United Kingdom</SelectItem>
                    <SelectItem value="Canada">Canada</SelectItem>
                    <SelectItem value="Australia">Australia</SelectItem>
                  </SelectContent>
                </Select>
              </FormField>

              <FormField label="City" error={errors.city?.message}>
                <Input
                  {...register("city")}
                  placeholder="Enter your city"
                  className="bg-background border-input focus:border-primary"
                />
              </FormField>
            </div>

            <FormField label="Address" error={errors.address?.message}>
              <Input
                {...register("address")}
                placeholder="Street address, apartment, suite, etc."
                className="bg-background border-input focus:border-primary"
              />
            </FormField>

            <FormField label="Postal Code" error={errors.postalCode?.message}>
              <Input
                {...register("postalCode", {
                  pattern: {
                    value: /^[0-9]{5,10}$/,
                    message: "Invalid postal code",
                  },
                })}
                placeholder="Enter postal code"
                className="bg-background border-input focus:border-primary w-1/2"
              />
            </FormField>
          </FormSection>
        </CardContent>
      </Card>

      {/* Bio Section */}
      <Card className="border-border bg-card">
        <CardHeader>
          <CardTitle className="text-xl">About You</CardTitle>
          <CardDescription>
            Tell us a bit about yourself (optional)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormField label="Bio" error={errors.bio?.message}>
            <Textarea
              {...register("bio", {
                maxLength: {
                  value: 500,
                  message: "Bio must be less than 500 characters",
                },
              })}
              placeholder="Write a short bio about yourself..."
              className="bg-background border-input focus:border-primary min-h-[120px] resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {watch("bio")?.length || 0} / 500 characters
            </p>
          </FormField>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex flex-col sm:flex-row gap-3 justify-end items-center sticky bottom-4 bg-card/95 backdrop-blur-sm p-4 rounded-lg border border-border shadow-lg"
      >
        <Button
          type="button"
          variant="outline"
          onClick={handleCancel}
          disabled={!isDirty || isSubmitting}
          className="w-full sm:w-auto gap-2"
        >
          <FiX className="w-4 h-4" />
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          disabled={!isDirty || isSubmitting}
          className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary-hover text-primary-foreground"
        >
          <FiSave className="w-4 h-4" />
          {isSubmitting ? "Saving..." : "Save Changes"}
        </Button>
      </motion.div>
    </div>
  );
}

export default UserProfileForm;
