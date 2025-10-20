import { Message } from "@/app/_lib/types";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { MdPerson, MdSupportAgent } from "react-icons/md";

interface TicketMessagesProps {
  messages: Message[];
}

export function TicketMessages({ messages }: TicketMessagesProps) {
  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Conversation</h3>
      <div className="space-y-4 max-h-[500px] overflow-y-auto">
        {messages.map((message, index) => (
          <motion.div
            key={message.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`flex gap-3 ${
              message.sender === "admin" ? "flex-row-reverse" : "flex-row"
            }`}
          >
            <Avatar className="h-8 w-8 mt-1">
              <AvatarFallback
                className={
                  message.sender === "admin"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300"
                }
              >
                {message.sender === "admin" ? (
                  <MdSupportAgent size={18} />
                ) : (
                  <MdPerson size={18} />
                )}
              </AvatarFallback>
            </Avatar>

            <div
              className={`flex flex-col max-w-[70%] ${
                message.sender === "admin" ? "items-end" : "items-start"
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="text-sm font-medium text-gray-700">
                  {message.senderName}
                </span>
                <span className="text-xs text-gray-500">
                  {message.timestamp.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </span>
              </div>
              <div
                className={`rounded-lg p-3 ${
                  message.sender === "admin"
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-900"
                }`}
              >
                <p className="text-sm">{message.content}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
