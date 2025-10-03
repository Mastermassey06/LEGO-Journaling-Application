import React, { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Home from './Home.jsx';
import JournalEntries from './JournalEntries.jsx';
import Settings from './Settings.jsx';
import NotFound from './Notfound.jsx';

const API_KEY = ''; //api key for rebrickable allowing the user to search the api

function App() {
  const [journal, setJournal] = useState(() => {              //loading journal from localstorage
    try {
      const saved = localStorage.getItem('journal');
      return saved ? JSON.parse(saved) : [];
    } catch (e) {
      console.error('Error loading journal from localStorage:', e);
      return [];
    }
  });

  

  const [time, setTime] = useState(null);   //setting the default states of things
  const [mood, setMood] = useState('');
  const [gratitude, setGratitude] = useState('');
  const [sleep, setSleep] = useState('');
  const [text, setText] = useState('');
  const [legoSearchTerm, setLegoSearchTerm] = useState('');
  const [legoSet, setLegoSet] = useState(null);
  const [image, setImage] = useState(null);
  


  const [background, setBackground] = useState(() => {     //retriving background from local storage
    try {
      const saved = localStorage.getItem('background');
      return saved ? JSON.parse(saved) : 'Clouds.png';
    } catch (e) {
      console.error('Error loading background from localStorage:', e);
      return 'Clouds.png';
    }
  });

  const [adultMode, setAdultMode] = useState(() => {     //retrieving adult mode setting from local storage
    try {
      const saved = localStorage.getItem('adultMode');
      return saved ? JSON.parse(saved) : false;
    } catch (e) {
      console.error('Error loading adultMode from localStorage:', e);
      return false;
    }
  });

  const [theme, setTheme] = useState(() => {      //retriving theme from local storage
    try {
      const saved = localStorage.getItem('theme');
      return saved ? JSON.parse(saved) : 'light';
    } catch(e) {
      console.error('Error loading theme from localStorage:', e);
      return 'light';
    }
  });

  useEffect(() => {         //saving theme to local storage
    try {
      localStorage.setItem('theme', JSON.stringify(theme));
    } catch (e) {
      console.error('Error saving theme to localStorage:', e);
    }
  }, [theme]);
  

  useEffect(() => {    //saving journal to local storage
    try {
      localStorage.setItem('journal', JSON.stringify(journal));
      
    } catch (e) {
      console.error('Error saving journal to localStorage:', e);
    }
  }, [journal]);

  useEffect(() => {    //saving background and adult mode to local storage
    try {
      localStorage.setItem('background', JSON.stringify(background));
      localStorage.setItem('adultMode', JSON.stringify(adultMode));
    } catch (e) {
      console.error('Error saving settings to localStorage:', e);
    }
  }, [background, adultMode]);

  const updateJournal = () => {        //putting a new entry in 
    const timestamp = time || Date.now();
    const newEntry = { time: timestamp, content: text, gratitude, sleep, mood, image, legoSet };
    const updatedJournal = [newEntry, ...journal].sort((a, b) => b.time - a.time);
    setJournal(updatedJournal);

    // Reset form fields
    setText('');
    setGratitude('');
    setSleep('');
    setMood('');
    setLegoSearchTerm('');
    setLegoSet(null);
    setImage(null);
    setTime(null);
  };

  //deleting a journal entry

  const handleDelete = (entryTime) => {
    const updatedJournal = journal.filter(entry => entry.time !== entryTime);
    setJournal(updatedJournal);
  };

  //editing a journal entry

  const handleEdit = (entry) => {
    setText(entry.content);
    setGratitude(entry.gratitude);
    setSleep(entry.sleep);
    setMood(entry.mood);
    setImage(entry.image || null);
    setLegoSet(entry.legoSet || null);
    setLegoSearchTerm(entry.legoSet?.name || '');
    setTime(entry.time);
    const updatedJournal = journal.filter(item => item.time !== entry.time);
    setJournal(updatedJournal);
  };

  //allowing user to upload image to the journal entry 
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    const maxSize = 250000;

    //error handling

    if (file && file.size > maxSize) {
      console.log("File size must be less than 250KB!");
      return;
    }

    if (file) {
      reader.readAsDataURL(file);
    }

    reader.onloadend = () => {
      setImage(reader.result);
    };
  };

  
  const searchLegoSet = async () => {
    if (!legoSearchTerm) return;
    if (!navigator.onLine) {
      // Offline capability: will set the search to what you put into a box instead of retriving from api
      setLegoSet({
        name: legoSearchTerm,
        image: null,
        num_parts: 0,
        year: 'N/A',
        set_num: 'manual'
      });
      alert("Your Offline! No API functionality");
      return;
    }   //online functionality: searches the api using the search term.
    try {
      const res = await fetch(`https://rebrickable.com/api/v3/lego/sets/?search=${encodeURIComponent(legoSearchTerm)}&key=${API_KEY}`);
      const data = await res.json();
      if (data.results && data.results.length > 0) {
        const set = data.results[0];
        setLegoSet({ name: set.name, image: set.set_img_url, num_parts: set.num_parts, year: set.year, set_num: set.set_num}); //puts the lego sets values into an object
      } else {
        alert('No LEGO sets found.');
      }
    } catch (err) {
      console.error('Failed to fetch LEGO set:', err);
    }
  };
//routes
  return (
    <>
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-inner flex justify-center gap-12 items-center h-16 z-50">
          <Link to="/" className="flex flex-col items-center text-gray-700 hover:text-black text-xs">
            <span className="material-icons text-lg mb-1">home</span>
            <span>Home</span>
          </Link>
          <Link to="/entries" className="flex flex-col items-center text-gray-700 hover:text-black text-xs">
            <span className="material-icons text-lg mb-1">list_alt</span>
            <span>Journal</span>
          </Link>
          <Link to="/settings" className="flex flex-col items-center text-gray-700 hover:text-black text-xs">
            <span className="material-icons text-lg mb-1">settings</span>
              <span>Settings</span>
          </Link>

        </nav>

      <Routes>
        <Route path="/" element={  //setting all the components up
          <Home
            text={text} setText={setText}
            gratitude={gratitude} setGratitude={setGratitude}
            sleep={sleep} setSleep={setSleep}
            mood={mood} setMood={setMood}
            legoSearchTerm={legoSearchTerm} setLegoSearchTerm={setLegoSearchTerm}
            legoSet={legoSet}
            searchLegoSet={searchLegoSet}
            image={image}
            handleImageUpload={handleImageUpload}
            updateJournal={updateJournal}
            time={time}
            background={background}
            theme={theme}
          />
        } />
        <Route path="/entries" element={    //setting all the components up
          <JournalEntries
            journal={journal}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
            background={background}
            adultMode={adultMode}
            theme={theme}
          />
        } />
        
        <Route path="/settings" element={   //setting all the components up
          <Settings
            background={background}
            setBackground={setBackground} 
            adultMode={adultMode}
            setAdultMode={setAdultMode}
            journal={journal}
            theme={theme}
            setTheme={setTheme}        
        
        
        
        />
        } />

        <Route path="*" element={ //allows for a not found page to be shown
          <NotFound/>}/> 

         

      </Routes>
    </>
  );
}

export default App;
