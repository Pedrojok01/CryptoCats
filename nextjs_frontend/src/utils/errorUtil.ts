// errorUtil.ts
/*
 * viem === error.details
 * ethers.js === error.reason
 * instance of Error === error.message
 */
export const logError = (error: unknown): string => {
  if (error instanceof Error) {
    const customError = error as ContractCustomError;
    console.error(customError.details ?? customError.reason ?? customError.message ?? error);
    return customError.details ?? customError.reason ?? customError.message ?? "unknown error";
  } else {
    console.error("An unknown error occurred");
    return "unknown error";
  }
};
