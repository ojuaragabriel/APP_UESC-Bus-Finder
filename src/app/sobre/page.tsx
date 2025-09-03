
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle, Info, GitBranch, Linkedin } from "lucide-react";

export default function Sobre() {
  return (
    <div className="bg-slate-50/50 dark:bg-slate-900/50 min-h-screen p-4 sm:p-6">
      <div className="max-w-md mx-auto space-y-6">

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <AlertCircle className="h-6 w-6 text-destructive" />
            <CardTitle className="text-xl font-bold">Avisos Importantes</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p className="text-justify">O aplicativo foi desenvolvido de forma independente, sem qualquer vínculo oficial com a UESC ou empresas responsáveis pelo transporte.</p>
            <p className="text-justify">As informações mostradas são apenas estimativas compartilhadas de forma colaborativa e não representam rastreamento em tempo real.</p>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <Info className="h-6 w-6 text-primary" />
            <CardTitle className="text-xl font-bold">Informações do Sistema</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-3">
            <div>
                <h4 className="font-semibold text-card-foreground">Principais recursos:</h4>
                <p className="text-justify">Exibe automaticamente os horários mais próximos com base na hora atual, indicando quantos minutos faltam para a próxima saída, além de permitir a consulta de horários anteriores e futuros.</p>
            </div>
            <div>
                <h4 className="font-semibold text-card-foreground">Propósito:</h4>
                <p className="text-justify">Fornecer uma forma prática e dinâmica de acompanhar os horários, ajudando o estudante a planejar melhor seus deslocamentos.</p>
            </div>
            <div>
                <h4 className="font-semibold text-card-foreground">Diretriz de design:</h4>
                <p className="text-justify">Interface objetiva e intuitiva, pensada para uso rápido e eficiente no dia a dia.</p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-md">
          <CardHeader className="flex flex-row items-center gap-3 pb-2">
            <GitBranch className="h-6 w-6 text-green-600" />
            <CardTitle className="text-xl font-bold">Sobre o Projeto</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <p><span className="font-semibold text-card-foreground">Versão:</span> 1.0.0</p>
            <p><span className="font-semibold text-card-foreground">Criação:</span> Gabriel Cerqueira</p>
            <p><span className="font-semibold text-card-foreground">Motivação:</span> Facilitar o dia a dia acadêmico com informação centralizada.</p>
             <div className="flex items-center gap-1.5">
                <Linkedin className="h-4 w-4 text-primary/80" />
                <div>
                    <span className="font-semibold text-card-foreground">LinkedIn:</span> <a href="http://www.linkedin.com/in/ojuaragabriel" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">www.linkedin.com/in/ojuaragabriel</a>
                </div>
            </div>
          </CardContent>
        </Card>

      </div>
    </div>
  );
}
