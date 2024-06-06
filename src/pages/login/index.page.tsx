import { View, Text, Button, TextInput, StyleSheet, Alert } from 'react-native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RouteProp } from '@react-navigation/native'
import { useContext, useEffect, useState } from 'react'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import axios from 'axios'
import { ENVIROMENTS } from '../../config/enviroments'
import { AuthContext, AuthProvider } from '../../contexts/auth.context'

type RootStackParamList = {
  Login: undefined
  Home: undefined
}

type LoginPageNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'Login'
>
type LoginPageRouteProp = RouteProp<RootStackParamList, 'Login'>

type Props = {
  navigation?: LoginPageNavigationProp
  route?: LoginPageRouteProp
}

export default function LoginPage({ navigation }: Props) {
  return (
    <AuthProvider>
      <Login navigation={navigation} />
    </AuthProvider>
  )
}

function Login({ navigation }: Props): JSX.Element {
  const { setUserName } = useContext(AuthContext)
  const [userInformation, setUserInformation] = useState({
    email: '',
    password: '',
    schoolId: '',
  })

  const handleUserInformationChange = (field: string, value: string): void => {
    setUserInformation((prevState) => ({
      ...prevState,
      [field]: value,
    }))
  }

  const submit = async (): Promise<void> => {
    const { email, password, schoolId } = userInformation

    if (!email || !password || !schoolId)
      return Alert.alert('Erro!', 'Todos os campos são obrigatórios.', [
        {
          text: 'OK',
          style: 'cancel',
        },
      ])

    try {
      const { data } = await axios.post(
        `${ENVIROMENTS.API_BASE_LINK}user/v1/login`,
        {
          email,
          password,
          schoolId,
        }
      )

      const { userName } = data
      if (!userName) return

      setUserName(userName as string)
      await new Promise((resolve) => setTimeout(resolve, 3000))

      navigation?.navigate('Home')
    } catch (error) {
      return Alert.alert(
        'Erro!',
        'Ocorreu um erro ao fazer login, tente novamente mais tarde.',
        [
          {
            text: 'OK',
            style: 'cancel',
          },
        ]
      )
    }
  }

  return (
    <KeyboardAwareScrollView contentContainerStyle={styles.container}>
      <Text style={styles.brandHello}>Bem vindo aluno.</Text>
      <Text style={styles.subHeading}>Faça login para continuar.</Text>
      <View style={styles.formContainer}>
        <Text>Email:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu email:"
          onChangeText={(e) =>
            handleUserInformationChange('email', e.toLowerCase())
          }
          autoCapitalize="none"
          value={userInformation.email}
        />

        <Text>Senha:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          secureTextEntry
          onChangeText={(e) => handleUserInformationChange('password', e)}
        />

        <Text>Código da Escola:</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o código da escola"
          onChangeText={(e) => handleUserInformationChange('schoolId', e)}
        />
        <Button title="Fazer login." onPress={submit} />
      </View>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  brandHello: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    width: '100%',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    width: '80%',
    padding: 20,
    shadowOffset: {
      height: 5,
      width: 5,
    },
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderBottomWidth: 2,
    padding: 10,
    marginBottom: 20,
  },
})
