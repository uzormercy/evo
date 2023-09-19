import type { NextApiRequest, NextApiResponse } from 'next'
import {Character, StatResult} from "@/interfaces/general";
import data from "../../../factory/evo-task-data.json"


const mostHumansLocation = (data: Character[]): StatResult => {
  const speciesByLocation: { [key: string]: number } = {};

  data.forEach((char: Character) => {
    if(char.species === "Human") {
      if(!speciesByLocation[char.location.name]) {
        speciesByLocation[char.location.name] = 0;
      }
      speciesByLocation[char.location.name]++;
    }
  });
 const sortedLocations = Object.entries(speciesByLocation)
    .sort((a, b) => b[1] - a[1])

  const topLocation = sortedLocations[0]

  return {
    name: topLocation[0],
    count: topLocation[1]
  }
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

    const response = mostHumansLocation(data);
    res.status(200).json(response);
}
