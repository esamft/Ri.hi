import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function NovaSessao() {
  const [priority, setPriority] = useState("");
  const [focusMinutes, setFocusMinutes] = useState(25);
  const [breakMinutes, setBreakMinutes] = useState(5);
  const [mensagem, setMensagem] = useState("");

  const salvarSessao = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMensagem("Você precisa estar logado para salvar sessões.");
      return;
    }

    const { error } = await supabase.from("focus_sessions").insert([
      {
        user_id: user.id,
        priority,
        focus_minutes: focusMinutes,
        break_minutes: breakMinutes,
        completed_at: new Date().toISOString(),
        coins_earned: Math.floor(focusMinutes / 10),
      },
    ]);

    if (error) {
      console.error("Erro ao salvar:", error);
      setMensagem("Erro ao salvar sessão.");
    } else {
      setMensagem("Sessão salva com sucesso!");
      setPriority("");
      setFocusMinutes(25);
      setBreakMinutes(5);
    }
  };

  return (
    <div className="p-6 max-w-md mx-auto space-y-4">
      <h1 className="text-xl font-bold">Nova Sessão de Foco</h1>

      <input
        className="w-full border p-2 rounded"
        placeholder="Prioridade (ex: Estudo)"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      />

      <input
        className="w-full border p-2 rounded"
        type="number"
        placeholder="Minutos de Foco"
        value={focusMinutes}
        onChange={(e) => setFocusMinutes(Number(e.target.value))}
      />

      <input
        className="w-full border p-2 rounded"
        type="number"
        placeholder="Minutos de Pausa"
        value={breakMinutes}
        onChange={(e) => setBreakMinutes(Number(e.target.value))}
      />

      <button
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        onClick={salvarSessao}
      >
        Salvar Sessão
      </button>

      {mensagem && <p className="text-sm text-gray-600">{mensagem}</p>}
    </div>
  );
}
