import { Link, useNavigate, useSearchParams } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const query = searchParams.get("id");
  const query2 = searchParams.get("name");
  return (
    <>
      Home component
      <ul>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>
      <button onClick={() => navigate("/asdasdasdas")}>Pagina aiurea</button>
      {query}
      {query2}
    </>
  );
};
export default HomeComponent;
