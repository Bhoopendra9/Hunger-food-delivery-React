import cors from "cors"

const configureCors = () =>{
    return cors({
        origin : (origin, callback)=>{
            const allowedOrigins = [
                "http://localhost:3000", //local dev
                "https://yourcustomdomain.com", // production domain
            ];

            if(!origin || allowedOrigins.indexOf(origin) !== -1){
                callback(null, true)
            }else{
                callback(new Error("Not allowed by cors"))
            }
        },
        methods:["GET", "POST", "PUT", "DELETE"],
        allowedHeaders:["Content-Type", "Authorization", "Accept-version"],
        exposedHeaders:[ "x-Total-Count", "Content-Range" ],
        credentials: true,
        preflightContinue: false,
        maxAge:600,
        optionSuccessStatus:204

    })
}


export default configureCors;