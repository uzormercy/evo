export interface Character {
    id: number;
    name: string;
    status: string;
    species: string
    type: string;
    gender: string
    origin: {
        name: string;
        url: string;
    };
    location: {
      name: string;
      url: string;
    },
    image: string;
    episode: string[],
    url:string;
    created: string;
}
export interface ResponseData {
    data: Character[];
    meta: {
        total: number;
        currentPage: number;
        limit: number;
        totalPages: number;
    }
}
export interface CharacterProps {
    name: string;
    status: string;
    imageUrl: string;
    onClick: () => void
}

export interface TopCharacter {
  id: number;
  name: string | undefined;
  status: string | undefined;
  species: string | undefined;
  episode: number;
}
export interface StatResult {
    name: string;
    count: number;
}