// Button import removed as it's no longer used in this file
import Hero from './components/sections/Hero';
import { Team } from './components/sections/Team';
import { Games } from './components/sections/Games';
import { Media } from './components/sections/Media';
import { Shop } from './components/sections/Shop';
import { Community } from './components/sections/Community';
import { Sponsors } from './components/sections/Sponsors';
export default function Home() {
  return (
    <>
      {/* Home Section */}
      <Hero />

      {/* Team Section */}
      <Team />

      {/* Games Section */}
      <Games />

      {/* Media Section */}
      <Media />

      {/* Shop Section */}
      <Shop />

      {/* Community Section */}
      <Community />

      {/* Sponsors Section */}
      <Sponsors />
    </>
  );
}
