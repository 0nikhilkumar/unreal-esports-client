import React, { useEffect, useState } from "react";
// import "./CustomCursor.css";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    // Update cursor position
    const updatePosition = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", updatePosition);

    // Clean up event listener
    return () => {
      window.removeEventListener("mousemove", updatePosition);
    };
  }, []);

  useEffect(() => {
    // Add hover effects to interactive elements
    const hoverElements = document.querySelectorAll("a, button");

    const addHoverEffect = () => setHovered(true);
    const removeHoverEffect = () => setHovered(false);

    hoverElements.forEach((el) => {
      el.addEventListener("mouseenter", addHoverEffect);
      el.addEventListener("mouseleave", removeHoverEffect);
    });

    // Clean up hover effects
    return () => {
      hoverElements.forEach((el) => {
        el.removeEventListener("mouseenter", addHoverEffect);
        el.removeEventListener("mouseleave", removeHoverEffect);
      });
    };
  }, []);

  return (
    <div
      className={`custom-cursor ${hovered ? "hovered" : ""}`}
      style={{
        top: `${position.y}px`,
        left: `${position.x}px`,
      }}
    ></div>
  );
};

export default CustomCursor;
