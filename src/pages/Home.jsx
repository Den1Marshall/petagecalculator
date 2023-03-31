import './Home.css';

import { Title } from "../components/ui/Title";
import { Calculator } from "../components/Calculator/Calculator";

export const Home = ({ setAnimalsVisible, animal }) => {
    return (
        <main className="home">
            <div className="container">
                <Title/>
                <Calculator setAnimalsVisible={setAnimalsVisible} animal={animal}/>
            </div>
        </main>
    )
}