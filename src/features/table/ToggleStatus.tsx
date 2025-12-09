import { Checkbox, Text } from "@shopify/polaris";
import { useState } from "react";

interface ToggleStatusProps {
  initialStatus: "Active" | "Inactive";
  onToggle?: (newStatus: "Active" | "Inactive") => void;
}

const ToggleStatus: React.FC<ToggleStatusProps> = ({ initialStatus, onToggle }) => {
  const [checked, setChecked] = useState(initialStatus === "Active");

  const handleChange = (newChecked: boolean) => {
    setChecked(newChecked);
    const newStatus = newChecked ? "Active" : "Inactive";
    onToggle?.(newStatus);
  };

  return (
    <Checkbox
      label={
        <Text as="span" visuallyHidden>
            Toggle offer status
        </Text>

      }
      checked={checked}
      onChange={handleChange}
    />
  );
};

export default ToggleStatus;
