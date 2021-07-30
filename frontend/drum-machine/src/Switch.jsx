import React from "react";

export default function Switch({ active, onChange }) {
  return (
    <label className="switch">
      <input checked={active} onChange={onChange} type="checkbox" />
      <span className="switch-thumb"></span>
    </label>
  );
}
