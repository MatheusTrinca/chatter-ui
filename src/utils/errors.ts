const extractErrorMessage = (err: any) => {
  const errorMessage = err.graphQLErrors[0]?.extensions?.originalError?.message;

  if (Array.isArray(errorMessage)) {
    return formatErrorMessage(errorMessage[0]);
  }
  return formatErrorMessage(errorMessage);
};

const formatErrorMessage = (message: string) => {
  return message.charAt(0).toUpperCase() + message.slice(1);
};

export { extractErrorMessage };
