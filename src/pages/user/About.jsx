import AboutHeader from "../../components/user/AboutHeader";
import AboutIntroduction from "../../components/user/AboutIntroduction";
import AboutVisionMission from "../../components/user/AboutVisionMission";
import AboutJourney from "../../components/user/AboutJourney";
import AboutValues from "../../components/user/AboutValues";
import AboutCommitment from "../../components/user/AboutCommitment";
import AboutCTA from "../../components/user/AboutCTA";

function About() {
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <AboutHeader />

      <AboutIntroduction />

      <AboutVisionMission />

      <AboutJourney />

      <AboutValues />

      <AboutCommitment />

      <AboutCTA />
    </div>
  );
}

export default About;
