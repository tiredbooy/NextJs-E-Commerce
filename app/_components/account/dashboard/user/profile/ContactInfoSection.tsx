import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { UseFormReturn } from "react-hook-form";
import { FiMail, FiPhone } from "react-icons/fi";
import FormField from "./FormField";
import FormSection from "./FormSection";
import { ProfileFormData } from "./UserProfileForm";

interface Props {
  form: UseFormReturn<ProfileFormData>;
}

export default function ContactInfoSection({ form }: Props) {
  const {
    register,
    formState: { errors },
  } = form;

  return (
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
  );
}