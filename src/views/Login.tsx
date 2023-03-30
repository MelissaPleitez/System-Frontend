import {
  Button,
  Container,
  Box,
  Image,
  Link,
  Input,
  FormControl,
  FormErrorMessage,
  AbsoluteCenter,
  FormHelperText,
  Text,
  Stack,
  Center,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import mainLogo from "../assets/mainLogo.png";
import Alerts from "../components/Alerts";
import { loginRequest, employeeDash, hrDash } from "../api/auth";
import { authStore } from "../Store/authStore";
import { useNavigate } from "react-router-dom";

const Login = () => {
  type Inputs = {
    email: string;
    password: string;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const setToken = authStore((state) => state.setToken);
  const setEmployee = authStore((state) => state.setEmployee);
  const setHr = authStore((state) => state.setHr);

  const navegate = useNavigate();

  const onSubmit = async (data: any) => {
    const resLogin = await loginRequest(data.email, data.password);

    setToken(resLogin.data.token);

    const restEmployee = await employeeDash();
    const restHr = await hrDash();

    if (restEmployee.data.role === "employee") {
      setEmployee(restEmployee.data.employeeData);
      navegate("/Dashboard");
    } else {
      setHr(restHr.data.hrData);
      navegate("/Dash");
    }
  };
  return (
    <div>
      <Container mt={"7"} maxWidth={"sm"} shadow={"xl"} p={"8"}>
        <Center>
          <FormControl w="900px">
            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack spacing={5} direction={["column"]}>
                <Center boxSize="lm">
                  <Image src={mainLogo} />
                </Center>

                <Text fontSize="4xl" as="b" textAlign={"center"}>
                  Login
                </Text>
                <Input
                  size="md"
                  type="text"
                  placeholder="Email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <Alerts
                    status="warning"
                    title={"The email is required"}
                    descript={""}
                  />
                )}

                <Input
                  size="md"
                  type="password"
                  placeholder="Password"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <Alerts
                    status="warning"
                    title={"The password is required"}
                    descript={""}
                  />
                )}

                <Button type="submit" colorScheme="blue">
                  Login
                </Button>
                <Text textAlign={"center"} fontSize={"sm"} py={"55"}>
                  Don't have an account? <Link color={"blue.600"}>Sign In</Link>
                </Text>
              </Stack>
            </form>
          </FormControl>
        </Center>
      </Container>
    </div>
  );
};

export default Login;
