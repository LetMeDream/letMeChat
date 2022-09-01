import Navbar from "../components/Navbar.jsx";
import "../App.css";
import { auth } from "../Firebase";
import Chat from "../components/Chat.jsx";

function Room1() {
  /* styles */
  const style = {
    appContainer: "w-full text-center relative ",
    sectionContainer: "mx-auto max-h-screen caret-transparent",
    grid: {
      /* overflowY:'scroll', */
      height: "100vh",
      display: "grid",
      gridTemplateAreas: `
        ' n n n n '
        ' c c c c '
        ' x x x x '
      `,
      gridTemplateRows: "1fr 5fr 1fr",
    }
  };

  /* const [user] = useAuthState(auth);
  console.log(user); */
  return (
    <div className={style.appContainer + ""}>
      <section className={style.sectionContainer} style={style.grid}>
        {/* Navbar */}
        <Navbar />
        {/* Chat component */}
        <Chat roomPath={'messages'}/>
      </section>
    </div>
  );
}

export default Room1;
