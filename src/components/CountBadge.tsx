import { Badge } from '@chakra-ui/react';
export default function CountBadge(props: { amount: number }) {
    return <Badge colorScheme="teal" ml={2}>
        {props.amount} books
    </Badge>
}