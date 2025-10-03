import React from 'react';
import { useNavigate } from 'react-router-dom';

const JournalEntries = ({ journal, handleDelete, handleEdit, background, adultMode, theme }) => {
  const navigate = useNavigate();
  const isDark = theme === 'dark';

  const containerClass = isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'; //dark and light mode set
  const cardClass = isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-black-200';

  const portfolioValue = journal.reduce((sum, entry) => {   //calcualting the estimated value of the lego portfolio 
    const parts = entry.legoSet?.num_parts || 0;
    return sum + parts * 0.07;
  }, 0);

  return (
    <div
      className={`min-h-screen bg-cover bg-center p-6 pb-24 flex flex-col items-center transition-colors duration-300 ${containerClass}`}
      style={{
        backgroundImage: background !== 'none'
          ? `url('${import.meta.env.BASE_URL}${background}')`
          : 'none'
      }}
    >
      <div className="w-full max-w-xl">

        {/* Header Card */}
        <div className={`my-6 w-full p-6 rounded-2xl border-2 shadow-xl flex justify-between items-center ${cardClass}`}>
          <h2 className="text-xl font-bold">Journal Entries</h2>
          {adultMode && (
            <span className="text-sm text-right font-semibold">
              Estimated Portfolio Worth: £{portfolioValue.toFixed(2)}
            </span>
          )}
        </div>

        {/* Entry List */}
        {journal.length === 0 ? (
          <p className="text-center text-gray-500">No entries yet.</p>
        ) : (
          journal.map((entry, index) => {
            const date = new Date(entry.time);
            return (
              <div
                key={index}
                className={`border rounded p-4 mb-4 shadow-sm transition-colors duration-200 ${cardClass}`}
              >
                <div className="text-sm text-gray-500">
                  {date.toDateString()} at {date.toLocaleTimeString()}
                </div>

                {entry.legoSet?.name && (
                  <p className="font-semibold">LEGO Set: {entry.legoSet.name}</p>
                )}

                <p className="text-black-800">Journal Entry:</p>
                <p className="text-black-800">{entry.content}</p>
                <p className="text-purple-400">How you found the process: {entry.gratitude}</p>
                <p className="text-blue-400">How long to complete (in Hours): {entry.sleep} hrs</p>
                <p className="text-orange-400">Building Experience: {entry.mood}</p>

                {entry.legoSet && (
                  <div className="mt-2">
                    {entry.legoSet.set_num && (
                      <p className="font-semibold">LEGO Set Number: {entry.legoSet.set_num}</p>
                    )}
                    {entry.legoSet.year && (
                      <p className="font-semibold">Year of Release: {entry.legoSet.year}</p>
                    )}
                    {entry.legoSet.num_parts !== undefined && (
                      <p className="font-semibold">Number of Parts: {entry.legoSet.num_parts}</p>
                    )}
                    {(entry.legoSet?.image || entry.image) && (
                    <div className="mt-4 flex flex-wrap gap-4 items-start">
                      {entry.legoSet?.image && (
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-medium">LEGO Set Image:</p>
                          <img
                            src={entry.legoSet.image}
                            className="w-40 rounded shadow"
                            alt={`LEGO Set: ${entry.legoSet.name}`}
                          />
                        </div>
                      )}
                      {entry.image && (
                        <div className="flex flex-col items-center">
                          <p className="text-sm font-medium">Your Build:</p>
                          <img
                            src={entry.image}
                            alt="Uploaded LEGO Build"
                            className="w-40 rounded shadow"
                          />
                        </div>
                      )}
                    </div>
)}
                  </div>
                )}

                <div className="mt-2">
                  <button
                    onClick={() => {
                      handleEdit(entry);
                      navigate('/');
                    }}
                    className="mr-2 px-3 py-1 bg-yellow-100 border rounded hover:bg-yellow-200 text-black"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const confirmDelete = window.confirm("Are you sure you want to delete this entry?");
                      if (confirmDelete) {
                        handleDelete(entry.time);
                      }
                    }}
                    className="px-3 py-1 bg-red-100 border rounded hover:bg-red-200 text-black"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Spacer for bottom nav */}
      <div className="h-20" />
    </div>
  );
};

export default JournalEntries;
