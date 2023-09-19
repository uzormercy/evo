import Image from "next/image";
import Card from "@/components/card";
import { GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
import {ResponseData} from "@/interfaces/general";
import { useRouter} from "next/router";
type Prop = InferGetServerSidePropsType<typeof getServerSideProps>

const Index = ({ characters }: Prop) => {
const totalPages = Array(characters.meta.totalPages).fill(0)
    const router =  useRouter();

  return(
      <>
        <div className="container">
            <h4 className="title">List Characters</h4>
            <div className="listing">
                {characters.data.map((character) => (<Card key={character.id} name={character.name} status={character.status} imageUrl={character.image} onClick={() => router.push(`${character.id}`)} />))}
            </div>

            <div className="pagination">
                <div className="pagination-list">
                    {
                        totalPages.map((page, index) => (<span key={index} className="pagination-item" onClick={() => router.push({query: {
                            page: index + 1,
                                limit: 25
                            }})}>{index + 1 }</span>))
                    }

                </div>
            </div>
        </div>
      </>
  )
}

export default Index

export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
    const url:string = `http://localhost:3000/api/characters?page=${query.page}&limit=${query.limit}`;
    let characters: ResponseData = await fetch(url).then((res) => res.json()).catch((error) => ({}));
    return{
        props: {
            characters
        }
    }
}