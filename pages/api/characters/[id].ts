import type { NextApiRequest, NextApiResponse } from 'next'
import data from "../../../factory/evo-task-data.json";
import { Character } from "@/interfaces/general";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const characters: Character[] = data;
    const { id } = req.query;
    const character =  characters.find((item) => Number(item.id) === Number(id))
    res.status(200).json(character);
}
