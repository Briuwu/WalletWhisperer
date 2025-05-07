import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

export const FAQSection = () => {
  return (
    <section className="w-full bg-gray-50 py-12 md:py-24 lg:py-32" id="faq">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Frequently Asked Questions
            </h2>
            <p className="max-w-[900px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Got questions? We&apos;ve got answers.
            </p>
          </div>
        </div>
        <div className="mx-auto max-w-3xl py-12">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>Is this free?</AccordionTrigger>
              <AccordionContent>
                WalletWhisperer offers a free plan with basic features.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2">
              <AccordionTrigger>
                Do I need to connect my bank account?
              </AccordionTrigger>
              <AccordionContent>
                Nope! WalletWhisperer works based on the information you share
                in your conversation. You can choose to manually enter your
                financial details.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3">
              <AccordionTrigger>How accurate is the advice?</AccordionTrigger>
              <AccordionContent>
                WalletWhisperer provides guidance based on financial best
                practices and the information you share. While our AI is trained
                on financial principles, we recommend consulting with a
                financial professional for major financial decisions.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4">
              <AccordionTrigger>
                Do I have to know anything about finance?
              </AccordionTrigger>
              <AccordionContent>
                Not at all! WalletWhisperer is designed for people who
                don&apos;t have financial expertise. Our AI explains concepts in
                simple terms and avoids confusing jargon.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
