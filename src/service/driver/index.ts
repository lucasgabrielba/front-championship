import axios from "axios"
import { DriverDTO } from "./driver"

const url = 'http://localhost:4000/driver'

export async function createDrivers(data: string[], championsipId: string): Promise<DriverDTO[] | undefined> {
  try {
    data.unshift(championsipId)
    const response = await axios.post(url + '/many', data)
    return response.data
  } catch {
    new Error('erro ao criar championsip')
    return undefined
  }
}

export async function addChampion(id: string): Promise<DriverDTO[] | undefined> {
  try {
    console.log(id);
    const response = await axios.put(url + `/champion/${id}`)
    return response.data
  } catch (err) {
    new Error('err')
  }
}

export async function addLoser(id: string): Promise<DriverDTO[] | undefined> {
  try {
    const response = await axios.put(url + `/loser/${id}`)
    return response.data
  } catch (err) {
    new Error('err')
  }
}