import { LinkIcon } from "@chakra-ui/icons";
import { Button, Link, Text } from "@chakra-ui/react";

interface LinkButtonProps {
    href: string;
    children: React.ReactNode;
    shortText?: string;
}

export default function LinkButton({ href, children, shortText }: LinkButtonProps) {
    return (
        <Button 
            rightIcon={<LinkIcon />} 
            size={{ base: 'sm', md: 'md' }}
            as={Link} 
            href={href} 
            isExternal
        >
            {shortText ? (
                <>
                    <Text display={{ base: 'none', md: 'inline' }}>{children}</Text>
                    <Text display={{ base: 'inline', md: 'none' }}>{shortText}</Text>
                </>
            ) : (
                children
            )}
        </Button>
    );
}