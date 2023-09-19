import type { NextApiRequest, NextApiResponse } from 'next'
import {Character, StatResult} from "@/interfaces/general";
import data from "../../../factory/evo-task-data.json"


 const mostAssignedStatus = (data: Character[]): StatResult => {
  const statusCounts: { [key: string]: number } = {};

  data.forEach((char: Character) => {
    if(!statusCounts[char.status]) {
      statusCounts[char.status] = 0;
    }
    statusCounts[char.status]++;
  });

    const sortedStatuses = Object.entries(statusCounts)
    .sort((a, b) => b[1] - a[1])

  const topStatus = sortedStatuses[0]
     return {
    name: topStatus[0],
    count: topStatus[1]
  }
}
export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const response  =  mostAssignedStatus(data);
  res.status(200).json(response)
}
