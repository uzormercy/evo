import {Fragment} from "react";
import Image from "next/image";
import {GetServerSidePropsContext, InferGetServerSidePropsType} from "next";
type Prop = InferGetServerSidePropsType<typeof getServerSideProps>
const DetailPage = ({ character }: Prop) => {
    return (
        <Fragment>
            <div className="container">
                <div className="container-detail">
                    <div className="card-detail-image">
                         <Image
                            src={character.image}
                            alt="profile"
                            fill={true}
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                borderRadius: "2px",
                                objectFit: 'cover'
                        }} />
                    </div>
                    <div>
                        <p>Species: {character.species}</p>
                        <p>Created at: {new Date(character.created).toLocaleDateString()} </p>
                        <p>Status: {character.status}</p>
                        <p>Gender: {character.gender}</p>
                        <p>Location: {character.location.name}</p>
                        <p>Count of Epic: {character.episode.length}</p>
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DetailPage;


export const getServerSideProps = async ({ query }: GetServerSidePropsContext) => {
    const url:string = `http://localhost:3000/api/characters/${query.id}`;
    const character = await fetch(url).then(res => res.json()).catch(() => ({}))
    return {
        props: {
            character
        }
    }
}