import { RadioGroup } from "../ui/radio-group";
import Ticket from "../Ticket";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TicketData } from "@/App";
import ImageUploader from "../ImageUploader/ImageUploader";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

interface FormProperties {
  tickets: TicketData[];
  activeTicketId: number;
  progress: number;
  handleTicketClick: (id: number) => void;
}

export default function MultiForm({
  tickets,
  activeTicketId,
  progress,
  handleTicketClick,
}: FormProperties) {
  return (
    <>
      {progress === 1 && (
        <>
          <section className="flex flex-col h-[15.1875rem] items-center justify-between space-y-2 py-4 px-6  border border-ring rounded-md description-card xl:py-6 xl:px-6 xl:h-fit">
            <div className="w-full xl:w-2/3">
              <h1 className="font-auxilliary p-0 text-5xl text-center xl:text-[3.875rem]">
                Techember Fest ”25
              </h1>
              <p className="text-base text-center font-secondary font-normal">
                Join us for an unforgettable experience at [Event Name]! Secure
                your spot now.
              </p>
            </div>
            <div className="flex flex-col justify-between  xl:flex-row xl:gap-4">
              <span className="text-base font-secondary font-normal">
                📍 [Event Location]
              </span>
              <span className="text-base font-secondary font-normal hidden xl:flex">
                | |
              </span>
              <span className="text-base font-secondary font-normal">
                March 15, 2025 | 7:00 PM
              </span>
            </div>
          </section>
          {/* Horizontal rule */}
          <section>
            <div className="border-none h-1 bg-divider-background"></div>
          </section>

          {/*Ticket Choice*/}
          <section className="flex flex-col gap-8">
            <section>
              <div className="flex flex-col space-y-2">
                <div className="font-secondary text-base font-normal">
                  Select Ticket Type:
                </div>
                <div className="border border-divider-background bg-section-background p-4 rounded-md">
                  <RadioGroup
                    defaultValue="1"
                    className="grid grid-cols-1 xl:grid-cols-2 gap-6 p-0 w-full"
                  >
                    {tickets.map((ticket) => (
                      <Ticket
                        {...ticket}
                        isActive={ticket.id === activeTicketId}
                        onClick={() => handleTicketClick(ticket.id)}
                      />
                    ))}
                  </RadioGroup>
                </div>
              </div>
            </section>
            <section className="flex flex-col space-y-2">
              <div className="font-secondary text-base font-normal">
                Number of Tickets:
              </div>
              <Select>
                <SelectTrigger className="w-full border border-divider-background rounded-[0.75rem] px-3 py-5">
                  <SelectValue
                    placeholder="1"
                    className="font-secondary text-base"
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="1">1</SelectItem>
                    <SelectItem value="2">2</SelectItem>
                    <SelectItem value="3">3</SelectItem>
                    <SelectItem value="4">4</SelectItem>
                    <SelectItem value="5">5</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </section>
          </section>
        </>
      )}
      {progress === 2 && (
        <>
          <ImageUploader />
          <section>
            <div className="border-none h-1 bg-divider-background"></div>
          </section>
          <section className="flex flex-col gap-2">
            <Label
              htmlFor="name"
              className="text-base font-secondary font-normal"
            >
              Enter your name
            </Label>
            <Input
              id="name"
              type="text"
              className="rounded-[0.75rem] border border-divider-background h-12"
            />
          </section>
        </>
      )}
    </>
  );
}
