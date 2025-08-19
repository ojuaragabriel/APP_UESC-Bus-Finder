export type Direction = 'IR_PARA_UESC' | 'SAIR_DA_UESC';

export interface BusSchedule {
  id: string;
  direcao: Direction;
  origem: string;
  hora: string; // "HH:mm"
  empresa: 'VM' | 'SM';
  linha: string;
  via: string;
  destino: string;
  chegadaPrevista?: string | null; // "HH:mm"
  observacoes?: string;
  diaTipo: 'UTEIS';
}

export interface FilterState {
  searchTerm: string;
  origem: string;
  via: string;
  linha: string;
}

    