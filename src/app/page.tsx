import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { allSchedules } from '@/data/bus-schedules';
import BusScheduleView from '@/components/BusScheduleView';

export default function Home() {
  const toUescSchedules = allSchedules.filter(s => s.direcao === 'IR_PARA_UESC');
  const fromUescSchedules = allSchedules.filter(s => s.direcao === 'SAIR_DA_UESC');

  return (
    <div className="bg-background font-body">
      <main className="mx-auto max-w-lg min-h-screen bg-card text-card-foreground shadow-2xl flex flex-col">
        <header className="p-4 bg-primary text-primary-foreground text-center shadow-md">
          <h1 className="text-2xl font-bold">Horários UESC</h1>
          <p className="text-sm opacity-90">Consulte os horários de ônibus</p>
        </header>

        <Tabs defaultValue="to-uesc" className="w-full flex-grow flex flex-col">
          <TabsList className="grid w-full grid-cols-2 rounded-none h-auto">
            <TabsTrigger value="to-uesc" className="py-3 text-base data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground">
              <ArrowRight className="mr-2 h-5 w-5" /> Ir para UESC
            </TabsTrigger>
            <TabsTrigger value="from-uesc" className="py-3 text-base data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground">
              <ArrowLeft className="mr-2 h-5 w-5" /> Sair da UESC
            </TabsTrigger>
          </TabsList>
          <TabsContent value="to-uesc" className="flex-grow bg-slate-50/50 dark:bg-slate-900/50">
            <BusScheduleView schedules={toUescSchedules} />
          </TabsContent>
          <TabsContent value="from-uesc" className="flex-grow bg-slate-50/50 dark:bg-slate-900/50">
            <BusScheduleView schedules={fromUescSchedules} />
          </TabsContent>
        </Tabs>

        <footer className="p-4 text-center text-xs text-muted-foreground bg-card border-t">
          <p className="font-semibold">Horários atualizados em 14/03/2022 – Dias úteis</p>
          <p className="mt-1">Sujeito a alteração. Dúvidas/Sugestões:</p>
          <p>transporte.sutram@ilheus.ba.gov.br • (73) 3223-4423</p>
        </footer>
      </main>
    </div>
  );
}
