"use client";
import { useEffect, useState } from "react";

interface IAdsProps {
  adId: number;
  clicks: number;
  cost: number;
  impressions: number;
}
const PREFIX_URL = "http://localhost:3001";
export default function Home() {
  const [adsLists, setAdsLists] = useState<IAdsProps[]>([]);
  const getData = async () => {
    try {
      const res = await fetch(`${PREFIX_URL}/ads`);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      setAdsLists(data);
    } catch (error) {
      console.log(error);
    }
  };

  const tdClass = "px-4 py-2 border border-gray-300";

  const renderLists = () =>
    adsLists.map((res, i) => (
      <tr key={i}>
        <td className={tdClass}>{res.adId}</td>
        <td className={tdClass}>{res.clicks}</td>
        <td className={tdClass}> {res.cost}</td>
        <td className={tdClass}>{res.impressions}</td>
      </tr>
    ));

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead className="bg-gray-200">
          <tr>
            <th className="w-[20px] px-4 py-2 text-left border border-gray-300">
              Ad ID
            </th>
            <th className="px-4 py-2 text-left border border-gray-300">
              Clicks
            </th>
            <th className="px-4 py-2 text-left border border-gray-300">
              Costs
            </th>
            <th className="px-4 py-2 text-left border border-gray-300">
              Impressions
            </th>
          </tr>
        </thead>
        <tbody>{renderLists()}</tbody>
      </table>
    </div>
  );
}
