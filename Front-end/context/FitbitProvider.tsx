import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router'

interface FitbitContextType {
  getFitbitCode: Function,
}

export const FitbitContext = React.createContext< null | FitbitContextType >(null)

interface Props {
  children: React.ReactNode
}

export function FitbitProvider({ children }: Props) {
  const router = useRouter()

  const getFitbitCode = () => {

    const client_id = process.env.FITBIT_ID
    const scope = process.env.FITBIT_SCOPE
    const response_type = process.env.FITBIT_RESPONSE_TYPE

    router.push(`https://www.fitbit.com/oauth2/authorize?response_type=code&client_id=${client_id}&scope=${scope}`)
  }

  return (
    <FitbitContext.Provider value={{ getFitbitCode }}>
      {children}
    </FitbitContext.Provider>
  )
}

export const useFitbitContext = () => {
  const fitbitContext = useContext(FitbitContext);

  // if(!fitbitContext) throw new Error('FitbitContext Provider Error')

  return fitbitContext
}





// CODE FOR PKCE
    // import axios from 'axios'
    // import base64url from 'base64url'
    // import randomstring from 'randomstring'
    // import crypto from  'crypto'
    // import { v4 as uuidv4 } from 'uuid'
  // Generate the Code Verifier
    // const [codeVerifier, setCodeVerifier] = useState('')
    // setCodeVerifier(randomstring.generate(128))

  // Hash the Code Verifier
      // const base64Digest = crypto
      // .createHash('sha256')
      // .update(codeVerifier)
      // .digest('base64')

  // Generate the Code Challange
    // const code_challenge = base64url.fromBase64(base64Digest)
    // const state = uuidv4();
    // const code_challenge_method = 'S256'

    // router.push(`https://www.fitbit.com/oauth2/authorize?response_type=${response_type}&client_id=${client_id}&scope=${scope}&code_challenge=${code_challenge}&code_challenge_method=${code_challenge_method}&state=${state}`)


