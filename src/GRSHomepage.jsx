import { useNavigate } from "react-router-dom";
import './GRSHomepage.css'
import { CiBoxList } from "react-icons/ci";


function GRSHomepage() {

   const navigator = useNavigate();

   function redirect() {
      navigator('/event');
   }

   return (
      <>
         <div className="homepage">
            <main className="homepage-main">
               <section className="homepage-info">
                  <h2>Welcome to Gift Registry!</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
               </section>

               <button type="button" className="btn-1" onClick={redirect}><CiBoxList /> See event list</button>
            </main>

         </div>
      </>
   )

}

export default GRSHomepage