import { createMediaPlayer } from "create";
import { LayoutStore } from "layout_store";
import styles from "app.module.css";

function App() {
  const layoutStore = new LayoutStore();
  const MediaPlayer = createMediaPlayer({ layoutStore });

  return (
    <div className={styles.container}>
      <MediaPlayer />
    </div>
  );
}

export default App;
