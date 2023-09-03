import { useEffect, useState } from "react";
import useSWR from "swr";

const LastSales = (props) => {
  const [sales, setSales] = useState(props.sales);
  console.log("outside");
  console.log(props.sales);
  //   const [isLoading, setIsLoading] = useState(false);

  const fetcher = (...args) => fetch(...args).then((res) => res.json());

  const { data, error, isLoading } = useSWR(
    "https://react-http-request-test-12f89-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json",
    fetcher
  );

  useEffect(() => {
    if (data) {
      const transformData = [];

      for (const key in data) {
        transformData.push({
          id: key,
          username: data[key].username,
          volume: data[key].volume,
        });
      }
      console.log("inside");
      console.log(transformData);
      setSales(transformData);
    }
  }, [data]);

  /*
  useEffect(() => {
    setIsLoading(true);
    fetch(
      "https://react-http-request-test-12f89-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
    )
      .then((response) => response.json())
      .then((data) => {
        const transformData = [];

        for (const key in data) {
          transformData.push({
            id: key,
            username: data[key].username,
            volume: data[key].volume,
          });
        }
        setSales(transformData);
        setIsLoading(false);
      });
  }, []);

  */

  if (error) {
    return <p>something went wrong...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (!sales && !data) {
    return <p>No data found...</p>;
  }

  return (
    <ul>
      {sales.map((sale) => (
        <li key={sale.id}>
          {sale.username} - ${sale.volume}
        </li>
      ))}
    </ul>
  );
};
export default LastSales;

export async function getStaticProps() {
  const response = await fetch(
    "https://react-http-request-test-12f89-default-rtdb.asia-southeast1.firebasedatabase.app/sales.json"
  );
  const data = await response.json();

  const transformData = [];

  for (const key in data) {
    transformData.push({
      id: key,
      username: data[key].username,
      volume: data[key].volume,
    });
  }

  return { props: { sales: transformData } };
}
