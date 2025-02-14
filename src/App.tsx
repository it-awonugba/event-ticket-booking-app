import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { Progress } from "./components/ui/progress";

import { Button } from "./components/ui/button";
import MultiForm from "./components/MultiForm/MultiForm";

export interface TicketData {
  id: number;
  price: number;
  availableTickets: number;
  title: string;
}

function App() {
  const [progress, setProgress] = useState<number>(1);
  const [activeTicketId, setActiveTicketId] = useState<number>(1);
  const formTitles = ["Ticket Selection", "Attendee Details", "Ready"];
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
              {formTitles[progress - 1]}
            </span>
            <span className="text-base font-normal font-secondary text-card-foreground">
              Step {progress}/{tickets.length}
            </span>
          </div>
          <Progress value={33.33} className="w-full h-1" />
        </section>

        <section className="flex flex-col gap-8 p-0 bg-layer-background xl:p-6 xl:border xl:border-ring xl:rounded-lg">
          <MultiForm
            tickets={tickets}
            activeTicketId={activeTicketId}
            progress={progress}
            handleTicketClick={handleTicketClick}
          />

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
        </section>
      </section>
    </main>
  );
}

export default App;
