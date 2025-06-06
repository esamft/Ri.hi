
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-md mx-auto space-y-6">
        {/* Header */}
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center mb-4">
            <Clock className="w-12 h-12 text-purple-600" />
          </div>
          <h1 className="text-3xl font-bold text-purple-900">Ri.hi</h1>
          <p className="text-purple-700 italic">
            Do Guajajara: o tempo de agora, com presença.
          </p>
        </div>

        {/* Features */}
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                1
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">Identifique Suas Prioridades</h3>
                <p className="text-sm text-purple-600">Tenha no máximo 5 projetos relevantes por vez. Não se distraia</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                2
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">Dedique seu Tempo</h3>
                <p className="text-sm text-purple-600">Aloque Horas Semanais Ao Projeto. Não se sobrecarregue.</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4 flex items-center space-x-3">
              <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                3
              </div>
              <div>
                <h3 className="font-semibold text-purple-900">Use Nosso Timer para Registrar</h3>
                <p className="text-sm text-purple-600">Monitore seus Avanços. Revise suas Metas. Seja Realista.</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Button 
            onClick={() => navigate('/auth')}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-6 text-lg"
            size="lg"
          >
            Começar
          </Button>
          
          <p className="text-center text-sm text-purple-600">
            Já tem uma conta?{' '}
            <button 
              onClick={() => navigate('/auth')}
              className="text-purple-700 hover:underline font-medium"
            >
              Faça login
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
