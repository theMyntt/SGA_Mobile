import React, { createContext, useContext, useState } from 'react'

// Definindo o tipo para o contexto de autenticação
interface TAuthContext {
  userName: string
  setUserName: (name: string) => void
}

// Definindo as propriedades do componente AuthProvider
interface Props {
  children: JSX.Element | JSX.Element[]
}
export const AuthContext = createContext<TAuthContext>({} as TAuthContext)
export function AuthProvider({ children }: Props) {
  const [name, setName] = useState<string>('oi')

  return (
    <AuthContext.Provider value={{ userName: name, setUserName: setName }}>
      {children}
    </AuthContext.Provider>
  )
}
