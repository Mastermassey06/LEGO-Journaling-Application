import React from 'react';

const Home = ({
  text, setText,
  gratitude, setGratitude,
  sleep, setSleep,
  mood, setMood,
  legoSearchTerm, setLegoSearchTerm,
  legoSet, searchLegoSet,
  image, handleImageUpload,
  updateJournal,
  time,
  background,
  theme
}) => {
  const isDark = theme === 'dark';   //is the theme dark?

  const containerClass = isDark   //if the theme is dark change the style to dark
    ? 'bg-gray-900 text-white'
    : 'bg-white text-black';

  const cardClass = isDark          //change theme to dark
    ? 'bg-gray-800 text-white border-gray-700'
    : 'bg-white text-black border-black-200';

  return (
    
    <div
      
      className={`min-h-screen bg-cover bg-center p-6 flex flex-col items-center transition-colors duration-300 ${containerClass}`}
      
      style={{
        backgroundImage: background !== 'none'
          ? `url('${import.meta.env.BASE_URL}${background}')`
          : 'none'
      }}
    >
      {/*adding the title and logo on the home page*/} 
      <div className={`my-6 w-full max-w-xl p-6 rounded-2xl border-2 shadow-xl flex items-center gap-4 ${cardClass}`}>
        <img src="bricklogo.jpg" alt="Logo" className="w-32 h-auto rounded shadow" />
        <div className="flex flex-col items-center text-left">
          <h2 className="text-sm tracking-widest text-[#b9674b] uppercase font-semibold">Little</h2>
          <h1 className="text-4xl font-extrabold text-[#b9674b]">Brick Emporium</h1>
        </div>
      </div>
      
      {/*lego search section (searching the api)*/} 

      <section className={`w-full max-w-xl p-6 rounded-2xl border-2 shadow-xl transition hover:shadow-2xl hover:scale-[1.01] duration-200 ${cardClass}`}>
        <div className="w-full max-w-xl mb-6 flex shadow-sm">
          <input
            id="legoSearch"
            className={`flex-1 p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-blue-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
            type="text"
            placeholder="Search LEGO Set (e.g Titanic)"
            value={legoSearchTerm}
            onChange={(e) => setLegoSearchTerm(e.target.value)}
          />
          <button
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-r transition"
            onClick={searchLegoSet}
          >
            Search
          </button>
        </div>

        {/*shows the searched in lego set from the api*/} 

        {legoSet && (
          <div className="text-center mb-6">
            <p className="font-semibold text-lg">{legoSet.name}</p>
            {legoSet.image && (
              <img
                src={legoSet.image}
                className="w-40 mx-auto mt-2 rounded shadow"
                alt={`LEGO Set: ${legoSet.name}`}
              />
            )}
          </div>
        )}
      </section>

      {/*Journal entry points*/} 

      <section className={`w-full max-w-xl mt-8 p-6 rounded-2xl border-2 shadow-xl transition hover:shadow-2xl hover:scale-[1.01] duration-200 ${cardClass}`}>
        <label htmlFor="text" className="block mb-1 font-medium">Journal Entry</label>
        <textarea
          id="text"
          className={`w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          placeholder="Write your LEGO journal entry..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <label htmlFor="gratitude" className="block mb-1 font-medium">Reflection</label>
        <input
          id="gratitude"
          className={`w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          placeholder="How did you find the process?"
          value={gratitude}
          onChange={(e) => setGratitude(e.target.value)}
        />

        <label htmlFor="sleep" className="block mb-1 font-medium">Build Time (hours)</label>
        <input
          id="sleep"
          className={`w-full p-2 border rounded mb-4 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          type="number"
          placeholder="How long to complete (in hours)"
          value={sleep}
          onChange={(e) => setSleep(e.target.value)}
        />

        <label htmlFor="mood" className="block mb-1 font-medium">Build Rating</label>
        <select
          id="mood"
          className={`w-full p-2 border rounded mb-6 focus:outline-none focus:ring-2 focus:ring-blue-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        >
          <option value="">Rate the Build Experience</option>
          <option value="1 Star">★</option>
          <option value="2 Stars">★★</option>
          <option value="3 Stars">★★★</option>
          <option value="4 Stars">★★★★</option>
          <option value="5 Stars">★★★★★</option>
        </select>

        <label htmlFor="imageUpload" className="block mb-1 font-medium">Attach Image of Built LEGO Set</label>
        <input
          id="imageUpload"
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className={`w-full mb-4 p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-300 ${isDark ? 'bg-gray-700 border-gray-600 text-white' : 'bg-white border-gray-300 text-black'}`}
        />

        {image && (
          <div className="mb-4">
            <p className="font-medium">Preview:</p>
            <img src={image} alt="Preview" className="max-w-full max-h-64 rounded shadow mt-2" />
          </div>
        )}


        <button
          className="w-full p-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded transition"
          onClick={updateJournal}
        >
          {time ? 'Update Entry' : 'Add Entry'}
        </button>
      </section>

      <div className="h-20" />
    </div>
  );
};

export default Home;
