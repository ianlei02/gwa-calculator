import { useState } from "react";

export default function App() {
  const [subjects, setSubjects] = useState([{ grade: "", units: "" }]);
  const [gwa, setGwa] = useState(null);

  const addSubject = () => {
    setSubjects([...subjects, { grade: "", units: "" }]);
  };

  const handleChange = (index, field, value) => {
    const newSubjects = [...subjects];
    newSubjects[index][field] = value;
    setSubjects(newSubjects);
  };

  const calculateGWA = () => {
    let totalUnits = 0;
    let weightedSum = 0;
    subjects.forEach((s) => {
      const grade = parseFloat(s.grade);
      const units = parseFloat(s.units);
      if (!isNaN(grade) && !isNaN(units)) {
        weightedSum += grade * units;
        totalUnits += units;
      }
    });
    setGwa(totalUnits ? (weightedSum / totalUnits).toFixed(2) : "0.00");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-6">
      <h1 className="text-3xl font-bold mb-6">GWA Calculator</h1>
      
      {subjects.map((s, i) => (
        <div key={i} className="flex gap-2 mb-2">
          <input
            type="number"
            placeholder="Grade"
            value={s.grade}
            onChange={(e) => handleChange(i, "grade", e.target.value)}
            className="border p-2 rounded w-24"
          />
          <input
            type="number"
            placeholder="Units"
            value={s.units}
            onChange={(e) => handleChange(i, "units", e.target.value)}
            className="border p-2 rounded w-24"
          />
        </div>
      ))}

      <div className="flex gap-3 mt-4">
        <button
          onClick={addSubject}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          + Add Subject
        </button>
        <button
          onClick={calculateGWA}
          className="px-4 py-2 bg-green-500 text-white rounded"
        >
          Calculate
        </button>
      </div>

      {gwa && (
        <p className="mt-6 text-xl font-semibold">
          Your GWA: <span className="text-blue-600">{gwa}</span>
        </p>
      )}
    </div>
  );
}
