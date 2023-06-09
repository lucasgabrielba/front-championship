import axios from "axios"
import { ChampionshipDTO, CreateChampionship } from "./championship"

const url = 'http://localhost:4000/championship'

export async function createChampionship(data: CreateChampionship): Promise<ChampionshipDTO | undefined> {
  try {
    const response = await axios.post(url, data)
    return response.data
  } catch {
    new Error('erro ao criar championsip')
    return undefined
  }
}