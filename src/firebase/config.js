import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCjvowtI6hSvMPTG1XKUEbU_crKaIzBJfE",
  authDomain: "ai-roadmap-generator-2cafc.firebaseapp.com",
  projectId: "ai-roadmap-generator-2cafc",
  storageBucket: "ai-roadmap-generator-2cafc.firebasestorage.app",
  messagingSenderId: "1031230328611",
  appId: "1:1031230328611:web:082eff808efd1c8542c696",
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)