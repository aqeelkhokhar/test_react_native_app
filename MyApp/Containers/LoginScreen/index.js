import React, {useState, useEffect} from 'react';
import {Platform} from 'react-native';
import {useForm, Controller} from 'react-hook-form';
import {useDispatch, useSelector} from 'react-redux';
import {useInjectReducer, useInjectSaga} from 'redux-injectors';
import styles from './style';
import {
  AlertCircleIcon,
  Box,
  Button,
  ButtonSpinner,
  ButtonText,
  Center,
  EyeIcon,
  EyeOffIcon,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Heading,
  Input,
  InputField,
  InputIcon,
  InputSlot,
  Text,
  VStack,
} from '@gluestack-ui/themed';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import Icon from 'react-native-vector-icons/FontAwesome';

import LoginScreenReducer, {DataRequest} from './slice';
import {LoginScreenSelector} from './selector';
import LoginScreenSaga from './saga';
import {
  AccessToken,
  GraphRequest,
  GraphRequestManager,
  LoginManager,
} from 'react-native-fbsdk';

import {useNavigationState} from '@react-navigation/native';

const LoginScreen = ({navigation}) => {
  const [showPassword, setShowPassword] = useState(false);
  const {loading} = useSelector(LoginScreenSelector);

  useInjectReducer({
    key: 'login',
    reducer: LoginScreenReducer,
  });

  useInjectSaga({key: 'login', saga: LoginScreenSaga});

  const dispatch = useDispatch();
  const navigationState = useNavigationState(state => state);

  const {routes, index} = navigationState;

  // Print the hierarchy of screens
  console.log('Screen Hierarchy:');
  routes.forEach((route, idx) => {
    const isActive = idx === index ? ' (Active)' : '';
    console.log(`${idx + 1}. ${route.name}${isActive}`);
  });

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      console.log('User info: ' + JSON.stringify(userInfo, null, 2));
      if (userInfo) {
        console.log('Google credentials', {
          email: userInfo?.user?.email,
          socialId: userInfo?.user?.id,
          name: userInfo?.user?.name,
          socialProvider: 'google',
        });
        dispatch(
          DataRequest({
            email: userInfo?.user?.email,
            socialId: userInfo?.user?.id,
            name: userInfo?.user?.name,
            socialProvider: 'google',
          }),
        );
      }
    } catch (error) {
      console.log('Google login received', error);
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  const handleFacebookLogin = () => {
    LoginManager.logInWithPermissions(['public_profile', 'email']).then(
      result => {
        if (result.isCancelled) {
          console.log('Login was cancelled');
        } else {
          AccessToken.getCurrentAccessToken().then(data => {
            const infoRequest = new GraphRequest(
              '/me',
              {
                accessToken: data.accessToken,
                parameters: {
                  fields: {
                    string: 'id,name,email', // Requested fields
                  },
                },
              },
              (error, result) => {
                if (error) {
                  console.log('Error fetching data: ' + error.toString());
                } else {
                  console.log('User ID: ' + result.id);
                  console.log('Name: ' + result.name);
                  console.log('Email: ' + result.email);
                  dispatch(
                    DataRequest({
                      email: result.email,
                      socialId: result?.id,
                      name: result?.name,
                      socialProvider: 'facebook',
                    }),
                  );
                }
              },
            );
            new GraphRequestManager().addRequest(infoRequest).start();
          });
        }
      },
      error => {
        console.log('Login failed with error: ' + error);
      },
    );
  };

  useEffect(() => {
    if (Platform.OS === 'android') {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
      });
    } else {
      GoogleSignin.configure({
        scopes: ['https://www.googleapis.com/auth/drive.readonly'],
        webClientId:
          '516997872288-4sr0av2278tibt7pq6o14bc7uke589kr.apps.googleusercontent.com',
        offlineAccess: true,
        hostedDomain: '',
        forceCodeForRefreshToken: true,
        accountName: '',
        googleServicePlistPath: '',
        openIdRealm: '',
        profileImageSize: 120,
      });
    }
  }, []);

  const {control, handleSubmit, setValue, formState, getFieldState, getValues} =
    useForm();

  const handleApiCall = handleSubmit(async data => {
    try {
      dispatch(
        DataRequest({
          email: data?.email,
          password: data?.password,
        }),
      );
    } catch (error) {
      console.error('Submission Error:', error);
    }
  });

  const handleState = () => {
    setShowPassword(showState => {
      return !showState;
    });
  };

  return (
    <Box style={{flex: 1, margin: 20, justifyContent: 'center'}}>
      <Center>
        <Box
          p="$3"
          maxWidth="$96"
          borderWidth="$1"
          borderColor="$backgroundLight300"
          borderRadius="$lg"
          sx={{
            _dark: {
              borderColor: '$backgroundDark700',
            },
          }}>
          <VStack space="xs" pb="$4">
            <Heading lineHeight={30}>Login</Heading>
            <Text fontSize="$sm">Enter your Email name and Password.</Text>
          </VStack>
          <VStack space="xl" py="$2">
            <Controller
              name="email"
              control={control}
              defaultValue={'abdul.mattee@pikessoft.com'}
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+\.\S+$/,
                  message: 'Invalid email address',
                },
              }}
              render={({field}) => (
                <FormControl
                  minWidth="$80"
                  isRequired
                  isInvalid={'email' in formState?.errors}>
                  <FormControlLabel>
                    <FormControlLabelText>Email</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type="email"
                      value={field.value}
                      placeholder="Enter a valid email address"
                      onChangeText={text => setValue('email', text, true)}
                    />
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {formState?.errors?.email?.message}
                    </FormControlErrorText>
                  </FormControlError>
                  <FormControlHelper>
                    {/* <FormControlHelperText>
                  What would you like people to call you?
                </FormControlHelperText> */}
                  </FormControlHelper>
                </FormControl>
              )}
            />
            <Controller
              name="password"
              control={control}
              defaultValue={'123'}
              rules={{
                required: 'Password is required',
                pattern: {
                  value: /^[0-9]+$/,
                  message: 'Invalid password',
                },
              }}
              render={({field}) => (
                <FormControl
                  minWidth="$80"
                  isRequired
                  isInvalid={'password' in formState?.errors}>
                  <FormControlLabel>
                    <FormControlLabelText>Password</FormControlLabelText>
                  </FormControlLabel>
                  <Input>
                    <InputField
                      type={showPassword ? 'text' : 'password'}
                      value={field.value}
                      placeholder="Enter your password"
                      onChangeText={text => setValue('password', text, true)}
                    />
                    <InputSlot pr="$3" onPress={handleState}>
                      <InputIcon
                        as={showPassword ? EyeIcon : EyeOffIcon}
                        color="$darkBlue500"
                      />
                    </InputSlot>
                  </Input>
                  <FormControlError>
                    <FormControlErrorIcon as={AlertCircleIcon} />
                    <FormControlErrorText>
                      {formState?.errors?.password?.message}
                    </FormControlErrorText>
                  </FormControlError>
                  <FormControlHelper>
                    <FormControlHelperText>
                      Password contain only Numeric Values
                    </FormControlHelperText>
                  </FormControlHelper>
                </FormControl>
              )}
            />
          </VStack>
          <VStack space="lg" pt="$4">
            <Button isDisabled={loading} size="sm" onPress={handleApiCall}>
              {loading && <ButtonSpinner mr="$1" />}
              <ButtonText>Login</ButtonText>
            </Button>
          </VStack>
          <HStack pt={20} justifyContent="space-between">
            <Icon.Button
              name="google"
              backgroundColor="#4285F4"
              onPress={() => signIn()}>
              Google SignIn
            </Icon.Button>
            <Icon.Button
              name="facebook"
              backgroundColor="#3b5998"
              onPress={() => handleFacebookLogin()}>
              Facebook SignIn
            </Icon.Button>
          </HStack>
        </Box>
      </Center>
    </Box>
  );
};

export default LoginScreen;
