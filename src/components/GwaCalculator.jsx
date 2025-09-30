import React from 'react';

const GwaCalculator = () => {
        const [subjects, setSubjects] = React.useState([{ grade: '', units: '' }]);
        const [gwa, setGwa] = React.useState(null);

        const handleChange = (idx, field, value) => {
          const updated = subjects.map((s, i) =>
            i === idx ? { ...s, [field]: value } : s
          );
          setSubjects(updated);
        };

        const addSubject = () => {
          setSubjects([...subjects, { grade: '', units: '' }]);
        };

        const removeSubject = (idx) => {
          setSubjects(subjects.filter((_, i) => i !== idx));
        };

        const calculateGwa = () => {
          let totalUnits = 0;
          let totalWeighted = 0;
          subjects.forEach(({ grade, units }) => {
            const g = parseFloat(grade);
            const u = parseFloat(units);
            if (!isNaN(g) && !isNaN(u)) {
              totalUnits += u;
              totalWeighted += g * u;
            }
          });
          setGwa(totalUnits > 0 ? (totalWeighted / totalUnits).toFixed(2) : null);
        };

        return (
          <div>
            {subjects.map((subject, idx) => (
              <div key={idx} className="flex gap-2 mb-2">
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  placeholder="Grade"
                  value={subject.grade}
                  onChange={e => handleChange(idx, 'grade', e.target.value)}
                  className="border rounded px-2 py-1 w-1/2"
                />
                <input
                  type="number"
                  min="0"
                  placeholder="Units"
                  value={subject.units}
                  onChange={e => handleChange(idx, 'units', e.target.value)}
                  className="border rounded px-2 py-1 w-1/3"
                />
                {subjects.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeSubject(idx)}
                    className="text-red-500 px-2"
                  >
                    &times;
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addSubject}
              className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
            >
              Add Subject
            </button>
            <button
              type="button"
              onClick={calculateGwa}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Calculate GWA
            </button>
            {gwa && (
              <div className="mt-4 text-center text-lg font-semibold">
                Your GWA: <span className="text-blue-600">{gwa}</span>
              </div>
            )}
          </div>
        );
      }
    export default GwaCalculator;