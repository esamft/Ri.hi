
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useOnboardingForm } from "@/hooks/useOnboardingForm";
import { Step1 } from "@/components/onboarding/Step1";
import { Step2 } from "@/components/onboarding/Step2";
import { Step3 } from "@/components/onboarding/Step3";
import { Step4 } from "@/components/onboarding/Step4";

const Onboarding = () => {
  const {
    currentStep,
    totalSteps,
    progressPercentage,
    formData,
    handleInputChange,
    canProceed,
    handleNext,
    handleBack
  } = useOnboardingForm();

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <Step1
            estimatedInstagram={formData.estimatedInstagram}
            onInputChange={handleInputChange}
          />
        );
      case 2:
        return (
          <Step2
            estimatedInstagram={formData.estimatedInstagram}
            realInstagram={formData.realInstagram}
            onInputChange={handleInputChange}
          />
        );
      case 3:
        return (
          <Step3
            priorities={formData.priorities}
            priorityHours={formData.priorityHours}
            onInputChange={handleInputChange}
          />
        );
      case 4:
        return (
          <Step4
            socialMediaGoal={formData.socialMediaGoal}
            onInputChange={handleInputChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-50 to-purple-200 p-4">
      <div className="max-w-md mx-auto">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-purple-900">Configuração Inicial</h1>
            <span className="text-sm text-purple-600">Etapa {currentStep} de {totalSteps}</span>
          </div>
          <Progress value={progressPercentage} className="h-2" />
        </div>

        {/* Content Card */}
        <Card className="mb-6">
          <CardContent className="p-6">
            {renderStep()}
          </CardContent>
        </Card>

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          
          <Button
            onClick={handleNext}
            disabled={!canProceed()}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-700"
          >
            {currentStep === totalSteps ? 'Finalizar' : 'Próximo'}
            {currentStep < totalSteps && <ArrowRight className="w-4 h-4" />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
