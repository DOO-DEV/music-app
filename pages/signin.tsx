import { useState, useCallback } from 'react'
import {
  Text,
  Box,
  Input,
  Button,
  IconButton,
  InputGroup,
  InputRightElement,
  useToast
} from '@chakra-ui/react'
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai'
import { useRouter } from 'next/router'
import { useForm, SubmitHandler } from 'react-hook-form'
import AuthForm from '../components/authForm'
import { auth } from '../lib/mutations'

interface Inputs {
  email: string
  password: string
}

const Signin = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<Inputs>()
  const [loading, setLoading] = useState<boolean>(false)
  const [showPassword, setShowPassword] = useState(false)
  const router = useRouter()
  const toast = useToast()

  const onSubmit: SubmitHandler<Inputs> = async data => {
    try {
      setLoading(true)
      const user = await auth('signin', { ...data })
      router.replace('/')
    } catch (error) {
      toast({
        position: 'bottom',
        title: 'Email or password is wrong.',
        duration: 9000,
        isClosable: true,
        status: 'error'
      })
    } finally {
      setLoading(false)
    }
  }

  const changeVisibility = useCallback(() => {
    setShowPassword(prev => !prev)
  }, [])

  return (
    <AuthForm mode="signin">
      <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
        <Box>
          <Input
            {...register('email', {
              required: true,
              pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/i
            })}
            marginBottom={2}
            placeholder="Email"
          />
          {errors.email && (
            <Text color="red.300" marginBottom={2} fontSize="x-small">
              Email is not valid.
            </Text>
          )}
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              {...register('password', {
                required: true
              })}
              marginBottom={2}
              placeholder="Password"
            />
            <InputRightElement justifyContent="end">
              {showPassword ? (
                <IconButton
                  aria-label="show"
                  fontSize="24px"
                  outline="none"
                  variant="link"
                  icon={<AiOutlineEye />}
                  onClick={changeVisibility}
                />
              ) : (
                <IconButton
                  aria-label="hide"
                  fontSize="24px"
                  outline="none"
                  variant="link"
                  icon={<AiOutlineEyeInvisible />}
                  onClick={changeVisibility}
                />
              )}
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <Text color="red.300" marginBottom={2} fontSize="x-small">
              Password is required.
            </Text>
          )}
          <Button
            marginBottom={1}
            width="100%"
            size="md"
            type="submit"
            bg="green.500"
            isLoading={loading}
            sx={{
              '&:hover': {
                bg: 'green.400'
              },
              '&:hover[disabled]': {
                bg: 'green.400'
              }
            }}
          >
            Signin
          </Button>
        </Box>
      </form>
    </AuthForm>
  )
}

Signin.authPage = true

export const getServerSideProps = ({ req }) => {
  const token = req.cookies.TRAX_ACCESS_TOKEN
  if (token) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }
  return { props: {} }
}

export default Signin
