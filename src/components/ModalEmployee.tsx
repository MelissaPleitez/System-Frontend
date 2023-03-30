import {
  Avatar,
  AvatarBadge,
  Box,
  Container,
  Divider,
  FormControl,
  Input,
  FormLabel,
  SimpleGrid,
  Textarea,
  useDisclosure,
  VStack,
  HStack,
} from "@chakra-ui/react";
import {
  Card,
  CardBody,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import userLogo from "../assets/userLogo.png";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { authStore } from "../Store/authStore";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "react-query";
import authApi from "../libs/axios";
import toast, { Toaster } from "react-hot-toast";

const ModalDesign = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const logout = authStore((state) => state.logout);
  const navegate = useNavigate();

  const queryClient = useQueryClient();

  const addApplication = useMutation({
    mutationFn: (application: any) => authApi.post("/application", application),
    onSuccess: () => {
      queryClient.invalidateQueries("applications");
    },
  });

  const onSubmit = (data: any) => {
    data.preventDefault();

    const target = data.target;

    const datas = {
      medicalUnit: target.medicalUnit.value,
      doctorName: target.doctorName.value,
      StartDate: target.StartDate.value,
      EndDate: target.EndDate.value,
      coverageDays: target.coverageDays.value,
      medicalDiagnostic: target.medicalDiagnostic.value,
    };

    console.log(datas);

    addApplication.mutate(datas);
  };

  const notify = () => toast.success("Application sent successfully!");

  return (
    <>
      <div>
        <Toaster />
      </div>
      <Container maxW="container.full">
        <Card>
          <CardBody>
            <SimpleGrid columns={{ sm: 1, md: 2, lg: 2 }} spacing={5}>
              <Box>
                <VStack spacing={4} align={"flex-start"}>
                  <HStack>
                    <Avatar src={userLogo}>
                      <AvatarBadge boxSize="1.25em" bg="green.500" />
                    </Avatar>
                    <Text fontSize={"sm"} fontWeight={"bold"}>
                      {/* {store.user.fullName} */} John Doe
                    </Text>
                  </HStack>
                  <Text fontSize={"sm"} fontWeight={"bold"} color="tomato">
                    <button
                      onClick={() => {
                        logout();
                        navegate("/");
                      }}
                    >
                      <ArrowBackIcon />
                      Log out
                    </button>
                  </Text>
                </VStack>
              </Box>
              <Box textAlign={{ sm: "center", md: "end", lg: "end" }}>
                <Button colorScheme={"blue"} size={"lg"} onClick={onOpen}>
                  New Application
                </Button>
              </Box>
            </SimpleGrid>

            <Modal
              closeOnOverlayClick={false}
              isOpen={isOpen}
              onClose={onClose}
              size={"6xl"}
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>Sick Leave Application</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <form onSubmit={onSubmit}>
                    <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={"15px"}>
                      <FormControl>
                        <FormLabel>Medical Unit</FormLabel>
                        <Input
                          type="text"
                          name="medicalUnit"
                          placeholder="Unit"
                          required={true}
                        />
                      </FormControl>

                      <FormControl>
                        <FormLabel>Start Date</FormLabel>
                        <Input
                          type="date"
                          name="StartDate"
                          placeholder="Start Date"
                          required={true}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Doctor</FormLabel>
                        <Input
                          type="text"
                          name="doctorName"
                          placeholder="Doctor"
                          required={true}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>End Date</FormLabel>
                        <Input
                          type="date"
                          name="EndDate"
                          placeholder="End Date"
                          required={true}
                        />
                      </FormControl>
                      <FormControl>
                        <FormLabel>Coverage Days</FormLabel>
                        <Input
                          type="text"
                          name="coverageDays"
                          placeholder="Coverage Days"
                          min={1}
                          required={true}
                        />
                      </FormControl>
                    </SimpleGrid>
                    <FormControl mt={2} width={"full"}>
                      <FormLabel textAlign={"center"}>
                        Medical Diagnostic
                      </FormLabel>
                      <Textarea
                        name="medicalDiagnostic"
                        placeholder="Medical Diagnostic"
                        required={true}
                      />
                    </FormControl>
                    <Button
                      colorScheme="blue"
                      mt={"5"}
                      type="submit"
                      onClick={notify}
                    >
                      Submit Application
                    </Button>
                  </form>
                </ModalBody>

                <ModalFooter></ModalFooter>
              </ModalContent>
            </Modal>
          </CardBody>
        </Card>
        <Divider />
      </Container>
    </>
  );
};

export default ModalDesign;
