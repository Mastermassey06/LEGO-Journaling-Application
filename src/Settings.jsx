import React from 'react';

function Settings({ background, setBackground, adultMode, setAdultMode, journal, theme, setTheme }) {  //options of backgrounds
  const options = ['Clouds.png', 'Space.png', 'Bricks.png', 'Scattered Bricks.png', 'Blueprint.png', 'Nature.png','Beach.png','Boy.png', 'Girl.png','Dark Winter.png','Light Winter.png', 'Dark mode.png', 'none'];

  const isDark = theme === 'dark';   //dark and light mode
  const containerClass = isDark ? 'bg-gray-900 text-white' : 'bg-white text-black';
  const cardClass = isDark ? 'bg-gray-800 text-white border-gray-700' : 'bg-white text-black border-black-200';

  // Calculate stats section
  const totalEntries = journal.length;
  const totalHours = journal.reduce((sum, entry) => sum + Number(entry.sleep || 0), 0);
  const ratingMap = {
    '1 Star': 1,
    '2 Stars': 2,
    '3 Stars': 3,
    '4 Stars': 4,
    '5 Stars': 5,
  };
  const ratings = journal.map(e => ratingMap[e.mood] || 0);
  const avgRating = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(1) : "N/A";

  return (
    <div
      className={`min-h-screen bg-cover bg-center p-6 flex flex-col items-center transition-colors duration-300 ${containerClass}`}
      style={{
        backgroundImage: background !== 'none'
          ? `url('${import.meta.env.BASE_URL}${background}')`
          : 'none'
      }}
    >

      {/* Background Picker */} 
      <div className={`my-6 w-full max-w-xl p-6 rounded-2xl border-2 shadow-xl flex flex-col justify-center items-center gap-4 ${cardClass}`}>
        <h1 className="text-xl font-bold">Settings</h1>
        <label className="block mb-2 font-medium text-center">Select Background</label>
        <select
          value={background}
          onChange={(e) => setBackground(e.target.value)}
          className={`w-full border p-2 rounded ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
        >
          {options.map((bg) => (
            <option key={bg} value={bg}>
              {bg === 'none' ? 'No Background' : bg.replace('.png', '').replace('.jpg', '')}
            </option>
          ))}
        </select>

        {/* Theme Picker */} 

        <label className="block mb-2 font-medium text-center">Select Colour Mode:</label>
        <select
          value={theme}
          onChange={(e) => setTheme(e.target.value)}
          className={`w-full border p-2 rounded ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
        >
          <option value="light">Light Mode</option>
          <option value="dark">Dark Mode</option>
        </select>

        {/* Adult Mode */}
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={adultMode}
            onChange={(e) => {
              const confirmAdult = window.confirm("Adult Mode allows you to see your Lego Portfolio worth");
              if (confirmAdult) {
                setAdultMode(e.target.checked);
              }
        
              }
              
              
            }
          />
          <span className="text-sm font-medium">Enable Adult Mode</span>
        </label>
      </div>

      {/* Stats Section */}
      <div className={`my-6 w-full max-w-xl p-6 rounded-2xl border-2 shadow-xl flex flex-col gap-2 ${cardClass}`}>
        <h2 className="text-lg font-semibold mb-2 text-center">Stats</h2>
        <p>Total Entries: <span className="font-semibold">{totalEntries}</span></p>
        <p>Total Build Hours: <span className="font-semibold">{totalHours}</span></p>
        <p>Average Rating: <span className="font-semibold">{avgRating}★</span></p>
      </div>

      {/* How to use section */} 

      <div className={`my-6 w-full max-w-xl p-6 rounded-2xl border-2 shadow-xl flex flex-col gap-2 ${cardClass}`}>
        <h2 className="text-lg font-semibold mb-2 text-center">How to use?</h2>
        <p>1. Type in your Lego set name or number (this has to be exact, you can search it on the lego website)</p>
        <p>2. Type in your journal entry. You have the choice of attaching an image</p>
        <p>3. You can view your journal entries in the journal tab</p>
        <p>4. You can edit and delete your journal entries in the journal tab</p>
        <p>5. Within this settings page, you can change the background and colours to how you want</p>

        <h1>ALL IMAGES WITHIN THIS APP WERE GENERATED USING CHAT GPT</h1>
      </div>

      {/* reset to defaults button */} 

      <button
        onClick={() => {
          const confirmReset = window.confirm(
            'Are you sure? This will permanently delete your journal entries and settings.'
          );
          if (confirmReset) {
            localStorage.clear();
            window.location.reload();
          }
        }}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        Reset to Default Application
      </button>

      <div className="h-20" />
      
    </div>
  );
}

export default Settings;
