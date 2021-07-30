import React from "react";
import { CgMaximizeAlt, CgMinimizeAlt } from "react-icons/cg";

export default function Window({
  children,
  title,
  icon,
  onClick,
  show,
  scroll,
}) {
  return (
    <div
      className={`window${show ? "" : " hide"}${scroll ? "" : " no-scroll"}`}
    >
      <div className="window-bar">
        <span className="window-bar-icon">{icon}</span>
        <span className="window-bar-title">{title}</span>
        <button className="show-hide-btn" onClick={onClick}>
          {show ? <CgMinimizeAlt /> : <CgMaximizeAlt />}
        </button>
      </div>
      <div className="window-body">{children}</div>
    </div>
  );
}
