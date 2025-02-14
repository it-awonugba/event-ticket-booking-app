import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { Progress } from "./components/ui/progress";
import { RadioGroup } from "./components/ui/radio-group";
import Ticket from "./components/Ticket";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./components/ui/select";
import { Button } from "./components/ui/button";

interface TicketData {
  id: number;
  price: number;
  availableTickets: number;
  title: string;
}

function App() {
  const [progress, setProgress] = useState<number>(1);
  const [activeTicketId, setActiveTicketId] = useState<number>(1);

  const tickets: TicketData[] = [
    { id: 1, price: 0, availableTickets: 20, title: "regular access" },
    { id: 2, price: 50, availableTickets: 20, title: "vip access" },
    { id: 3, price: 150, availableTickets: 20, title: "vvip access" },
  ];

  const handleTicketClick = (ticketId: number) => {
    setActiveTicketId(ticketId);
  };

  const handleNextClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (progress < tickets.length) {
      setProgress(progress + 1);
    }
  };

  const handleCancelClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setProgress(1);
  };

  return (
    <main className="flex flex-col w-screen py-3 px-5 gap-y-5 overflow-hidden xl:gap-y-12">
      <Header />
      <section className="flex flex-col w-full p-6 rounded-xl mx-auto bg-layer-background border border-ring gap-8 xl:p-12 xl:w-[43.75rem] xl:bg-card xl:p-12">
        <section className="flex flex-col gap-y-3">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <span className="text-2xl font-normal font-primary xl:text-[2rem]">
              Ticket Selection
            </span>
            <span className="text-base font-normal font-secondary text-card-foreground">
              Step 1/3
            </span>
          </div>
          <Progress value={33.33} className="w-full h-1" />
        </section>

        <section className="flex flex-col gap-8 p-0 bg-layer-background xl:p-6 xl:border xl:border-ring xl:rounded-lg">
          {/* Hero Block */}
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
          {/* Form */}
          <form className="flex flex-col gap-8">
            {/*Ticket Choice*/}
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
            <section className="flex flex-col flex-col-reverse justify-between gap-4 items-center xl:flex-row xl:border xl:border-ring xl:rounded-xl xl:bg-card xl:px-12 xl:h-12 ">
              <Button
                onClick={handleCancelClick}
                className="w-full h-full bg-transparent border border-progress-foreground rounded-xs text-progress-foreground text-base font-primary font-normal"
              >
                Cancel
              </Button>
              <Button
                onClick={handleNextClick}
                className="w-full h-full bg-progress-foreground rounded-xs text-base font-primary font-normal"
              >
                Next
              </Button>
            </section>
          </form>
        </section>
      </section>
    </main>
  );
}

export default App;
