import CityPicker from "@/components/CityPicker";
import { Card, Divider, Subtitle, Text } from "@tremor/react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-600 to-slate-500 p-10 flex flex-col items-center justify-center">
      <Card className="mx-auto max-w-4xl">
        <Text className="text-6xl font-bold text-center mb-10">SkyGenius</Text>
        <Subtitle className="text-xl text-center">
          Powered by OpenAi, Next.js 13.3, TailwindCSS, Tremor 2.0 + More!
        </Subtitle>
        <Divider className="my-10" />
        <Card className="bg-gradient-to-br from-slate-600 to-slate-500">
          <CityPicker />
        </Card>
      </Card>
    </main>
  );
}
