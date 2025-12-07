import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { UseFormReturn } from "react-hook-form";
import { FiMapPin } from "react-icons/fi";
import FormField from "./FormField";
import FormSection from "./FormSection";
import { AddressFormData } from "./UserProfileForm";

interface Props {
  form: UseFormReturn<AddressFormData>;
}

export default function AddressSection({ form }: Props) {
  const {
    register,
    formState: { errors },
    setValue,
    watch,
  } = form;

  return (
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

          <FormField label="Postal Code" error={errors.postal_code?.message}>
            <Input
              {...register("postal_code", {
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
  );
}