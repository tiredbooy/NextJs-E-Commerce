"use client";
import { updateAddress, updateUserProfile } from "@/app/_lib/actions/userActions";
import { Address, UpdateUserReq, User } from "@/app/_lib/types/user_types";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { FiSave, FiX } from "react-icons/fi";
import { toast } from "sonner";
import AddressSection from "./AddressSection";
import ContactInfoSection from "./ContactInfoSection";
import PersonalInfoSection from "./PersonalInfo";

interface Props {
  profileData: User;
  addressData: Address
}


export interface AddressFormData {
  country: string;
  city: string;
  address: string;
  postal_code: string;
}

function UserProfileForm({ profileData, addressData }: Props) {
  const [isPending, startTransition] = useTransition()

  // Profile form
  const profileForm = useForm<UpdateUserReq>({
    defaultValues: {
      first_name: profileData.first_name,
      last_name: profileData.last_name,
      email: profileData.email,
      phone: profileData.phone,
      birth_date: profileData.birth_date || "15-05-1995",
      gender: profileData.gender || "male",
    },
  });

  // Address form
  const addressForm = useForm<AddressFormData>({
    defaultValues: {
      country: addressData.country || "Iran",
      city: addressData.city || "Tehran",
      address: addressData.address || "123 Main Street, District 1",
      postal_code: addressData.postal_code || "1234567890",
    },
  });

  // Get only changed fields from a form
  const getDirtyFields = <T extends Record<string, any>>(
    dirtyFields: Partial<Record<keyof T, boolean>>,
    formData: T
  ): Partial<T> => {
    return Object.keys(dirtyFields).reduce((acc, key) => {
      if (dirtyFields[key as keyof T]) {
        acc[key as keyof T] = formData[key as keyof T];
      }
      return acc;
    }, {} as Partial<T>);
  };

  const onSubmit = async () => {
    startTransition(async () => {
      try {
        const changedProfileData = getDirtyFields(
          profileForm.formState.dirtyFields,
          profileForm.getValues()
        );
        const changedAddressData = getDirtyFields(
          addressForm.formState.dirtyFields,
          addressForm.getValues()
        );

        const hasProfileChanges = Object.keys(changedProfileData).length > 0;
        const hasAddressChanges = Object.keys(changedAddressData).length > 0;

        // Build array of promises
        const promises: Promise<any>[] = [];

        if (hasProfileChanges) {
          promises.push(updateUserProfile(changedProfileData));
        }

        if (hasAddressChanges) {
          promises.push(updateAddress(addressData.id, changedAddressData));
        }

        // Execute in parallel
        if (promises.length > 0) {
          const results = await Promise.all(promises);

          // Check if all succeeded
          const allSucceeded = results.every((r) => r.success);

          if (allSucceeded) {
            // Reset forms to new values (clears dirty state)
            profileForm.reset(profileForm.getValues());
            addressForm.reset(addressForm.getValues());

            toast.success("Changes saved successfully!");
          } else {
            toast.error("Some changes failed to save");
          }
        }
      } catch (error) {
        console.error("Error saving changes:", error);
        toast.error("Failed to save changes");
      }
    });
  };

  const handleCancel = () => {
    profileForm.reset();
    addressForm.reset();
  };

  const hasAnyChanges =
    profileForm.formState.isDirty || addressForm.formState.isDirty;

  return (
    <div className="space-y-8">
      <PersonalInfoSection form={profileForm} />
      <ContactInfoSection form={profileForm} />
      <AddressSection form={addressForm} />

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
          disabled={!hasAnyChanges || isPending}
          className="w-full sm:w-auto gap-2"
        >
          <FiX className="w-4 h-4" />
          Cancel
        </Button>
        <Button
          type="button"
          onClick={onSubmit}
          disabled={!hasAnyChanges || isPending}
          className="w-full sm:w-auto gap-2 bg-primary hover:bg-primary-hover text-primary-foreground"
        >
          <FiSave className="w-4 h-4" />
          {isPending ? "Saving..." : "Save Changes"}
        </Button>
      </motion.div>
    </div>
  );
}

export default UserProfileForm;
