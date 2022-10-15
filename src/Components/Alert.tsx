import React from "react";

export default function (props: {
    position?: string,
    message: string,
    color: "success"|"danger"|"warning"|"info"|"primary"
}){

    let alert_color = "alert bg-" + props.color;

    return (
        <div className={alert_color + " text-white shadow-lg my-alert "}>
            <div className="card-body">
                <p>{props.message}</p>
            </div>
        </div>
    );

}

/*
<div className="alert alert-icon-container">
                <i className={"bi bi-check2"} />
            </div>
 */