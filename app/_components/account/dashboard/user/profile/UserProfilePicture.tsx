"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiCamera, FiUser } from "react-icons/fi";
import { Button } from "@/components/ui/button";
import { IoCalendar, IoLocationSharp, IoMail } from "react-icons/io5";
import Image from "next/image";
import Link from "next/link";
import { User } from "@/app/_lib/types/user_types";

interface Props {
  profileData: User
}

function UserProfilePicture({ profileData }: Props) {
  const [isHovered, setIsHovered] = useState(false);
  const [profileImage, setProfileImage] = useState("");

  useEffect(() => {
    if (profileData.image && profileData.image !== "") {
      setProfileImage(profileData?.image);
    }
  }, [profileData]);

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-row gap-6 items-center justify-start">
      <motion.div
        className="relative"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className="relative w-30 h-30 md:w-36 md:h-36 lg:w-44 lg:h-44 rounded-full overflow-hidden cursor-pointer shadow-2xl"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
         
          {profileImage ? (
            <Image
              fill
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="bg-gradient-to-br from-primary via-primary-dark to-primary-dark w-full h-full flex items-center justify-center">
              <FiUser className="w-20 h-20 text-white opacity-60" />
            </div>
          )}

          {/* Image Hover Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-0 bg-black/50 flex items-center justify-center"
          >
            <div className="text-center text-white">
              <FiCamera className="w-8 h-8 mx-auto mb-2" />
              <span className="text-sm font-medium">Change Photo</span>
            </div>
          </motion.div>

          {/* Hidden File Input */}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
        </div>

        {/* Edit Badge */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
          className="absolute bottom-2 right-2 bg-primary rounded-full p-2 md:p-3 shadow-lg"
        >
          <FiCamera className="w-3 h-3 md:w-5 md:h-5 text-white" />
        </motion.div>
      </motion.div>

      {/* User Info */}
      <motion.div
        className="flex flex-col gap-3 justify-start items-start"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        {/* <div className="space-y-2"> */}
        <h2 className="font-semibold text-xl md:text2xl lg:text-3xl">
          {profileData.first_name} {profileData.last_name}
        </h2>
        <div className="flex flex-row gap-1 items-center text-muted-foreground text-xs md:text-sm lg:text-base">
          <IoCalendar />
          <span className="text-muted-foreground">
            {new Date(profileData.created_at).toLocaleDateString()}
          </span>
        </div>
        <div className="flex flex-row gap-1 items-center text-muted-foreground text-xs md:text-sm lg:text-base">
          <IoLocationSharp />
          <span>Tehran</span>
        </div>
        <div className="flex-row gap-1 items-center text-muted-foreground hidden lg:flex text-base">
          <IoMail />
          <span>{profileData.email}</span>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="w-fit mt-2 cursor-pointer text-xs md:text-base"
        >
          <Link href="/account/orders">View Orders</Link>
        </Button>
      </motion.div>
    </div>
  );
}

export default UserProfilePicture;
