
import { Card, CardContent } from "@/components/ui/card";

const ProblemSection = () => {
  const problems = [
    {
      emoji: "😰",
      title: "Sobrecarga Mental",
      description: "Sua mente vive ocupada com mil tarefas pendentes, gerando ansiedade constante."
    },
    {
      emoji: "⏰",
      title: "Falta de Tempo",
      description: "Os dias passam voando e você sente que não consegue fazer tudo que precisa."
    },
    {
      emoji: "🔄",
      title: "Ciclo Infinito",
      description: "Você faz, faz, faz... mas nunca sente que realmente progrediu ou relaxou."
    }
  ];

  return (
    <section id="problem-section" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Você se reconhece aqui?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            A vida moderna nos ensinou a ser produtivos, mas esquecemos de viver com propósito.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {problems.map((problem, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardContent className="p-8 text-center">
                <div className="text-6xl mb-4">{problem.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{problem.title}</h3>
                <p className="text-gray-600 leading-relaxed">{problem.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center bg-gradient-to-r from-red-50 to-pink-50 rounded-3xl p-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            O problema não é você. É o sistema.
          </h3>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ferramentas tradicionais de produtividade tratam sintomas, não a causa raiz: 
            a falta de clareza sobre o que realmente importa.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
