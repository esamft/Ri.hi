
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import type { Database } from "@/integrations/supabase/types";

type UserProfile = Database['public']['Tables']['user_profiles']['Row'];

interface TimerConfigurationProps {
  userProfile: UserProfile;
  selectedPriority: string;
  setSelectedPriority: (priority: string) => void;
  otherDescription: string;
  setOtherDescription: (description: string) => void;
  focusMinutes: number;
  setFocusMinutes: (minutes: number) => void;
  breakMinutes: number;
  setBreakMinutes: (minutes: number) => void;
  onStartSession: () => void;
  onBackToDashboard: () => void;
}

const TimerConfiguration = ({
  userProfile,
  selectedPriority,
  setSelectedPriority,
  otherDescription,
  setOtherDescription,
  focusMinutes,
  setFocusMinutes,
  breakMinutes,
  setBreakMinutes,
  onStartSession,
  onBackToDashboard,
}: TimerConfigurationProps) => {
  return (
    <div className="max-w-md mx-auto space-y-6 pt-8">
      <Card>
        <CardContent className="p-6 space-y-6">
          <h2 className="text-2xl font-bold text-purple-900 text-center">Configurar Sessão de Foco</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-purple-900 mb-2">
                Selecionar Prioridade
              </label>
              <Select value={selectedPriority} onValueChange={setSelectedPriority}>
                <SelectTrigger>
                  <SelectValue placeholder="Escolha uma prioridade" />
                </SelectTrigger>
                <SelectContent>
                  {userProfile.priorities.map((priority, index) => {
                    if (!priority) return null;
                    return (
                      <SelectItem key={index} value={priority}>
                        {priority}
                      </SelectItem>
                    );
                  })}
                  <SelectItem value="other">
                    Outra atividade
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedPriority === 'other' && (
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  Descreva a atividade
                </label>
                <Textarea
                  placeholder="Ex: Responder emails, organizar documentos..."
                  value={otherDescription}
                  onChange={(e) => setOtherDescription(e.target.value)}
                  className="min-h-[80px]"
                />
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  Foco (min)
                </label>
                <Input
                  type="number"
                  value={focusMinutes}
                  onChange={(e) => setFocusMinutes(parseInt(e.target.value) || 25)}
                  min="1"
                  max="120"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-purple-900 mb-2">
                  Descanso (min)
                </label>
                <Input
                  type="number"
                  value={breakMinutes}
                  onChange={(e) => setBreakMinutes(parseInt(e.target.value) || 5)}
                  min="1"
                  max="30"
                />
              </div>
            </div>

            <Button 
              onClick={onStartSession}
              disabled={!selectedPriority || (selectedPriority === 'other' && !otherDescription.trim())}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 text-lg"
            >
              Iniciar Sessão
            </Button>
          </div>
        </CardContent>
      </Card>

      <Button 
        onClick={onBackToDashboard}
        variant="outline"
        className="w-full"
      >
        Voltar ao Dashboard
      </Button>
    </div>
  );
};

export default TimerConfiguration;
