function fetchMock() {
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve({
        json: () =>
          Promise.resolve([
            { title: 'title1' }
          ]),
      });
    }, 200 + Math.random() * 300)
  );
}

export default fetchMock