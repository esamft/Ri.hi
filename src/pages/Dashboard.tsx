import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, Calendar, Target, Timer, LogOut, ShoppingCart, Unlock, Lock, BarChart3 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import { useUserData } from '@/hooks/useUserData';

const Dashboard = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const { userProfile, userCoins, sessions, loading } = useUserData();

  // Lista de citações filosóficas expandida
  const philosophicalQuotes = [
    { text: "Ri.hi - o tempo de agora, com presença", author: "Guajajara" },
    { text: "Os antigos hindus esculpiam o tempo na pedra dos templos, sabendo que cada momento é eterno", author: "Tradição Hindu" },
    { text: "O passado já foi, o futuro ainda não chegou. Há apenas este momento para viver", author: "Buda" },
    { text: "O tempo não é dinheiro, é vida. Gaste-o sabiamente", author: "Provérbio Africano" },
    { text: "Os maias observavam que o tempo é circular - tudo retorna transformado", author: "Tradição Maia" },
    { text: "Quando você se senta, apenas se sente. Quando anda, apenas ande. E não oscile", author: "Zen" },
    { text: "O tempo dos sonhos não tem começo nem fim, flui através de todas as coisas", author: "Tradição Aborígene" },
    { text: "Se você entende o presente, entende a eternidade", author: "Lao Tzu" },
    { text: "O momento presente é um presente - por isso se chama presente", author: "Tradição Sufi" },
    { text: "O tempo é como a água das montanhas: nunca volta, mas sempre nutre", author: "Tradição Andina" }
  ];

  // Sistema de produtos da loja
  const knowledgeProducts = [
    {
      id: 'filosoficas',
      name: '5 Citações Filosóficas sobre o Tempo',
      price: 50,
      description: 'Desbloqueie sabedorias ancestrais sobre o tempo'
    },
    {
      id: 'modelos',
      name: '3 Modelos de Gestão de Tempo Consagrados',
      price: 100,
      description: 'Técnicas comprovadas de produtividade'
    },
    {
      id: 'contos',
      name: '5 Mini-Contos sobre a História do Tempo',
      price: 150,
      description: 'Narrativas fascinantes sobre nossa relação com o tempo'
    }
  ];

  // State para produtos comprados (simulado - depois integrar com Supabase)
  const [purchasedProducts, setPurchasedProducts] = useState(['filosoficas']); // Começa com um produto

  // Determinar quais citações mostrar baseado nos produtos comprados
  const getAvailableQuotes = () => {
    let availableQuotes = philosophicalQuotes.slice(0, 3); // 3 básicas
    
    if (purchasedProducts.includes('filosoficas')) {
      availableQuotes = philosophicalQuotes.slice(0, 5); // +2 citações
    }
    if (purchasedProducts.includes('modelos')) {
      availableQuotes = philosophicalQuotes.slice(0, 7); // +2 citações
    }
    if (purchasedProducts.includes('contos')) {
      availableQuotes = philosophicalQuotes; // Todas as 10
    }
    
    return availableQuotes;
  };

  // Selecionar citação aleatória das disponíveis
  const availableQuotes = getAvailableQuotes();
  const randomQuote = availableQuotes[Math.floor(Math.random() * availableQuotes.length)];

  // Get current week's Monday and Sunday
  const getCurrentWeekDates = () => {
    const today = new Date();
    const currentDay = today.getDay();
    const monday = new Date(today);
    monday.setDate(today.getDate() - (currentDay === 0 ? 6 : currentDay - 1));
    
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    
    const formatDate = (date) => {
      return date.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit' });
    };
    
    return {
      monday: formatDate(monday),
      sunday: formatDate(sunday)
    };
  };

  const weekDates = getCurrentWeekDates();

  const startFocusSession = () => {
    navigate('/timer');
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handlePurchase = (productId, price) => {
    if (userCoins && userCoins.total_coins >= price && !purchasedProducts.includes(productId)) {
      // Aqui seria feita a compra real no Supabase
      setPurchasedProducts([...purchasedProducts, productId]);
      // Deduzir moedas do usuário
      console.log(`Produto ${productId} comprado por ${price} moedas`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-100 via-violet-50 to-purple-200 flex items-center justify-center">
        <div className="text-center">
          <p className="text-purple-700">Carregando seus dados...</p>
        </div>
      </div>
    );
  }

  // CORREÇÃO: Verificar se o usuário tem prioridades definidas
  if (!userProfile || !userProfile.priorities || userProfile.priorities.every(p => !p)) {
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
        {/* Header */}
        <div className="bg-white rounded-lg p-4 shadow-lg">
          <div className="text-center space-y-2">
            <div className="flex justify-between items-center">
              <div></div> {/* Espaço vazio para centralizar */}
              <h1 className="text-xl font-bold text-purple-900">Ri.hi</h1>
              <Button
                variant="outline"
                size="sm"
                onClick={handleSignOut}
                className="p-2"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex items-center justify-center gap-2 text-purple-600">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{weekDates.monday} - {weekDates.sunday}</span>
            </div>
          </div>
        </div>

        {/* Suas Prioridades (Compacta) */}
        <Card>
          <CardContent className="p-4 space-y-3">
            {userProfile.priorities.map((priority, index) => {
              if (!priority) return null;
              const currentHours = sessions
                .filter(session => session.priority === priority)
                .reduce((acc, session) => acc + (session.focus_minutes / 60), 0);
              const totalHours = userProfile.priority_hours[index];
              const progress = totalHours > 0 ? (currentHours / totalHours) * 100 : 0;
              
              return (
                <div key={index} className="space-y-1">
                  <div className="flex justify-between items-center">
                    <h4 className="text-sm font-medium text-purple-900">{priority}</h4>
                    <span className="text-xs text-purple-600">{currentHours.toFixed(1)}h/{totalHours}h</span>
                  </div>
                  <Progress value={Math.min(progress, 100)} className="h-1.5" />
                </div>
              );
            })}
            
            {/* Seção Outros (sem meta) */}
            {(() => {
              const otherHours = sessions
                .filter(session => session.priority && session.priority.startsWith('Outros:'))
                .reduce((acc, session) => acc + (session.focus_minutes / 60), 0);
              
              if (otherHours > 0) {
                return (
                  <div className="space-y-1 border-t pt-3 mt-3">
                    <div className="flex justify-between items-center">
                      <h4 className="text-sm font-medium text-amber-700">🔄 Outros (não planejados)</h4>
                      <span className="text-xs text-amber-600">{otherHours.toFixed(1)}h</span>
                    </div>
                    <div className="h-1.5 bg-amber-100 rounded-full">
                      <div className="h-full bg-amber-400 rounded-full w-full opacity-60"></div>
                    </div>
                    <p className="text-xs text-amber-600">Sem meta definida</p>
                  </div>
                );
              }
              return null;
            })()}
          </CardContent>
        </Card>

        {/* Botões de Ação */}
        <div className="grid grid-cols-2 gap-4">
          <Button 
            onClick={startFocusSession}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-8 flex flex-col items-center gap-2"
          >
            <Clock className="w-6 h-6" />
            Iniciar Foco
          </Button>
          
          <Button 
            variant="outline"
            disabled
            className="border-purple-300 text-purple-600 py-8 flex flex-col items-center gap-2 opacity-50"
          >
            <BarChart3 className="w-6 h-6" />
            Estatísticas
          </Button>
        </div>

        {/* Citação Filosófica */}
        <Card className="border-l-4 border-l-purple-500">
          <CardContent className="p-4">
            <blockquote className="text-center space-y-2">
              <p className="text-purple-700 italic">"{randomQuote.text}"</p>
              <footer className="text-sm text-purple-600">— {randomQuote.author}</footer>
            </blockquote>
          </CardContent>
        </Card>

        {/* Loja de Conhecimento */}
        <Card>
          <CardHeader>
            <CardTitle className="text-purple-900 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ShoppingCart className="w-5 h-5" />
                Loja de Conhecimento
              </div>
              <span className="text-sm bg-purple-100 px-2 py-1 rounded">
                💰 {userCoins?.total_coins || 0}
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {knowledgeProducts.map((product) => {
              const isPurchased = purchasedProducts.includes(product.id);
              const canAfford = userCoins && userCoins.total_coins >= product.price;
              
              return (
                <div key={product.id} className="flex items-center justify-between p-2 bg-purple-50 rounded">
                  <div className="flex items-center gap-2 flex-1">
                    {isPurchased ? (
                      <Unlock className="w-4 h-4 text-green-600" />
                    ) : (
                      <Lock className="w-4 h-4 text-gray-400" />
                    )}
                    <div>
                      <p className="text-sm font-medium text-purple-900">{product.name}</p>
                      <p className="text-xs text-purple-600">{product.description}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    {isPurchased ? (
                      <span className="text-xs text-green-600 font-medium">COMPRADO</span>
                    ) : (
                      <Button
                        size="sm"
                        variant={canAfford ? "default" : "secondary"}
                        disabled={!canAfford}
                        onClick={() => handlePurchase(product.id, product.price)}
                        className="text-xs px-2 py-1"
                      >
                        {product.price} 💰
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
