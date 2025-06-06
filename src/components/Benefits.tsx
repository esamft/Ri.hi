
import { Card, CardContent } from "@/components/ui/card";

const Benefits = () => {
  const benefits = [
    {
      icon: "🧠",
      title: "Clareza Mental",
      description: "Pare de se sentir sobrecarregado. Saiba exatamente no que focar a cada momento.",
      stats: "87% menos ansiedade"
    },
    {
      icon: "⚡",
      title: "Energia Renovada",
      description: "Trabalhe menos horas, mas com muito mais qualidade e propósito.",
      stats: "+3h livres por dia"
    },
    {
      icon: "🎯",
      title: "Progresso Real",
      description: "Veja avanços tangíveis no que realmente importa para sua vida.",
      stats: "92% atingem metas"
    },
    {
      icon: "🌱",
      title: "Crescimento Pessoal",
      description: "Desenvolva autoconhecimento e torne-se a melhor versão de si mesmo.",
      stats: "Evolução contínua"
    },
    {
      icon: "❤️",
      title: "Relacionamentos",
      description: "Tenha mais tempo e energia para pessoas que você ama.",
      stats: "Conexões mais profundas"
    },
    {
      icon: "😌",
      title: "Paz Interior",
      description: "Durma tranquilo sabendo que seu dia foi bem vivido e alinhado.",
      stats: "Bem-estar duradouro"
    }
  ];

  return (
    <section className="py-20 px-6 bg-gradient-to-br from-purple-50 to-blue-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">
            Transforme sua vida
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Mais que produtividade: uma vida com propósito, equilíbrio e realização.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group">
              <CardContent className="p-8 text-center">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{benefit.description}</p>
                <div className="bg-gradient-to-r from-purple-100 to-blue-100 rounded-full px-4 py-2 text-sm font-semibold text-purple-700">
                  {benefit.stats}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-white rounded-3xl p-12 shadow-xl">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-purple-600 mb-2">10.000+</div>
              <div className="text-gray-600">Vidas transformadas</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-blue-600 mb-2">4.9/5</div>
              <div className="text-gray-600">Avaliação dos usuários</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-indigo-600 mb-2">30 dias</div>
              <div className="text-gray-600">Garantia de resultado</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
