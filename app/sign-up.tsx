import { ImageBackground, StyleSheet, View } from 'react-native';
import React, { useEffect } from 'react';
import { Text } from 'react-native-paper';
import { router } from 'expo-router';
import { useForm } from 'react-hook-form';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { ProgressStep, ProgressSteps } from 'react-native-progress-steps';
import { useMutation } from '@tanstack/react-query';
import { scale } from 'react-native-size-matters';

import StepOne from '../components/pages/sign-up/multiStep/StepOne';
import useThemeColors from '../hooks/useThemeColors';
import { Fonts } from '../constants/fonts';
import {
  SignUpFormData,
  SignUpFormStepOne,
  SignUpFormStepThree,
  SignUpFormStepTwo
} from '../components/pages/sign-up/multiStep/multiStep.type';
import Button from '../components/ui/Button';
import StepTwo from '../components/pages/sign-up/multiStep/StepTwo';
import StepThird from '../components/pages/sign-up/multiStep/StepThird';
import Error from '../components/ui/Error';

import { createTenant } from '../apis/tenant.api';
import { STATUS_CODES } from '../constants/statusCodes';
import { setAuth } from '../features/auth';
import { useAppDispatch } from '../store/store';
import { USER_ROLE } from '../enums/User.enum';
import { API_BASE_RESPONSE, ValidationError } from '../apis/types/apis.type';
import { ValidationErrorString } from '../constants/variables';
import { CreateTenantPayload } from '../apis/types/tenant.type';

const signUpBgImage = require('../assets/images/signIn/Online Doctor-rafiki.png');

/**
 * SignUp component, renders the sign up form
 */
