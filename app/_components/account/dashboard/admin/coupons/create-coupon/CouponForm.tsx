"use client";
import { CreateCouponReq } from "@/app/_lib/types/order_types";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Controller, useForm } from "react-hook-form";
import {
  FiCalendar,
  FiDollarSign,
  FiHash,
  FiPercent,
  FiToggleLeft,
} from "react-icons/fi";
import FormField from "./FormField";
import FormSection from "./FormSection";
import InputWithIcon from "./InputWithIcon";
import { startTransition } from "react";
import { createCoupon } from "@/app/_lib/actions/orderAction";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const CouponForm: React.FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
  } = useForm<CreateCouponReq>({
    defaultValues: {
      code: "",
      discount_percentage: 0,
      min_purchase: 0,
      max_purchase: 0,
      max_uses: 0,
      is_active: true,
      expires_at: "",
    },
  });

  const discountValue = watch("discount_percentage");

  const onSubmit = async (data: CreateCouponReq) => {
    startTransition(async () => {
        const reqData: CreateCouponReq = {
          code: String(data.code),
          discount_percentage: Number(data.discount_percentage),
          min_purchase: Number(data.min_purchase),
          max_purchase: Number(data.max_purchase),
          max_uses: Number(data.max_uses),
          current_uses: 0, // Hardcoded to 0
          is_active: Boolean(data.is_active),
          expires_at: String(data.expires_at),
        };

        const result = await createCoupon(reqData);

        toast.success(`Coupon (${result?.code}) Successfully Created!`);
        reset();
        redirect("/admin/coupons");
    });
  };

  return (
    <div className="min-h-screen bg-background p-4 sm:p-6 lg:p-8">
      <div className="mx-auto ">
        <Card className="border-border bg-card">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-foreground">
              Create New Coupon
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              Fill in the details below to create a new discount coupon
            </CardDescription>
          </CardHeader>

          <CardContent>
            <div className="space-y-8">
              {/* Basic Information Section */}
              <FormSection
                title="Basic Information"
                description="Set the coupon code and discount amount"
              >
                <Controller
                  name="code"
                  control={control}
                  rules={{
                    required: "Coupon code is required",
                    minLength: {
                      value: 3,
                      message: "Code must be at least 3 characters",
                    },
                    pattern: {
                      value: /^[A-Z0-9_-]+$/,
                      message:
                        "Use only uppercase letters, numbers, dashes and underscores",
                    },
                  }}
                  render={({ field }) => (
                    <FormField
                      label="Coupon Code"
                      error={errors.code?.message}
                      required
                      icon={<FiHash className="w-4 h-4" />}
                    >
                      <InputWithIcon
                        {...field}
                        icon={<FiHash />}
                        placeholder="SUMMER2024"
                        className="uppercase"
                        onChange={(e) =>
                          field.onChange(e.target.value.toUpperCase())
                        }
                      />
                    </FormField>
                  )}
                />

                <Controller
                  name="discount_percentage"
                  control={control}
                  rules={{
                    required: "Discount percentage is required",
                    min: { value: 1, message: "Minimum discount is 1%" },
                    max: { value: 99, message: "Maximum discount is 99%" },
                  }}
                  render={({ field }) => (
                    <FormField
                      label="Discount Percentage"
                      error={errors.discount_percentage?.message}
                      required
                      icon={<FiPercent className="w-4 h-4" />}
                    >
                      <div className="space-y-2">
                        <InputWithIcon
                          {...field}
                          type="number"
                          icon={<FiPercent />}
                          placeholder="15"
                          min="1"
                          max="100"
                          onChange={(e) =>
                            field.onChange(parseFloat(e.target.value) || 0)
                          }
                        />
                        {discountValue > 0 && (
                          <div className="text-xs text-muted-foreground">
                            Customers will save {discountValue}% on their
                            purchase
                          </div>
                        )}
                      </div>
                    </FormField>
                  )}
                />
              </FormSection>

              {/* Purchase Requirements Section */}
              <FormSection
                title="Purchase Requirements"
                description="Define minimum and maximum purchase amounts"
              >
                <Controller
                  name="min_purchase"
                  control={control}
                  rules={{
                    required: "Minimum purchase is required",
                    min: { value: 0, message: "Cannot be negative" },
                  }}
                  render={({ field }) => (
                    <FormField
                      label="Minimum Purchase"
                      error={errors.min_purchase?.message}
                      required
                      icon={<FiDollarSign className="w-4 h-4" />}
                    >
                      <InputWithIcon
                        {...field}
                        type="number"
                        icon={<FiDollarSign />}
                        placeholder="50.00"
                        step="0.01"
                        min="0"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormField>
                  )}
                />

                <Controller
                  name="max_purchase"
                  control={control}
                  rules={{
                    required: "Maximum purchase is required",
                    min: { value: 0, message: "Cannot be negative" },
                    validate: (value, formValues) =>
                      value >= formValues.min_purchase ||
                      "Must be greater than or equal to minimum purchase",
                  }}
                  render={({ field }) => (
                    <FormField
                      label="Maximum Purchase"
                      error={errors.max_purchase?.message}
                      required
                      icon={<FiDollarSign className="w-4 h-4" />}
                    >
                      <InputWithIcon
                        {...field}
                        type="number"
                        icon={<FiDollarSign />}
                        placeholder="500.00"
                        step="0.01"
                        min="0"
                        onChange={(e) =>
                          field.onChange(parseFloat(e.target.value) || 0)
                        }
                      />
                    </FormField>
                  )}
                />
              </FormSection>

              {/* Usage Limits Section */}
              <FormSection
                title="Usage Limits"
                description="Control how many times this coupon can be used"
              >
                <Controller
                  name="max_uses"
                  control={control}
                  rules={{
                    required: "Maximum uses is required",
                    min: { value: 1, message: "Must allow at least 1 use" },
                  }}
                  render={({ field }) => (
                    <FormField
                      label="Maximum Uses"
                      error={errors.max_uses?.message}
                      required
                      icon={<FiHash className="w-4 h-4" />}
                    >
                      <InputWithIcon
                        {...field}
                        type="number"
                        icon={<FiHash />}
                        placeholder="100"
                        min="1"
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value) || 0)
                        }
                      />
                    </FormField>
                  )}
                />
              </FormSection>

              {/* Expiration & Status Section */}
              <FormSection
                title="Expiration & Status"
                description="Set when the coupon expires and its active status"
              >
                <Controller
                  name="expires_at"
                  control={control}
                  rules={{
                    required: "Expiration date is required",
                    validate: (value) =>
                      new Date(value) > new Date() ||
                      "Expiration date must be in the future",
                  }}
                  render={({ field }) => (
                    <FormField
                      label="Expiration Date"
                      error={errors.expires_at?.message}
                      required
                      icon={<FiCalendar className="w-4 h-4" />}
                    >
                      <InputWithIcon
                        {...field}
                        type="datetime-local"
                        icon={<FiCalendar />}
                        onChange={(e) => {
                          // Convert datetime-local to ISO 8601 format with Z
                          const dateValue = e.target.value;
                          if (dateValue) {
                            const isoDate = new Date(dateValue).toISOString();
                            field.onChange(isoDate);
                          } else {
                            field.onChange("");
                          }
                        }}
                        value={
                          field.value
                            ? new Date(field.value).toISOString().slice(0, 16)
                            : ""
                        }
                      />
                    </FormField>
                  )}
                />

                <Controller
                  name="is_active"
                  control={control}
                  render={({ field }) => (
                    <FormField
                      label="Active Status"
                      icon={<FiToggleLeft className="w-4 h-4" />}
                    >
                      <div className="flex items-center space-x-2 pt-2">
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          id="is_active"
                        />
                        <Label
                          htmlFor="is_active"
                          className="text-sm font-normal text-muted-foreground cursor-pointer"
                        >
                          {field.value
                            ? "Coupon is active"
                            : "Coupon is inactive"}
                        </Label>
                      </div>
                    </FormField>
                  )}
                />
              </FormSection>

              {/* Form Actions */}
              <div className="flex flex-col-reverse sm:flex-row gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => reset()}
                  className="w-full sm:w-auto"
                  disabled={isSubmitting}
                >
                  Reset Form
                </Button>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  className="w-full sm:flex-1"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creating Coupon..." : "Create Coupon"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CouponForm;
