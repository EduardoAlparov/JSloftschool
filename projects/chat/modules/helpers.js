export function formDataToJson(form) {
  const formData = new FormData(form);

  return Array.from(formData.entries()).reduce(
    (memo, pair) => ({
      ...memo,
      [pair[0]]: pair[1],
    }),
    {}
  );
}
