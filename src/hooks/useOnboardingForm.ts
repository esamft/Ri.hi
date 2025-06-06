
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useUserData } from './useUserData';

export interface FormData {
  estimatedInstagram: string;
  realInstagram: string;
  priorities: string[];
  priorityHours: number[];
  socialMediaGoal: string;
}

export const useOnboardingForm = () => {
  const navigate = useNavigate();
  const { updateUserProfile } = useUserData();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    estimatedInstagram: '',
    realInstagram: '',
    priorities: ['', '', '', '', ''],
    priorityHours: [0, 0, 0, 0, 0],
    socialMediaGoal: ''
  });

  const totalSteps = 4;
  const progressPercentage = (currentStep / totalSteps) * 100;

  const handleInputChange = (field: keyof FormData, value: string | number, index: number | null = null) => {
    setFormData(prev => {
      if (field === 'priorities' && index !== null) {
        const newPriorities = [...prev.priorities];
        newPriorities[index] = value as string;
        return { ...prev, priorities: newPriorities };
      } else if (field === 'priorityHours' && index !== null) {
        const newHours = [...prev.priorityHours];
        newHours[index] = parseInt(value as string) || 0;
        return { ...prev, priorityHours: newHours };
      } else {
        return { ...prev, [field]: value };
      }
    });
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.estimatedInstagram.trim() !== '';
      case 2:
        return formData.realInstagram.trim() !== '';
      case 3:
        return formData.priorities.some(p => p.trim() !== '');
      case 4:
        return formData.socialMediaGoal.trim() !== '';
      default:
        return false;
    }
  };

  const handleNext = async () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step - save data to Supabase and redirect
      const userData = {
        estimated_instagram: parseInt(formData.estimatedInstagram) || 0,
        real_instagram: parseInt(formData.realInstagram) || 0,
        priorities: formData.priorities,
        priority_hours: formData.priorityHours,
        social_media_goal: parseInt(formData.socialMediaGoal) || 0
      };
      
      await updateUserProfile(userData);
      navigate('/dashboard');
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return {
    currentStep,
    totalSteps,
    progressPercentage,
    formData,
    handleInputChange,
    canProceed,
    handleNext,
    handleBack
  };
};
