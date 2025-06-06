
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface SessionCompleteProps {
  coinsEarned: number;
  onFinish: () => void;
}

const SessionComplete = ({ coinsEarned, onFinish }: SessionCompleteProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-50 to-purple-200 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6 text-center space-y-4">
          <div className="text-6xl">🎉</div>
          <h2 className="text-2xl font-bold text-purple-900">Sessão Concluída!</h2>
          <p className="text-purple-600">Você ganhou {coinsEarned} moedas!</p>
          <Button 
            onClick={onFinish}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            Voltar ao Dashboard
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SessionComplete;
