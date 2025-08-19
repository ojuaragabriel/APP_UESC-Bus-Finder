"use client"

import type { BusSchedule, FilterState } from "@/types"
import { useState, useMemo, useRef, useEffect } from "react"
import { useTime } from "@/hooks/useTime"
import { usePersistentState } from "@/hooks/usePersistentState"
import ScheduleCard from "./ScheduleCard"
import FilterControls from "./FilterControls"
import { Skeleton } from "@/components/ui/skeleton"
import { Button } from "./ui/button"
import { ArrowUp } from "lucide-react"

interface BusScheduleViewProps {
  schedules: BusSchedule[]
}

export default function BusScheduleView({ schedules }: BusScheduleViewProps) {
  const currentTime = useTime()
  const [filters, setFilters] = usePersistentState<FilterState>(`filters_${schedules[0]?.direcao}`, {
    searchTerm: "",
    origem: "",
    via: "",
    linha: "",
  })
  const [showScrollTop, setShowScrollTop] = useState(false);

  const listRef = useRef<HTMLDivElement>(null)
  const nextBusRef = useRef<HTMLDivElement>(null)

  const uniqueOrigins = useMemo(() => [...new Set(schedules.map(s => s.origem).sort())], [schedules])
  const uniqueVias = useMemo(() => [...new Set(schedules.map(s => s.via).sort())], [schedules])
  const uniqueLinhas = useMemo(() => [...new Set(schedules.map(s => s.linha).sort())], [schedules])

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }))
  }

  const filteredSchedules = useMemo(() => {
    return schedules.filter(s => {
      const search = filters.searchTerm.toLowerCase()
      return (
        (filters.origem === '' || s.origem === filters.origem) &&
        (filters.via === '' || s.via === filters.via) &&
        (filters.linha === '' || s.linha === filters.linha) &&
        (search === '' ||
          s.origem.toLowerCase().includes(search) ||
          s.via.toLowerCase().includes(search) ||
          s.destino.toLowerCase().includes(search) ||
          s.linha.toLowerCase().includes(search) ||
          s.empresa.toLowerCase().includes(search)
        )
      )
    })
  }, [schedules, filters])

  const { groupedSchedules, nextBusIndex, nextBusId } = useMemo(() => {
    if (!currentTime) return { groupedSchedules: {}, nextBusIndex: -1, nextBusId: null }

    const groups: { [hour: string]: BusSchedule[] } = {}
    filteredSchedules.forEach(s => {
      const hour = s.hora.split(":")[0]
      if (!groups[hour]) {
        groups[hour] = []
      }
      groups[hour].push(s)
    })

    const nowInMinutes = currentTime.getHours() * 60 + currentTime.getMinutes()
    let foundNextBusIndex = -1
    let foundNextBusId = null
    
    for (let i = 0; i < filteredSchedules.length; i++) {
        const [h, m] = filteredSchedules[i].hora.split(':').map(Number);
        if (h * 60 + m >= nowInMinutes) {
            foundNextBusIndex = i;
            foundNextBusId = filteredSchedules[i].id;
            break;
        }
    }

    return { groupedSchedules: groups, nextBusIndex: foundNextBusIndex, nextBusId: foundNextBusId }
  }, [filteredSchedules, currentTime])


  useEffect(() => {
    if (nextBusRef.current) {
      setTimeout(() => {
        nextBusRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }, 200)
    }
  }, [nextBusId])
  
  useEffect(() => {
    const handleScroll = () => {
      if(listRef.current) {
        setShowScrollTop(listRef.current.scrollTop > 300);
      }
    };
    const currentListRef = listRef.current;
    currentListRef?.addEventListener('scroll', handleScroll);
    return () => currentListRef?.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    listRef.current?.scrollTo({ top: 0, behavior: 'smooth' });
  };


  if (!currentTime) {
    return (
      <div className="p-4 space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center space-x-4">
            <Skeleton className="h-20 w-24 rounded-lg" />
            <div className="space-y-2 flex-1">
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
               <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    )
  }

  const allHoursPassed = nextBusIndex === -1 && filteredSchedules.length > 0;

  return (
    <div className="h-full flex flex-col relative">
      <FilterControls
        filters={filters}
        onFilterChange={handleFilterChange}
        uniqueOrigins={uniqueOrigins}
        uniqueVias={uniqueVias}
        uniqueLinhas={uniqueLinhas}
      />
      <div ref={listRef} className="flex-grow overflow-y-auto p-2 sm:p-4 space-y-4">
        {Object.keys(groupedSchedules).length > 0 ? (
          Object.entries(groupedSchedules).map(([hour, schedulesInHour]) => (
            <div key={hour} className="space-y-3">
              <h2 className="font-bold text-xl text-primary/80 pl-2">{hour}h</h2>
              <div className="space-y-3">
                {schedulesInHour.map((schedule, idx) => {
                    const isNext = schedule.id === nextBusId;
                    return (
                        <div key={schedule.id} ref={isNext ? nextBusRef : null}>
                            <ScheduleCard
                                schedule={schedule}
                                currentTime={currentTime}
                                isNext={isNext}
                            />
                        </div>
                    )
                })}
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-16 text-muted-foreground">
            <p className="font-semibold">Nenhum horário encontrado</p>
            <p>Tente ajustar os filtros.</p>
          </div>
        )}
         {allHoursPassed && (
            <div className="text-center p-8 my-8 bg-primary/10 rounded-lg">
                <h3 className="font-bold text-lg text-primary">Sem mais partidas hoje.</h3>
                <p className="text-muted-foreground mt-1">Os horários para hoje acabaram.</p>
                <Button onClick={scrollToTop} className="mt-4">Ver horários do início do dia</Button>
            </div>
        )}
      </div>
      {showScrollTop && (
         <Button
            onClick={scrollToTop}
            className="absolute bottom-6 right-6 rounded-full w-14 h-14 shadow-lg"
            aria-label="Voltar ao topo"
          >
            <ArrowUp className="h-6 w-6" />
        </Button>
      )}
    </div>
  )
}
