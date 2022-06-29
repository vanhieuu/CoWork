const capitalize = (input: string) => {
  `${input.charAt(0).toUpperCase()}${input.slice(1)}`;
};
const capitalizeKey = (input:string) =>{
  input
    .split(/(?=[A-Z])/)
    .map((word) => capitalize(word))
    .join(" ");
}
