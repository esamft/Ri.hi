
import { Card, CardContent } from "@/components/ui/card";

interface WeekPeriodCardProps {
  monday: string;
  sunday: string;
  isSunday: boolean;
}

const WeekPeriodCard = ({ monday, sunday, isSunday }: WeekPeriodCardProps) => {
  return (
    <Card className="border-l-4 border-l-purple-500">
      <CardContent className="p-4">
        <div className="text-center space-y-2">
          <h3 className="text-lg font-semibold text-purple-900">
            Período de Planejamento
          </h3>
          <p className="text-purple-700">
            {monday} - {sunday}
          </p>
          {isSunday && (
            <p className="text-sm text-purple-600 bg-purple-50 p-2 rounded">
              💡 Domingo é dia de replanejamento! Que tal revisar suas prioridades para a próxima semana?
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default WeekPeriodCard;
