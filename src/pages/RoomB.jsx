import React from 'react'
import Navbar from '../components/Navbar'
import Chat from '../components/Chat'

function RoomB() {
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
      return (
        <>
          <div className={style.appContainer + ""}>
          <section className={style.sectionContainer} style={style.grid}>
            {/* Navbar */}
            <Navbar />
            {/* Chat component */}
            <Chat roomPath={'rooms/roomB/messages'}/>
          </section>
        </div>
            
        </>
      )
}

export default RoomB