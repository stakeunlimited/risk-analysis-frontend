import { PolarAngleAxis, Radar, RadarChart } from "recharts";

const HomePage: React.FC = () => {

    const data = [
        {
            subject: "Math",
            A: 120,
            B: 110,
            fullMark: 150,
        },
        {
            subject: "Chinese",
            A: 98,
            B: 130,
            fullMark: 150,
        },
        {
            subject: "English",
            A: 86,
            B: 130,
            fullMark: 150,
        },
        {
            subject: "Geography",
            A: 99,
            B: 100,
            fullMark: 150,
        },
        {
            subject: "Physics",
            A: 85,
            B: 90,
            fullMark: 150,
        },
        {
            subject: "History",
            A: 65,
            B: 85,
            fullMark: 150,
        },
        ];

    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {/* Charts and Analytics */}
            <div className="grid grid-cols-1 lg:grid-cols-1 gap-6 mb-6">
              {/* TVL Chart */}
              <div className="bg-[#12141a] rounded-xl p-6 border border-violet-500/10">
                <RadarChart
                  cx={300}
                  cy={250}
                  outerRadius={150}
                  width={500}
                  height={500}
                  data={data}
                  style={{ backgroundColor: "#111" }}
                >
                  <PolarAngleAxis dataKey="subject" fill="#111" stroke="#fff" />
                  <Radar
                    name="Mike"
                    dataKey="A"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </RadarChart>
              </div>
            </div>
          </main>
        </main>
  );
}

export default HomePage;