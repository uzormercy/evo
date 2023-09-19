// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import data from "../../../factory/evo-task-data.json";
import { Character } from "@/interfaces/general";

interface QueryParams {
    page: number | string;
    limit: number | string;
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const characters: Character[] = data;
    let { page = 1, limit = 25} =  req.query as unknown as QueryParams ;
    if(page === 'undefined' || limit === 'undefined'){
        page = 1;
        limit = 25;
    }
    const start = (Number(page ) - 1 ) * Number(limit);
    const end = Number(start) + Number(limit);
    const result  = characters.slice(start, end);
    const response = {
            data: result,
            meta: {
            total: characters.length, currentPage: page, totalPages: Math.floor(characters.length / Number(limit)),
            limit
        }
    }
    res.status(200).send(response);
}