const SignUp = () => {
  const [step, setStep] = useState(0);
  const [isAllStepCompleted, setIsAllStepCompleted] = useState(false);
  const [hideError, setHideError] = useState(false);
  const [formData, setFormData] = useState<SignUpFormData | null>(null);
  const dispatch = useAppDispatch();
  const { email: emailParam } = useLocalSearchParams<{ email: string }>();
  const {
    control: controlFirstStep,
    handleSubmit: handleSubmitFirstStep,
    watch
  } = useForm<SignUpFormStepOne>({
    defaultValues: {
      email: emailParam,
      phoneNumber: formData?.phoneNumber || '',
      gender: formData?.gender
    }
  });
  const { control: controlSecondStep, handleSubmit: handleSubmitSecondStep } = useForm<SignUpFormStepTwo>();
  const { control: controlThirdStep, handleSubmit: handleSubmitThirdStep } = useForm<SignUpFormStepThree>();
  const email = watch('email');

  const { colors } = useThemeColors();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setHideError(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, [hideError]);

  const onNextStep = (data: SignUpFormStepOne | SignUpFormStepTwo | SignUpFormStepThree) => {
    setStep((prevS) => prevS + 1);

    if (data) {
      setFormData((prev) => {
        if (!prev) return data as SignUpFormData;
        return { ...prev, ...data } as SignUpFormData;
      });
    }
  };

  const {
    mutateAsync: createTenantMutation,
    isPending: isCreateTenantPending,
    error: createTenantError
  } = useMutation({
    mutationFn: createTenant,
    mutationKey: ['create-tenant', formData]
  });

  const TYPED_CREATE_TENANT_ERROR = createTenantError as unknown as API_BASE_RESPONSE;

  const onPrevStep = () => setStep((prevS) => prevS - 1);

  const onSubmit = async (data: SignUpFormStepThree) => {
    const modifiedData = {
      ...formData,
      ...data
    } as CreateTenantPayload;

    if (!modifiedData) return;

    await createTenantMutation(modifiedData, {
      onSuccess: ({ data }) => {
        const res = data.data;

        if (data.success && data.status === STATUS_CODES.success) {
          dispatch(
            setAuth({
              isAuth: true,
              user: {
                ...res,
                isTenant: res.role === USER_ROLE.admin ? true : false
              },
              tenantDetails: {
                id: res.id,
                orgName: res.orgName,
                licenseNo: res.licenseNo,
                GST: res.GST,
                createdAt: res.createdAt,
                updatedAt: res.updatedAt,
                phoneNumber: res.phoneNumber,
                email: res.email
              }
            })
          );
          router.push(`/sign-in?message=Verify_Your_Email&email=${formData?.email}`);
        }
      },
      onError(error) {
        const apiError = error as unknown as API_BASE_RESPONSE;
        setIsAllStepCompleted(false);
        setHideError(true);
        console.log('🚀 ~ onError ~ error:', JSON.stringify(apiError, null, 2));
      }
    });
  };

  const goBack = () => {
    router.back();
  };

  const dynamicStyles = {
    container: {
      // backgroundColor: colors.background
    },

    heading: {
      color: colors.text
    },
    emailHeading: {
      color: colors.primary
    }
  };

  return (
    <View style={[styles.container, dynamicStyles.container]}>
      <ImageBackground
        source={signUpBgImage}
        fadeDuration={1000}
        resizeMode='contain'
        style={{ flex: 1, width: '100%', height: '100%' }}
        imageStyle={{ marginTop: scale(170) }}>
        <View style={styles.headingCont}>
          <Text
            variant='headlineMedium'
            style={[styles.heading, dynamicStyles.heading]}>
            Creating Account For:
          </Text>
          <Text
            variant='bodyMedium'
            style={[styles.emailHeading, dynamicStyles.emailHeading]}>
            {email || emailParam}
          </Text>
        </View>
        <ProgressSteps
          isComplete={isAllStepCompleted}
          topOffset={scale(20)}
          activeStep={step}
          labelColor={colors.textSecondary}
          labelFontFamily={Fonts.quicksandBold}
          activeLabelColor={colors.tertiary}
          completedStepIconColor={colors.tertiary}
          completedProgressBarColor={colors.tertiary}
          completedLabelColor={colors.textSecondary}
          activeStepIconBorderColor={colors.tertiary}
          disabledStepIconColor={colors.grey100}
          disabledStepNumColor={colors.tertiary}
          activeStepNumColor={colors.tertiary}>
          <ProgressStep
            scrollViewProps={{
              scrollsToTop: true,
              showsVerticalScrollIndicator: false
            }}
            activeStep={1}
            removeBtnRow
            label='User Detail'>
            <StepOne control={controlFirstStep} />
          </ProgressStep>
          <ProgressStep
            removeBtnRow
            label='Organization Detail'>
            <StepTwo control={controlSecondStep} />
          </ProgressStep>
          <ProgressStep
            removeBtnRow
            label='Password'>
            <StepThird control={controlThirdStep} />
          </ProgressStep>
        </ProgressSteps>

        {hideError && (
          <View style={styles.errorContainer}>
            {TYPED_CREATE_TENANT_ERROR?.message === ValidationErrorString ? (
              <Error.ValidationErrors data={TYPED_CREATE_TENANT_ERROR?.error as ValidationError[]} />
            ) : (
              <Error.Message
                statusCode={TYPED_CREATE_TENANT_ERROR?.status}
                msg={
                  TYPED_CREATE_TENANT_ERROR.status === STATUS_CODES.conflict
                    ? 'Tenant already exist, Please try with different number'
                    : TYPED_CREATE_TENANT_ERROR?.message
                }
              />
            )}
          </View>
        )}

        <View style={styles.actionBtnsCont}>
          <Button.Transparent
            disabled={isCreateTenantPending}
            mode='text'
            textColor={colors.buttonBgSecondary}
            onPress={step === 0 ? goBack : onPrevStep}>
            {step === 0 ? 'Back to Login' : 'Previous'}
          </Button.Transparent>
          <Button.Primary
            disabled={isCreateTenantPending}
            loading={isCreateTenantPending}
            onPress={
              step === 0
                ? handleSubmitFirstStep(onNextStep)
                : step === 1
                  ? handleSubmitSecondStep(onNextStep)
                  : handleSubmitThirdStep(onSubmit)
            }>
            {isAllStepCompleted ? 'Submit' : 'Next'}
          </Button.Primary>
        </View>
      </ImageBackground>
    </View>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  root: {
    flex: 1
  },
  container: {
    flex: 1
  },

  headingCont: {
    alignItems: 'center',
    paddingTop: scale(26)
  },
  heading: {
    fontWeight: '700',
    fontFamily: Fonts.quicksandBold,
    textAlign: 'center'
  },
  emailHeading: {
    fontWeight: '600',
    fontFamily: Fonts.quicksandBold
  },

  step: {
    marginVertical: 20
  },
  input: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 20
  },

  errorContainer: {
    marginBottom: scale(20),
    paddingInline: 20
  },

  actionBtnsCont: {
    paddingBlock: 15,
    paddingInline: 20,
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
});
