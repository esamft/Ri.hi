
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step2Props {
  estimatedInstagram: string;
  realInstagram: string;
  onInputChange: (field: string, value: string) => void;
}

export const Step2: React.FC<Step2Props> = ({ estimatedInstagram, realInstagram, onInputChange }) => {
  const getStep2Message = () => {
    if (!estimatedInstagram || !realInstagram) return '';
    
    const estimated = parseInt(estimatedInstagram);
    const real = parseInt(realInstagram);
    
    // If real usage is less than or equal to estimated usage
    if (real <= estimated) {
      return "Muito bem, você já tem uma boa noção de gestão de tempo";
    }
    
    // Calculate the difference percentage
    const difference = real - estimated;
    const differencePercentage = (difference / estimated) * 100;
    
    // If difference is small (<= 50%)
    if (differencePercentage <= 50) {
      return "Você tem boa consciência do seu tempo! Isso é raro.";
    }
    
    // If difference is large (> 50%)
    return "Viu só? Você se engana sobre seu próprio tempo. É normal, acontece com todo mundo.";
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-purple-900">Realidade vs Percepção</h2>
        <p className="text-purple-600">Agora vá nas configurações do seu celular e me diga quanto REALMENTE gastou</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="real">Horas reais</Label>
        <Input
          id="real"
          type="number"
          placeholder="Ex: 8"
          value={realInstagram}
          onChange={(e) => onInputChange('realInstagram', e.target.value)}
          className="text-center text-lg"
        />
      </div>
      {estimatedInstagram && realInstagram && (
        <div className="bg-purple-50 p-4 rounded-lg">
          <p className="text-sm text-purple-700">
            {getStep2Message()}
          </p>
        </div>
      )}
    </div>
  );
};
