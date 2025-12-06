"use client"
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { MdSend } from "react-icons/md";

interface TicketReplyFormProps {
  disabled?: boolean;
}

export function TicketReplyForm({
  disabled,
}: TicketReplyFormProps) {
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!message.trim() || disabled) return;

    setIsSending(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    setMessage("");
    setIsSending(false);
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
            disabled={isSending}
          />
          <div className="flex justify-end">
            <Button
              type="submit"
              disabled={!message.trim() || isSending}
              className="gap-2 text-background font-medium"
            >
              <MdSend />
              {isSending ? "Sending..." : "Send Reply"}
            </Button>
          </div>
        </form>
      )}
    </div>
  );
}
