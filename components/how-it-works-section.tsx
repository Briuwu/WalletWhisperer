import Image from "next/image";

import howItWorks1 from "@/public/how-it-works-1.png";
import howItWorks2 from "@/public/how-it-works-2.png";
import howItWorks3 from "@/public/how-it-works-3.png";

export const HowItWorksSection = () => {
  return (
    <section className="w-full space-y-10 py-12 md:py-24 lg:py-32 xl:py-48">
      <h2 className="text-center text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
        all the good stuff
      </h2>
      <ul className="space-y-20">
        <li className="grid items-center gap-10 rounded-xl bg-neutral-100 p-10 shadow lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-2xl font-bold">
              Tell WalletWhisperer your goals
            </p>
            <p className="text-lg font-medium text-neutral-600">
              Chat about your financial situation and what you want to achieve
            </p>
          </div>
          <Image src={howItWorks1} alt="" className="shadow" />
        </li>
        <li className="grid items-center gap-10 rounded-xl bg-neutral-100 p-10 shadow lg:grid-cols-2">
          <Image src={howItWorks2} alt="" className="shadow" />
          <div className="space-y-3">
            <p className="text-2xl font-bold">Get personalized advice</p>
            <p className="text-lg font-medium text-neutral-600">
              Receive smart, real-time guidance tailored to your specific
              situation
            </p>
          </div>
        </li>
        <li className="grid items-center gap-10 rounded-xl bg-neutral-100 p-10 shadow lg:grid-cols-2">
          <div className="space-y-3">
            <p className="text-2xl font-bold">Receive a structured report</p>
            <p className="text-lg font-medium text-neutral-600">
              Get a detailed financial report you can actually understand and
              use
            </p>
          </div>
          <Image src={howItWorks3} alt="" className="shadow" />
        </li>
      </ul>
    </section>
  );
};
