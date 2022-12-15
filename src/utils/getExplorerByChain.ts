export const getExplorer = (): string | undefined => {
    if (process.env.NODE_ENV === "production") {
        return "https://etherscan.io/";
    } else return "https://goerli.etherscan.io/";
};
