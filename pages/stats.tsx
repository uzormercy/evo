import {Fragment} from "react";
import { BarList } from "@tremor/react";
import {InferGetServerSidePropsType} from "next";
import OriginTable from "@/components/OriginTable";
type Prop = InferGetServerSidePropsType<typeof getServerSideProps>


const Stats = ({top3Characters,
            uniqueOriginName,
            locationWithMostHumanSpecie,
            mostAssignedStatus,
            mostMaleCharacter}: Prop) => {

    const top3 = top3Characters.map((item : any) => ({
        name: item.name,
        value: item.episode,
        color: ""
    }))

    return (
        <Fragment>
            <div className="container">
                <h3>Character Statistics</h3>
                <div className="stat-list">
                    <div className="stat-card bg-purple">
                        <div className="stat-card-body ">
                            <p className="stat-card-title">Status Assigned Most</p>
                            <div className="flex justify-between items-center">
                                <h4 className="stat-card-subTitle">{mostAssignedStatus.name}</h4>
                                <small className="text-white">{mostAssignedStatus.count}</small>
                            </div>
                        </div>
                    </div>

                    <div className="stat-card bg-orange">
                        <div className="stat-card-body">
                            <p className="stat-card-title">Location with the most character specie &#34;Human&#34;</p>
                            <div className="flex justify-between items-center">
                                <h4 className="stat-card-subTitle">{locationWithMostHumanSpecie.name}</h4>
                                <small>{locationWithMostHumanSpecie.count}</small>
                            </div>
                        </div>
                    </div>


                    <div className="stat-card bg-cynth">
                        <div className="stat-card-body">
                            <p className="stat-card-title">Species with the most male characters</p>
                            <div className="flex justify-between items-center">
                                <h4 className="stat-card-subTitle">{mostMaleCharacter.name}</h4>
                                <small>{mostMaleCharacter.count}</small>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="top-3">
                        <h4 className="section-title">The top 3 characters that appeared in the most episodes</h4>
                        <div className="width-half">
                             <BarList data={top3} className="mt-2" color="orange" />
                        </div>
                </div>

                <div className="top-3">
                        <h4 className="section-title">All unique origin names</h4>
                        <div>
                           <OriginTable origins={uniqueOriginName.origins} />
                        </div>
                </div>
            </div>
        </Fragment>
    )
}

export default Stats;

export const getServerSideProps = async () => {
    const baseUrl = "http://localhost:3000/api/stats/"
    const top3Characters = await fetch(`${baseUrl}/get-top-three-characters-in-episodes`).then(res => res.json()).catch(() => ([]));
    const uniqueOriginName = await fetch(`${baseUrl}/list-with-all-unique-origin-names`).then(res => res.json()).catch(() => ({}));
    const locationWithMostHumanSpecie = await fetch(`${baseUrl}/location-with-the-most-specie-human`).then(res => res.json()).catch(() => ({}));
    const mostAssignedStatus = await fetch(`${baseUrl}/most-assigned-status`).then(res => res.json()).catch(() => ({}));
    const mostMaleCharacter = await fetch(`${baseUrl}/most-male-character`).then(res => res.json()).catch(() => ({}))
    return {
        props: {
            top3Characters,
            uniqueOriginName,
            locationWithMostHumanSpecie,
            mostAssignedStatus,
            mostMaleCharacter
        }
    }
}