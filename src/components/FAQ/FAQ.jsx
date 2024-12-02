import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "What is React?",
      answer: "React is a JavaScript library for building user interfaces.",
    },
    {
      question: "What is Tailwind CSS?",
      answer: "Tailwind CSS is a utility-first CSS framework for rapid UI development.",
    },
    {
      question: "Is this FAQ section responsive?",
      answer: "Yes! It is fully responsive for all devices.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-[#0C1316] p-2 flex items-center justify-center">
    <div className="px-6 py-10 bg-[#130F1A] shadow-lg m-3 rounded-lg w-full">
      <h1 className="text-2xl font-semibold text-white text-center mb-6">
        Frequently Asked Questions
      </h1>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-700">
            <button
              onClick={() => toggleFAQ(index)}
              className="w-full text-left flex justify-between items-center py-3 text-lg text-white focus:outline-none transition duration-500 ease-in-out"
            >
              {faq.question}
              <span
                className={`transform transition-transform duration-500 ${
                  activeIndex === index ? "rotate-180" : ""
                }`}
              >
                ▼
              </span>
            </button>
            <div
              className={`overflow-hidden transition-all duration-500 ease-in-out ${
                activeIndex === index ? "max-h-40" : "max-h-0"
              }`}
            >
              <p className="text-white mt-2">{faq.answer}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
  
  );
};

export default FAQ;
