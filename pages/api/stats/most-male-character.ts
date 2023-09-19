import type { NextApiRequest, NextApiResponse } from 'next'
import {Character, StatResult} from "@/interfaces/general";
import data from "../../../factory/evo-task-data.json"


interface GenderStats {
  [species: string]: number;
}

const mostMaleSpecies = (characters: Character[]): StatResult => {
  const speciesByGender: {Male: GenderStats} = {
    Male: {}
  };

  characters.forEach((char: Character) => {
    if(char.gender === "Male") {
      if(!speciesByGender.Male[char.species]) {
        speciesByGender.Male[char.species] = 0;
      }
      speciesByGender.Male[char.species]++;
    }
  });

  const sortedSpecies = Object.entries(speciesByGender.Male)
    .sort((a, b) => b[1] - a[1])

  const topSpecies = sortedSpecies[0];
  return {
    name: topSpecies[0],
    count: topSpecies[1]
  }
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const response =  mostMaleSpecies(data);
  res.status(200).json(response)
}
