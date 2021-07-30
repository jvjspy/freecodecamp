import React from "react";

export default function Slider({ value, onChange }) {
  return (
    <input
      className="slider"
      type="range"
      min={0}
      max={1}
      step={0.01}
      onChange={onChange}
      value={value}
    />
  );
}
