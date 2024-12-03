import React, { useState } from "react";

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How can I participate in a tournament?",
      answer:
      "To participate in a tournament, register on our website for the specific tournament you're interested in. You need to form a team to participate in a tournament. Follow the registration instructions, and ensure that you meet the eligibility requirements.",
    },
    {
      question: "Can I participate as an Individual in a tournament?",
      answer:
      "No! we are actively working on a solution to help connect individual players with teams. This feature will be available soon! Thank you for your patience.",
    },
    {
      question: "Is there an entry fee for the tournaments?",
      answer:
        "Some tournaments may have an entry fee to cover prize pool contributions, while others may be free to enter. Check the specific tournament details for information on fees and prize structures.",
    },
    {
      question: "What are the prize rewards for winners?",
      answer:
        "Prize rewards vary depending on the tournament and its sponsor. Winners can receive cash prizes, gaming gear, gift cards. Prize details are provided on each tournament's page.",
    },
    {
      question: "How do I check my tournament schedule?",
      answer:
        "Once you’ve registered, you can check the tournament schedule by logging into your account on our website. The schedule will also be sent to you via email or available on the specific tournament page.",
    },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-black p-2 flex items-center justify-center px-10">
      <div className="px-6 py-10 bg-[#070614] shadow-lg m-3 rounded-lg w-full">
        <h1 className="text-2xl font-semibold text-white text-center mb-6">
          Frequently Asked Questions
        </h1>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-gray-700">
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full text-left flex justify-between items-center py-3 text-lg text-white focus:outline-none transition duration-500 ease-in-out">
                {faq.question}
                <span
                  className={`transform transition-transform duration-500 ${
                    activeIndex === index ? "rotate-180" : ""
                  }`}>
                  ▼
                </span>
              </button>
              <div
                className={`overflow-hidden transition-all duration-500 ease-in-out ${
                  activeIndex === index ? "max-h-40" : "max-h-0"
                }`}>
                <p className="text-white mt-2 mb-5">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
