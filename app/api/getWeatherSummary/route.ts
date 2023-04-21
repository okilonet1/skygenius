// import { NextResponse } from "next/server";
// import openai from "@/openai";

// export async function POST(request: Request) {
//   const { weatherData } = await request.json();

//   const response = await openai.createChatCompletion({
//     model: "gpt-3.5-turbo",
//     temperature: 0.8,
//     n: 1,
//     stream: false,
//     messages: [
//       {
//         role: "system",
//         content:
//           "hi there can i get a summary of todays weather, use the following information to the the weather data:",
//       },
//       //   {
//       //     role: "system",
//       //     content:
//       //       "You are SkyGenius, a charismatic weather news presenter reporting live from the studio. Your audience is a group of software developers who want to know today's weather in a particular city. Provide an easy-to-understand summary of the weather, including tips on how to prepare for the conditions and UV advice. Finally, add a witty joke related to weather, coding, tech, science, or general knowledge to add some humor to your presentation. Assume that the data came from your team at the news office and not the use",
//       //   },
//       //   {
//       //     role: "user",
//       //     content: `Hi there can i get a summary of todays weather, use the following information to the the weather data: ${JSON.stringify(
//       //       weatherData
//       //     )}`,
//       //   },
//     ],
//   });

//   const { data } = response;

//   console.log(data.choices[0].message);

//   //   return NextResponse.json(data.choices[0].message);
//   return NextResponse.json(weatherData);
// }

import { NextResponse } from "next/server";
import openai from "@/openai";

const BACKOFF_INTERVAL = 5000;
const MAX_RETRIES = 5;

export async function POST(request: Request): Promise<NextResponse> {
  const { weatherData } = await request.json();

  let retries = 0;

  while (true) {
    try {
      const response = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        temperature: 0.8,
        n: 1,
        stream: false,
        messages: [
          {
            role: "system",
            content:
              "hi there can i get a summary of todays weather, use the following information to the the weather data:",
          },
          //   {
          //     role: "system",
          //     content:
          //       "You are SkyGenius, a charismatic weather news presenter reporting live from the studio. Your audience is a group of software developers who want to know today's weather in a particular city. Provide an easy-to-understand summary of the weather, including tips on how to prepare for the conditions and UV advice. Finally, add a witty joke related to weather, coding, tech, science, or general knowledge to add some humor to your presentation. Assume that the data came from your team at the news office and not the use",
          //   },
          //   {
          //     role: "user",
          //     content: `Hi there can i get a summary of todays weather, use the following information to the the weather data: ${JSON.stringify(
          //       weatherData
          //     )}`,
          //   },
        ],
      });

      const { data } = response;

      console.log(data.choices[0].message);

      // return NextResponse.json(data.choices[0].message);
      return NextResponse.json(weatherData);
    } catch (error) {
      if (
        error.response &&
        error.response.status === 429 &&
        retries < MAX_RETRIES
      ) {
        console.log(
          `Too many requests, backing off for ${
            BACKOFF_INTERVAL / 1000
          } seconds...`
        );
        await new Promise((resolve) => setTimeout(resolve, BACKOFF_INTERVAL));
        retries++;
      } else {
        throw error;
      }
    }
  }
}
