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
import { useState } from "react";
import { Input } from "../ui/input";
import EnvelopeIcon from "../../assets/envelope.svg";
import { Textarea } from "../ui/textarea";
import User from "../../assets/User.png";
import { Button } from "../ui/button";

interface FormProperties {
  tickets: TicketData[];
  progress: number;
  printContentRef: React.RefObject<HTMLElement | null>;
  handleNextClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleCancelClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

type FormInputType = {
  name?: string;
  email?: string;
  avatar?: string;
  ticketType?: string;
  ticketQuantity?: string;
};

export default function MultiForm({
  tickets,
  progress,
  printContentRef,
  handleNextClick,
  handleCancelClick,
}: FormProperties) {
  const [formInput, setFormInput] = useState<FormInputType>({});
  const [activeTicketId, setActiveTicketId] = useState<number>(1);

  const handleTicketSelect = (ticketId: number) => {
    setActiveTicketId(ticketId);
    setFormInput((prev) => ({
      ...prev,
      ticketType: tickets[ticketId - 1].title.toUpperCase(),
    }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormInput((prev) => ({ ...prev, [id]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormInput((prev) => ({ ...prev, ticketQuantity: value }));
  };

  const handleImageUpload = (url: string) => {
    setFormInput((prev) => ({ ...prev, avatar: url }));
  };

  return (
    <form>
      <section
        className={`flex flex-col gap-8 p-0 ${
          progress < 3
            ? "bg-layer-background xl:p-6 xl:border xl:border-ring xl:rounded-lg"
            : ""
        } `}
      >
        {progress === 1 && (
          <>
            <section className="flex flex-col h-[15.1875rem] items-center justify-between space-y-2 py-4 px-6  border border-ring rounded-md description-card xl:py-6 xl:px-6 xl:h-fit">
              <div className="w-full xl:w-2/3">
                <h1 className="font-auxilliary p-0 text-5xl text-center xl:text-[3.875rem]">
                  Techember Fest ”25
                </h1>
                <p className="text-base text-center font-secondary font-normal">
                  Join us for an unforgettable experience at [Event Name]!
                  Secure your spot now.
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
                      className="grid grid-cols-1 xl:grid-cols-3 p-0 w-full"
                    >
                      {tickets.map((ticket) => (
                        <Ticket
                          {...ticket}
                          isActive={ticket.id === activeTicketId}
                          onClick={() => handleTicketSelect(ticket.id)}
                          key={ticket.id}
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
                <Select onValueChange={handleSelectChange}>
                  <SelectTrigger className="w-full border border-divider-background rounded-[0.75rem] p-3">
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
            <ImageUploader onImageUpload={handleImageUpload} />
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
                onChange={handleChange}
              />
            </section>
            <section className="flex flex-col gap-2">
              <Label
                htmlFor="email"
                className="text-base font-secondary font-normal"
              >
                Enter your email
              </Label>
              <div className="relative">
                <Input
                  id="email"
                  type="email"
                  placeholder="hello@avioflagos.io"
                  className="rounded-[0.75rem] border border-divider-background h-12 pl-10"
                  onChange={handleChange}
                />
                <img
                  src={EnvelopeIcon}
                  alt="Envelope Icon"
                  className="absolute left-3 top-1/2 transform -translate-y-1/2"
                />
              </div>
            </section>
            <section className="flex flex-col gap-2">
              <Label
                htmlFor="name"
                className="text-base font-secondary font-normal"
              >
                About the project
              </Label>
              <Textarea
                id="aboutProject"
                className="rounded-[0.75rem] border border-divider-background h-[7.9375rem]"
                onChange={handleChange}
              />
            </section>
          </>
        )}

        {progress === 3 && (
          <>
            <section className="flex flex-col gap-8" ref={printContentRef}>
              <div className="text-center flex flex-col gap-4">
                <h1 className="font-ticket font-normal text-[2rem]">
                  Your Ticket is Booked!
                </h1>
                <p className="font-secondary text-base font-bold">
                  Check your email for a copy or you can download
                </p>
              </div>
              <section className="py-8 px-[1.3125rem]">
                <div className="w-[18.75rem] h-[37.5rem] mx-auto p-5 ticket">
                  <div className="flex flex-col gap-5 w-[16.25rem] h-[27.875rem] border border-progress-foreground rounded-[1rem] bg-dark-background p-[0.88rem]">
                    <div className="text-center flex flex-col gap-1">
                      <h3 className="font-auxilliary font-normal text-[2.125rem]">
                        Techember Fest ”25
                      </h3>
                      <p className="font-secondary font-normal text-[0.625rem]">
                        📍 04 Rumens road, Ikoyi, Lagos
                      </p>
                      <p className="font-secondary font-normal text-[0.625rem]">
                        📅 March 15, 2025 | 7:00 PM
                      </p>
                    </div>
                    <div className="flex items-center justify-center">
                      <div className="w-[8.75rem] h-[8.75rem]">
                        <img
                          src={!formInput.avatar ? User : formInput.avatar}
                          alt="user photo"
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-0 p-1 border border-border-variant rounded-sm">
                      <div className="grid grid-cols-2 px-2 pt-2 pb-0 gap-1 border-b border-active-ticket-background">
                        <div className="col-span-1 flex flex-col border-r border-active-ticket-background p-2">
                          <span className="font-secondary font-normal text-[0.625rem] opacity-[0.33]">
                            Enter your name
                          </span>
                          <span className="font-secondary font-normal font-bold text-[0.75rem]">
                            {formInput.name}
                          </span>
                        </div>
                        <div className="col-span-1 p-2 flex flex-col">
                          <span className="font-secondary font-normal text-[0.625rem] opacity-[0.33]">
                            Enter your email*
                          </span>
                          <span className="font-secondary font-normal font-bold text-[0.75rem] truncate">
                            {formInput.email}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 px-2 pt-0 pb-0 gap-1 border-b border-active-ticket-background">
                        <div className="col-span-1 flex flex-col border-r border-active-ticket-background p-2">
                          <span className="font-secondary font-normal text-[0.625rem] opacity-[0.33]">
                            Ticket Type:
                          </span>
                          <span className="font-secondary font-normal font-bold text-[0.75rem]">
                            {formInput.ticketType}
                          </span>
                        </div>
                        <div className="col-span-1 flex flex-col p-2">
                          <span className="font-secondary font-normal text-[0.625rem] opacity-[0.33]">
                            Ticket For:
                          </span>
                          <span className="font-secondary font-normal font-bold text-[0.75rem]">
                            {formInput.ticketQuantity}
                          </span>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="font-secondary font-normal text-[0.625rem] opacity-[0.33]">
                          Special request?
                        </div>
                        <div className="font-secondary font-normal text-[0.625rem]">
                          Nil ? Or the users sad story they write in there gets
                          this whole space, Max of three rows
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mt-10">Barcode</div>
                </div>
              </section>
            </section>
          </>
        )}

        <section className="flex flex-col flex-col-reverse justify-between gap-4 items-center xl:flex-row xl:h-12 ">
          <Button
            onClick={handleCancelClick}
            className="w-full h-full bg-transparent border border-progress-foreground rounded-xs text-progress-foreground text-base font-primary font-normal hover:text-white"
          >
            {progress === 1 && "Cancel"}
            {progress === 2 && "Back"}
            {progress === 3 && "Book Another Ticket"}
          </Button>
          <Button
            onClick={handleNextClick}
            className="w-full h-full bg-progress-foreground rounded-xs text-base font-primary font-normal"
          >
            {progress === 1 && "Next"}
            {progress === 2 && "Get My Ticket"}
            {progress === 3 && "Download Ticket"}
          </Button>
        </section>
      </section>
    </form>
  );
}
