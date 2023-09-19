import type { NextApiRequest, NextApiResponse } from 'next'
import { Character } from "@/interfaces/general";
import data from "../../../factory/evo-task-data.json"

interface OriginInfo {
  species: { [key: string]: number };
}

interface Origins {
  [originName: string]: OriginInfo;
}

const getOriginInfo = (characters: Character[]) => {
  const origins: Origins = {};

characters.forEach(char => {
  const originName = char.origin.name
  if(!origins[originName]) {
    origins[originName] = {
      species: {}
    }
  }
  if(!origins[originName].species[char.species]) {
    origins[originName].species[char.species] = 0
  }
  origins[originName].species[char.species]++
})
const originCount = Object.keys(origins).length
  return {
    origins,
    originCount
  }
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const response = getOriginInfo(data)
  res.status(200).json(response)
}
