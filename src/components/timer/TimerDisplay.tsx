
import { Button } from "@/components/ui/button";

interface TimerDisplayProps {
  timeLeft: number;
  isBreak: boolean;
  isRunning: boolean;
  priorityName: string;
  onPause: () => void;
  onQuit: () => void;
}

const TimerDisplay = ({
  timeLeft,
  isBreak,
  isRunning,
  priorityName,
  onPause,
  onQuit,
}: TimerDisplayProps) => {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const bgColor = isBreak ? "from-purple-50 via-violet-25 to-purple-100" : "from-gray-900 via-purple-900 to-gray-900";
  const textColor = isBreak ? "text-purple-900" : "text-white";

  return (
    <div className={`min-h-screen bg-gradient-to-br ${bgColor} flex flex-col items-center justify-center p-4`}>
      <div className="text-center space-y-8">
        {!isBreak && <h2 className={`text-xl font-bold ${textColor}`}>{priorityName}</h2>}
        {isBreak && <h2 className={`text-xl font-bold ${textColor}`}>Tempo de Descanso</h2>}
        
        <div className={`text-8xl font-mono font-bold ${textColor}`}>
          {formatTime(timeLeft)}
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={onPause}
            variant="outline"
            className={isBreak ? "bg-white" : "bg-gray-800 border-gray-600 text-white hover:bg-gray-700"}
          >
            {isRunning ? 'Pausar' : 'Continuar'}
          </Button>
          <br />
          <Button 
            onClick={onQuit}
            variant="outline"
            size="sm"
            className={isBreak ? "bg-white text-red-600" : "bg-gray-800 border-gray-600 text-red-400 hover:bg-gray-700"}
          >
            Desistir
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TimerDisplay;
