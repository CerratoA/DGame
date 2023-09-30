import React from 'react';
import { Steps } from 'antd';

export enum CreateMapStatus {
  EDIT = 'EDIT',
  CREATED = 'CREATED',
  PUBLISHED = 'PUBLISHED',
}

interface StepsProgressProps {
  status: CreateMapStatus;
}

export const StepsProgress: React.FC<StepsProgressProps> = ({ status }) => {
  // Define the steps based on the enum
  const steps = Object.values(CreateMapStatus).map(status => ({ title: status }));

  // Find the index of the current status
  const current = steps.findIndex((step) => step.title === status);

  return (
    <Steps
      className="steps-progress"
      size="small"
      current={current}
      items={steps}
    />
  );
};
