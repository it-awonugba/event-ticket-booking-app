import { useState } from "react";
import "./App.css";
import Header from "./components/header/Header";
import { Progress } from "./components/ui/progress";
import MultiForm from "./components/MultiForm/MultiForm";

export interface TicketData {
  id: number;
  price: number;
  availableTickets: number;
  title: string;
  soldTickets: 0;
}

function App() {
  const [progress, setProgress] = useState<number>(1);
  const formTitles = ["Ticket Selection", "Attendee Details", "Ready"];
  const tickets: TicketData[] = [
    {
      id: 1,
      price: 0,
      availableTickets: 20,
      title: "regular access",
      soldTickets: 0,
    },
    {
      id: 2,
      price: 50,
      availableTickets: 20,
      title: "vip access",
      soldTickets: 0,
    },
    {
      id: 3,
      price: 150,
      availableTickets: 20,
      title: "vvip access",
      soldTickets: 0,
    },
  ];

  return (
    <main className="flex flex-col w-screen py-3 px-5 gap-y-5 overflow-hidden xl:gap-y-12">
      <Header />
      <section className="flex flex-col w-full p-6 rounded-xl mx-auto mt-28 bg-layer-background border border-ring gap-8 xl:p-12 xl:w-[43.75rem] xl:bg-card xl:p-12">
        <section className="flex flex-col gap-y-3">
          <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between">
            <span className="text-2xl font-normal font-primary xl:text-[2rem]">
              {formTitles[progress - 1]}
            </span>
            <span className="text-base font-normal font-secondary text-card-foreground">
              Step {progress}/{tickets.length}
            </span>
          </div>
          <Progress
            value={(progress / tickets.length) * 100}
            className="w-full h-1"
          />
        </section>

        <MultiForm
          tickets={tickets}
          progress={progress}
          setProgress={setProgress}
        />
      </section>
    </main>
  );
}

export default App;
