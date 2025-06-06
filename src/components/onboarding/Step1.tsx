
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step1Props {
  estimatedInstagram: string;
  onInputChange: (field: string, value: string) => void;
}

export const Step1: React.FC<Step1Props> = ({ estimatedInstagram, onInputChange }) => {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-purple-900">Percepção do Tempo</h2>
        <p className="text-purple-600">Quanto tempo você ACHA que gastou no Instagram esta semana?</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="estimated">Horas estimadas</Label>
        <Input
          id="estimated"
          type="number"
          placeholder="Ex: 5"
          value={estimatedInstagram}
          onChange={(e) => onInputChange('estimatedInstagram', e.target.value)}
          className="text-center text-lg"
        />
      </div>
    </div>
  );
};
