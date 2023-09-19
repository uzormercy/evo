import {Fragment} from "react";
import Image from "next/image";
import {CharacterProps} from "@/interfaces/general";

const Card = ({name, status, imageUrl, onClick = () => {}}: CharacterProps) => {
    return (
        <Fragment>
            <div className="card" onClick={onClick}>
                    <div className="card-image">
                        <Image
                            src={imageUrl}
                            alt="profile"
                            fill={true}
                            style={{
                                width: "100%",
                                height: "100%",
                                position: "absolute",
                                borderRadius: "50%"
                        }} />
                        </div>
                    <div className="card-body">
                        <h4>{name}</h4>
                        <small>{status}</small>
                    </div>
                </div>
        </Fragment>
    )
}
export default  Card;