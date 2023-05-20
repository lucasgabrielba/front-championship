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