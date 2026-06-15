import { useState, useEffect } from 'react';

function App() {
  // ==========================================
  // 1. STATE MANAGEMENT (Saves to Browser)
  // ==========================================
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('magical_quests');
    return saved ? JSON.parse(saved) : [
      { text: 'Watching Youtube Videos', completed: false },
      { text: 'Learning New Topic Each Day', completed: false },
      { text: 'Talking with Parents', completed: false }
    ];
  });
  const [input, setInput] = useState('');

  useEffect(() => {
    localStorage.setItem('magical_quests', JSON.stringify(tasks));
  }, [tasks]);

  // ==========================================
  // 2. LOGIC HANDLERS
  // ==========================================
  const addTask = (e) => {
    e.preventDefault();
    if (input.trim() === '') return;
    setTasks([...tasks, { text: input, completed: false }]);
    setInput('');
  };

  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const deleteTask = (e, index) => {
    e.stopPropagation(); 
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning, Princess! 🌅";
    if (hour < 18) return "Good Afternoon, Adventurer! ☀️";
    return "Good Evening, Enchantress! 🌌";
  };

  const totalTasks = tasks.length;
  const completedCount = tasks.filter(t => t.completed).length;
  const percentage = totalTasks > 0 ? Math.round((completedCount / totalTasks) * 100) : 0;

  const getMood = () => {
    if (totalTasks === 0) return { emoji: '🏝️✨', text: 'The scroll is empty! Write a new destiny.', color: '#7c3aed' };
    if (percentage === 0) return { emoji: '😤💢', text: 'Hey! No quests completed yet? Get to work!', color: '#dc2626' };
    if (percentage === 100) return { emoji: '👑🥳🌈🎉', text: 'MAGNIFICENT! Perfect day completed!', color: '#db2777' };
    return { emoji: '✨🔮💖', text: 'Keep casting your spells! You are doing great!', color: '#2563eb' };
  };

  const mood = getMood();

  return (
    <div style={styles.container}>
      
      {/* --- FLOATING MAGIC PARTICLES DUST --- */}
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      <div className="particle"></div>
      
      {/* Drifting Emblems */}
      <div className="floating-emoji" style={{ ...styles.floatingEmoji, top: '10%', left: '10%' }}>🦄</div>
      <div className="floating-emoji" style={{ ...styles.floatingEmoji, top: '20%', right: '15%' }}>✨</div>
      <div className="floating-emoji" style={{ ...styles.floatingEmoji, bottom: '15%', left: '15%' }}>☁️</div>
      <div className="floating-emoji" style={{ ...styles.floatingEmoji, bottom: '25%', right: '10%' }}>🌈</div>

      {/* Main Glassmorphism Card */}
      <div style={{
        ...styles.card,
        boxShadow: percentage === 100 
          ? '0 25px 50px rgba(219, 39, 119, 0.4), inset 0 0 30px rgba(255,255,255,0.8)' 
          : '0 20px 40px rgba(137, 113, 234, 0.3), inset 0 0 20px rgba(255,255,255,0.5)'
      }}>
        
        <div style={styles.header}>
          <h1 style={styles.title}>{getGreeting()}</h1>
          <p style={styles.subtitle}>✨ Track your daily magical quests ✨</p>
        </div>

        {/* Dynamic Mood Dialogue Box */}
        <div style={{
          ...styles.moodBox,
          backgroundColor: percentage === 100 ? 'rgba(251, 207, 232, 0.6)' : 'rgba(255, 255, 255, 0.4)'
        }}>
          <div style={{ fontSize: '28px', marginBottom: '5px' }}>{mood.emoji}</div>
          <div style={{ ...styles.moodText, color: mood.color }}>{mood.text}</div>
        </div>

        {/* Progress Tracker */}
        <div style={styles.progressContainer}>
          <div style={styles.progressText}>
            <span>Daily Progress</span>
            <span>{completedCount}/{totalTasks} ({percentage}%)</span>
          </div>
          <div style={styles.progressBarBackground}>
            <div style={{ ...styles.progressBarFill, width: `${percentage}%` }} />
          </div>
        </div>

        {/* Input Form */}
        <form onSubmit={addTask} style={styles.form}>
          <input 
            type="text" 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            placeholder="Add a new magical quest..." 
            style={styles.input} 
          />
          <button type="submit" style={styles.button}>Cast ✨</button>
        </form>

        {/* Interactive List */}
        <ul style={styles.list}>
          {tasks.map((task, index) => (
            <li 
              key={index} 
              onClick={() => toggleTask(index)} 
              style={{
                ...styles.listItem,
                background: task.completed ? 'rgba(255, 255, 255, 0.4)' : 'rgba(255, 255, 255, 0.8)',
                border: task.completed ? '1px solid rgba(255,255,255,0.2)' : '1px solid #f0d5ff',
                transform: task.completed ? 'scale(0.98)' : 'scale(1)'
              }}
            >
              <div style={styles.taskLeftSection}>
                <div style={{
                  ...styles.checkbox,
                  backgroundColor: task.completed ? '#c084fc' : 'transparent',
                  borderColor: task.completed ? '#c084fc' : '#d8b4fe'
                }}>
                  {task.completed && '🌸'}
                </div>
                <span style={{ 
                  ...styles.taskText,
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? '#a78bfa' : '#4c1d95',
                  fontStyle: task.completed ? 'italic' : 'normal'
                }}>
                  {task.text}
                </span>
              </div>
              <button onClick={(e) => deleteTask(e, index)} style={styles.deleteButton}>🔮</button>
            </li>
          ))}
        </ul>

        {totalTasks === 0 && (
          <p style={styles.emptyMessage}>🌈 No quests left! Rest well, adventurer!</p>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: '100vh',
    background: 'linear-gradient(-45deg, #ee7752, #e73c7e, #23a6d5, #8971ea, #d397fa)',
    backgroundSize: '400% 400%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Comic Sans MS', 'Chalkboard SE', 'cursive', sans-serif",
    padding: '20px',
    position: 'relative',
    overflow: 'hidden'
  },
  floatingEmoji: {
    position: 'absolute',
    fontSize: '40px',
    opacity: 0.6,
    userSelect: 'none',
    pointerEvents: 'none',
  },
  card: {
    background: 'rgba(255, 255, 255, 0.65)',
    backdropFilter: 'blur(12px)',
    WebkitBackdropFilter: 'blur(12px)',
    padding: '30px 35px',
    borderRadius: '30px',
    width: '100%',
    maxWidth: '460px',
    border: '2px solid rgba(255,255,255,0.6)',
    transition: 'all 0.5s ease-in-out',
    zIndex: 10
  },
  header: {
    textAlign: 'center',
    marginBottom: '15px'
  },
  title: {
    margin: '5px 0 0 0',
    color: '#4c1d95',
    fontSize: '22px',
    fontWeight: 'bold'
  },
  subtitle: {
    margin: '5px 0 0 0',
    color: '#7c3aed',
    fontSize: '13px',
    fontWeight: '500'
  },
  moodBox: {
    textAlign: 'center',
    padding: '15px',
    borderRadius: '20px',
    marginBottom: '20px',
    border: '1px dashed rgba(255,255,255,0.8)',
    transition: 'all 0.3s ease'
  },
  moodText: {
    fontSize: '14px',
    fontWeight: 'bold',
    lineHeight: '1.4'
  },
  progressContainer: {
    marginBottom: '25px',
    background: 'rgba(255,255,255,0.4)',
    padding: '12px',
    borderRadius: '15px',
    border: '1px solid rgba(255,255,255,0.5)'
  },
  progressText: {
    display: 'flex',
    justifyContent: 'space-between',
    fontSize: '13px',
    color: '#6d28d9',
    fontWeight: 'bold',
    marginBottom: '8px'
  },
  progressBarBackground: {
    height: '12px',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: '10px',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    background: 'linear-gradient(90deg, #a855f7 0%, #ec4899 100%)',
    borderRadius: '10px',
    transition: 'width 0.4s ease-out'
  },
  form: {
    display: 'flex',
    gap: '10px',
    marginBottom: '25px'
  },
  input: {
    flex: 1,
    padding: '12px 18px',
    fontSize: '14px',
    border: '2px solid #e9d5ff',
    borderRadius: '20px',
    outline: 'none',
    backgroundColor: 'rgba(255,255,255,0.9)',
    color: '#5b21b6',
  },
  button: {
    padding: '12px 22px',
    background: 'linear-gradient(135deg, #c084fc 0%, #f472b6 100%)',
    color: '#fff',
    border: 'none',
    borderRadius: '20px',
    fontWeight: 'bold',
    cursor: 'pointer',
    boxShadow: '0 4px 10px rgba(244, 114, 182, 0.3)',
  },
  list: {
    listStyleType: 'none',
    padding: 0,
    margin: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 16px',
    borderRadius: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
    boxShadow: '0 4px 6px rgba(147, 51, 234, 0.05)'
  },
  taskLeftSection: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    flex: 1
  },
  checkbox: {
    width: '22px',
    height: '22px',
    border: '2px solid',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '11px',
    transition: 'all 0.2s'
  },
  taskText: {
    fontSize: '15px',
    fontWeight: '600',
    userSelect: 'none',
  },
  deleteButton: {
    background: 'none',
    border: 'none',
    fontSize: '18px',
    cursor: 'pointer',
    padding: '0 5px',
    opacity: 0.7,
    transition: 'opacity 0.2s',
  },
  emptyMessage: {
    textAlign: 'center',
    color: '#7c3aed',
    marginTop: '20px',
    fontSize: '14px',
    fontWeight: '500'
  }
};

export default App;