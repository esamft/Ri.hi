
import React from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Step4Props {
  socialMediaGoal: string;
  onInputChange: (field: string, value: string) => void;
}

export const Step4: React.FC<Step4Props> = ({ socialMediaGoal, onInputChange }) => {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-bold text-purple-900">Meta de Redes Sociais</h2>
        <p className="text-purple-600">Quantas horas quer dedicar às redes sociais (Instagram, TikTok) esta semana?</p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="social">Horas por semana</Label>
        <Input
          id="social"
          type="number"
          placeholder="Ex: 3"
          value={socialMediaGoal}
          onChange={(e) => onInputChange('socialMediaGoal', e.target.value)}
          className="text-center text-lg"
        />
      </div>
      <div className="bg-green-50 p-4 rounded-lg">
        <p className="text-sm text-green-700 text-center">
          Pronto! Você terá um plano claro para gerenciar seu tempo. 🚀
        </p>
      </div>
    </div>
  );
};
