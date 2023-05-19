export interface Championship {
  id: string
  name: string
  rounds: number
  score: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}

export interface ChampionshipDTO {
  name: string,
  rounds: number;
}