import { useEffect, useState } from "react";

const LastSales = (props) => {
  const [sales, setSales] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

  if (!sales) {
    return <p>No data found...</p>;
  }

  if (isLoading) {
    return <p>Loading...</p>;
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
