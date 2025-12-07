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
import { UseFormReturn } from "react-hook-form";
import { FiUser } from "react-icons/fi";
import { IoCalendar } from "react-icons/io5";
import FormField from "./FormField";
import FormSection from "./FormSection";
import { ProfileFormData } from "./UserProfileForm";

interface Props {
  form: UseFormReturn<ProfileFormData>;
}

export default function PersonalInfoSection({ form }: Props) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  return (
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
              error={errors.first_name?.message}
              required
            >
              <Input
                {...register("first_name", {
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
              error={errors.last_name?.message}
              required
            >
              <Input
                {...register("last_name", {
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
            <FormField label="Date of Birth" error={errors.birth_date?.message}>
              <div className="relative">
                <Input
                  type="date"
                  {...register("birth_date")}
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
  );
}
