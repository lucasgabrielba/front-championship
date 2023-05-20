import { ChampionshipDTO } from "../championship/championship";
import { DriverDTO } from "../driver/driver";

export interface CreateScore {
  championshipId: string;
  driverId: string;
  score: number
}

export interface ScoreDTO {
  championship: ChampionshipDTO,
  driver: DriverDTO,
  score: number
}