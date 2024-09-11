const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const ethereumAddressRegex = /^0x[a-fA-F0-9]{40}$/;

const ensRegex = /^(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.eth$/;

const isValidENS = (ensName) => {
  return ensRegex.test(ensName);
};

const isValidEmail = (email) => {
    return emailRegex.test(email);
};

const isValidEthereumAddress = (address) => {
  return ethereumAddressRegex.test(address);
};

export const validateInput = (address) =>{
  if (isValidEmail(address) || isValidENS(address) || isValidEthereumAddress(address)){
    return true
  }
  return false 
}