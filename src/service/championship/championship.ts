export interface CreateChampionship {
  name: string
  rounds: number
}

export interface ChampionshipDTO {
  id: string
  name: string
  rounds: number
  score: number
  stage: number
  createdAt: string
  updatedAt: string
  deletedAt: string
}