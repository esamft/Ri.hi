
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step3Props {
  priorities: string[];
  priorityHours: number[];
  onInputChange: (field: string, value: string, index?: number) => void;
}

export const Step3: React.FC<Step3Props> = ({ priorities, priorityHours, onInputChange }) => {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-purple-900">Suas Prioridades</h2>
        <p className="text-purple-600">Defina até 5 projetos/áreas que são prioridade para você esta semana</p>
      </div>
      <div className="space-y-4">
        {priorities.map((priority, index) => (
          <div key={index} className="space-y-2">
            <Label htmlFor={`priority-${index}`}>Prioridade {index + 1}</Label>
            <div className="flex gap-2">
              <Input
                id={`priority-${index}`}
                placeholder={`Ex: ${index === 0 ? 'Estudar inglês' : index === 1 ? 'Projeto trabalho' : 'Exercitar-se'}`}
                value={priority}
                onChange={(e) => onInputChange('priorities', e.target.value, index)}
                className="flex-1"
              />
              <Input
                type="number"
                placeholder="h"
                value={priorityHours[index] || ''}
                onChange={(e) => onInputChange('priorityHours', e.target.value, index)}
                className="w-16"
                min="0"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
