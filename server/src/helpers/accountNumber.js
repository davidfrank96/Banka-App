import randomString from 'random-string';

const accountNumber = () => {
  const randNumber = parseInt(randomString({
    length: 10,
    numeric: true,
    letters: false,
    special: false,
  }));

  return randNumber;
};

export default accountNumber;
