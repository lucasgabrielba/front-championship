export interface CreateChampionship {
  name: string
  rounds: number
  bet: string
}

export interface UpdateChampionship {
  name: string
  rounds: number
  stage: number
  bet: string
}

export interface ChampionshipDTO {
  id: string
  name: string
  rounds: number
  score: number
  stage: number
  bet: string
  createdAt: string
  updatedAt: string
  deletedAt: string
}