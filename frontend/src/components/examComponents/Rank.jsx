import React from "react";
import { FaMedal, FaChartLine } from "react-icons/fa";

const RankAndPercentile = ({ marks }) => {
  const data = [
    { marks: [286, 300], rank: [19, 1], percentile: [99.99826992, 100] },
    {
      marks: [280, 284],
      rank: [42, 23],
      percentile: [99.99617561, 99.99790569],
    },
    {
      marks: [268, 279],
      rank: [106, 64],
      percentile: [99.99034797, 99.99417236],
    },
    {
      marks: [250, 267],
      rank: [524, 108],
      percentile: [99.95228621, 99.99016586],
    },
    {
      marks: [231, 249],
      rank: [1385, 546],
      percentile: [99.87388626, 99.95028296],
    },
    {
      marks: [215, 230],
      rank: [2798, 1421],
      percentile: [99.74522293, 99.87060821],
    },
    {
      marks: [200, 214],
      rank: [4667, 2863],
      percentile: [99.57503767, 99.73930423],
    },
    {
      marks: [189, 199],
      rank: [6664, 4830],
      percentile: [99.39319714, 99.56019541],
    },
    {
      marks: [175, 188],
      rank: [10746, 7152],
      percentile: [99.02150308, 99.3487614],
    },
    {
      marks: [160, 174],
      rank: [16163, 11018],
      percentile: [98.52824811, 98.99673561],
    },
    {
      marks: [149, 159],
      rank: [21145, 16495],
      percentile: [98.07460288, 98.49801724],
    },
    {
      marks: [132, 148],
      rank: [32826, 22238],
      percentile: [97.0109678, 97.97507774],
    },
    {
      marks: [120, 131],
      rank: [43174, 33636],
      percentile: [96.0687115, 96.93721175],
    },
    {
      marks: [110, 119],
      rank: [54293, 44115],
      percentile: [95.05625037, 95.983027],
    },
    {
      marks: [102, 109],
      rank: [65758, 55269],
      percentile: [94.01228357, 94.96737888],
    },
    {
      marks: [95, 101],
      rank: [76260, 66999],
      percentile: [93.05600452, 93.89928202],
    },
    {
      marks: [89, 94],
      rank: [87219, 78111],
      percentile: [92.05811248, 92.88745828],
    },
    {
      marks: [79, 88],
      rank: [109329, 90144],
      percentile: [90.0448455, 91.79177119],
    },
    {
      marks: [62, 87],
      rank: [169542, 92303],
      percentile: [84.56203931, 91.59517945],
    },
    {
      marks: [41, 61],
      rank: [326517, 173239],
      percentile: [70.26839007, 84.22540213],
    },
    {
      marks: [1, 40],
      rank: [1025009, 334080],
      percentile: [6.66590786, 69.5797271],
    },
  ];

  const result = data.find(
    (range) => marks >= range.marks[0] && marks <= range.marks[1]
  );

  if (!result) {
    return (
      <div className="bg-red-100 text-red-800 p-4 rounded-md">
        Marks out of range. Please enter valid marks between 1 and 300.
      </div>
    );
  }

  const { rank, percentile } = result;

  // Interpolating rank and percentile based on the given marks
  const rankDiff = rank[1] - rank[0];
  const marksDiff = result.marks[1] - result.marks[0];
  const marksOffset = marks - result.marks[0];
  const rankInterpolated = rank[0] + (rankDiff * marksOffset) / marksDiff;

  const percentileDiff = percentile[1] - percentile[0];
  const percentileInterpolated =
    percentile[0] + (percentileDiff * marksOffset) / marksDiff;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
      {/* Rank Card */}
      <div className="card bg-green-50 p-6 rounded-lg shadow-md flex items-center space-x-4">
        <FaMedal className="text-green-500 text-3xl" />
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-800">Rank</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-green-600">
            {Math.round(rankInterpolated)}
          </p>
        </div>
      </div>

      {/* Percentile Card */}
      <div className="card bg-blue-50 p-6 rounded-lg shadow-md flex items-center space-x-4">
        <FaChartLine className="text-blue-500 text-3xl" />
        <div className="flex-1">
          <h3 className="text-lg font-medium text-gray-800">Percentile</h3>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-blue-600">
            {percentileInterpolated.toFixed(4)}%
          </p>
        </div>
      </div>
    </div>
  );
};

export default RankAndPercentile;
