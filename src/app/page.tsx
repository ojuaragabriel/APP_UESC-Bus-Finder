"use client";
import { ArrowLeft, ArrowRight, ArrowUp } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { allSchedules } from '@/data/bus-schedules';
import BusScheduleView from '@/components/BusScheduleView';

export default function Home() {
  const toUescSchedules = allSchedules.filter(s => s.direcao === 'IR_PARA_UESC');
  const fromUescSchedules = allSchedules.filter(s => s.direcao === 'SAIR_DA_UESC');

  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      // Mostra o botão se a rolagem passar de 60% da página
      setShowScrollTop(docHeight > 0 && (scrollTop / docHeight > 0.6));
    };

    window.addEventListener('scroll', handleScroll);
    // Limpa o listener ao desmontar o componente
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="flex flex-col h-full">
      <header className="p-4 pt-6 text-center bg-primary text-primary-foreground rounded-b-2xl shadow-lg">
        <h1 className="text-2xl font-bold tracking-tight">🚏Horár<span className="uppercase">IOS</span></h1>
        <p className="text-sm text-primary-foreground/90">Rotas estudantis: UESC - SESI - IF</p>
      </header>
      
      <Tabs defaultValue="to-uesc" className="w-full flex-grow flex flex-col max-w-full p-2">
        <TabsList className="grid w-full grid-cols-2 rounded-lg h-auto max-w-full">
          <TabsTrigger value="to-uesc" className="py-2.5 text-sm data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground">
            <ArrowRight className="mr-1.5 h-4 w-4" /> Ir para Campus
          </TabsTrigger>
          <TabsTrigger value="from-uesc" className="py-2.5 text-sm data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground">
            <ArrowLeft className="mr-1.5 h-4 w-4" /> Sair do Campus
          </TabsTrigger>
        </TabsList>
        <TabsContent value="to-uesc" className="flex-grow bg-slate-50/50 dark:bg-slate-900/50 max-w-full mt-2 rounded-lg">
          <BusScheduleView schedules={toUescSchedules} />
        </TabsContent>
        <TabsContent value="from-uesc" className="flex-grow bg-slate-50/50 dark:bg-slate-900/50 max-w-full mt-2 rounded-lg">
          <BusScheduleView schedules={fromUescSchedules} />
        </TabsContent>
      </Tabs>

      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-20 right-5 z-50 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-primary/90 transition-all border-2 border-white dark:border-slate-800"
          aria-label="Voltar ao topo"
        >
          <ArrowUp className="h-6 w-6" />
        </button>
      )}
    </div>
  );
}
