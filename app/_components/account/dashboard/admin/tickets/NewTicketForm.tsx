"use client";
import { createticket } from "@/app/_lib/actions/ticketAction";
import { TicketPriority } from "@/app/_lib/types";
// import { createTicket } from "@/app/_lib/actions/ticketAction";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { MdSend } from "react-icons/md";
import { toast } from "sonner";

export function NewTicketForm() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formData, setFormData] = useState({
    subject: "",
    orderId: "",
    priority: "medium",
    message: "",
  });

  const handleSubmit = () => {
    if (!formData.subject.trim() || !formData.message.trim()) {
      toast.error("Subject and message are required");
      return;
    }

    startTransition(async () => {
      const result = await createticket({
        subject: formData.subject.trim(),
        order_id: formData.orderId ? Number(formData.orderId) : undefined,
        priority: formData.priority as TicketPriority,
        message: formData.message.trim(),
      });

      if (result.success && result.ticketId) {
        toast.success("Ticket created successfully");
        router.push(`/account/tickets/${result.ticketId}`);
      } else {
        toast.error(result.message || "Failed to create ticket");
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="subject">
          Subject <span className="text-destructive">*</span>
        </Label>
        <Input
          id="subject"
          value={formData.subject}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, subject: e.target.value }))
          }
          placeholder="Brief description of your issue"
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="orderId">Order ID (Optional)</Label>
        <Input
          id="orderId"
          type="number"
          value={formData.orderId}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, orderId: e.target.value }))
          }
          placeholder="Related order number"
          disabled={isPending}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="priority">Priority</Label>
        <Select
          value={formData.priority}
          onValueChange={(value) =>
            setFormData((prev) => ({ ...prev, priority: value }))
          }
          disabled={isPending}
        >
          <SelectTrigger id="priority">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="low">Low</SelectItem>
            <SelectItem value="medium">Medium</SelectItem>
            <SelectItem value="high">High</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="message">
          Message <span className="text-destructive">*</span>
        </Label>
        <Textarea
          id="message"
          value={formData.message}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, message: e.target.value }))
          }
          placeholder="Describe your issue in detail..."
          className="min-h-[150px] resize-none"
          disabled={isPending}
        />
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isPending}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={isPending || !formData.subject.trim() || !formData.message.trim()}
          className="gap-2 text-background font-medium"
        >
          <MdSend />
          {isPending ? "Creating..." : "Create Ticket"}
        </Button>
      </div>
    </div>
  );
}