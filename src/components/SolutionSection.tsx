
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const SolutionSection = () => {
  const features = [
    "Priorização inteligente baseada em impacto real",
    "Reflexões diárias para autoconhecimento",
    "Blocos de tempo focados no que importa",
    "Métricas de bem-estar, não só produtividade"
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
              A solução está na 
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"> filosofia</span>
            </h2>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              FocaAí não é mais uma ferramenta de tarefas. É uma filosofia de vida 
              que combina gestão do tempo com autoconhecimento e propósito.
            </p>

            <div className="space-y-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                  <span className="text-gray-700 text-lg">{feature}</span>
                </div>
              ))}
            </div>

            <Button 
              size="lg"
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold text-lg px-8 py-4 rounded-full shadow-xl transform hover:scale-105 transition-all duration-300"
            >
              Experimente Gratuitamente
            </Button>
          </div>

          <div className="relative">
            <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
              <CardContent className="p-8">
                <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl p-6 mb-6">
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">💡 Insight do Dia</h3>
                  <p className="text-gray-700 italic">
                    "Você está priorizando tarefas urgentes ou importantes? 
                    Reflita: o que você fez hoje te aproximou dos seus valores?"
                  </p>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="font-semibold text-gray-800">Foco Principal</span>
                    </div>
                    <p className="text-gray-600">Escrever artigo sobre minimalismo (2h)</p>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                      <span className="font-semibold text-gray-800">Conexões</span>
                    </div>
                    <p className="text-gray-600">Jantar em família (1h30)</p>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="font-semibold text-gray-800">Cuidado Pessoal</span>
                    </div>
                    <p className="text-gray-600">Meditação matinal (20min)</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
