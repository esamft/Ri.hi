
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const FinalCTA = () => {
  const included = [
    "Acesso completo ao FocaAí",
    "Reflexões diárias personalizadas", 
    "Templates de planejamento",
    "Comunidade exclusiva",
    "Suporte prioritário",
    "30 dias de garantia"
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Comece sua transformação
            <span className="block text-yellow-300">hoje mesmo</span>
          </h2>
          <p className="text-xl text-white/90 max-w-2xl mx-auto leading-relaxed">
            Junte-se a milhares de pessoas que já descobriram como viver com mais propósito e menos ansiedade.
          </p>
        </div>

        <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-2xl mb-12">
          <CardContent className="p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <div className="text-center md:text-left mb-6">
                  <div className="text-5xl font-bold text-gray-800 mb-2">Grátis</div>
                  <div className="text-gray-600 text-lg">Primeiros 14 dias</div>
                  <div className="text-sm text-gray-500 mt-1">Depois apenas R$ 19/mês</div>
                </div>

                <div className="space-y-3">
                  {included.map((item, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-center">
                <Button 
                  size="lg"
                  className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-black font-bold text-xl px-12 py-6 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300 mb-6 w-full"
                >
                  Quero Transformar Minha Vida
                </Button>
                
                <div className="text-sm text-gray-500 space-y-1">
                  <div>✨ Sem cartão de crédito</div>
                  <div>🚀 Acesso imediato</div>
                  <div>💯 30 dias de garantia</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <p className="text-white/80 text-lg mb-4">
            💬 "Melhor investimento que já fiz em mim mesmo"
          </p>
          <div className="flex justify-center items-center gap-2 text-yellow-300">
            {"★★★★★".split("").map((star, i) => (
              <span key={i} className="text-2xl">{star}</span>
            ))}
            <span className="text-white/80 ml-2">4.9/5 (2.847 avaliações)</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinalCTA;
