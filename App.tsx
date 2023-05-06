import {StyleSheet, Text, TextInput, View, ScrollView, SafeAreaView, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import * as Yup from 'yup';
import {Formik} from 'formik';
import BouncyCheckbox from 'react-native-bouncy-checkbox';

const PasswordSchema = Yup.object().shape({
  passwordLength: Yup.number().required('Length is required!'),
});

export default function App() {
  const [password, setPassword] = useState('');
  const [lowerCase, setLowerCase] = useState(true);
  const [upperCase, setUpperCase] = useState(false);
  const [numbers, setNumbers] = useState(false);
  const [symbols, setSymbols] = useState(false);
  const [isPassGenerated, setIsPassGenerated] = useState(false);

  const generatePasswordString = (passwordLength: number) => {
    let characterList = '';
    const upperCaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerCaseChars = 'abcdefhijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const symbolChars = '!@#$%^&*()_+=-';

    if (upperCase) {
      characterList += upperCaseChars;
    }
    if (lowerCase) {
      characterList += lowerCaseChars;
    }
    if (numbers) {
      characterList += numberChars;
    }
    if (symbols) {
      characterList += symbolChars;
    }

    const passwordResult = createPassword(characterList, passwordLength);

    setPassword(passwordResult);
    setIsPassGenerated(true);
  };

  const createPassword = (characters: string, passwordLength: number) => {
    let result = '';
    for (let i = 0; i < passwordLength; i++) {
      const characterIndex = Math.round(Math.random() * characters.length);
      result += characters.charAt(characterIndex);
    }
    return result;
  };

  const resetPassword = () => {
    setPassword('');
    setIsPassGenerated(false);
    setLowerCase(true);
    setUpperCase(false);
    setNumbers(false);
    setSymbols(false);
  };

  return (
    <ScrollView keyboardShouldPersistTaps="handled">
      <SafeAreaView style={styles.appContainer}>
        <View style={styles.formContainer}>
          <Text style={styles.title}>Password Generator</Text>
          <Formik
            initialValues={{ passwordLength: ''}}
            
            validationSchema={ PasswordSchema }
            
            onSubmit={ (values) => {
              console.log(values);               
              generatePasswordString(+values.passwordLength) 
            }}>

            {({
              values,
              errors,
              touched,
              isValid,
              handleChange,
              handleSubmit,
              handleReset
            }) => (
              <>
                <View style={styles.inputWrapper}>
                  <View style={styles.inputColumn}>
                    <Text style={styles.heading}>Password Length</Text>
                    { touched.passwordLength && errors.passwordLength && (
                      <Text style={styles.errorText}>{errors.passwordLength}</Text>
                    )}
                  </View>
                  <TextInput 
                      style={styles.inputStyle} 
                      value={values.passwordLength} 
                      onChangeText={ handleChange('passwordLength')}
                      placeholder='Eg. 8'
                      keyboardType='numeric'
                    />
                </View>
                <View style={styles.inputWrapper}>
                  <Text style={styles.heading} >Include Lowercase</Text>
                  <BouncyCheckbox 
                    disableBuiltInState
                    isChecked={lowerCase}
                    onPress={() => setLowerCase(!lowerCase)}
                    fillColor='#29ab87'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading} >Include Uppercase</Text>
                  <BouncyCheckbox 
                    disableBuiltInState
                    isChecked={upperCase}
                    onPress={() => setUpperCase(!upperCase)}
                    fillColor='#29ab87'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading} >Include Numbers</Text>
                  <BouncyCheckbox 
                    disableBuiltInState
                    isChecked={numbers}
                    onPress={() => setNumbers(!numbers)}
                    fillColor='#29ab87'
                  />
                </View>
                <View style={styles.inputWrapper}>
                <Text style={styles.heading} >Include Symbols</Text>
                  <BouncyCheckbox 
                    disableBuiltInState
                    isChecked={symbols}
                    onPress={() => setSymbols(!symbols)}
                    fillColor='#29ab87'
                  />
                </View>

                <View style={styles.formActions}>
                  <TouchableOpacity
                    disabled={!isValid}
                    style={styles.primaryBtn}
                    onPress={ handleSubmit }
                  >
                    <Text style={styles.primaryBtnTxt}>Generate Password</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.secondaryBtn}
                    onPress={ () => {
                      handleReset();
                      resetPassword();
                    } }
                  >
                    <Text style={styles.secondaryBtnTxt}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
        {
          isPassGenerated ? (
            <View style={[styles.card, styles.cardElevated]}>
              <Text style={styles.subTitle}>Result</Text>
              <Text style={styles.description}>Long press to Copy</Text>
              <Text selectable style={styles.generatedPassword}>{ password }</Text>
            </View>
          ) : null
        }
      </SafeAreaView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
  },
  formContainer: {
    margin: 8,
    padding: 8,
  },
  title: {
    fontSize: 32,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 30,
    textAlign: 'center'
  },
  subTitle: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 2,
  },
  description: {
    color: '#758283',
    marginBottom: 8,
    textAlign:'center'
  },
  heading: {
    fontSize: 15,
  },
  inputWrapper: {
    marginBottom: 15,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  inputColumn: {
    flexDirection: 'column',
  },
  inputStyle: {
    padding: 8,
    width: '30%',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#CAD5E2',
  },
  errorText: {
    fontSize: 12,
    color: '#ff0d10',
  },
  formActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30
  },
  primaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#5DA3FA',
  },
  primaryBtnTxt: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '700',
  },
  secondaryBtn: {
    width: 120,
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 8,
    backgroundColor: '#CAD5E2',
  },
  secondaryBtnTxt: {
    textAlign: 'center',
    color: '#5DA3FA',
    fontWeight: '700',
  },
  card: {
    padding: 10,
    borderRadius: 6,
    marginHorizontal: 12,
    marginTop: 20
  },
  cardElevated: {
    backgroundColor: '#ffffff',
    elevation: 1,
    shadowOffset: {
      width: 1,
      height: 1,
    },
    shadowColor: '#333',
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  generatedPassword: {
    fontSize: 22,
    textAlign: 'center',
    marginBottom: 12,
    color: '#000',
  },
});
