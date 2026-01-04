import { clientEnv } from "@/lib/dotenv/env";

const firebaseConfig = {
    apiKey: clientEnv.firebase.apiKey,
    authDomain: clientEnv.firebase.authDomain,
    projectId: clientEnv.firebase.projectId,
    storageBucket: clientEnv.firebase.storageBucket,
    messagingSenderId: clientEnv.firebase.messagingSenderId,
    appId: clientEnv.firebase.appId,
    measurementId: clientEnv.firebase.measurementId
};

export default firebaseConfig;