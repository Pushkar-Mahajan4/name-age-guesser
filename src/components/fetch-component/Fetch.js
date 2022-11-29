const Fetch = async (name) => {
  const result = await fetch(`https://api.agify.io/?name=${name}`);
  const user = await result.json();
  return user;
};

export default Fetch;
