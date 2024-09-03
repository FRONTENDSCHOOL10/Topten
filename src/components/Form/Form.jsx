function Form({ children, ...restProps }) {
  return (
    <form {...restProps}>
      {children}
    </form>
  );
}

export default Form;