import { getClient } from "@/apollo-client";
import fetchWeatherQuery from "@/graphql/queries/fetchWeatherQueries";

type WeatherPageProps = {
  params: {
    lat: string;
    long: string;
    city: string;
  };
};

async function WeatherPage({ params: { lat, long, city } }: WeatherPageProps) {
  const client = getClient();

  const { data } = await client.query({
    query: fetchWeatherQuery,
    variables: {
      current_weather: "true",
      longitude: long,
      latitude: lat,
      timezone: "GMT",
    },
  });

  const results: Root = data.myQuery;

  console.log(results);

  return (
    <div>
      page:{lat},{long},{city}
    </div>
  );
}

export default WeatherPage;
