const UserId = (props) => {
  return <h1>{props.id}</h1>;
};
export default UserId;

export async function getServerSideProps(context) {
  const { params, req, res } = context;
  return { props: { id: "user id is: " + params.uid } };
}
