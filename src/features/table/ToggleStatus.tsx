import React, { useState } from "react";

interface ToggleStatusProps {
  initialStatus: "Active" | "Inactive";
  onToggle: (newStatus: "Active" | "Inactive") => void;
}

const ToggleStatus: React.FC<ToggleStatusProps> = ({ initialStatus, onToggle }) => {
  const [status, setStatus] = useState<"Active" | "Inactive">(initialStatus);

  // Polaris Web Components генерируют CustomEvent с detail: { checked: boolean }
  const handleChange = (event: CustomEvent<{ checked: boolean }>) => {
    const checked = event.detail.checked;
    const newStatus = checked ? "Active" : "Inactive";
    setStatus(newStatus);
    onToggle(newStatus);
  };

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
      <s-switch
        id="offer-switch"
        label="Enable feature"
        checked={status === "Active"}
        // TS не знает про CustomEvent → используем приведение
        onChange={(e) => handleChange(e as CustomEvent<{ checked: boolean }>)}
      />
      <span>{status === "Active" ? "On" : "Off"}</span>
    </div>
  );
};

export default ToggleStatus;
