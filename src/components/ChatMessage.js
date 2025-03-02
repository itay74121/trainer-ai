import React, { useState, useEffect, useRef, useCallback } from "react";
import "./ChatMessage.css";
//import Table from "./Table";

function ChatMessage({ message, user }) {
    const messageRef = useRef(null); // Reference to the message div
    const [marginRight, setMarginRight] = useState(0); // State for margin-right
    const resizeTimeout = useRef(null); // Ref to store timeout for debouncing

    // Function to calculate margin-right
    const calculateMarginRight = () => {
        if (messageRef.current) {
            const divWidth = messageRef.current.offsetWidth; // Get the width of the message div
            const totalWidth = window.innerWidth; // Get the viewport width (100vw)
            const margin = totalWidth - divWidth - 30; // Adjust the subtraction for padding or other factors
            setMarginRight(margin); // Update the margin-right state
        }
    };

    // Use requestAnimationFrame to ensure DOM is updated before calculating margin
    const handleResize = useCallback(() => {
        cancelAnimationFrame(resizeTimeout.current); // Cancel any pending animation frame
        resizeTimeout.current = requestAnimationFrame(() => {
            calculateMarginRight(); // Perform the calculation after DOM updates
        });
    }, []);

    // Effect to calculate margin on mount and resize
    useEffect(() => {
        calculateMarginRight(); // Initial calculation

        // Add resize event listener with debounce
        window.addEventListener("resize", handleResize);
        
        // Cleanup event listener
        return () => {
            window.removeEventListener("resize", handleResize);
            cancelAnimationFrame(resizeTimeout.current); // Clean up any pending animation frame
        };
    },[handleResize]); // Empty dependency array, so effect runs only once on mount

    return (
        <p
            ref={messageRef} // Attach the ref to the message div
            className={user === true ? "chat-message" : "chat-message-other"}
            style={user === true ? { marginRight: `${marginRight}px` }:{ marginLeft: `${marginRight}px` }} // Dynamically set the margin-right
        >
           {message}
        </p>
    );
}

export default ChatMessage;
