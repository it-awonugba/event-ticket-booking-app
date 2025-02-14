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
    <div className="w-full max-w-full min-w-0 overflow-hidden">
      <RadioGroupItem
        value={`${title}-${id}`}
        id={`${title}-${id}`}
        className="hidden"
      />
      <Label
        htmlFor={`${title}-${id}`}
        className={`grid grid-cols-[1fr_80px] p-2 gap-0 rounded-[0.75rem] box-border ${
          isActive ? "bg-border" : "bg-divider-background"
        }`}
        onClick={onClick}
      >
        <span className="col-span-1 flex flex-col gap-0">
          <span className="text-base font-secondary font-normal truncate">
            {title.toUpperCase()}
          </span>
          <span className="font-secondary font-normal text-sm truncate">
            {availableTickets} left!
          </span>
        </span>

        <span
          className={`col-span-1 p-2 box-border border border-primary rounded-xs h-fit overflow-hidden text-ellipsis whitespace-nowrap ${
            isActive ? "bg-ring" : ""
          }`}
        >
          <span className="text-xl font-semibold font-secondary p-0 text-right block">
            {price === 0
              ? "Free"
              : USDFormatter.format(price).replace(".00", "")}
          </span>
        </span>
      </Label>
    </div>
  );
}
