import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";

interface CreateAttributeFormProps {
  type: "size" | "color";
  isPending: boolean
  onCreate: (name: string, hex?: string) => void;
  onCancel: () => void;
}

export function CreateAttributeForm({
  type,
  onCreate,
  isPending,
  onCancel,
}: CreateAttributeFormProps) {
  const [name, setName] = useState("");
  const [hex, setHex] = useState("#000000");

  const handleSubmit = () => {
    if (type === "color") {
      onCreate(name, hex);
    } else {
      onCreate(name);
    }
    setName("");
    setHex("#000000");
  };

  const handleCancel = () => {
    onCancel();
    setName("");
    setHex("#000000");
  };

  return (
    <div className="p-4 space-y-3">
      <div className="space-y-2">
        <Label htmlFor={`${type}-name`}>
          {type === "color" ? "Color Name" : "Size Name"}
        </Label>
        <Input
          id={`${type}-name`}
          placeholder={type === "color" ? "e.g., Burgundy" : "e.g., 4XL"}
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoFocus
        />
      </div>

      {type === "color" && (
        <div className="space-y-2">
          <Label htmlFor="color-hex">Color Code</Label>
          <div className="flex gap-2">
            <input
              type="color"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              className="w-14 h-10 rounded border cursor-pointer"
            />
            <Input
              id="color-hex"
              value={hex}
              onChange={(e) => setHex(e.target.value)}
              placeholder="#000000"
              className="flex-1 font-mono"
            />
          </div>
        </div>
      )}

      <div className="flex gap-2">
        <Button
          onClick={handleSubmit}
          disabled={!name.trim() || isPending}
          className="flex-1"
          size="sm"
        >
          {isPending ? <Spinner /> : "Create"}
        </Button>
        <Button disabled={isPending} onClick={handleCancel} variant="outline" size="sm">
          Cancel
        </Button>
      </div>
    </div>
  );
}
