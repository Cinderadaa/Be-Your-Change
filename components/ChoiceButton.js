"use client";

export default function ChoiceButton({ label, onClick }) {
  return (
    <button className="choice-btn glass-holo" onClick={onClick}>
      {label}
    </button>
  );
}