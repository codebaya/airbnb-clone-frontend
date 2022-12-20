import {FaCamera, FaRegHeart, FaStar} from "react-icons/fa";
import {Link, useNavigate} from "react-router-dom";
import {IRoomBooking} from "../types";
import {

    Checkbox,
    Container,
    FormControl,
    FormHelperText,
    FormLabel, Grid,
    Heading,
    Input, Text,
    InputGroup,
    InputLeftAddon, Select, Textarea,
    VStack, useToast, Table, Th, Thead, Tr, Tbody, Td, Tfoot, TableContainer, TableCaption
} from "@chakra-ui/react";

export default function Booking({pk, check_in, check_out, guests, kind}: IRoomBooking) {

    return (
            <VStack spacing={-0.5} w={"100%"} alignItems="center">
                <TableContainer>
                  <Table variant='striped' colorScheme='teal'>
                    {/*<TableCaption>Imperial to metric conversion factors</TableCaption>*/}
                    <Thead>
                      <Tr>
                        <Th>N0</Th>
                        <Th>check in</Th>
                        <Th>check out</Th>
                        <Th>kind</Th>
                        <Th>user</Th>
                        <Th isNumeric>guests</Th>
                      </Tr>
                    </Thead>
                    <Tbody>
                      <Tr>
                        <Td>{pk}</Td>
                        <Td>{check_in}</Td>
                        <Td>{check_out}</Td>
                        <Td>{kind}</Td>
                        <Td>{kind}</Td>
                        <Td isNumeric>{guests}</Td>
                      </Tr>

                    </Tbody>

                  </Table>
                </TableContainer>
            </VStack>


    )
}