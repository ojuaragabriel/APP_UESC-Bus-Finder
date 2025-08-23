"use client"

import type { FilterState } from "@/types"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, MapPin, Route, Bus } from "lucide-react"

interface FilterControlsProps {
  filters: FilterState
  onFilterChange: (filters: Partial<FilterState>) => void
  uniqueOrigins: string[]
  uniqueVias: string[]
  uniqueLinhas: string[]
}

export default function FilterControls({
  filters,
  onFilterChange,
  uniqueOrigins,
  uniqueVias,
  uniqueLinhas
}: FilterControlsProps) {
  return (
    <div className="p-2 space-y-2 bg-card border-b sticky top-0 z-10">
      
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-1">
        <Select value={filters.origem} onValueChange={(value) => onFilterChange({ origem: value === 'all' ? '' : value })}>
          <SelectTrigger className="h-8">
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <MapPin className="h-3 w-3" />
              <SelectValue placeholder="Origem" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Origens</SelectItem>
            {uniqueOrigins.map(o => <SelectItem key={o} value={o}>{o}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={filters.via} onValueChange={(value) => onFilterChange({ via: value === 'all' ? '' : value })}>
          <SelectTrigger className="h-8">
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Route className="h-3 w-3" />
              <SelectValue placeholder="Via" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Vias</SelectItem>
            {uniqueVias.map(v => <SelectItem key={v} value={v}>{v}</SelectItem>)}
          </SelectContent>
        </Select>

        <Select value={filters.linha} onValueChange={(value) => onFilterChange({ linha: value === 'all' ? '' : value })}>
          <SelectTrigger className="h-8">
            <div className="flex items-center gap-1 text-muted-foreground text-xs">
              <Bus className="h-3 w-3" />
              <SelectValue placeholder="Linha" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Linhas</SelectItem>
            {uniqueLinhas.map(l => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>
    </div>
  )
}
