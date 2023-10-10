// useNotify.ts
import { ReactNode, useCallback } from "react";

import { useToast } from "@chakra-ui/react";

interface NotifyProps {
    title: string;
    message: ReactNode;
    status: "success" | "error";
}

const useNotify = () => {
    const toast = useToast();

    const notify = useCallback(
        ({ title, message, status }: NotifyProps) => {
            toast({
                title: title,
                description: message,
                position: "top-right",
                status: status,
                duration: 10000,
                isClosable: true,
            });
        },
        [toast]
    );

    return notify;
};

export default useNotify;
