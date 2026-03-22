import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import firebaseConfig from "./config";
const firebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const storage = getStorage(firebaseApp);
export default firebaseApp;