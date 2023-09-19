import type { NextApiRequest, NextApiResponse } from 'next'
import {Character, TopCharacter} from "@/interfaces/general";
import data from "../../../factory/evo-task-data.json"

const topThreeCharacters = (characters: Character[]): TopCharacter[] => {
    const episodeCounts: { [key: string]: number } = {}
    characters.forEach((char: any) => {
      episodeCounts[char.id] = char.episode.length
    })
    const sorted = Object.entries(episodeCounts).sort((a, b) => b[1] - a[1]).slice(0, 3);
   return sorted.map(([id, count]) => ({
    id: parseInt(id),
    name: data.find(c => c.id === parseInt(id))?.name,
    status: data.find(c => c.id === parseInt(id))?.status,
    species: data.find(c => c.id === parseInt(id))?.species,
    episode: count
  }));
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const response: TopCharacter[]  = topThreeCharacters(data)
  res.status(200).json(response);
}
