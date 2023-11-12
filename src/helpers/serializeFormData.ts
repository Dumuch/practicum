export default (event: SubmitEvent) => {
  const formData = new FormData(event.target as HTMLFormElement);
  const data: Record<string, string> = {};

  formData.forEach((value, key) => {
    data[key] = <string> value;
  });

  return data;
}
