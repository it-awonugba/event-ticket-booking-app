import { Label } from "./ui/label";
import { RadioGroupItem } from "./ui/radio-group";

interface TicketProps {
  id: number;
  price: number;
  title: string;
  availableTickets: number;
  isActive: boolean;
  onClick: () => void;
}

export default function Ticket({
  id,
  price,
  title,
  availableTickets,
  isActive,
  onClick,
}: TicketProps) {
  const USDFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className="w-full max-w-full min-w-0">
      <RadioGroupItem
        value={`${title}-${id}`}
        id={`${title}-${id}`}
        className="hidden"
      />
      <Label
        htmlFor={`${title}-${id}`}
        className={`flex flex-col p-3 gap-3 rounded-[0.75rem] box-border border border-2 ${
          isActive ? "bg-active-ticket-background" : "bg-transparent"
        }`}
        onClick={onClick}
      >
        <span className="text-xl font-semibold font-secondary">
          {price === 0 ? "Free" : USDFormatter.format(price).replace(".00", "")}
        </span>
        <span className="flex flex-col">
          <span className="text-base font-secondary font-normal truncate">
            {title.toUpperCase()}
          </span>
          <span className="font-secondary font-normal text-sm truncate">
            {availableTickets}/{52}
          </span>
        </span>
      </Label>
    </div>
  );
}
