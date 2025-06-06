import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Play, Pause, Square, Coffee, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useUserData } from '@/hooks/useUserData';
import SessionComplete from '@/components/timer/SessionComplete';

const Timer = () => {
  const navigate = useNavigate();
  const { userProfile, addFocusSession } = useUserData();
  
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [sessionStarted, setSessionStarted] = useState(false);
  const [showComplete, setShowComplete] = useState(false);
  
  const [selectedPriority, setSelectedPriority] = useState('');
  const [otherDescription, setOtherDescription] = useState('');
  const [focusTime, setFocusTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  
  const [focusMinutes, setFocusMinutes] = useState(0);
  const [breakMinutes, setBreakMinutes] = useState(0);

  useEffect(() => {
    let interval = null;
    
    if (isRunning && (minutes > 0 || seconds > 0)) {
      interval = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            if (isBreak) {
              setBreakMinutes(prev => prev + breakTime);
              handleSessionComplete();
            } else {
              setFocusMinutes(prev => prev + focusTime);
              setIsBreak(true);
              setMinutes(breakTime);
              setSeconds(0);
            }
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        } else {
          setSeconds(seconds - 1);
        }
      }, 1000);
    } else if (!isRunning) {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isRunning, minutes, seconds, isBreak, focusTime, breakTime]);

  const startTimer = () => {
    if (!sessionStarted) {
      setSessionStarted(true);
      setMinutes(focusTime);
      setSeconds(0);
      setIsBreak(false);
      setFocusMinutes(0);
      setBreakMinutes(0);
    }
    setIsRunning(true);
  };

  const pauseTimer = () => {
    setIsRunning(false);
  };

  const stopTimer = () => {
    setIsRunning(false);
    setMinutes(focusTime);
    setSeconds(0);
    setSessionStarted(false);
    setIsBreak(false);
  };

  const handleSessionComplete = async () => {
    if (selectedPriority && focusMinutes > 0) {
      const coinsEarned = focusMinutes;
      const finalPriority = selectedPriority === 'Outros' 
        ? `Outros: ${otherDescription}` 
        : selectedPriority;
      
      try {
        await addFocusSession({
          priority: finalPriority,
          focus_minutes: focusMinutes,
          break_minutes: breakMinutes,
          coins_earned: coinsEarned,
        });
        
        setIsRunning(false);
        setSessionStarted(false);
        setShowComplete(true);
      } catch (error) {
        console.error('Error saving session:', error);
      }
    }
  };

  const formatTime = (mins, secs) => {
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (showComplete) {
    return (
      <SessionComplete
        focusMinutes={focusMinutes}
        breakMinutes={breakMinutes}
        coinsEarned={focusMinutes}
        onContinue={() => {
          setShowComplete(false);
          navigate('/dashboard');
        }}
      />
    );
  }

  if (!userProfile || !userProfile.priorities) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-50 to-purple-200 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-purple-700">Complete seu perfil primeiro</p>
          <Button onClick={() => navigate('/onboarding')} className="bg-purple-600 hover:bg-purple-700">
            Completar Perfil
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-50 to-purple-200 p-4">
      <div className="max-w-md mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => navigate('/dashboard')}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Voltar
          </Button>
          <h1 className="text-xl font-bold text-purple-900">Timer de Foco</h1>
          <div className="w-20"></div>
        </div>

        {!sessionStarted && (
          <Card>
            <CardHeader>
              <CardTitle className="text-purple-900">Configuração da Sessão</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="priority">Prioridade</Label>
                <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione uma prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    {userProfile.priorities.map((priority, index) => 
                      priority && (
                        <SelectItem key={index} value={priority}>
                          {priority}
                        </SelectItem>
                      )
                    )}
                    <SelectItem value="Outros">
                      🔄 Outros (atividade não planejada)
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              {selectedPriority === 'Outros' && (
                <div>
                  <Label htmlFor="other-description">Descreva a atividade</Label>
                  <Input
                    id="other-description"
                    type="text"
                    value={otherDescription}
                    onChange={(e) => setOtherDescription(e.target.value)}
                    placeholder="Ex: Reunião não planejada, interrupção..."
                    maxLength={100}
                  />
                  <p className="text-xs text-purple-600 mt-1">
                    Isso ajuda a identificar padrões de tempo não planejado
                  </p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="focus-time">Foco (min)</Label>
                  <Input
                    id="focus-time"
                    type="number"
                    value={focusTime}
                    onChange={(e) => {
                      const value = parseInt(e.target.value) || 25;
                      setFocusTime(value);
                      setMinutes(value);
                    }}
                    min="1"
                    max="120"
                  />
                </div>
                <div>
                  <Label htmlFor="break-time">Pausa (min)</Label>
                  <Input
                    id="break-time"
                    type="number"
                    value={breakTime}
                    onChange={(e) => setBreakTime(parseInt(e.target.value) || 5)}
                    min="1"
                    max="30"
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        <Card className="text-center">
          <CardContent className="p-8">
            <div className="space-y-4">
              {isBreak ? (
                <div className="flex items-center justify-center gap-2 text-green-600">
                  <Coffee className="w-6 h-6" />
                  <span className="text-lg font-semibold">Pausa</span>
                </div>
              ) : (
                <div className="flex items-center justify-center gap-2 text-purple-600">
                  <Clock className="w-6 h-6" />
                  <span className="text-lg font-semibold">Foco</span>
                </div>
              )}
              
              <div className="text-6xl font-mono font-bold text-purple-900">
                {formatTime(minutes, seconds)}
              </div>
              
              {selectedPriority && (
                <p className="text-purple-700">
                  Trabalhando em: <span className="font-semibold">
                    {selectedPriority === 'Outros' 
                      ? `Outros: ${otherDescription || 'Atividade não planejada'}` 
                      : selectedPriority
                    }
                  </span>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4 justify-center">
          {!isRunning ? (
            <Button 
              onClick={startTimer}
              disabled={!selectedPriority || (selectedPriority === 'Outros' && !otherDescription.trim()) && !sessionStarted}
              className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
              size="lg"
            >
              <Play className="w-5 h-5" />
              {sessionStarted ? 'Continuar' : 'Iniciar'}
            </Button>
          ) : (
            <Button 
              onClick={pauseTimer}
              className="bg-yellow-600 hover:bg-yellow-700 flex items-center gap-2"
              size="lg"
            >
              <Pause className="w-5 h-5" />
              Pausar
            </Button>
          )}
          
          {sessionStarted && (
            <Button 
              onClick={stopTimer}
              variant="outline"
              className="border-red-300 text-red-600 hover:bg-red-50 flex items-center gap-2"
              size="lg"
            >
              <Square className="w-5 h-5" />
              Parar
            </Button>
          )}
        </div>

        {sessionStarted && (
          <Card>
            <CardContent className="p-4">
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-purple-900">Progresso da Sessão</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-purple-600">Foco</p>
                    <p className="font-bold text-purple-900">{focusMinutes} min</p>
                  </div>
                  <div>
                    <p className="text-purple-600">Pausa</p>
                    <p className="font-bold text-purple-900">{breakMinutes} min</p>
                  </div>
                </div>
                <p className="text-xs text-purple-600 mt-2">
                  💰 Moedas que você ganhará: {focusMinutes}
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Timer;
