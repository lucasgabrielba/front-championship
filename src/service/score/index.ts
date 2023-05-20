import axios from "axios"
import { ScoreDTO } from "./score"
import { DriverDTO } from "../driver/driver"
import { Driver } from "../../pages/public/addScore"

const url = 'http://localhost:4000/score'

export async function createDriversAndScores(data: string[], championshipId: string): Promise<ScoreDTO[] | undefined> {
  try {
    data.unshift(championshipId)
    const response = await axios.post(url + '/many', data)
    return response.data
  } catch (err) {
    new Error('err')
  }
}

export async function getTable(championshipId: string): Promise<ScoreDTO[] | undefined> {
  try {
    const response = await axios.get(url + `/table/${championshipId}`)
    return response.data
  } catch (err) {
    new Error('err')
  }
}

export async function addScoreInDrivers(data: Driver[], championshipId: string): Promise<boolean | undefined> {
  try {
    const response = await axios.put(url + `/addScore/${championshipId}`, data)
    return response.data
  } catch (err) {
    new Error('err')
  }
}