import { Navbar } from '../../components/Navbar';
import { VaccineManager } from '../../components/VaccineManager';
import { WelcomeScreen } from '../../components/WelcomeScreen';

export default async function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      ATTENTION
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <VaccineManager />
      </main>
    </div>
  );
}