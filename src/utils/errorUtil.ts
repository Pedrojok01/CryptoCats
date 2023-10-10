// errorUtil.ts
interface ContractCustomError {
    reason?: string;
    message?: string;
}

export const logError = (error: unknown): void => {
    if (error instanceof Error) {
        const customError = error as ContractCustomError;
        console.error(customError.reason ?? customError.message ?? error);
    } else {
        console.error("An unknown error occurred");
    }
};
