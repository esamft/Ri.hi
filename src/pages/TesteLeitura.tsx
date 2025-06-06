
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type FocusSession = Database['public']['Tables']['focus_sessions']['Row'];

export default function TesteLeitura() {
  const [sessoes, setSessoes] = useState<FocusSession[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("focus_sessions").select("*");
      if (error) {
        console.error("Erro ao buscar sessões:", error);
      } else {
        setSessoes(data as FocusSession[]);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sessões de Foco</h1>
      <ul className="space-y-2">
        {sessoes.map((s) => (
          <li key={s.id} className="bg-gray-100 p-2 rounded">
            Prioridade: <strong>{s.priority}</strong> | Foco: {s.focus_minutes} min | Pausa: {s.break_minutes} min
          </li>
        ))}
      </ul>
    </div>
  );
}
