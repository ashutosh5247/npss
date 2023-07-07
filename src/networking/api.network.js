const fetchAPIData = async () => {
  try {
    const response = await fetch(
      'https://jsonplaceholder.typicode.com/todos/1',
    );
    const json = await response.json();
    return json;
  } catch (error) {
    console.log('err', error);
    throw error;
  }
};

export default fetchAPIData;
