const UserProfile = (props) => {
  return <h1>{props.username}</h1>;
};
export default UserProfile;

export async function getServerSideProps() {
  return { props: { username: "Amanullah" } };
}
