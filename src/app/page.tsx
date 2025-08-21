"use client";
import { ArrowLeft, ArrowRight, Bus, ArrowUp } from 'lucide-react';
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
      if (docHeight > 0) {
  setShowScrollTop(scrollTop / docHeight > 0.4);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="bg-background font-body w-full min-h-screen overflow-x-hidden">
      <main className="mx-auto w-full max-w-md min-h-screen bg-card text-card-foreground shadow-2xl flex flex-col px-1 sm:px-0 relative">
  <header className="p-2 sm:p-3 bg-primary text-primary-foreground text-center shadow-lg rounded-b-2xl relative">
          <div className="flex items-center justify-center gap-1 mb-0.5">
            <Bus className="h-6 w-6 text-white drop-shadow-md" />
            <h1 className="text-2xl font-black tracking-wide drop-shadow-lg">HorárIOS</h1>
          </div>
            <p className="text-sm opacity-80 font-medium tracking-wide mb-1 text-primary-foreground/90">Veja os horários dos ônibus que fazem o trajeto diário para UESC, IF e SESI</p>
          <div className="mx-auto w-16 h-0.5 bg-white/30 rounded-full mt-1" />
        </header>

  <Tabs defaultValue="to-uesc" className="w-full flex-grow flex flex-col max-w-full">
          <TabsList className="grid w-full grid-cols-2 rounded-lg h-auto max-w-full">
            <TabsTrigger value="to-uesc" className="py-2 text-sm data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground">
              <ArrowRight className="mr-1 h-4 w-4" /> Ir para Campus
            </TabsTrigger>
            <TabsTrigger value="from-uesc" className="py-2 text-sm data-[state=active]:bg-primary/90 data-[state=active]:text-primary-foreground">
              <ArrowLeft className="mr-1 h-4 w-4" /> Sair do Campus
            </TabsTrigger>
          </TabsList>
          <TabsContent value="to-uesc" className="flex-grow bg-slate-50/50 dark:bg-slate-900/50 max-w-full">
            <BusScheduleView schedules={toUescSchedules} />
          </TabsContent>
          <TabsContent value="from-uesc" className="flex-grow bg-slate-50/50 dark:bg-slate-900/50 max-w-full">
            <BusScheduleView schedules={fromUescSchedules} />
          </TabsContent>
        </Tabs>

  <footer className="p-2 sm:p-4 text-center text-xs sm:text-sm text-muted-foreground bg-card border-t">
          <p>Desenvolvido por Gabriel Cerqueira</p>
          <a 
            href="https://www.linkedin.com/in/ojuaragabriel" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="text-primary hover:underline"
          >
            linkedin.com/in/ojuaragabriel
          </a>
        </footer>

        {showScrollTop && (
          <button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 bg-primary text-primary-foreground rounded-full w-12 h-12 flex items-center justify-center shadow-lg hover:bg-primary/80 transition-all border-2 border-white dark:border-slate-900"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-6 w-6" />
          </button>
        )}
      </main>
    </div>
  );
}
