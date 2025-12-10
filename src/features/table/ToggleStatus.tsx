import React, { useState } from 'react';

interface ToggleStatusProps {
  initialStatus: 'Active' | 'Inactive';
  onToggle: (newStatus: 'Active' | 'Inactive') => void;
}

const ToggleStatus: React.FC<ToggleStatusProps> = ({
  initialStatus,
  onToggle,
}) => {
  const [status, setStatus] = useState<'Active' | 'Inactive'>(initialStatus);

  const handleChange = (event: CustomEvent<{ checked: boolean }>) => {
    const checked = event.detail.checked;
    const newStatus = checked ? 'Active' : 'Inactive';
    setStatus(newStatus);
    onToggle(newStatus);
  };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <s-switch
        id="offer-switch"
        checked={status === 'Active'}
        onChange={(e) =>
          handleChange(e as unknown as CustomEvent<{ checked: boolean }>)
        }
      />
    </div>
  );
};

export default ToggleStatus;
