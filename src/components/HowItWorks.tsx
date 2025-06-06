
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      number: "1",
      title: "Defina seus Valores",
      description: "Comece identificando o que realmente importa para você. Não o que os outros esperam, mas seus valores autênticos.",
      color: "from-purple-400 to-purple-600"
    },
    {
      number: "2",
      title: "Planeje com Propósito",
      description: "Organize seu dia alinhando tarefas com seus valores. Cada ação tem um 'porquê' claro e significativo.",
      color: "from-blue-400 to-blue-600"
    },
    {
      number: "3",
      title: "Execute com Foco",
      description: "Use blocos de tempo focados. Trabalhe intensamente no que importa, depois descanse de verdade.",
      color: "from-indigo-400 to-indigo-600"
    },
    {
      number: "4",
      title: "Reflita e Evolua",
      description: "Ao final do dia, reflita sobre o que funcionou. Ajuste sua abordagem e celebrate pequenas vitórias.",
      color: "from-purple-400 to-indigo-600"
    }
  ];

  return (
    <section className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Como funciona na prática?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Um processo simples e poderoso que transforma como você vive cada dia.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <Card key={index} className="bg-white border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-6 text-center relative overflow-hidden">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center text-white text-2xl font-bold shadow-lg`}>
                  {step.number}
                </div>
                
                <h3 className="text-xl font-bold text-gray-800 mb-4 group-hover:text-purple-600 transition-colors">
                  {step.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {step.description}
                </p>

                {/* Decorative gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-3xl p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              ⚡ Resultados em 7 dias
            </h3>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Usuários relatam maior clareza mental, redução da ansiedade e sensação 
              de controle sobre sua vida já na primeira semana.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
