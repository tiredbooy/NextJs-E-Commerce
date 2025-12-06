"use client";
import { addTicketMessage } from "@/app/_lib/actions/ticketAction";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState, useTransition } from "react";
import { MdSend } from "react-icons/md";
import { toast } from "sonner";

interface TicketReplyFormProps {
  disabled?: boolean;
  ticketId: number;
}

export function TicketReplyForm({ disabled, ticketId }: TicketReplyFormProps) {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || disabled) return;

    startTransition(async () => {
      const result = await addTicketMessage(ticketId, {
        content: message.trim(),
      });
     
      if (!result.success) {
        toast.error(result.message);
      }
    });

    setMessage("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-3">Reply to Ticket</h3>
      {disabled ? (
        <div className="bg-muted rounded-lg p-4 text-center text-muted-foreground font-medium cursor-not-allowed">
          This ticket is closed. Reopen it to send messages.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <Textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type your reply here... (Press Enter to send, Shift+Enter for new line)"
            className="min-h-[100px] resize-none"
            disabled={isPending}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!message.trim() || isPending}
              className="gap-2 text-background font-medium"
            >
              <MdSend />
              {isPending ? "Sending..." : "Send Reply"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
