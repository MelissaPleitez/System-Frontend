import {
  TableContainer,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Tfoot,
  Button,
  Input,
  FormControl,
  SimpleGrid,
  InputLeftElement,
  InputGroup,
} from "@chakra-ui/react";
import { getApplication } from "../api/application";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { DeleteIcon, Search2Icon } from "@chakra-ui/icons";
import authApi from "../libs/axios";
import { useState } from "react";
import { dateFormat } from "../Store/dateConfig";

const TableHr = () => {
  const [search, setSearch] = useState("");

  const { isLoading, data, isError, error } = useQuery({
    queryKey: ["applications"],
    queryFn: getApplication,
  });

  const queryClient = useQueryClient();

  const deleteApplication = useMutation({
    mutationFn: (id: any) => authApi.delete(`/application/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries("applications"), (<p>Applicacion Sent</p>);
    },
  });

  if (isLoading) {
    return <div>Loading..</div>;
  } else if (isError) return <div>Error</div>;

  //Input search logic

  const dataFilter = data?.filter((info: any) =>
    info.medicalUnit.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <TableContainer mt={"10"}>
      <SimpleGrid columns={{ sm: 1, md: 3 }} spacing={"20px"} mx={"5"}>
        <InputGroup>
          <FormControl>
            <InputLeftElement
              pointerEvents="none"
              color="gray.300"
              fontSize="1em"
              children={<Search2Icon />}
            />
            <Input
              type="search"
              name="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </FormControl>
        </InputGroup>
      </SimpleGrid>

      <Table>
        <Thead>
          <Tr>
            <Th>Medical Unit</Th>
            <Th>Start Date</Th>
            <Th>End Date</Th>
            <Th>Doctor Name</Th>
            <Th>Medical Diagnostic</Th>
            <Th>Coverage Days</Th>
          </Tr>
        </Thead>
        <Tbody>
          {dataFilter.map((datas: any) => (
            <Tr key={datas._id}>
              <Td>{datas.medicalUnit}</Td>
              <Td>{dateFormat(datas.startDate)}</Td>
              <Td>{dateFormat(datas.endDate)}</Td>
              <Td>{datas.doctorName}</Td>
              <Td>{datas.medicalDiagnostic}</Td>
              <Td>{datas.coverageDays}</Td>
              <Td>
                <Button
                  onClick={() => {
                    deleteApplication.mutate(datas._id);
                  }}
                >
                  <DeleteIcon color="red.500" />
                </Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  );
};

export default TableHr;
